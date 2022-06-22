import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { MBadgeDirective, MBadgeState } from '../../directives/badge/badge';
import { BADGE_NAME, FILE_DROP_NAME } from '../../directives/directive-names';
import { MFileDropDirective } from '../../directives/file-drop/file-drop';
import { fileSize } from '../../filters/filesize/filesize';
import { FILESIZE_NAME } from '../../filters/filter-names';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import FilePlugin, { DEFAULT_STORE_NAME, MFile, MFileRejectionCause, MFileStatus } from '../../utils/file/file';
import MediaQueriesPlugin from '../../utils/media-queries/media-queries';
import UserAgentUtil from '../../utils/user-agent/user-agent';
import { ModulVue } from '../../utils/vue/vue';
import { MButton } from '../button/button';
import { FILE_UPLOAD_NAME } from '../component-names';
import { MFileSelect } from '../file-select/file-select';
import { MI18n } from '../i18n/i18n';
import { MIconButton } from '../icon-button/icon-button';
import { MIconFile } from '../icon-file/icon-file';
import { MLink } from '../link/link';
import { MMessage } from '../message/message';
import { MModal } from '../modal/modal';
import { MProgress, MProgressState } from '../progress/progress';
import WithRender from './file-upload.html?style=./file-upload.scss';

const COMPLETED_FILES_VISUAL_HINT_DELAY: number = 1000;

export interface MFileExt extends MFile {
    completeHinted: boolean;
    isOldRejection: boolean;
}

export interface FileUploadCustomValidation {
    /**
     * This function will be ran on every file added during their validation. Must return a Promise.resolved with a boolean stating if the file respects
     * the custom criterias or not.
     */
    validationFunction: (file: MFile) => Promise<boolean>;
    /**
     * Custom validation message displayed when {@link MFileUpload#customValidationFunction} return false.
     */
    message: string;
}

const defaultDragEvent: (e: DragEvent) => void = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer!.dropEffect = 'none';
};

@WithRender
@Component({
    components: {
        MButton,
        MModal,
        MMessage,
        MI18n,
        MFileSelect,
        MIconFile,
        MIconButton,
        MProgress,
        MLink
    },
    directives: {
        [FILE_DROP_NAME]: MFileDropDirective,
        [BADGE_NAME]: MBadgeDirective

    },
    filters: {
        [FILESIZE_NAME]: fileSize
    },
    mixins: [
        MediaQueries
    ]
})
export class MFileUpload extends ModulVue {
    @Prop({ default: () => [] })
    public readonly allowedExtensions: string[];

    @Prop({ default: () => [] })
    public readonly rejectedExtensions: string[];

    @Prop()
    public readonly maxSizeKb?: number;

    @Prop()
    public readonly maxFiles?: number;

    @Prop()
    public readonly selectionHelpMessage?: string;

    @Prop({
        default: DEFAULT_STORE_NAME
    })
    public readonly storeName: string;

    @Prop()
    public readonly open: boolean;

    @Prop({ default: false })
    public readonly fileReplacement: boolean;

    @Prop()
    public readonly customValidation?: FileUploadCustomValidation;

    public $refs: {
        modal: MModal;
    };

    public tooltipCancel: string = this.$i18n.translate('m-file-upload:cancelFileUpload');
    public tooltipDelete: string = this.$i18n.translate('m-file-upload:deleteUploadedFile');
    private internalOpen: boolean = false;

    public get isDropZoneEnabled(): boolean {
        return UserAgentUtil.isDesktop() && this.$mq.state.isMqMinS;
    }


    protected created(): void {
        this.updateValidationOptions();
    }

    protected destroyed(): void {
        this.$file.destroy(this.storeName);
    }

    @Watch('allowedExtensions')
    @Watch('rejectedExtensions')
    @Watch('maxSizeKb')
    @Watch('maxFiles')
    @Watch('customValidation')
    public updateValidationOptions(): void {
        this.$file.setValidationOptions(
            {
                allowedExtensions: this.allowedExtensions,
                rejectedExtensions: this.rejectedExtensions,
                maxSizeKb: this.maxSizeKb,
                maxFiles: this.propMaxFiles,
                customValidationFunction: this.customValidation ? this.customValidation.validationFunction : undefined
            },
            this.storeName
        );
    }

    @Watch('open')
    public openChanged(open: boolean): void {
        this.internalOpen = open;
    }

    @Watch('readyFiles')
    public onFilesChanged(): void {
        const newReadyFiles: MFileExt[] = [];

        for (const f of this.readyFiles) {
            if (!f.hasOwnProperty('completeHinted')) {
                this.$set(f, 'completeHinted', false);
                newReadyFiles.push(f);
            }
        }

        if (newReadyFiles.length > 0) {
            this.$emit('files-ready', this.readyFiles);
        }
    }

    @Watch('freshlyCompletedFiles')
    public onFreshlyCompletedFilesChanged(): void {
        if (this.freshlyCompletedFiles.length > 0) {
            setTimeout(() => {
                for (const f of this.freshlyCompletedFiles) {
                    f.completeHinted = true;
                }
            }, COMPLETED_FILES_VISUAL_HINT_DELAY);
        }
    }

    @Watch('rejectedFiles')
    public onFilesRejected(): void {
        const nbNewRejection: number = this.rejectedFiles.reduce((cnt, f) => {
            let nbNewRejection: number = 0;
            if (!f.isOldRejection) {
                ++nbNewRejection;
                f.isOldRejection = true;
            }
            return cnt + nbNewRejection;
        }, 0);

        if (nbNewRejection > 0) {
            if (this.$refs.modal && this.$refs.modal.$refs) {
                this.$refs.modal.$refs.body.scrollTop = 0;
            }

            // TODO Change function to have a smooth scroll when it will work on a diferent element than the body of the page
            // ScrollTo.startScroll(bodyRef, 0, ScrollToDuration.Regular);
        }
    }

    public onPortalAfterOpen(): void {
        this.dropEvents.forEach((evt) => {
            this.$refs.modal.$refs.modalWrap.addEventListener(evt, defaultDragEvent);
        });
    }

    ppublicrivate onMessageClose(): void {
        for (const f of this.rejectedFiles) {
            this.$file.remove(f.uid, this.storeName);
        }
    }

    public onAddClick(): void {
        this.$emit('done', this.completedFiles);
        this.$refs.modal.closeModal();
    }

    public onCancelClick(): void {
        this.$emit('cancel');
        this.$refs.modal.closeModal();
    }

    public onUploadCancel(file: MFile): void {
        file.status === MFileStatus.UPLOADING
            ? this.$emit('file-upload-cancel', file)
            : this.onFileRemove(file);
    }

    public onFileRemove(file: MFile): void {
        this.$emit('file-remove', file);
        this.$file.remove(file.uid, this.storeName);
    }

    public onOpen(): void {
        this.$emit('open');
        this.propOpen = true;
        this.updateValidationOptions();
    }

    public onClose(): void {
        this.propOpen = false;
        this.$emit('close');
        this.allFiles
            .filter(f => f.status === MFileStatus.UPLOADING)
            .forEach(this.onUploadCancel);
        this.$file.clear(this.storeName);
        this.dropEvents.forEach((evt) => {
            this.$refs.modal.$refs.modalWrap.removeEventListener(evt, defaultDragEvent);
        });
    }

    public getFileStatus(file): string {
        switch (file.status) {
            case MFileStatus.FAILED:
                return MProgressState.Error;
            case MFileStatus.COMPLETED:
                return MProgressState.Completed;
            default:
                return MProgressState.InProgress;
        }
    }

    public getBadgeState(file): string | undefined {
        switch (file.status) {
            case MFileStatus.FAILED:
                return MBadgeState.Error;
            case MFileStatus.COMPLETED:
                return MBadgeState.Completed;
            default:
                return undefined;
        }
    }

    public hasExtensionsRejection(file): boolean {
        return file.rejection === MFileRejectionCause.FILE_TYPE;
    }

    public hasSizeRejection(file): boolean {
        return file.rejection === MFileRejectionCause.FILE_SIZE;
    }

    public hasMaxFilesRejection(file): boolean {
        return file.rejection === MFileRejectionCause.MAX_FILES;
    }

    public hasCustomValidationRejection(file: MFile): boolean {
        return file.rejection === MFileRejectionCause.CUSTOM_VALIDATION;
    }

    public get title(): string {
        return this.fileReplacement ? this.$i18n.translate('m-file-upload:header-title-file-replacement') : this.$i18n.translate('m-file-upload:header-title', {}, this.propMaxFiles);
    }

    public get buttonAdd(): string {
        return this.fileReplacement ? this.$i18n.translate('m-file-upload:replace') : this.$i18n.translate('m-file-upload:add');
    }

    public get fileAllowedExtensions(): string {
        return this.allowedExtensions.join(', ');
    }

    public get isAddBtnEnabled(): boolean {
        return (
            this.completedFiles.length > 0 && this.uploadingFilesOnly.length === 0
        );
    }

    public get readyFiles(): MFileExt[] {
        return this.allFiles.filter(f => f.status === MFileStatus.READY);
    }

    public get freshlyCompletedFiles(): MFileExt[] {
        return this.allFiles.filter(
            f => f.status === MFileStatus.COMPLETED && !f.completeHinted
        );
    }

    public get uploadingFilesOnly(): MFileExt[] {
        return this.allFiles.filter(
            f =>
                f.status === MFileStatus.UPLOADING ||
                (f.status === MFileStatus.COMPLETED && !f.completeHinted)
        );
    }

    public get uploadingFiles(): MFileExt[] {
        return this.allFiles.filter(
            f =>
                f.status === MFileStatus.UPLOADING ||
                f.status === MFileStatus.FAILED ||
                (f.status === MFileStatus.COMPLETED && !f.completeHinted)
        );
    }

    public get completedFiles(): MFileExt[] {
        return this.allFiles.filter(
            f => f.status === MFileStatus.COMPLETED && f.completeHinted
        );
    }

    public get rejectedFiles(): MFileExt[] {
        return this.allFiles.filter(f => f.status === MFileStatus.REJECTED);
    }

    public get allFiles(): MFileExt[] {
        return this.$file.files(this.storeName) as MFileExt[];
    }

    public get hasUploadingFiles(): boolean {
        return this.uploadingFiles.length === 0;
    }

    public get hasCompletedFiles(): boolean {
        return this.completedFiles.length === 0;
    }

    public get buttonCompletedStyle(): string | undefined {
        return !this.hasCompletedFiles ? 'display: flex;' : undefined;
    }

    public get hasRejectedFiles(): boolean {
        return this.rejectedFiles.length !== 0;
    }

    public get hasAllowedExtensions(): boolean {
        return this.allowedExtensions.length > 0;
    }

    public get propOpen(): boolean {
        return this.open ? this.open : this.internalOpen;
    }

    public set propOpen(value) {
        if (value !== this.internalOpen) {
            this.internalOpen = value;
            this.$emit('update:open', value);
        }
    }

    public get propMaxFiles(): number | undefined {
        return this.fileReplacement ? 1 : this.maxFiles;
    }

    public get multipleSelection(): boolean {
        return this.propMaxFiles !== undefined && this.propMaxFiles > 1;
    }

    public get dropEvents(): string[] {
        return ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'];
    }
}

const FileUploadPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(FilePlugin);
        v.use(MediaQueriesPlugin);
        v.component(FILE_UPLOAD_NAME, MFileUpload);
    }
};

export default FileUploadPlugin;

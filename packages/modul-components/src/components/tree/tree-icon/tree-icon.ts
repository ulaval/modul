import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { extractExtension } from '../../../utils/file/file';
import { ModulVue } from '../../../utils/vue/vue';
import { ICON_FILE_NAME, ICON_NAME, PLUS_NAME } from '../../component-names';
import { MIconFile } from '../../icon-file/icon-file';
import { MIcon } from '../../icon/icon';
import { MPlus } from '../../plus/plus';
import WithRender from './tree-icon.html?style=./tree-icon.scss';

const FOLDER_OPEN: string = 'm-svg__folder-open';
const FOLDER_CLOSED: string = 'm-svg__folder';

@WithRender
@Component({
    components: {
        [PLUS_NAME]: MPlus,
        [ICON_FILE_NAME]: MIconFile,
        [ICON_NAME]: MIcon
    }
})
export class MTreeIcon extends ModulVue {
    @Prop()
    public filename: string;

    @Prop()
    public isFolderOpen: boolean;

    @Prop({ default: false })
    public isFolder: boolean;

    @Prop({ default: false })
    public useFilesIcons: boolean;

    public get folderIcon(): string {
        return this.isFolderOpen ? FOLDER_OPEN : FOLDER_CLOSED;
    }

    public get extensionFile(): string {
        return '.' + extractExtension(this.filename);
    }

    public get showFolderIcon(): boolean {
        return this.isFolder && this.useFilesIcons;
    }
}



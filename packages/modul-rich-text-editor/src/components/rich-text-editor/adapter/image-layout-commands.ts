import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import imageBlockCenterIcon from '../../../assets/icons/svg/Froala-image-block-center.svg';
import imageBlockLeftIcon from '../../../assets/icons/svg/Froala-image-block-left.svg';
import imageFloatLeftIcon from '../../../assets/icons/svg/Froala-image-float-left.svg';
import imageFloatRightIcon from '../../../assets/icons/svg/Froala-image-float-right.svg';

export namespace ImageLayoutCommands {
    const IMG_BLOCK_LEFT_CMD: string = 'image-block-left';
    const IMG_BLOCK_CENTER_CMD: string = 'image-block-center';
    const IMG_FLOAT_LEFT_CMD: string = 'image-float-left';
    const IMG_FLOAT_RIGHT_CMD: string = 'image-float-right';
    const PREFIX: string = 'm--fr-';
    const ACTIVE_CLASS: string = `${PREFIX}active`;

    export const IMG_LAYOUT_CMD: string = 'image-layout';
    export const DEFAULT_IMG_LAYOUT_CLASS: string = `${PREFIX}${IMG_BLOCK_LEFT_CMD}`;

    export function register(froalaEditor: any): void {
        registerMainCommand(froalaEditor);
        registerSubCommand(froalaEditor, IMG_BLOCK_LEFT_CMD, imageBlockLeftIcon);
        registerSubCommand(froalaEditor, IMG_BLOCK_CENTER_CMD, imageBlockCenterIcon);
        registerSubCommand(froalaEditor, IMG_FLOAT_LEFT_CMD, imageFloatLeftIcon);
        registerSubCommand(froalaEditor, IMG_FLOAT_RIGHT_CMD, imageFloatRightIcon);
    }

    function registerMainCommand(froalaEditor: any): void {
        froalaEditor.DefineIcon(IMG_LAYOUT_CMD, { SVG: imageBlockLeftIcon, template: 'custom-icons' });
        froalaEditor.RegisterCommand(IMG_LAYOUT_CMD, {
            title: ModulVue.prototype.$i18n.translate(`m-rich-text-editor:${IMG_LAYOUT_CMD}`),
            type: 'dropdown',
            html: function(): string {
                return this.button.buildList(getCommandList.call(this));
            },
            refreshOnShow: function(_$btn: any, $dropdown: any): void {
                const dropdown: HTMLElement = $dropdown[0];
                if (!dropdown.querySelector(`.fr-btn.${ACTIVE_CLASS}`)) {
                    getElementFromDataCmd(dropdown, IMG_BLOCK_LEFT_CMD)!.classList.add(ACTIVE_CLASS);
                }
            }
        });
    }

    function registerSubCommand(froalaEditor: any, cmd: string, icon: any): void {
        froalaEditor.DefineIcon(cmd, { SVG: icon, template: 'custom-icons' });
        froalaEditor.RegisterCommand(cmd, {
            title: ModulVue.prototype.$i18n.translate(`m-rich-text-editor:${cmd}`),
            undo: true,
            showOnMobile: true,
            callback: function(): void {
                const popup: HTMLElement = this.popups.areVisible()[0];
                const imageClasses: DOMTokenList = (this.image.get()[0] as HTMLElement).classList;
                getCommandList.call(this).forEach((currentCmd: string) => {
                    imageClasses.remove(`${PREFIX}${currentCmd}`);
                    getElementFromDataCmd(popup, currentCmd)!.classList.remove(ACTIVE_CLASS);
                });
                this.image.applyStyle(`${PREFIX}${cmd}`);
                getElementFromDataCmd(popup, cmd)!.classList.add(ACTIVE_CLASS);
                getElementFromDataCmd(popup, IMG_LAYOUT_CMD)!.innerHTML = icon;
            }
        });
    }

    function getCommandList(): string[] {
        if (this.$oel[0].parentNode.__vue__.config.imageHideFloatLayout) {
            return [IMG_BLOCK_LEFT_CMD, IMG_BLOCK_CENTER_CMD];
        } else {
            return [IMG_BLOCK_LEFT_CMD, IMG_BLOCK_CENTER_CMD, IMG_FLOAT_LEFT_CMD, IMG_FLOAT_RIGHT_CMD];
        }
    }

    function getElementFromDataCmd(root: HTMLElement, value: string): Element | null {
        return root.querySelector(`[data-cmd="${value}"]`);
    }
}

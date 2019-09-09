import imageBlockCenterIcon from '../../../assets/icons/svg/Froala-image-block-center.svg';
import imageBlockLeftIcon from '../../../assets/icons/svg/Froala-image-block-left.svg';
import imageFloatLeftIcon from '../../../assets/icons/svg/Froala-image-inline-left.svg';
import imageFloatRightIcon from '../../../assets/icons/svg/Froala-image-inline-right.svg';
import { ModulVue } from '../../../utils/vue/vue';

export namespace ImageLayoutCommands {
    const IMG_BLOCK_LEFT_CMD: string = 'image-block-left';
    const IMG_BLOCK_CENTER_CMD: string = 'image-block-center';
    const IMG_FLOAT_LEFT_CMD: string = 'image-float-left';
    const IMG_FLOAT_RIGHT_CMD: string = 'image-float-right';
    const PREFIX: string = 'm--fr-';

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
                const classes: DOMTokenList = (this.image.get()[0] as HTMLElement).classList;
                getCommandList.call(this).forEach((currentCmd: string) => {
                    classes.remove(`${PREFIX}${currentCmd}`);
                    (this.popups.areVisible().find(`[data-cmd="${currentCmd}"]`)[0] as HTMLElement).classList.remove(`${PREFIX}active`);
                });
                this.image.applyStyle(`${PREFIX}${cmd}`);
                (this.popups.areVisible().find(`[data-cmd="${cmd}"]`)[0] as HTMLElement).classList.add(`${PREFIX}active`);
                this.popups.areVisible().find(`[data-cmd="${IMG_LAYOUT_CMD}"]`).html(icon);
            }
        });
    }

    function getCommandList(): string[] {
        if (this.$oel[0].parentNode.__vue__.config.imageHideInlineLayout) {
            return [IMG_BLOCK_LEFT_CMD, IMG_BLOCK_CENTER_CMD];
        } else {
            return [IMG_BLOCK_LEFT_CMD, IMG_BLOCK_CENTER_CMD, IMG_FLOAT_LEFT_CMD, IMG_FLOAT_RIGHT_CMD];
        }
    }
}

import imageBlockCenterIcon from '../../../assets/icons/svg/Froala-image-block-center.svg';
import imageBlockLeftIcon from '../../../assets/icons/svg/Froala-image-block-left.svg';
import imageInlineLeftIcon from '../../../assets/icons/svg/Froala-image-inline-left.svg';
import imageInlineRightIcon from '../../../assets/icons/svg/Froala-image-inline-right.svg';

const IMG_LAYOUT_CMD: string = 'imageLayout';
const IMG_BLOCK_LEFT_CMD: string = 'imageBlockLeft';
const IMG_BLOCK_CENTER_CMD: string = 'imageBlockCenter';
const IMG_INLINE_LEFT_CMD: string = 'imageInlineLeft';
const IMG_INLINE_RIGHT_CMD: string = 'imageInlineRight';

export function initializeImageCommands(froalaEditor: any): void {
    froalaEditor.DefineIcon(IMG_BLOCK_LEFT_CMD, { SVG: (imageBlockLeftIcon as string), template: 'custom-icons' });
    froalaEditor.RegisterCommand(IMG_BLOCK_LEFT_CMD, {
        title: 'block left',
        undo: true,
        showOnMobile: true,
        callback: function(): void {
            const classes: DOMTokenList = (this.image.get()[0] as HTMLElement).classList;
            classes.remove('m--fr-block-center', 'm--fr-inline-left', 'm--fr-inline-right');
            this.image.applyStyle('m--fr-block-left');
            this.popups.areVisible().find('[data-cmd="imageLayout"]').html(imageBlockLeftIcon);
        }
    });

    froalaEditor.DefineIcon(IMG_BLOCK_CENTER_CMD, { SVG: (imageBlockCenterIcon as string), template: 'custom-icons' });
    froalaEditor.RegisterCommand(IMG_BLOCK_CENTER_CMD, {
        title: 'block center',
        undo: true,
        showOnMobile: true,
        callback: function(): void {
            const classes: DOMTokenList = (this.image.get()[0] as HTMLElement).classList;
            classes.remove('m--fr-block-left', 'm--fr-inline-left', 'm--fr-inline-right');
            this.image.applyStyle('m--fr-block-center');
            this.popups.areVisible().find('[data-cmd="imageLayout"]').html(imageBlockCenterIcon);
        }
    });

    froalaEditor.DefineIcon(IMG_INLINE_LEFT_CMD, { SVG: (imageInlineLeftIcon as string), template: 'custom-icons' });
    froalaEditor.RegisterCommand(IMG_INLINE_LEFT_CMD, {
        title: 'inline left',
        undo: true,
        showOnMobile: true,
        callback: function(): void {
            const classes: DOMTokenList = (this.image.get()[0] as HTMLElement).classList;
            classes.remove('m--fr-block-left', 'm--fr-block-center', 'm--fr-inline-right');
            this.image.applyStyle('m--fr-inline-left');
            this.popups.areVisible().find('[data-cmd="imageLayout"]').html(imageInlineLeftIcon);
        }
    });

    froalaEditor.DefineIcon(IMG_INLINE_RIGHT_CMD, { SVG: (imageInlineRightIcon as string), template: 'custom-icons' });
    froalaEditor.RegisterCommand(IMG_INLINE_RIGHT_CMD, {
        title: 'inline right',
        undo: true,
        showOnMobile: true,
        callback: function(): void {
            const classes: DOMTokenList = (this.image.get()[0] as HTMLElement).classList;
            classes.remove('m--fr-block-left', 'm--fr-block-center', 'm--fr-inline-left');
            this.image.applyStyle('m--fr-inline-right');
            this.popups.areVisible().find('[data-cmd="imageLayout"]').html(imageInlineRightIcon);
        }
    });

    froalaEditor.DefineIcon(IMG_LAYOUT_CMD, { SVG: (imageBlockLeftIcon as string), template: 'custom-icons' });
    froalaEditor.RegisterCommand(IMG_LAYOUT_CMD, {
        title: 'image layout',
        type: 'dropdown',
        html: function(): string {
            if (this.$oel[0].parentNode.__vue__.config.imageHideInlineLayout) {
                return this.button.buildList([IMG_BLOCK_LEFT_CMD, IMG_BLOCK_CENTER_CMD]);
            } else {
                return this.button.buildList([IMG_BLOCK_LEFT_CMD, IMG_BLOCK_CENTER_CMD, IMG_INLINE_LEFT_CMD, IMG_INLINE_RIGHT_CMD]);
            }
        }
    });
}

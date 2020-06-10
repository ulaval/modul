import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { ICON_NAME } from '../../component-names';
import { BaseOption, MOptionInterface } from '../option';
import { MIcon } from './../../icon/icon';
import WithRender from './option-item.html?style=./option-item.scss';

@WithRender
@Component({
    components: {
        [ICON_NAME]: MIcon
    }
})
export class MOptionItem extends ModulVue {

    @Prop()
    public iconName: string;
    @Prop()
    public disabled: boolean;

    public root: MOptionInterface; // Menu component
    private hasRoot: boolean = false;

    protected mounted(): void {
        let rootNode: BaseOption | undefined = this.getParent<BaseOption>(p => p instanceof BaseOption);

        if (rootNode) {
            this.root = (rootNode as any) as MOptionInterface;
            this.hasRoot = true;
        } else {
            console.error('m-option-item need to be inside m-option');
        }
    }

    @Emit('click')
    public emitClick(_event: MouseEvent): void { }

    public onClick(event: MouseEvent): void {
        if (!this.disabled) {
            if (this.hasRoot) {
                (this.root).close();
                this.emitClick(event);
            }
        } else {
            event.stopPropagation();
        }
    }

    public get hasIconNameProp(): boolean {
        return !!this.iconName;
    }

    public get hasIcon(): boolean {
        if (this.hasRoot) {
            (this.root).checkIcon(this.hasIconNameProp);
            return (this.root).hasIcon;
        }
        return false;
    }

    public get hasBorder(): boolean {
        if (this.hasRoot) {
            (this.root).checkBorder();
            return (this.root).hasItemBorder;
        }
        return true;
    }

    public get hasDefaultSlot(): boolean {
        return !!this.$slots.default;
    }
}

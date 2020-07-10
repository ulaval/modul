import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { Location } from 'vue-router';
import uuid from '../../../utils/uuid/uuid';
import { ModulVue } from '../../../utils/vue/vue';
import { ACCORDION_TRANSITION_NAME, ICON_NAME, PLUS_NAME } from '../../component-names';
import { MIcon } from '../../icon/icon';
import { MPlus } from '../../plus/plus';
import { MAccordionTransition } from '../../transitions/accordion-transition/accordion-transition';
import { BaseMenu, Menu } from '../menu';
import WithRender from './menu-item.html';
import './menu-item.scss';

export abstract class BaseMenuItem extends ModulVue {
}

export interface MenuItem {
    group: boolean;
    propOpen: boolean;
    selected: boolean;
    insideGroup: boolean;
}

@WithRender
@Component({
    components: {
        [ICON_NAME]: MIcon,
        [PLUS_NAME]: MPlus,
        [ACCORDION_TRANSITION_NAME]: MAccordionTransition
    }
})
export class MMenuItem extends BaseMenuItem implements MenuItem {
    @Prop()
    public open: boolean;
    @Prop()
    public value: string;
    @Prop()
    public label: string;
    @Prop()
    public url: string | Location;
    @Prop()
    public iconName: string;
    @Prop()
    public disabled: boolean;

    $refs: {
        transition: MAccordionTransition;
        group: HTMLElement;
    };

    public group: boolean = false;
    public selected: boolean = false;
    public insideGroup = false;
    public animReady: boolean = false;
    public ariaControls: string = `mMenuItem-${uuid.generate()}-controls`;
    // tslint:disable-next-line:no-null-keyword
    public menuRoot: Menu | null = null;
    // tslint:disable-next-line:no-null-keyword
    public groupItemRoot: MenuItem | null = null;
    private internalOpen: boolean = false;
    private groupObserver: MutationObserver;

    protected mounted(): void {
        let menuRoot: BaseMenu | undefined = this.getParent<BaseMenu>(p => p instanceof BaseMenu || p.$options.name === 'MMenu');
        if (menuRoot) {
            this.menuRoot = (menuRoot as any) as Menu;
        } else {
            console.error('<m-menu-item> need to be inside <m-menu>');
        }

        this.$nextTick(() => {
            this.onGroupObserverChange();

            this.groupObserver = new MutationObserver(() => this.onGroupObserverChange());

            if (this.$refs.group) {
                this.groupObserver.observe(this.$refs.group, { subtree: true, childList: true });
            }
        });
    }

    protected beforeDestroy(): void {
        if (this.groupObserver) { this.groupObserver.disconnect(); }
    }

    @Emit('click')
    public emitClick(event: MouseEvent): void { }

    @Watch('open', { immediate: true })
    private openChanged(open: boolean): void {
        this.propOpen = open;
    }

    public set propOpen(open: boolean) {
        if (this.group) {
            this.animReady = false;
            this.internalOpen = open;
            this.animReady = true;
            this.$emit('update:open', open);
        }
    }

    public get propOpen(): boolean {
        return this.internalOpen;
    }

    public getGroupItem(): MMenuItem[] {
        return this.$refs.transition.$children
            .filter(child => child instanceof MMenuItem)
            .map(child => child as MMenuItem);
    }

    public get isAnimReady(): boolean {
        return this.menuRoot ? this.menuRoot.animReady : false;
    }

    public get isUrl(): boolean {
        return !!this.url && !this.group;
    }

    public get isDisabled(): boolean {
        return this.menuRoot && this.menuRoot.propDisabled ? true : this.disabled;
    }

    public onClick(event: MouseEvent): void {
        if (!this.isDisabled && this.menuRoot && !this.menuRoot.closeOnSelectionInAction) {
            if (this.group) {
                this.toggleOpen();
            } else {
                this.menuRoot.updateValue(this.value);
                this.menuRoot.onClick(event, this.value);
            }
            this.emitClick(event);
        }
    }

    private onGroupObserverChange(): void {
        this.group = !!this.$refs.transition.$children.find(item => item instanceof MMenuItem);
    }

    private toggleOpen(): void {
        this.propOpen = !this.propOpen;
    }
}


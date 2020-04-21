import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { MENU_ITEM_NAME, MENU_NAME } from '../component-names';
import I18nPlugin from '../i18n/i18n';
import IconButtonPlugin from '../icon-button/icon-button';
import IconPlugin from '../icon/icon';
import PlusPlugin from '../plus/plus';
import AccordionTransitionPlugin, { MAccordionTransition } from '../transitions/accordion-transition/accordion-transition';
import { MMenuItem } from './menu-item/menu-item';
import WithRender from './menu.html';
import './menu.scss';
export abstract class BaseMenu extends ModulVue {
}

export interface Menu {
    model: string;
    propOpen: boolean;
    propDisabled: boolean;
    animReady: boolean;
    closeOnSelectionInAction: boolean;
    updateValue(value: string | undefined): void;
    onClick(event: Event, value: string): void;
    beforeEnter(event: Event, value: string): void;
    enter(event: Event, value: string): void;
    afterEnter(event: Event, value: string): void;
    enterCancelled(event: Event, value: string): void;
    beforeLeave(event: Event, value: string): void;
    leave(event: Event, value: string): void;
    afterLeave(event: Event, value: string): void;
    leaveCancelled(event: Event, value: string): void;
}

export enum MMenuSkin {
    Light = 'light',
    Dark = 'dark'
}

@WithRender
@Component
export class MMenu extends BaseMenu implements Menu {
    @Prop()
    public selected: string;
    @Prop()
    public open: boolean;

    @Prop({ default: true })
    public closeOnSelection: boolean;

    @Prop({
        default: MMenuSkin.Dark,
        validator: value =>
            value === MMenuSkin.Light ||
            value === MMenuSkin.Dark
    })
    public skin: MMenuSkin;
    @Prop()
    public disabled: boolean;
    @Prop({ default: `mMenu-${uuid.generate()}-controls` })
    public idAriaControls: string;

    public $refs: {
        menu: HTMLElement;
        buttonMenu: HTMLElement;
        transition: MAccordionTransition
    };

    public animReady: boolean = false;
    public closeOnSelectionInAction: boolean = false;
    public titleMenuOpen: string = this.$i18n.translate('m-menu:open');
    public titleMenuClose: string = this.$i18n.translate('m-menu:close');

    private internalValue: string | undefined = '';
    private internalOpen: boolean = false;
    private internalDisabled: boolean = false;
    private internalItems: MMenuItem[] = [];
    private menuObserver: MutationObserver;

    @Emit('click')
    public onClick(event: Event, value: string): void { }

    @Emit('before-enter')
    public beforeEnter(event: Event, value: string): void { }

    @Emit('enter')
    public enter(event: Event, value: string): void { }

    @Emit('after-enter')
    public afterEnter(event: Event, value: string): void { }

    @Emit('enter-cancelled')
    public enterCancelled(event: Event, value: string): void { }

    @Emit('before-leave')
    public beforeLeave(event: Event, value: string): void { }

    @Emit('leave')
    public leave(event: Event, value: string): void { }

    @Emit('after-leave')
    public afterLeave(event: Event, value: string): void { }

    @Emit('leave-cancelled')
    public leaveCancelled(event: Event, value: string): void { }

    @Watch('selected', { immediate: true })
    public updateValue(value: string | undefined): void {
        this.model = value;
    }

    @Watch('open', { immediate: true })
    private onOpenChanged(open: boolean): void {
        this.internalOpen = open;
    }

    @Watch('disabled', { immediate: true })
    private onDisabledChanged(disabled: boolean): void {
        this.propDisabled = disabled;
    }

    protected mounted(): void {
        this.$nextTick(() => {
            this.buildItemsMap();

            this.menuObserver = new MutationObserver(() => this.buildItemsMap());

            if (this.$refs.menu) {
                this.menuObserver.observe(this.$refs.menu, { subtree: true, childList: true });
            }
        });
    }

    protected beforeDestroy(): void {
        if (this.menuObserver) { this.menuObserver.disconnect(); }
    }

    public set propDisabled(disabled: boolean) {
        this.internalDisabled = disabled;
    }

    public get propDisabled(): boolean {
        return this.internalDisabled;
    }

    public set propOpen(open: boolean) {
        this.animReady = false;
        this.selectedItem();
        this.internalOpen = open;
        this.$emit('update:open', open);
        this.animReady = true;
    }

    public get propOpen(): boolean {
        return this.internalOpen;
    }

    public toggleMenu(event: Event): void {
        if (!this.propDisabled) {
            this.propOpen = !this.propOpen;
            this.$refs.buttonMenu.blur();
            this.onClick(event, '');
        }
    }

    public get model(): any {
        return this.internalValue;
    }

    public set model(value: any) {
        if (!this.closeOnSelectionInAction) {
            this.internalValue = value;
            this.selectedItem();
            this.$emit('update:selected', value);
            if (this.closeOnSelection) {
                this.closeOnSelectionInAction = true;
                // Add a delay before closing the menu to display the selected item
                setTimeout(() => {
                    this.propOpen = false;
                    this.closeOnSelectionInAction = false;
                }, 600);
            }
        }
    }

    private buildItemsMap(): void {
        let items: MMenuItem[] = [];
        this.$refs.transition.$children.forEach(item => {
            if (item instanceof MMenuItem) {
                items.push(item);
                if (item.group) {
                    item.getGroupItem().forEach(groupItem => {
                        groupItem.insideGroup = true;
                        items.push(groupItem);
                    });
                }
            }
        });
        this.internalItems = items;
    }

    private selectedItem(): void {
        if (this.internalItems) {
            this.internalItems.forEach((item) => {
                if (!item.isDisabled) {
                    if (item.value === this.model) {
                        item.selected = true;
                    } else if (item.selected) {
                        item.selected = false;
                    }
                }
            });

            this.internalItems.forEach((item) => {
                item.propOpen = false;
                if (!item.isDisabled && item.group) {
                    item.$children.forEach(itemGroup => {
                        itemGroup.$children.forEach((subItem: MMenuItem) => {
                            if (subItem.isUrl) {
                                subItem.selected = this.isRouterLinkActive(subItem);
                            }

                            if (subItem.selected) {
                                item.propOpen = true;
                                item.selected = true;
                            }
                        });
                    });
                }
            });
        }
    }

    private isRouterLinkActive(menuItem: MMenuItem): boolean {
        return !!menuItem.$el.querySelector('.router-link-exact-active');
    }
}

const MenuPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(AccordionTransitionPlugin);
        v.use(I18nPlugin);
        v.use(PlusPlugin);
        v.use(IconPlugin);
        v.use(IconButtonPlugin);
        v.component(MENU_ITEM_NAME, MMenuItem);
        v.component(MENU_NAME, MMenu);
    }
};

export default MenuPlugin;

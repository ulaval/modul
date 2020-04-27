import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { AccordionGateway, AccordionGroupGateway, MAccordionSkin } from '../accordion/accordion';
import { ACCORDION_GROUP_NAME, I18N_NAME, LINK_NAME } from '../component-names';
import { MI18n } from '../i18n/i18n';
import { MLink } from '../link/link';
import WithRender from './accordion-group.html?style=./accordion-group.scss';


@WithRender
@Component({
    components: {
        [LINK_NAME]: MLink,
        [I18N_NAME]: MI18n
    }
})
export class MAccordionGroup extends Vue implements AccordionGroupGateway {
    @Prop({
        default: MAccordionSkin.Default,
        validator: value =>
            value === MAccordionSkin.Default ||
            value === MAccordionSkin.Light ||
            value === MAccordionSkin.Plain
    })
    public skin: MAccordionSkin;

    @Prop({
        default: false
    })
    public concurrent: boolean;

    @Prop({
        default: false
    })
    public disabled: boolean;

    @Prop()
    public openedIds?: string[];

    @Prop({
        default: false
    })
    public toggleLinkLeft: boolean;

    @Prop({
        default: false
    })
    public openAll: boolean;

    isAllOpen: boolean = false;
    isAllClosed: boolean = false;
    private accordions: { [id: string]: AccordionGateway } = {};

    protected mounted(): void {
        this.updateToggleLinks();
    }

    protected updated(): void {
        this.updateToggleLinks();
    }

    public addAccordion(accordion: AccordionGateway): void {
        accordion.$on('update:open', this.onAccordionOpenChange);
        this.$set(this.accordions, accordion.propId, accordion);
        if (this.openAll || (this.openedIds && this.openedIds.find(v => v === accordion.propId))) {
            accordion.propOpen = true;
        }
    }

    public removeAccordion(id: string): void {
        this.accordions[id].$off('update:open', this.onAccordionOpenChange);
        this.$delete(this.accordions, id);
    }

    public closeAllAccordions(): void {
        for (const id in this.accordions) {
            if (!this.accordions[id].propDisabled) {
                this.accordions[id].propOpen = false;
            }
        }
    }

    private updateIsAllOpen(): void {
        // A computed wouldn't work here since we want to recompute the value each time the DOM changes (when a child is removed, added, updated, etc)

        let allOpened: boolean = true;
        for (const id in this.accordions) {
            allOpened = this.accordions[id].propOpen || !this.accordionHasContent(id);
            if (!allOpened && !this.accordions[id].propDisabled) {
                break;
            }
        }


        this.isAllOpen = allOpened;
    }

    private updateIsAllClosed(): void {
        // A computed wouldn't work here since we want to recompute the value each time the DOM changes (when a child is removed, added, updated, etc)

        let allClosed: boolean = true;
        for (const id in this.accordions) {
            allClosed = !this.accordions[id].propOpen || !this.accordionHasContent(id);
            if (!allClosed && !this.accordions[id].propDisabled) {
                break;
            }
        }

        this.isAllClosed = allClosed;
    }

    private get propSkin(): MAccordionSkin {
        return this.skin === MAccordionSkin.Light || this.skin === MAccordionSkin.Plain || this.skin === MAccordionSkin.Default ? this.skin : MAccordionSkin.Default;
    }

    private get hasTitleSlot(): boolean {
        return !!this.$slots['title'] || !!this.$scopedSlots['title'];
    }

    private get hasSecondaryContentSlot(): boolean {
        return !!this.$slots['secondary-content'] || !!this.$scopedSlots['secondary-content'];
    }

    private openAllAccordions(): void {
        for (const id in this.accordions) {
            if (!this.accordions[id].propDisabled) {
                this.accordions[id].propOpen = true;
            }
        }
    }

    private onAccordionOpenChange(): void {
        this.updateToggleLinks();
        const openedIds: string[] = Object.keys(this.accordions).filter(
            id => this.accordions[id].propOpen
        );

        this.$emit('update:openedIds', openedIds);
    }

    @Watch('openedIds')
    private applyValuePropChange(val: string[]): void {
        for (const id in this.accordions) {
            this.accordions[id].propOpen =
                val.find(openedId => openedId === id) !== undefined;
        }
    }

    private accordionHasContent(id: string): boolean {
        return !!this.accordions[id].$slots.default ||
            (!!this.accordions[id].$scopedSlots.default && !!this.accordions[id].$scopedSlots.default!(undefined));
    }

    private updateToggleLinks(): void {
        this.updateIsAllOpen();
        this.updateIsAllClosed();
    }
}

const AccordionGroupPlugin: PluginObject<any> = {
    install(v): void {
        v.component(ACCORDION_GROUP_NAME, MAccordionGroup);
    }
};

export default AccordionGroupPlugin;

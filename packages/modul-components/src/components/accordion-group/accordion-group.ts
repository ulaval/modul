import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import AccordionPlugin, { AccordionGateway, AccordionGroupGateway, MAccordionSkin } from '../accordion/accordion';
import { ACCORDION_GROUP_NAME, I18N_NAME, LINK_NAME } from '../component-names';
import { MI18n } from '../i18n/i18n';
import { MLink, MLinkMode } from '../link/link';
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
        validator: value => Enums.toValueArray(MAccordionSkin).includes(value)
    })
    public readonly skin: MAccordionSkin;

    @Prop({
        default: false
    })
    public readonly concurrent!: boolean;

    @Prop({
        default: false
    })
    public readonly disabled!: boolean;

    @Prop()
    public readonly openedIds?: string[];

    @Prop({
        default: false
    })
    public readonly toggleLinkLeft!: boolean;

    @Prop({
        default: false
    })
    public readonly openAll!: boolean;

    public isAllOpen: boolean = false;
    public isAllClosed: boolean = false;
    public linkModeButton: MLinkMode = MLinkMode.Button;
    private accordions: { [id: string]: AccordionGateway } = {};

    @Emit('update:openedIds')
    public emitUpdateOpenedIds(openedIds: string[]): void {}

    @Watch('openedIds')
    public onOpenedIdsChange(openedIds: string[]): void {
        for (const id in this.accordions) {
            this.accordions[id].propOpen =
            openedIds.find(openedId => openedId === id) !== undefined;
        }
    }

    public get propSkin(): MAccordionSkin {
        return this.skin || MAccordionSkin.Default;
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

    public hasTitleSlot(): boolean {
        return !!this.$slots['title'] || !!this.$scopedSlots['title'];
    }

    public hasSecondaryContentSlot(): boolean {
        return Boolean(this.$slots['secondary-content']) || Boolean(this.$scopedSlots['secondary-content']);
    }

    public openAllAccordions(): void {
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

        this.emitUpdateOpenedIds(openedIds);
    }

    private updateToggleLinks(): void {
        this.updateIsAllOpen();
        this.updateIsAllClosed();
    }

    protected mounted(): void {
        this.updateToggleLinks();
    }

    protected updated(): void {
        this.updateToggleLinks();
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

    private accordionHasContent(id: string): boolean {
        return !!this.accordions[id].$slots.default ||
            (!!this.accordions[id].$scopedSlots.default && !!this.accordions[id].$scopedSlots.default!(undefined));
    }
}

const AccordionGroupPlugin: PluginObject<any> = {
    install(v): void {
        v.use(AccordionPlugin);
        v.component(ACCORDION_GROUP_NAME, MAccordionGroup);
    }
};

export default AccordionGroupPlugin;

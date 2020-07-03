
import { PluginObject } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { TABLE_EMPTY_ROW_NAME } from '../../component-names';
import { MTableEmptyArea } from '../responsive-table-commons';
import WithRender from './table-empty-row.html?style=./table-empty-row.scss';

@WithRender
@Component({
    components: {
        // MpoAucunContenu
    }
})
export class MTableEmptyRow extends ModulVue {
    @Prop({
        required: true
    })
    public readonly tableComponentWidth!: string;

    @Prop({
        required: false
    })
    public readonly waiting!: boolean;

    @Prop({
        required: true
    })
    public readonly currentScrollLeft!: number;

    @Prop({
        required: true
    })
    public readonly nbColumns!: number;

    @Prop()
    public readonly emptyArea?: MTableEmptyArea;

    @Prop({
        default: false
    })
    public readonly displayDefaultText!: boolean;

    @Emit('click-bouton')
    public emitClickBouton(_event: MouseEvent): void { }

    public get text(): string {
        if (this.waiting) {
            return '# Chargement en cours';
        }

        const text: string =
            this.emptyArea && this.emptyArea.text ? this.emptyArea.text : '';
        return !text && this.displayDefaultText
            ? '# Aucune donnée à afficher'
            : text;
    }

    public get iconName(): string {
        return this.emptyArea && this.emptyArea.iconName && !this.waiting
            ? this.emptyArea.iconName
            : '';
    }
}

const TableEmptyRowPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(TABLE_EMPTY_ROW_NAME, 'plugin.install');
        v.component(TABLE_EMPTY_ROW_NAME, MTableEmptyRow);
    }
};

export default TableEmptyRowPlugin;

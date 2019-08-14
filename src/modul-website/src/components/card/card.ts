import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulWebsite } from '../modul-website';
import WithRender from './card.html';
import './card.scss';

export enum MWCardDirections {
    Row = 'row',
    Column = 'column'
}

@WithRender
@Component
export class MWCard extends ModulWebsite {
    @Prop({
        default: MWCardDirections.Row,
        validator: value =>
            value === MWCardDirections.Row ||
            value === MWCardDirections.Column
    })
    public direction: MWCardDirections;
}

export const MWCARD_NAME: string = 'mw-card';

const MWCardPlugin: PluginObject<any> = {
    install(v, options) {
        v.component(MWCARD_NAME, MWCard);
    }
};

export default MWCardPlugin;

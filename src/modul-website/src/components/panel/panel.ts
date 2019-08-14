import { MediaQueries } from '@ulaval/modul-components/dist/mixins/media-queries/media-queries';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulWebsite } from '../modul-website';
import WithRender from './panel.html?style=./panel.scss';

@WithRender
@Component({
    mixins: [MediaQueries]
})
export class MWPanel extends ModulWebsite {
    @Prop({ default: false })
    public open: boolean;
}

export const MWPANEL_NAME: string = 'mw-panel';

const MWPanelPlugin: PluginObject<any> = {
    install(v, options) {
        v.component(MWPANEL_NAME, MWPanel);
    }
};

export default MWPanelPlugin;

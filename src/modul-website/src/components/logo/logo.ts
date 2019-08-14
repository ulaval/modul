import { MediaQueries } from '@ulaval/modul-components/dist/mixins/media-queries/media-queries';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulWebsite } from '../modul-website';
import WithRender from './logo.html?style=./logo.scss';
// import './logo.scss';

export enum MWLogoSize {
    Small = 'small',
    Large = 'large'
}

@WithRender
@Component({
    mixins: [MediaQueries]
})
export class MWLogo extends ModulWebsite {
    @Prop({
        default: MWLogoSize.Large,
        validator: value =>
            value === MWLogoSize.Small ||
            value === MWLogoSize.Large
    })
    public size: MWLogoSize;

    @Prop({
        default: false
    })
    public tagline: string;

}

export const MWLOGO_NAME: string = 'mw-logo';

const MWLogoPlugin: PluginObject<any> = {
    install(v, options) {
        v.component(MWLOGO_NAME, MWLogo);
    }
};

export default MWLogoPlugin;

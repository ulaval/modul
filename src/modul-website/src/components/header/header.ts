
import { ROUTER_COMPONENTS, ROUTER_PHILOSOPHY, ROUTER_STANDARDS } from '@/router';
import IconButtonPlugin from '@ulaval/modul-components/dist/components/icon-button/icon-button';
import { MediaQueries } from '@ulaval/modul-components/dist/mixins/media-queries/media-queries';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { ModulWebsite } from '../modul-website';
import WithRender from './header.html?style=./header.scss';

export enum ModulMenuSection {
    Home = 'home',
    Philosophy = 'philosophy',
    Components = 'components',
    Standards = 'standards'
}

@WithRender
@Component({
    mixins: [MediaQueries]
})
export class MWHeader extends ModulWebsite {

    @Prop({ default: false })
    public showLogo: boolean;

    openSearch: boolean = false;
    openMegaMenu: boolean = false;
    megaMenuType: string = '';

    @Emit('search')
    private onSearch(): void {
        this.openSearch = !this.openSearch;
    }

    public toggleMegaMenu(type: string): void {
        if (this.megaMenuType === type) {
            this.openMegaMenu = !this.openMegaMenu;
        } else {
            this.megaMenuType = type;
            this.openMegaMenu = true;
        }
    }

    get toggleSearch(): boolean {
        return this.openSearch;
    }

    get modulVersion(): string {
        return this.$meta.version;
    }

    private navigateTo(event: MouseEvent, menuSection: string) {
        switch (menuSection) {
            case ModulMenuSection.Home:
                this.$router.push('/');
                break;
            case ModulMenuSection.Components:
                this.$router.push(this.$routerIndex.for(ROUTER_COMPONENTS));
                break;
            case ModulMenuSection.Philosophy:
                this.$router.push(this.$routerIndex.for(ROUTER_PHILOSOPHY));
                break;
            case ModulMenuSection.Standards:
                this.$router.push(this.$routerIndex.for(ROUTER_STANDARDS));
                break;
            default:
                this.$router.push('/');
        }
    }

}

export const MWHEADER_NAME: string = 'mw-header';

const MWHeaderPlugin: PluginObject<any> = {
    install(v, options) {
        v.use(IconButtonPlugin);
        v.component(MWHEADER_NAME, MWHeader);
    }
};

export default MWHeaderPlugin;

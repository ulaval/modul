
import { ModulWebsite } from '@/components/modul-website';
import { MediaQueries, MediaQueriesMixin } from '@ulaval/modul-components/dist/mixins/media-queries/media-queries';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import WithRender from './expandable-panel.html';
import './expandable-panel.scss';

@WithRender
@Component({
    mixins: [MediaQueries]
})
export class MWExpandablePanel extends ModulWebsite {

    showMenu = false;

    mounted() {
        this.isMqMinMChanged(this.as<MediaQueriesMixin>().isMqMinM);
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
    }

    @Watch('isMqMinM')
    private isMqMinMChanged(value): void {
        this.showMenu = value;
    }

    public onSideMenuSelection() {
        if (this.showMenu && this.as<MediaQueriesMixin>().isMqMaxM) {
            this.showMenu = false;
        }
    }

}

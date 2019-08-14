
import ExpandableLayoutPlugin from '@ulaval/modul-components/dist/components/expandable-layout/expandable-layout';
import { MediaQueries, MediaQueriesMixin } from '@ulaval/modul-components/dist/mixins/media-queries/media-queries';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import Component from 'vue-class-component';
import { Vue, Watch } from 'vue-property-decorator';
import { RouteRecord } from 'vue-router';
import WithRender from './standards.html?style=./standards.scss';
Vue.use(ExpandableLayoutPlugin);

@WithRender
@Component({
    mixins: [MediaQueries]
})
export class MWStandardsPage extends ModulVue {

    showMenu = false;

    mounted() {
        this.isMqMinMChanged(this.as<MediaQueriesMixin>().isMqMinM);
    }

    @Watch('isMqMinM')
    private isMqMinMChanged(value): void {
        this.showMenu = value;
    }

    onSideMenuSelection() {
        if (this.showMenu && this.as<MediaQueriesMixin>().isMqMaxM) {
            this.showMenu = false;
        }
    }

    urlMatch(...args) {
        return this.$route.matched.map((record: RouteRecord) => record.name).some(name => args.indexOf(name) !== -1);

    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
    }
}

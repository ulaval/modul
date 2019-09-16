
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WithRender from './standards-ui-iconography.html?style=./standards-ui-iconography.scss';

@WithRender
@Component
export class MWStandardsUiIconographyPage extends ModulVue {

    @Prop()
    private markupFileName;

    markdown: string = null;

    mounted(): void {
        this.setMarkdown();
    }

    setMarkdown() {
        let url: string = `${__webpack_public_path__}content/${this.markupFileName}`;
        this.$http.execute({ method: 'get', rawUrl: url }).then((md) => {
            this.markdown = (md as any).data;
        });
    }

}


import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import WithRender from './markdown-page.html';

@WithRender
@Component
export class MWMarkdownPage extends ModulVue {

    markdown: string = null;

    mounted(): void {
        this.setMarkdown(this.$route.meta.markupFileName);
    }

    setMarkdown(markupFileName: string) {
        let url: string = `${__webpack_public_path__}content/${markupFileName}`;
        this.$http.execute({ method: 'get', rawUrl: url }).then((md) => {
            this.markdown = (md as any).data;
        });
    }

    @Watch('$route')
    private routeChanged(): void {
        this.setMarkdown(this.$route.meta.markupFileName);
    }

}

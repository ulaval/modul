import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WithRender from './markdown.html';
import './markdown.scss';

@WithRender
@Component
export class MMarkdown extends Vue {
    @Prop()
    public template: string;

    public options: any = {
        html: true,             // Enable HTML tags in source
        xhtmlOut: false,        // Use '/' to close single tags (<br />)
        breaks: false,          // Convert '\n' in paragraphs into <br>
        langPrefix: 'hl',  // CSS language prefix for fenced blocks
        linkify: false,         // autoconvert URL-like texts to links
        highlight: function(str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                console.log(`lang=${lang}`);
                try {
                    // return hljs.highlight(lang, str).value;
                    return `<pre class="hljs"><code class="hl${lang}">` +
                        hljs.highlight(lang, str, true).value +
                        '</code></pre>';
                } catch (__) { }
            }
            return ''; // use external default escaping
        }
    };

    private markdownIt: MarkdownIt = new MarkdownIt().set(this.options);

    private get propTemplate(): string {
        let result = '';
        if (this.template) {
            result = this.markdownIt.render(this.template);
        }
        return result;
    }
}

export const MARKDOWN_NAME: string = 'm-markdown';

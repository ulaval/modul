import Vue, { CreateElement, PluginObject, VNode, VNodeChildren, VNodeData, VueConstructor } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { ElementQueries } from '../../mixins/element-queries/element-queries';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { DYNAMIC_TEMPLATE_NAME, I18N_NAME, LIMIT_TEXT_NAME, LINK_NAME } from '../component-names';
import { MDynamicTemplate } from '../dynamic-template/dynamic-template';
import { MI18n } from '../i18n/i18n';
import { MLink, MLinkMode } from '../link/link';
import WithRender from './limit-text.html?style=./limit-text.scss';


@WithRender
@Component({
    components: {
        [I18N_NAME]: MI18n,
        [LINK_NAME]: MLink,
        [DYNAMIC_TEMPLATE_NAME]: MDynamicTemplate
    },
    mixins: [MediaQueries, ElementQueries]
})
export class MLimitText extends ModulVue {
    @Prop()
    public open: boolean;
    @Prop({ default: 4 })
    public lines: number;
    @Prop()
    public openLabel: string;
    @Prop()
    public closeLabel: string;
    @Prop()
    public html: string;

    private reduceContent: string = '';
    private testingContent: string = '';
    private fullContent: string = '';
    private internalOpen: boolean = false;
    private hasFinish: boolean = false;
    private contentTooTall: boolean = false;
    private child: Element;
    private el: HTMLElement;
    private initLineHeigh: any = '';
    private maxHeight: number = 0;
    private observer: MutationObserver;
    private uuid: string = uuid.generate();

    protected mounted(): void {
        this.internalOpen = this.open;
        // ------------ Resize section ------------
        this.$nextTick(() => {
            this.as<ElementQueries>().$on('resizeDone', this.reset);
        });
        // ---------------------------------------

        // ------------ Watch slot content -------
        this.observer = new MutationObserver(() => {
            this.reset();
        });
        this.observer.observe(this.$refs.originalText as HTMLElement, { subtree: true, childList: true, characterData: true });
        // ---------------------------------------

        this.initialize();
    }

    protected destroyed(): void {
        if (this.child) {
            this.child.removeEventListener('click', this.openText);
            this.child.removeEventListener('click', this.closeText);
        }
        this.observer.disconnect();
    }

    private initialize(): void {
        this.el = this.$refs.testingText as HTMLElement;
        if (this.el) {
            this.el.innerHTML = (this.$refs.originalText as HTMLElement).innerHTML;
            this.testingContent = this.el.innerHTML;
            this.el.style.whiteSpace = 'nowrap';
            for (let i: number = 1; i < this.el.children.length; i++) {
                (this.el.children[i] as HTMLElement).style.display = 'none';
            }
            this.initLineHeigh = this.el.clientHeight;
            for (let i: number = 1; i < this.el.children.length; i++) {
                (this.el.children[i] as HTMLElement).style.display = 'block';
            }
            this.el.style.whiteSpace = 'normal';
            this.maxHeight = this.lines * this.initLineHeigh;

            // Generate the full content - Add the close link if an HTML tag is present
            if (this.testingContent.match('</')) {
                let tagIndex: number = this.testingContent.lastIndexOf('</');
                this.fullContent = this.testingContent.substring(0, tagIndex) + this.closeLink + this.testingContent.substring(tagIndex);
            } else {
                this.fullContent = this.testingContent + this.closeLink;
            }
            // Get the limited text
            this.adjustText();
        }
    }

    private adjustText(): void {
        if (this.isContentTooTall(false)) {
            this.contentTooTall = true;
            this.hasFinish = false;
            this.getReduceContent();
            this.hasFinish = true;
        } else {
            this.contentTooTall = false;
            this.hasFinish = true;
        }
    }

    private isContentTooTall(update: boolean): boolean {
        if (update) { this.updateContent(this.reduceContent, this.el); }
        let currentHeight: number = (this.el).clientHeight;
        return (currentHeight > this.maxHeight);
    }

    private updateContent(content, el): void {
        el.innerHTML = content;
    }

    private reset(): void {
        this.hasFinish = false;
        this.reduceContent = '';
        this.testingContent = '';
        this.$nextTick(() => {
            this.initialize();
        });
    }

    private getReduceContent(): void {
        let HTMLcontent: string = this.fullContent;
        let index: number = 0;
        let lastValidContent: string = '';
        let closingTag: string = '';

        while (index < HTMLcontent.length && !this.isContentTooTall(true)) {
            if (HTMLcontent[index] === '<' && (index + 1) < HTMLcontent.length) {
                switch (true) {
                    // Opening tag
                    case /\w/.test(HTMLcontent[index + 1]):
                        let tag: string = '</';
                        index++;
                        let endTagName: boolean = false;
                        while (HTMLcontent[index] !== '>') {
                            if (!endTagName && /\w/.test(HTMLcontent[index])) {
                                tag += HTMLcontent[index];
                            } else {
                                endTagName = true;
                            }
                            index++;
                        }
                        tag += '>';
                        // Do not keep the tag if it is a "self closing" tag
                        if (!/<\/(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)>$/.test(tag)) {
                            closingTag = tag + closingTag;
                        }
                        break;
                    // Closing tag
                    case (HTMLcontent[index + 1] === '/'):
                        let endTag: string = '</';
                        index += 2;
                        while (HTMLcontent[index] !== '>') {
                            endTag += HTMLcontent[index];
                            index++;
                        }
                        endTag += '>';
                        closingTag = closingTag.slice(endTag.length);
                        break;
                }
            }
            lastValidContent = this.reduceContent;
            this.reduceContent = HTMLcontent.substring(0, index + 1) + this.openLinkOriginal + closingTag;
            index++;
        }
        this.reduceContent = lastValidContent.replace(this.openLinkOriginal, this.openLink);
    }

    private get getReduceText(): string {
        return this.reduceContent;
    }

    private get getFullText(): string {
        return this.fullContent;
    }

    private get openLinkOriginal(): string {
        return '...&nbsp' + new this.openLinkOriginalRendered().$mount().$el.outerHTML;
    }

    private get openLinkOriginalRendered(): VueConstructor<Vue> {
        const vNodeData: VNodeData = {
            props: {
                mode: MLinkMode.Button,
                underline: false
            },
            attrs: {
                style: 'font-weight:400;',
                title: this.getOpenLabelTitle,
                'data-id': this.uuid
            }
        };
        const vNodeChildren: VNodeChildren = '[' + (this.openLabel ? this.openLabel.replace(/\s/g, '\xa0') : '\xa0+\xa0') + ']';

        return Vue.extend({
            render(createElement: CreateElement): VNode {
                return createElement(LINK_NAME, vNodeData, vNodeChildren);
            }
        });
    }

    private get openLink(): string {
        return '...&nbsp' + new this.openLinkRendered().$mount().$el.outerHTML;
    }

    private get openLinkRendered(): VueConstructor<Vue> {
        const vNodeData: VNodeData = {
            props: {
                mode: MLinkMode.Button,
                underline: false
            },
            attrs: {
                title: this.getOpenLabelTitle,
                'data-id': this.uuid
            }
        };
        const vNodeChildren: VNodeChildren = '[' + (this.openLabel ? this.openLabel.replace(/\s/g, '\xa0') : '\xa0+\xa0') + ']';

        return Vue.extend({
            render(createElement: CreateElement): VNode {
                return createElement(LINK_NAME, vNodeData, vNodeChildren);
            }
        });
    }

    private get closeLink(): string {
        return '&nbsp;' + new this.closeLinkRendered().$mount().$el.outerHTML;
    }

    private get closeLinkRendered(): VueConstructor<Vue> {
        const vNodeData: VNodeData = {
            props: {
                mode: MLinkMode.Button,
                underline: false
            },
            attrs: {
                title: this.getCloseLabelTitle,
                'data-id': this.uuid
            }
        };
        const vNodeChildren: VNodeChildren = '[' + (this.closeLabel ? this.closeLabel.replace(/\s/g, '\xa0') : '\xa0-\xa0') + ']';

        return Vue.extend({
            render(createElement: CreateElement): VNode {
                return createElement(LINK_NAME, vNodeData, vNodeChildren);
            }
        });
    }

    private get getOpenLabelTitle(): string {
        return this.openLabel ? this.openLabel.replace(/\s/g, '\xa0') : this.$i18n.translate('m-limit-text:open');
    }

    private get getCloseLabelTitle(): string {
        return this.closeLabel ? this.closeLabel.replace(/\s/g, '\xa0') : this.$i18n.translate('m-limit-text:close');
    }

    @Watch('open')
    private openChanged(open: boolean): void {
        this.internalOpen = open;
    }

    private openText(event): void {
        this.internalOpen = true;
        this.$emit('open');
        event.preventDefault();
    }

    private closeText(event): void {
        this.internalOpen = false;
        this.$emit('close');
        event.preventDefault();
    }

    private onUpdatedOpen(component: Vue[]): void {
        const link: Element | null = component[0].$el.querySelector('a[data-id="' + this.uuid + '"]');

        if (this.child) {
            this.child.removeEventListener('click', this.openText);
        }

        if (link) {
            this.child = link;
            this.child.addEventListener('click', this.openText);
        }
    }

    private onUpdatedClose(component: Vue[]): void {
        const link: Element | null = component[0].$el.querySelector('a[data-id="' + this.uuid + '"]');

        if (this.child) {
            this.child.removeEventListener('click', this.closeText);
        }

        if (link) {
            this.child = link;
            this.child.addEventListener('click', this.closeText);
        }
    }
}

const LimitTextPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(LIMIT_TEXT_NAME, MLimitText);
    }
};

export default LimitTextPlugin;

import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { WYSIWYG_NAME } from '../component-names';
import WithRender from './wysiwyg.html?style=./wysiwyg.scss';

@WithRender
@Component
export class MWysiwyg extends Vue {
    public backColor = '#f1c40f';
    public foreColor = '#00000';

    public selectedText: string = '';
    public result: string = '';
    public count = 1;

    protected mounted(): void {
        setInterval(() => this.print(), 10);
    }

    public execCommand(command: string, value?: any): void {
        if (command === 'bold') {
            let el: HTMLElement = window.getSelection()!.focusNode!.parentElement!; // Get the element in question
            let pa: Node = el.parentNode!;

            if (el.localName === 'b' && el.firstChild) {
                pa.insertBefore(el.firstChild, el);
                pa.removeChild(el);
                pa.normalize();
            }
        }

        document.execCommand(command, false, value);
    }

    public link(): void {
        const url: string | null = prompt('Enter the URL');
        document.execCommand('createLink', false, url || undefined);
    }

    public print(): void {
        this.result = (this.$refs['body'] as HTMLElement).innerHTML;
    }

    updateSelectedText(): void {
        let text: string = '';

        if (window.getSelection()) {
            text = window.getSelection()!.toString();
        }

        this.selectedText = text;
    }

    placeCaretAfterNode(node: Node): void {
        const sel: Selection | null = window.getSelection();

        if (!sel) {
            return;
        }

        let range: Range = sel.getRangeAt(0);
        range.collapse(false);
        range.insertNode(node);
        range = range.cloneRange();
        range.selectNodeContents(node);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

const MWysiwygPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(WYSIWYG_NAME, 'plugin.install');
        v.component(WYSIWYG_NAME, MWysiwyg);
    }
};

export default MWysiwygPlugin;

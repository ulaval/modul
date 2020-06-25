// tslint:disable-next-line: import-blacklist
import { MButton } from '@ulaval/modul-components/dist/components/button/button';
import { BUTTON_NAME, MESSAGE_PAGE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import MessagePagePlugin, { Link } from '@ulaval/modul-components/dist/components/message-page/message-page';
import { MMessageState } from '@ulaval/modul-components/dist/components/message/message';
import PopupDirectivePlugin from '@ulaval/modul-components/dist/directives/popup/popup';
// tslint:disable-next-line: import-blacklist
import moment from 'moment';
import Vue, { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './message-page.sandbox.html';

@WithRender
@Component({
    components: {
        [BUTTON_NAME]: MButton
    }
})
export class MMessagePageSandbox extends Vue {
    errorType: MMessageState = MMessageState.Error;
    warningType: MMessageState = MMessageState.Warning;
    informationType: MMessageState = MMessageState.Information;
    title: string = 'My error title';
    oneHint: string[] = ['My only hint'];
    manyHints: string[] = ['My first hint', 'My second long hint.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas urna rhoncus ipsum congue lobortis. Mauris vel neque condimentum, dignissim lectus ac, vehicula justo. Aliquam nunc leo, tristique hendrerit aliquam sagittis, scelerisque quis libero. Integer non augue nec lacus aliquet porttitor in nec lacus. Cras ultrices tellus est, condimentum gravida orci pulvinar quis. Integer eget turpis arcu. Curabitur consequat porta urna, at hendrerit justo consectetur non. Aenean venenatis ornare nulla, a vulputate erat eleifend ut.'];
    oneLink: Link[] = [new Link('the only link', 'http://www.ulaval.ca')];
    manyLinks: Link[] = [new Link('the first link', 'http://www.ulaval.ca', true), new Link('the second link', 'http://www.google.com', true)];
    errorDate: moment.Moment = moment().subtract(moment.duration(2, 'days'));
    stackTrace: string = `(l1) This is a multiline stack
(l2) to be displayed
(l3) in the error page.`;
}

const MessagePageSandboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(PopupDirectivePlugin);
        v.use(MessagePagePlugin);
        v.component(`${MESSAGE_PAGE_NAME}-sandbox`, MMessagePageSandbox);
    }
};

export default MessagePageSandboxPlugin;

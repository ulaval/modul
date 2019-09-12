import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Model, Prop } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { SELECT_NAME } from '../component-names';
import I18nPlugin from '../i18n/i18n';
import { MBaseSelect } from './base-select/base-select';
import WithRender from './select.html?style=./select.scss';

const DROPDOWN_STYLE_TRANSITION: string = 'max-height 0.3s ease';
@WithRender
@Component({
    components: {
        MBaseSelect
    },
    mixins: [
        InputState,
        MediaQueries,
        InputManagement,
        InputWidth,
        InputLabel
    ]
})
export class MSelect extends ModulVue {

    @Model('input')
    @Prop()
    public value: any;

    @Prop()
    public options: any[];

    id: string = `${SELECT_NAME}-${uuid.generate()}`;
    open: boolean = false;

    get hasItems(): boolean {
        return this.options && this.options.length > 0;
    }

    get isEmpty(): boolean {
        return this.as<InputManagement>().hasValue || (this.open) ? false : true;
    }

    onSelect(option: any, index: number): void {
        // tslint:disable-next-line: no-console
        console.log(`selected ${JSON.stringify(option)} index = ${index}`);
        this.as<InputManagement>().model = this.options[index];
    }

    get selectedItems(): any {
        if (this.value) {
            return [this.value];
        }
        return [];
    }


    // transitionEnter(el: HTMLElement, done: any): void {
    //     this.$nextTick(() => {

    //         if (this.as<MediaQueriesMixin>().isMqMinS) {
    //             let height: number = el.clientHeight;

    //             el.style.transition = DROPDOWN_STYLE_TRANSITION;
    //             el.style.overflowY = 'hidden';
    //             el.style.maxHeight = '0';

    //             requestAnimationFrame(() => {
    //                 el.style.maxHeight = height + 'px';
    //                 done();
    //             });
    //         } else {
    //             done();
    //         }

    //     });
    // }

    // transitionLeave(el: HTMLElement, done: any): void {
    //     this.$nextTick(() => {
    //         if (this.as<MediaQueriesMixin>().isMqMinS) {
    //             let height: number = el.clientHeight;

    //             el.style.maxHeight = height + 'px';
    //             el.style.maxHeight = '0';

    //             setTimeout(() => {
    //                 el.style.maxHeight = 'none';
    //                 done();
    //             }, 300);
    //         } else {
    //             done();
    //         }
    //     });
    // }

}

const SelectPlugin: PluginObject<any> = {
    install(v, options): void {
        Vue.use(I18nPlugin);
        v.component(SELECT_NAME, MSelect);
    }
};

export default SelectPlugin;

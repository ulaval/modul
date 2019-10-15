import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import { renderComponent } from '../../../tests/helpers/render';
import MWysiwygPlugin, { MWysiwyg } from './wysiwyg';

describe('Wysiwyg', () => {
    beforeEach(() => {
        Vue.use(MWysiwygPlugin);
    });
    it('should render correctly', () => {
        const component: Wrapper<MWysiwyg> = mount(MWysiwyg, {
            localVue: Vue
        });

        return expect(renderComponent(component.vm)).resolves.toMatchSnapshot();
    });
});

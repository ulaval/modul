import { mount, Wrapper } from '@vue/test-utils';
import Vue, { VueConstructor } from 'vue';
import PlusPlugin, { MPlus } from './plus';


describe('MPlus', () => {
    let localVue: VueConstructor<Vue>;
    beforeEach(() => {
        Vue.use(PlusPlugin);
    });

    it('should render correctly with open prop', () => {
        const component: Wrapper<MPlus> = mount(MPlus, {
            localVue: localVue,
            propsData: {
                open: true
            }
        });
        expect(component.classes()).toContain('m--is-open');
    });

    it('should render correctly with large prop', () => {
        const component: Wrapper<MPlus> = mount(MPlus, {
            localVue: localVue,
            propsData: {
                large: true
            }
        });
        expect(component.classes()).toContain('m--is-large');

    });
    it('should render correctly with border prop', () => {
        const component: Wrapper<MPlus> = mount(MPlus, {
            localVue: localVue,
            propsData: {
                border: true
            }
        });
        expect(component.classes()).toContain('m--has-border');

    });

    it('should render correctly with disabled prop', () => {
        const component: Wrapper<MPlus> = mount(MPlus, {
            localVue: localVue,
            propsData: {
                disabled: true
            }
        });
        expect(component.classes()).toContain('m--is-disabled');

    });

    it('should render correctly with skin prop light', () => {
        const component: Wrapper<MPlus> = mount(MPlus, {
            localVue: localVue,
            propsData: {
                skin: 'light'
            }
        });

        expect(component.classes()).toContain('m--is-skin-light');
    });

    it('should emit click event when m-plus is clicked on', () => {
        const component: Wrapper<MPlus> = mount(MPlus, {
            localVue: localVue
        });

        component.trigger('click');

        expect(component.emitted('click'));
    });
});

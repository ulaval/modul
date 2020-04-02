import { RefSelector, shallowMount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import InputStylePlugin, { MInputStyle } from './input-style';

const ROOT: RefSelector = { ref: 'root' };
const CSSLABELUP: string = 'm--is-label-up';
const CSSCURSOR: string = 'm--has-cursor-pointer';

let wrapper: Wrapper<MInputStyle>;

describe('MInputStyle', () => {
    beforeEach(() => {
        Vue.use(InputStylePlugin);
        wrapper = shallowMount(MInputStyle, {
            slots: {
                default: '<input ref="input" type="text"/>'
            }
        });
    });

    describe('In ready only Mode', () => {
        beforeEach(() => {
            wrapper.setProps({
                readonly: true
            });
        });
        it('label should not move on click', () => {

            wrapper.find(ROOT).trigger('click');

            expect(wrapper.vm.isLabelUp).toBeFalsy();
            expect(wrapper.classes()).not.toContain(CSSLABELUP);
        });
    });

    describe('show pointer cursor', () => {
        beforeEach(() => {
            wrapper.setProps({
                cursorPointer: true
            });
        });
        it('css cursor class should be present', () => {
            expect(wrapper.classes()).toContain(CSSCURSOR);
        });
    });
});

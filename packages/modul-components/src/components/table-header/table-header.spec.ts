import { RefSelector, shallowMount, Wrapper } from '@vue/test-utils';
import { TABLE_HEADER_NAME } from '../component-names';
import { MTableHeader } from './table-header';

const ADD_BTN_LABEL: string = 'ADD BUTTON';

const REF_ADD_BTN: RefSelector = { ref: 'addBtn' };

let slots: any = {};
const SLOT_LEFT: string = '<div>SLOT LEFT</div>';
const SLOT_RIGHT: string = '<div>SLOT RIGHT</div>';

let wrapper: Wrapper<MTableHeader>;

const initializeShallowWrapper: any = () => {
    wrapper = shallowMount(MTableHeader, {
        slots
    });
};

describe(TABLE_HEADER_NAME, () => {
    beforeEach(() => {
        initializeShallowWrapper();
    });

    it(`Should have an empty add button label`, () => {
        expect(wrapper.props().addBtnLabel).toBeUndefined();
    });

    describe(`Given a add button label`, () => {
        beforeEach(() => {
            initializeShallowWrapper();
            wrapper.setProps({ addBtnLabel: ADD_BTN_LABEL });
        });

        it(`Should render add button with label from prop`, () => {
            expect(wrapper.find(REF_ADD_BTN).text()).toBe(ADD_BTN_LABEL);
        });

        it(`Should emit "add" event when clicked`, () => {
            wrapper.find(REF_ADD_BTN).vm.$emit('click');

            expect(wrapper.emitted('add')).toBeTruthy();
        });
    });



});

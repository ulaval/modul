import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import { renderComponent } from '../../../../tests/helpers/render';
import uuid from '../../../utils/uuid/uuid';
import { CHIP_ADD_NAME } from '../../component-names';
import MChipAdd from './chip-add';
(uuid.generate as jest.Mock).mockReturnValue('uuid');

describe('Chip add', () => {
    beforeEach(() => {
        Vue.component(CHIP_ADD_NAME, MChipAdd);
    });
    it('should render correctly', () => {
        const component: Wrapper<MChipAdd> = mount(MChipAdd, {
            localVue: Vue
        });

        return expect(renderComponent(component.vm)).resolves.toMatchSnapshot();
    });
});

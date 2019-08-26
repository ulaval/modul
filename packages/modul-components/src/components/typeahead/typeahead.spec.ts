import { shallowMount, Wrapper } from '@vue/test-utils';
import { renderComponent } from '../../../tests/helpers/render';
import { MTypeahead } from './typeahead';

let wrapper: Wrapper<MTypeahead>;

const initializeWrapper: () => Wrapper<MTypeahead> = () => {
    wrapper = shallowMount(MTypeahead);
    return wrapper;
};

beforeEach(() => {
    initializeWrapper();
});

describe(`m-autocomplete-textfield`, () => {
    it(`should render correctly`, () => {
        expect(renderComponent(wrapper.vm)).resolves.toMatchSnapshot();
    });
});

import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import Vue, { VueConstructor } from 'vue';
import { addMessages } from '../../../tests/helpers/lang';
import ListItemPlugin, { MListItem } from './list-item';


describe('MListItem', () => {
    let localVue: VueConstructor<Vue>;
    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(ListItemPlugin);
        addMessages(localVue, ['components/list-item/list-item.lang.en.json']);
    });

    it('should emit click event when icon is clicked', () => {
        const li: Wrapper<MListItem> = mount(MListItem, {
            localVue: localVue,
            propsData: {
                iconName: 'chip-error',
                iconHiddenText: 'delete'
            }
        });

        li.find('button').trigger('click');

        expect(li.emitted('click')).toBeTruthy();
    });
});

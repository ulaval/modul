import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import Vue, { VueConstructor } from 'vue';
import { addMessages } from '../../../tests/helpers/lang';
import { renderComponent } from '../../../tests/helpers/render';
import MessagePlugin, { MMessage } from './message';


describe('MMessage', () => {
    let localVue: VueConstructor<Vue>;

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(MessagePlugin);
        addMessages(localVue, ['components/message/message.lang.en.json']);
    });





    it('should render nothing if not visible', () => {
        const msg: Wrapper<MMessage> = mount(MMessage, {
            localVue: localVue,
            propsData: {
                visible: false
            }
        });

        return expect(renderComponent(msg.vm)).resolves.toEqual('');
    });







    it('should render nothing after close button is clicked', async () => {
        const msg: Wrapper<MMessage> = mount(MMessage, {
            localVue: localVue,
            propsData: {
                closeButton: true
            }
        });

        msg.find('button').trigger('click');
        return expect(renderComponent(msg.vm)).resolves.toEqual('');
    });

    it('should emit close event when close button is clicked', () => {
        const msg: Wrapper<MMessage> = mount(MMessage, {
            localVue: localVue,
            propsData: {
                closeButton: true
            }
        });

        msg.find('button').trigger('click');

        expect(msg.emitted('close')).toBeTruthy();
    });
});

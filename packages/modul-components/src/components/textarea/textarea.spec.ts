import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import { renderComponent } from '../../../tests/helpers/render';
import TextareaPlugin from '../../components/textarea/textarea';
import uuid from '../../utils/uuid/uuid';
import { MTextarea } from './textarea';


jest.mock('../../utils/uuid/uuid');
(uuid.generate as jest.Mock).mockReturnValue('uuid');

// Pour mocker la valeur de offsetWidth pour s'échapper de la condition infinie du ResizeSensor invisible dans la fonction reset
beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 500 });
});

// Pour revenir à la valeur initiale 0
afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 0 });
});

describe('MTextArea', () => {
    beforeEach(() => {
        Vue.use(TextareaPlugin);
    });

    it('should render correctly', () => {
        const txtarea: Wrapper<MTextarea> = mount(MTextarea);

        return expect(renderComponent(txtarea.vm)).resolves.toMatchSnapshot();
    });

    describe('max-length', () => {
        it('should render correctly state when text length is lesser than max length', () => {
            const txtarea: Wrapper<MTextarea> = mount(MTextarea, {
                propsData: {
                    maxLength: 8,
                    value: '1'
                }
            });

            return expect(
                renderComponent(txtarea.vm)
            ).resolves.toMatchSnapshot();
        });

        it('should render invalid state when text length is greater than max length', () => {
            const txtarea: Wrapper<MTextarea> = mount(MTextarea, {
                propsData: {
                    maxLength: 8,
                    value: '123456789'
                }
            });

            return expect(
                renderComponent(txtarea.vm)
            ).resolves.toMatchSnapshot();
        });
    });
});

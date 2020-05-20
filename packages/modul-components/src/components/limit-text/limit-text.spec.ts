import { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import Vue, { VueConstructor } from 'vue';
import { getDefaultMock } from '../../../tests/helpers/mock';
import { renderComponent } from '../../../tests/helpers/render';
import LimitTextPlugin, { MLimitText } from './limit-text';

// Pour mocker la valeur de offsetWidth pour s'échapper de la condition infinie du ResizeSensor invisible dans la fonction reset
beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 500 });
});

// Pour revenir à la valeur initiale 0
afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 0 });
});

describe('limit-text', () => {
    let localVue: VueConstructor<Vue>;
    let wrapper: Wrapper<MLimitText>;

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(LimitTextPlugin);
        wrapper = mount(MLimitText, {
            mocks: getDefaultMock(),
            localVue: localVue,
            propsData: {
                lines: 2
            },
            slots: {
                default: 'Deserunt ad amet sint in esse aute. Ut est cupidatat mollit ipsum aliqua nostrud. Proident aliqua anim tempor ut excepteur tempor ipsum qui eu. Anim culpa voluptate occaecat veniam amet reprehenderit irure.Culpa laborum ullamco sint quis exercitation amet ad est sunt commodo. Eiusmod sint minim eu id consequat esse veniam. Ullamco labore do sit sit commodo. Deserunt ad amet sint in esse aute. Ut est cupidatat mollit ipsum aliqua nostrud. Proident aliqua anim tempor ut excepteur tempor ipsum qui eu. Anim culpa voluptate occaecat veniam amet reprehenderit irure.Culpa laborum ullamco sint quis exercitation amet ad est sunt commodo. Eiusmod sint minim eu id consequat esse veniam. Ullamco labore do sit sit commodo. Deserunt ad amet sint in esse aute. Ut est cupidatat mollit ipsum aliqua nostrud. Proident aliqua anim tempor ut excepteur tempor ipsum qui eu. Anim culpa voluptate occaecat veniam amet reprehenderit irure.Culpa laborum ullamco sint quis exercitation amet ad est sunt commodo. Eiusmod sint minim eu id consequat esse veniam. Ullamco labore do sit sit commodo. Deserunt ad amet sint in esse aute. Ut est cupidatat mollit ipsum aliqua nostrud. Proident aliqua anim tempor ut excepteur tempor ipsum qui eu. Anim culpa voluptate occaecat veniam amet reprehenderit irure.Culpa laborum ullamco sint quis exercitation amet ad est sunt commodo. Eiusmod sint minim eu id consequat esse veniam. Ullamco labore do sit sit commodo. Deserunt ad amet sint in esse aute. Ut est cupidatat mollit ipsum aliqua nostrud. Proident aliqua anim tempor ut excepteur tempor ipsum qui eu. Anim culpa voluptate occaecat veniam amet reprehenderit irure.Culpa laborum ullamco sint quis exercitation amet ad est sunt commodo. Eiusmod sint minim eu id consequat esse veniam. Ullamco labore do sit sit commodo. Deserunt ad amet sint in esse aute. Ut est cupidatat mollit ipsum aliqua nostrud. Proident aliqua anim tempor ut excepteur tempor ipsum qui eu. Anim culpa voluptate occaecat veniam amet reprehenderit irure.Culpa laborum ullamco sint quis exercitation amet ad est sunt commodo. Eiusmod sint minim eu id consequat esse veniam. Ullamco labore do sit sit commodo. Deserunt ad amet sint in esse aute. Ut est cupidatat mollit ipsum aliqua nostrud. Proident aliqua anim tempor ut excepteur tempor ipsum qui eu. Anim culpa voluptate occaecat veniam amet reprehenderit irure.Culpa laborum ullamco sint quis exercitation amet ad est sunt commodo. Eiusmod sint minim eu id consequat esse veniam. Ullamco labore do sit sit commodo.'
            }
        });
    });

    it('should render correctly', async () => {
        Vue.nextTick();
        return expect(renderComponent(wrapper.vm)).resolves.toMatchSnapshot();
    });
});

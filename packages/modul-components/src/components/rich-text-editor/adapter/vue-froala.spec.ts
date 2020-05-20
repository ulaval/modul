import { mount, Wrapper } from '@vue/test-utils';
import { VueFroala } from './vue-froala';

let wrapper: Wrapper<VueFroala>;
let froala: any;

// Pour mocker la valeur de offsetWidth pour s'échapper de la condition infinie du ResizeSensor invisible dans la fonction reset
beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 500 });
});

// Pour revenir à la valeur initiale 0
afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 0 });
});

describe('VueFroala', () => {
    beforeEach(() => {
        wrapper = mount(VueFroala);
        froala = wrapper.vm;
    });

    it('should be empty', () => {
        expect(froala.isEmpty).toBeTruthy();
    });
});

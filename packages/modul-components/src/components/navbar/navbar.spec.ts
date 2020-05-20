import { createLocalVue, mount, Wrapper, WrapperArray } from '@vue/test-utils';
import Vue, { VueConstructor } from 'vue';
import ModulPlugin from '../../utils/modul/modul';
import NavbarPlugin from './navbar';
import { MNavbarItem } from './navbar-item/navbar-item';

// Pour mocker la valeur de offsetWidth pour s'échapper de la condition infinie du ResizeSensor invisible dans la fonction reset
beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 500 });
});

// Pour revenir à la valeur initiale 0
afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 0 });
});

describe('MNavbar', () => {
    let localVue: VueConstructor<Vue>;

    beforeEach(() => {
        Vue.use(ModulPlugin);
        localVue = createLocalVue();
        localVue.use(NavbarPlugin);
    });

    it('should select the child value passed by the props', () => {
        const wrapper: Wrapper<Vue> = mount({
            template: `
                <m-navbar selected='item2'>
                    <m-navbar-item value="item1"></m-navbar-item>
                    <m-navbar-item value="item2"></m-navbar-item>
                    <m-navbar-item value="item3"></m-navbar-item>
                </m-navbar>` },
            { localVue: localVue });

        const selectedItem: WrapperArray<MNavbarItem> = wrapper.findAll<MNavbarItem>({ name: 'MNavbarItem' });
        expect(selectedItem.at(0).vm.isSelected).toEqual(false);
        expect(selectedItem.at(1).vm.isSelected).toEqual(true);
        expect(selectedItem.at(2).vm.isSelected).toEqual(false);
    });
});

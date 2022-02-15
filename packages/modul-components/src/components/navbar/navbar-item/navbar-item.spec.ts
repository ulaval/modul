import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Vue, { VueConstructor } from 'vue';
import '../../../../tests/helpers/mock-resizeSensor';
import ModulPlugin from '../../../utils/modul/modul';
import { BaseNavbar } from '../../navbar/navbar';
import { MNavbarItem } from './navbar-item';
import NavbarItemHelper from './navbar-item-helper';

let mockIsRouterLinkActive: boolean = false;

jest.mock('./navbar-item-helper', () => ({
    isRouterLinkActive: jest.fn(() => mockIsRouterLinkActive)
}));

class MockedMNavbar extends BaseNavbar {

    public autoSelect: boolean = false;

    updateValue(value: string): void {
        return;
    }

}

describe('MNavbarItem', () => {
    let wrapper: Wrapper<MNavbarItem>;
    let parentNavbar: MockedMNavbar = new MockedMNavbar();
    let localVue: VueConstructor<Vue>;
    beforeEach(() => {
        mockIsRouterLinkActive = false;
        Vue.use(ModulPlugin);
        localVue = createLocalVue();
        //  parentNavbar = shallowMount(MNavbar);
    });

    const initializeWrapper: (initialPropValues: any)
        => Wrapper<MNavbarItem> = (initialPropValues: any = {}) => {
            document.querySelector = () => true;
            wrapper = shallowMount(MNavbarItem, {
                methods: {
                    getParent(): BaseNavbar {
                        return parentNavbar;
                    }
                },
                propsData: initialPropValues
            });

            return wrapper;
        };

    const defaultSlot: any = {
        default: `navbar item content`
    };

    describe('given parent Navbar has autoselect set to true', () => {
        beforeEach(() => {
            parentNavbar.autoSelect = true;
        });

        it('should set parentNavbar value if current item is router-link-active', () => {
            mockIsRouterLinkActive = true;
            jest.spyOn(parentNavbar, 'updateValue');
            jest.spyOn(NavbarItemHelper, 'isRouterLinkActive');

            initializeWrapper({ value: 'someValue' });

            expect(NavbarItemHelper.isRouterLinkActive).toHaveBeenCalledWith(wrapper.vm);
            expect(parentNavbar.updateValue).toHaveBeenCalledWith('someValue');
        });

        it('should not set parentNavbar value if current item is not router-link-active', () => {
            mockIsRouterLinkActive = false;
            jest.spyOn(parentNavbar, 'updateValue');
            jest.spyOn(NavbarItemHelper, 'isRouterLinkActive');

            initializeWrapper({ value: 'someValue' });

            expect(NavbarItemHelper.isRouterLinkActive).toHaveBeenCalledWith(wrapper.vm);
            expect(parentNavbar.updateValue).not.toHaveBeenCalled();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });

    describe('given parent Navbar has autoselect set to false', () => {
        beforeEach(() => {
            parentNavbar.autoSelect = false;
        });

        it('should not set parentNavbar value if current item is router-link-active', () => {
            mockIsRouterLinkActive = true;
            jest.spyOn(parentNavbar, 'updateValue');
            jest.spyOn(NavbarItemHelper, 'isRouterLinkActive');

            initializeWrapper({ value: 'someValue' });

            expect(NavbarItemHelper.isRouterLinkActive).not.toHaveBeenCalledWith(wrapper.vm);
            expect(parentNavbar.updateValue).not.toHaveBeenCalled();
        });

        it('should not set parentNavbar value if current item is not router-link-active 2', () => {
            mockIsRouterLinkActive = false;
            jest.spyOn(parentNavbar, 'updateValue');
            jest.spyOn(NavbarItemHelper, 'isRouterLinkActive');

            initializeWrapper({ value: 'someValue' });

            expect(NavbarItemHelper.isRouterLinkActive).not.toHaveBeenCalledWith(wrapper.vm);
            expect(parentNavbar.updateValue).not.toHaveBeenCalled();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
    });
});

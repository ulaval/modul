import { MMenuItem } from './menu-item';

export class MMenuItemHelper {
    isRouterLinkActive(menuItem: MMenuItem): boolean {
        return !!menuItem.$el.querySelector('.router-link-exact-active');
    }
}

export default new MMenuItemHelper();

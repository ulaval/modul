import Vue, { DirectiveOptions, PluginObject, VNode, VNodeDirective, VueConstructor } from 'vue';
import { ModulIconName } from '../../assets/icons/modul-icons';
import { SVG_NAME } from '../../components/component-names';
import { BADGE_NAME } from '../directive-names';

// Icon state
export enum MBadgeState {
    Completed = 'completed',
    Error = 'error',
    Warning = 'warning'
}

type BadgeIcon = {
    [key: string]: string
};

const COLOR_COMPLETED: string = '#00c77f';
const COLOR_ERROR: string = '#e30513';
const COLOR_WARNING: string = '#ffc103';

const DEFAULT_ORIGIN: string[] = ['23.5', '23.5'];

const BADGE_ICON: BadgeIcon = {
    [MBadgeState.Completed]: ModulIconName.CompletedFilled,
    [MBadgeState.Error]: ModulIconName.ErrorFilled,
    [MBadgeState.Warning]: ModulIconName.WarningFilled
};

const BADGE_COLOR: BadgeIcon = {
    [MBadgeState.Completed]: COLOR_COMPLETED,
    [MBadgeState.Error]: COLOR_ERROR,
    [MBadgeState.Warning]: COLOR_WARNING
};

const getBadgeOrigin: (element: HTMLElement) => String[] = (element: HTMLElement) => {
    if (element && element.dataset && element.dataset.badgeOrigin) {
        return element.dataset.badgeOrigin.split(',');
    } else {
        return DEFAULT_ORIGIN;
    }
};

interface BadgeOffset {
    x: number;
    y: number;
}
const getBadgeOffset: (binding: VNodeDirective) => BadgeOffset = (binding: VNodeDirective) => {
    return {
        x: binding.value.offsetX !== undefined ? parseInt(binding.value.offsetX, 10) : 0,
        y: binding.value.offsetY !== undefined ? parseInt(binding.value.offsetY, 10) : 0
    };
};

interface BadgePosition {
    size: number;
    leftDistance: number;
    topDistance: number;
}
const getBadgePosition: (element: HTMLElement, binding: VNodeDirective, vnode: VNode) => BadgePosition = (element: HTMLElement, binding: VNodeDirective, vnode: VNode) => {
    const badgeOrigin: String[] = getBadgeOrigin(element);
    const badgeOffset: BadgeOffset = getBadgeOffset(binding);

    const elSize: number = element.clientWidth;
    let badgeSize: number = elSize * (1 / 3);

    if (badgeSize >= 16) {
        badgeSize = 16;
    } else if (badgeSize <= 14) {
        badgeSize = 14;
    }

    const elLeftOrigin: number = Number(parseFloat(badgeOrigin[0].replace(/,/g, '.')).toFixed(2));
    const elTopOrigin: number = Number(parseFloat(badgeOrigin[1].replace(/,/g, '.')).toFixed(2));

    const leftDistance: number = elLeftOrigin - (badgeSize * 0.5) + badgeOffset.x;
    const topDistance: number = elTopOrigin - (badgeSize * (2 / 3)) + badgeOffset.y;

    return { size: badgeSize, leftDistance, topDistance };
};

const buildBadge: (element, binding, vnode) => void = (element, binding, vnode) => {
    element.style.overflow = 'visible';

    let badge: BadgePosition = getBadgePosition(element, binding, vnode);

    const MyComponent: VueConstructor<Vue> = Vue.extend({
        template: `<${SVG_NAME}
                        :name="'${BADGE_ICON[binding.value.state]}'"
                        width="${badge.size}px"
                        height="${badge.size}px"
                        :x="${badge.leftDistance}"
                        :y="${badge.topDistance}" />`
    });

    Vue.nextTick(() => {
        const component: Vue = new MyComponent().$mount();
        (component.$el as HTMLElement).style.color = BADGE_COLOR[binding.value.state];
        element.appendChild(component.$el);
    });
};

const MBadgeDirective: DirectiveOptions = {
    inserted(
        element: HTMLElement,
        binding: VNodeDirective,
        vnode: VNode
    ): void {
        if (binding.value.state !== undefined && binding.value.state !== '') {
            buildBadge(element, binding, vnode);
        }
    },
    update(
        element: HTMLElement,
        binding: VNodeDirective,
        vnode: VNode
    ): void {
        if (element
            && element.children
            && element.children[element.children.length - 1] !== undefined
            && element.children[element.children.length - 1].classList.contains('m-icon')) {
            element.removeChild(element.children[element.children.length - 1]);
        }
        if (binding.value.state !== undefined && binding.value.state !== '') {
            buildBadge(element, binding, vnode);
        }
    },
    unbind(
        element: HTMLElement
    ): void {
        if (element
            && element.children
            && element.children[element.children.length - 1] !== undefined) {
            element.removeChild(element.children[element.children.length - 1]);
        }
    }
};

const BadgePlugin: PluginObject<any> = {
    install(v, options): void {
        v.directive(BADGE_NAME, MBadgeDirective);
    }
};

export default BadgePlugin;

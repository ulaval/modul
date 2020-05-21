
import MSvgAddCircleFilled from '@ulaval/modul-components/dist/assets/icons/svg/add-circle-filled.svg';
import MSvgAddCircle from '@ulaval/modul-components/dist/assets/icons/svg/add-circle.svg';
import MSvgArrowDown from '@ulaval/modul-components/dist/assets/icons/svg/arrow--down.svg';
import MSvgArrowLeft from '@ulaval/modul-components/dist/assets/icons/svg/arrow--left.svg';
import MSvgArrowRight from '@ulaval/modul-components/dist/assets/icons/svg/arrow--right.svg';
import MSvgArrowUp from '@ulaval/modul-components/dist/assets/icons/svg/arrow--up.svg';
import MSvgArrowButtonDown from '@ulaval/modul-components/dist/assets/icons/svg/arrow-button--down.svg';
import MSvgArrowButtonLeft from '@ulaval/modul-components/dist/assets/icons/svg/arrow-button--left.svg';
import MSvgArrowButtonRight from '@ulaval/modul-components/dist/assets/icons/svg/arrow-button--right.svg';
import MSvgArrowButtonUp from '@ulaval/modul-components/dist/assets/icons/svg/arrow-button--up.svg';
import MSvgClock from '@ulaval/modul-components/dist/assets/icons/svg/clock.svg';
import MSvgLock from '@ulaval/modul-components/dist/assets/icons/svg/lock.svg';
import MSvgProfile from '@ulaval/modul-components/dist/assets/icons/svg/profile.svg';
import { ModulIconName } from '@ulaval/modul-components/dist/utils/modul-icons/modul-icons';
import { SvgSpriteService } from '@ulaval/modul-components/dist/utils/svg/svg-sprite';
import Vue from 'vue';

export const importAllSvg: () => void = () => {
    const svg: SvgSpriteService = Vue.prototype.$svgSprite;
    svg.addSvg(ModulIconName.AddCircleFilled, MSvgAddCircleFilled);
    svg.addSvg(ModulIconName.AddCircle, MSvgAddCircle);
    svg.addSvg(ModulIconName.ArrowDown, MSvgArrowDown);
    svg.addSvg(ModulIconName.ArrowLeft, MSvgArrowLeft);
    svg.addSvg(ModulIconName.ArrowRight, MSvgArrowRight);
    svg.addSvg(ModulIconName.ArrowUp, MSvgArrowUp);
    svg.addSvg(ModulIconName.ArrowButtonDown, MSvgArrowButtonDown);
    svg.addSvg(ModulIconName.ArrowButtonRight, MSvgArrowButtonRight);
    svg.addSvg(ModulIconName.ArrowButtonLeft, MSvgArrowButtonLeft);
    svg.addSvg(ModulIconName.ArrowButtonUp, MSvgArrowButtonUp);
    svg.addSvg(ModulIconName.Clock, MSvgClock);
    svg.addSvg(ModulIconName.Lock, MSvgLock);
    svg.addSvg(ModulIconName.Profile, MSvgProfile);
};

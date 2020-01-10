import { polyfill } from 'mobile-drag-drop';
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour';

export const dragDropDelay: number = 500;

export const polyFillActive: { dragDrop: boolean } = {
    dragDrop: false
};

// Polyfill for drag and drop on mobile.
polyFillActive.dragDrop = polyfill({
    holdToDrag: dragDropDelay,
    dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
    iterationInterval: 50,
    dragImageCenterOnTouch: true
});

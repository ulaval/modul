import { polyfill } from 'mobile-drag-drop';
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour';
import { PluginObject } from 'vue';
import DraggablePlugin from './draggable/draggable';
import DraggableAllowScrollPlugin from './draggable/draggable-allow-scroll';
import DroppablePlugin from './droppable/droppable';
import DroppableGroupPlugin from './droppable/droppable-group';

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


const DragAndDropPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(DraggablePlugin);
        v.use(DraggableAllowScrollPlugin);
        v.use(DroppablePlugin);
        v.use(DroppableGroupPlugin);
    }
};

export default DragAndDropPlugin;

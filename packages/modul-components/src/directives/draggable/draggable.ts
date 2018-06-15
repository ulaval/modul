import { DirectiveOptions, PluginObject, VNode, VNodeDirective } from 'vue';

import { dragDropDelay, polyFillActive } from '../../utils/polyfills';
import { clearUserSelection } from '../../utils/selection/selection';
import { dispatchEvent, getVNodeAttributeValue } from '../../utils/vue/directive';
import { DRAGGABLE_NAME } from '../directive-names';
import { MDOMPlugin, MElementDomPlugin, MountFunction, RefreshFunction } from '../domPlugin';
import { MDroppable } from '../droppable/droppable';
import { MSortable } from '../sortable/sortable';
import RemoveUserSelectPlugin, { MRemoveUserSelect } from '../user-select/remove-user-select';
import { MDraggableAllowScroll } from './draggable-allow-scroll';

export enum MDraggableClassNames {
    DragImage = 'dragImage',
    Draggable = 'm--is-draggable',
    Dragging = 'm--is-dragging',
    Grabbing = 'm--is-grabbing'
}

export interface MDraggableOptions {
    canDrag?: boolean;
    action: string;
    dragData: any;
    grouping?: any;
}

export interface MDragInfo {
    action: string;
    grouping?: string;
    data: any;
}

export interface MDragEvent extends DragEvent {
    dragInfo: MDragInfo;
}

export enum MDraggableEventNames {
    OnDragStart = 'draggable:dragstart',
    OnDragEnd = 'draggable:dragend'
}

const DEFAULT_ACTION: string = 'any';
export class MDraggable extends MElementDomPlugin<MDraggableOptions> {
    public static defaultMountPoint: string = '__mdraggable__';
    public static currentDraggable?: MDraggable;

    private grabEvents: string[] = ['mousedown', 'touchstart'];
    private cancelGrabEvents: string[] = ['mouseup', 'touchend', 'click', 'touchcancel'];
    private touchUpListener: any = this.doCleanUp.bind(this);
    private grabDelay: number | undefined = undefined;
    private touchHasMoved: boolean = false;

    constructor(element: HTMLElement, options: MDraggableOptions) {
        super(element, options);
    }

    public doCleanUp(): void {
        this.destroyGrabBehavior();
        this.cleanupCssClasses();
        MDraggable.currentDraggable = undefined;
    }

    public attach(mount: MountFunction): void {
        this.attachDragImage();
        if (this.options.canDrag === undefined) { this.options.canDrag = true; }
        if (this.options.canDrag) {
            mount(() => {
                this.doCleanUp();
                this.element.classList.add(MDraggableClassNames.Draggable);

                this.options.action = this.options.action ? this.options.action : DEFAULT_ACTION;
                this.element.draggable = true;

                this.addEventListener('dragend', (event: DragEvent) => this.onDragEnd(event));
                this.addEventListener('dragstart', (event: DragEvent) => this.onDragStart(event));
                this.addEventListener('touchmove', (event: MouseEvent) => { this.touchHasMoved = true; });
                this.setupGrabBehavior();
                MDOMPlugin.attach(MRemoveUserSelect, this.element, true);
            });
        }
    }

    public update(options: MDraggableOptions, refresh: RefreshFunction): void {
        if (options.canDrag === undefined) { options.canDrag = true; }
        this._options = options;
        if (this.options.canDrag) {
            refresh(() => {
                this.options.action = this.options.action ? this.options.action : DEFAULT_ACTION;
                this.attachDragImage();
            });
        }
    }

    public detach(): void {
        this.element.draggable = false;
        MDOMPlugin.detach(MRemoveUserSelect, this.element);
        this.element.classList.remove(MDraggableClassNames.Draggable);
        this.cleanupCssClasses();
        (this.element.style as any).webkitUserDrag = '';
        this.removeAllEvents();
    }

    private setupGrabBehavior(): void {
        (this.element.style as any).webkitUserDrag = 'none';
        this.grabEvents.forEach(eventName => this.addEventListener(eventName, (event: DragEvent) => {
            if (!this.targetIsGrabbable(event)) {
                (this.element.style as any).webkitUserDrag = '';
            } else {
                this.cancelGrabEvents.forEach(eventName => document.addEventListener(eventName, this.touchUpListener));
                this.grabDelay = window.setTimeout(() => {
                    if (!MDraggable.currentDraggable && this.grabDelay) {
                        this.element.classList.add(MDraggableClassNames.Grabbing);
                        (this.element.style as any).webkitUserDrag = '';
                    }
                }, polyFillActive.dragDrop ? dragDropDelay : 0);
            }
        }));
    }

    private targetIsGrabbable(event: DragEvent): boolean {
        // We can't call event.preventDefault or event.stopPropagation here for the drag to be handled correctly on mobile devices.
        // So we make sure that the draggable affected by the dragEvent is the closest draggable parent of the event target.
        // We don't apply the "grabbing" style on mouse down when target correspond to a link or a button, it just looks weird.

        const draggable: MDraggable | undefined = MDOMPlugin.getRecursive(MDraggable, event.target as HTMLElement);
        if (!draggable || draggable !== this) { return false; }

        let recursiveElement: HTMLElement | null = event.target as HTMLElement | null;
        const noGrabTags: string[] = ['A', 'BUTTON'];
        let targetGrabbable: boolean = true;
        while (recursiveElement && targetGrabbable && recursiveElement !== draggable.element) {
            if (noGrabTags.find(tag => tag === recursiveElement!.tagName)) {
                targetGrabbable = false;
            }

            recursiveElement = recursiveElement!.parentElement;
        }

        return targetGrabbable;
    }

    private destroyGrabBehavior(): void {
        // This allow to "delay" user drag on desktop.  When wanted delay is over, set webkitUserDrag to ''.
        this.touchHasMoved = !polyFillActive.dragDrop;
        (this.element.style as any).webkitUserDrag = 'none';
        if (this.grabDelay) { window.clearTimeout(this.grabDelay); this.grabDelay = undefined; }
        this.cancelGrabEvents.forEach(eventName => document.removeEventListener(eventName, this.touchUpListener));
    }

    private attachDragImage(): void {
        const dragImage: HTMLElement = this.element.querySelector(`.${MDraggableClassNames.DragImage}`) as HTMLElement;
        if (dragImage) {
            const origin: number = -9999;
            dragImage.style.left = `${origin}px`;
            dragImage.style.top = `${origin}px`;
            const computedWidth: string | null = window.getComputedStyle(dragImage).width;
            dragImage.style.width = computedWidth && computedWidth !== 'auto' ? window.getComputedStyle(dragImage).width : '100%';
            dragImage.style.position = 'absolute';
            dragImage.style.overflow = 'hidden';
            dragImage.style.zIndex = '1';
            dragImage.hidden = true;
        }
    }

    private onDragEnd(event: DragEvent): void {
        event.stopPropagation();
        this.doCleanUp();

        // Fix for IE / Edge.  clientX / clientY don't appear to be out of element on dragLeave.
        // We can't detect whether we're leaving de droppable for real therefore we have to force leave onDragEnd.
        if (MDroppable.currentHoverDroppable) { MDroppable.currentHoverDroppable.leaveDroppable(event); }
        if (MSortable.activeSortContainer) { MSortable.activeSortContainer.doCleanUp(); }
        if (MSortable.fromSortContainer) { MSortable.fromSortContainer.doCleanUp(); }
        if (MDraggableAllowScroll.currentDraggableScroll) { MDraggableAllowScroll.currentDraggableScroll.doCleanUp(); }

        this.dispatchEvent(event, MDraggableEventNames.OnDragEnd);

        const dragImage: HTMLElement = this.element.querySelector(`.${MDraggableClassNames.DragImage}`) as HTMLElement;
        if (dragImage) { dragImage.hidden = true; }
    }

    private onDragStart(event: DragEvent): void {
        // On some mobile devices dragStart will be triggered even though user has not moved / dragged yet.  We want to avoid that.
        if (polyFillActive.dragDrop && !this.touchHasMoved) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            return;
        }

        event.stopPropagation();
        this.doCleanUp();
        clearUserSelection();

        MDraggable.currentDraggable = this;
        this.element.classList.add(MDraggableClassNames.Dragging);
        if (typeof this.options.dragData === 'object') {
            event.dataTransfer.setData('text', JSON.stringify(this.options.dragData));
        } else {
            event.dataTransfer.setData('text', this.options.dragData);
        }

        this.setDragImage(event);
        this.dispatchEvent(event, MDraggableEventNames.OnDragStart);
    }

    private setDragImage(event: DragEvent): void {
        const dragImage: HTMLElement = this.element.querySelector(`.${MDraggableClassNames.DragImage}`) as HTMLElement;
        if (dragImage && event.dataTransfer.setDragImage) {
            dragImage.hidden = false;
            event.dataTransfer.setDragImage(dragImage, 0, 0);
        }
    }

    private dispatchEvent(event: DragEvent, name: string): void {
        const data: any = this.options.dragData ? this.options.dragData : event.dataTransfer.getData('text');
        const dragInfo: MDragInfo = {
            action: this.options.action,
            grouping: this.options.grouping,
            data
        };
        const customEvent: CustomEvent = document.createEvent('CustomEvent');
        customEvent.initCustomEvent(name, true, true, Object.assign(event, { dragInfo }));
        (customEvent as any).dragInfo = dragInfo;
        dispatchEvent(this.element, name, customEvent);
    }

    private cleanupCssClasses(): void {
        this.element.classList.remove(MDraggableClassNames.Dragging);
        this.element.classList.remove(MDraggableClassNames.Grabbing);
    }
}

const extractVnodeAttributes: (binding: VNodeDirective, node: VNode) => MDraggableOptions = (binding: VNodeDirective, node: VNode) => {
    return {
        canDrag: binding.value,
        action: getVNodeAttributeValue(node, 'action'),
        dragData: getVNodeAttributeValue(node, 'drag-data'),
        grouping: getVNodeAttributeValue(node, 'grouping')
    };
};
const Directive: DirectiveOptions = {
    inserted(element: HTMLElement, binding: VNodeDirective, node: VNode): void {
        MDOMPlugin.attach(MDraggable, element, extractVnodeAttributes(binding, node));
    },
    update(element: HTMLElement, binding: VNodeDirective, node: VNode): void {
        MDOMPlugin.attach(MDraggable, element, extractVnodeAttributes(binding, node));
    },
    unbind(element: HTMLElement, binding: VNodeDirective): void {
        MDOMPlugin.detach(MDraggable, element);
    }
};

const DraggablePlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(RemoveUserSelectPlugin);
        v.directive(DRAGGABLE_NAME, Directive);
    }
};

export default DraggablePlugin;

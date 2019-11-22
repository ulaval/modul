import Vue, { VNode, VNodeData, VueConstructor } from 'vue';
import './calendar-button.scss';

export const MCalendarButton: VueConstructor<Vue> = Vue.extend({
    name: 'calendar-button',
    functional: true,
    render (createElement, context): VNode {
        let data: VNodeData = {
            class:{
                'm-calendar-button': true,
                'm--is-disabled': context.props["disabled"],
                'm--is-selected': context.props["selected"],
                'm--is-today': context.props["today"]
            },
            props: {
                disabled: { type: Boolean, required: false },
                selected: { type: Boolean, required: false },
                today: { type: Boolean, required: false }
            },
            on: {
                ...context.data.on,
                click($event): void {
                    $event.stopPropagation();
                    const emit: any = context.data.on!.click;
                    emit($event);
                },
                keyup($event: KeyboardEvent): void {
                    const emit: any = context.data.on!.keyup;
                    emit($event);
                },
                mouseenter($event): void {
                    const emit: any = context.data.on!.mouseenter;
                    emit($event);
                },
                mouseleave($event): void {
                    const emit: any = context.data.on!.mouseleave;
                    emit($event);
                }
            },
            attrs: {
                'aria-selected': context.data.attrs!.selected
            },
            ref: context.data.ref
        };

        return createElement('button', data, context.children);
    }
});

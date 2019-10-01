import { storiesOf } from '@storybook/vue';
import { MButtonSkin } from '@ulaval/modul-components/dist/components/button/button';
import { ACCORDION_TRANSITION_NAME } from '@ulaval/modul-components/dist/components/component-names';
import AccordionTransitionPlugin from '@ulaval/modul-components/dist/components/transitions/accordion-transition/accordion-transition';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';

Vue.use(AccordionTransitionPlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}${ACCORDION_TRANSITION_NAME}`, module)
    .add('Accordion example', () => ({
        data: () => ({
            open: true,
            disabledTransition: false,
            buttonSkin: MButtonSkin.Secondary,
            transitionEmit: ''
        }),
        methods: {
            toggleOpen(): void {
                let _this: any = this as any;
                _this.open = !_this.open;
            },
            toggleDisabledTransition(): void {
                let _this: any = this as any;
                _this.disabledTransition = !_this.disabledTransition;
            },
            beforeEnter(): void {
                (this as any).transitionEmit = 'before-enter';
                console.log(`@emit('before-enter')`);
            },
            enter(): void {
                (this as any).transitionEmit = 'enter';
                console.log(`@emit('enter')`);
            },
            afterEnter(): void {
                (this as any).transitionEmit = 'after-enter';
                console.log(`@emit('after-enter')`);
            },
            enterCancelled(): void {
                (this as any).transitionEmit = 'enter-cancelled';
                console.log(`@emit('enter-cancelled')`);
            },
            beforeLeave(): void {
                (this as any).transitionEmit = 'before-leave';
                console.log(`@emit('before-leave')`);
            },
            leave(): void {
                (this as any).transitionEmit = 'leave';
                console.log(`@emit('leave')`);
            },
            afterLeave(): void {
                (this as any).transitionEmit = 'after-leave';
                console.log(`@emit('after-leave')`);
            },
            leaveCancelled(): void {
                (this as any).transitionEmit = 'leave-cancelled';
                console.log(`@emit('leave-cancelled')`);
            }
        },
        template: `
        <div>
            <div>
                <m-button @click="toggleOpen()">
                    {{open ? 'Close' : 'Open'}} accordion
                </m-button>
                <m-button class="m-u--margin-left"
                          :skin="buttonSkin"
                          @click="toggleDisabledTransition()">
                    {{disabledTransition ? 'Enabled' : 'Disabled'}} transition
                </m-button>
            </div>
            <m-accordion-transition :disabled="disabledTransition"
                                    @before-enter="beforeEnter"
                                    @enter="enter"
                                    @after-enter="afterEnter"
                                    @enter-cancelled="enterCancelled"
                                    @before-leave="beforeLeave"
                                    @leave="leave"
                                    @after-leave="afterLeave"
                                    @leave-cancelled="leaveCancelled">
                <div v-if="open">
                    <p v-for="index in 4"
                       :key="index">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A laudantium odio ipsum, quae quos cum dolor, omnis perferendis, veritatis deleniti iusto consectetur? Impedit tempora quam ab laborum maiores sapiente earum?</p>
                </div>
            </m-accordion-transition>
            <p v-if="transitionEmit">Last transition emit: {{transitionEmit}}</p>
        </div>`
    }));

import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import { componentsHierarchyRootSeparator } from '../../../../conf/storybook/utils';
import { MButtonSkin } from '../../button/button';
import { ACCORDION_TRANSITION_NAME } from '../../component-names';
import AccordionTransitionPlugin from './accordion-transition';

Vue.use(AccordionTransitionPlugin);

storiesOf(`${componentsHierarchyRootSeparator}${ACCORDION_TRANSITION_NAME}`, module)
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
                this.$log.log(`@emit('before-enter')`);
            },
            enter(): void {
                (this as any).transitionEmit = 'enter';
                this.$log.log(`@emit('enter')`);
            },
            afterEnter(): void {
                (this as any).transitionEmit = 'after-enter';
                this.$log.log(`@emit('after-enter')`);
            },
            enterCancelled(): void {
                (this as any).transitionEmit = 'enter-cancelled';
                this.$log.log(`@emit('enter-cancelled')`);
            },
            beforeLeave(): void {
                (this as any).transitionEmit = 'before-leave';
                this.$log.log(`@emit('before-leave')`);
            },
            leave(): void {
                (this as any).transitionEmit = 'leave';
                this.$log.log(`@emit('leave')`);
            },
            afterLeave(): void {
                (this as any).transitionEmit = 'after-leave';
                this.$log.log(`@emit('after-leave')`);
                setTimeout(() => {
                    (this as any).transitionEmit = '';
                }, 500);
            },
            leaveCancelled(): void {
                (this as any).transitionEmit = 'leave-cancelled';
                this.$log.log(`@emit('leave-cancelled')`);
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
            <p v-if="transitionEmit">Transition emit: {{transitionEmit}}</p>
        </div>`
    }));

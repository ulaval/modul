import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import { componentsHierarchyRootSeparator } from '../../../../conf/storybook/utils';
import { MButtonSkin } from '../../button/button';
import { OPACITY_TRANSITION_NAME } from '../../component-names';
import OpacityTransitionPlugin from './opacity-transition';

Vue.use(OpacityTransitionPlugin);

storiesOf(`${componentsHierarchyRootSeparator}${OPACITY_TRANSITION_NAME}`, module)

    .add('Default', () => ({
        data: () => ({
            open: true,
            disabledTransition: false,
            buttonSkin: MButtonSkin.Secondary,
            transitionEmit: ''
        }),
        methods: {
            toggleDisplay(): void {
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
            },
            leaveCancelled(): void {
                (this as any).transitionEmit = 'leave-cancelled';
                this.$log.log(`@emit('leave-cancelled')`);
            }
        },
        template: `
        <div>
            <div>
                <m-button @click="toggleDisplay()">
                    {{open ? 'Hide' : 'Show'}} icon
                </m-button>
                <m-button class="m-u--margin-left"
                          :skin="buttonSkin"
                          @click="toggleDisabledTransition()">
                    {{disabledTransition ? 'Enabled' : 'Disabled'}} transition
                </m-button>
            </div>
            <m-opacity-transition :disabled="disabledTransition"
                                  @before-enter="beforeEnter"
                                  @enter="enter"
                                  @after-enter="afterEnter"
                                  @enter-cancelled="enterCancelled"
                                  @before-leave="beforeLeave"
                                  @leave="leave"
                                  @after-leave="afterLeave"
                                  @leave-cancelled="leaveCancelled">
                <m-icon v-if="open" class="m-u--margin-top" name="m-svg__clock"></m-icon>
            </m-opacity-transition>
            <p v-if="transitionEmit">Last transition emit: {{transitionEmit}}</p>
        </div>`
    }))
    .add('zoom-effect="false"', () => ({
        data: () => ({
            open: true
        }),
        methods: {
            toggleDisplay(): void {
                let _this: any = this as any;
                _this.open = !_this.open;
            }
        },
        template: `
        <div>
            <div>
                <m-button @click="toggleDisplay()">
                    {{open ? 'Hide' : 'Show'}} icon
                </m-button>
            </div>
            <m-opacity-transition :zoom-effect="false">
                <m-icon v-if="open" class="m-u--margin-top" name="m-svg__clock"></m-icon>
            </m-opacity-transition>
        </div>`
    }));

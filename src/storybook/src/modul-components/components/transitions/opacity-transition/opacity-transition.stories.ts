import { storiesOf } from '@storybook/vue';
import { MButtonSkin } from '@ulaval/modul-components/dist/components/button/button';
import { OPACITY_TRANSITION_NAME } from '@ulaval/modul-components/dist/components/component-names';
import OpacityTransitionPlugin from '@ulaval/modul-components/dist/components/transitions/opacity-transition/opacity-transition';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';


Vue.use(OpacityTransitionPlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}${OPACITY_TRANSITION_NAME}`, module)

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
            <div class="mu-mb">
                <m-button @click="toggleDisplay()">
                    {{open ? 'Hide' : 'Show'}} icon
                </m-button>
                <m-button class="mu-ml"
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
                <m-icon v-if="open" name="m-svg__clock"></m-icon>
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
                <m-icon v-if="open" class="mu-mt" name="m-svg__clock"></m-icon>
            </m-opacity-transition>
        </div>`
    }));

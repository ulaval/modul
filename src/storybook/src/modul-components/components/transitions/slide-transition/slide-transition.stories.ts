import { storiesOf } from '@storybook/vue';
import { MButtonSkin } from '@ulaval/modul-components/dist/components/button/button';
import { SLIDE_TRANSITION_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MNavbarSkin } from '@ulaval/modul-components/dist/components/navbar/navbar';
import SlideTransitionPlugin, { MSlideTransitionDirection } from '@ulaval/modul-components/dist/components/transitions/slide-transition/slide-transition';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';


Vue.use(SlideTransitionPlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}${SLIDE_TRANSITION_NAME}`, module)

    .add('Tabs example', () => ({
        data: () => ({
            selectedTabIndex: 1,
            direction: MSlideTransitionDirection.LeftToRight,
            nbParagraphe: 20,
            nbTab: 7,
            skinNavbar: MNavbarSkin.TabLight,
            disabledTransition: false,
            buttonSkin: MButtonSkin.Secondary,
            transitionEmit: ''
        }),
        methods: {
            showTab(newIndex): void {
                let _this: any = this as any;
                _this.direction = (newIndex < _this.selectedTabIndex) ? MSlideTransitionDirection.LeftToRight : MSlideTransitionDirection.RightToLeft;
                _this.selectedTabIndex = newIndex;
                _this.nbParagraphe = (_this.selectedTabIndex % 2) === 0 ? 10 : newIndex * 10;
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
            <m-navbar :selected="selectedTabIndex"
                      :skin="skinNavbar">
                <m-navbar-item v-for="index in nbTab"
                               :key="index"
                               :value="index"
                               @click="showTab(index)">
                    Tab {{index}}
                </m-navbar-item>
            </m-navbar>
            <m-slide-transition :direction="direction"
                                :disabled="disabledTransition"
                                @before-enter="beforeEnter"
                                @enter="enter"
                                @after-enter="afterEnter"
                                @enter-cancelled="enterCancelled"
                                @before-leave="beforeLeave"
                                @leave="leave"
                                @after-leave="afterLeave"
                                @leave-cancelled="leaveCancelled">
                <div v-for="index in nbTab"
                     :key="index"
                     v-if="selectedTabIndex === index"
                     class="m-u--margin-top">
                    <h3 class="m-u--no-margin">Tab {{index}}</h3>
                    <p v-for="index in nbParagraphe"
                       :key="index">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A laudantium odio ipsum, quae quos cum dolor, omnis perferendis, veritatis deleniti iusto consectetur? Impedit tempora quam ab laborum maiores sapiente earum?</p>
                </div>
            </m-slide-transition>
            <div class="m-u--margin-top--m">
                <m-button @click="nbTab++"
                          :disabled="nbTab === 12">Add tab</m-button>
                <m-button :skin="buttonSkin"
                          class="m-u--margin-left"
                          :disabled="nbTab === 2"
                          @click="nbTab--">Delete tab</m-button>
                <m-button :skin="buttonSkin"
                          class="m-u--margin-left"
                          @click="disabledTransition = !disabledTransition">{{disabledTransition ? 'Enabled' : 'Disabled'}} transition</m-button>
            </div>
            <p v-if="transitionEmit">Last transition emit: {{transitionEmit}}</p>
        </div>`
    }))
    .add('automatic-scroll=false', () => ({
        data: () => ({
            selectedTabIndex: 1,
            direction: MSlideTransitionDirection.LeftToRight,
            nbParagraphe: 20,
            nbTab: 3,
            skinNavbar: MNavbarSkin.TabLight
        }),
        methods: {
            showTab(newIndex): void {
                let _this: any = this as any;
                _this.direction = (newIndex < _this.selectedTabIndex) ? MSlideTransitionDirection.LeftToRight : MSlideTransitionDirection.RightToLeft;
                _this.selectedTabIndex = newIndex;
                _this.nbParagraphe = (_this.selectedTabIndex % 2) === 0 ? 30 : newIndex * 40;
            }
        },
        template: `
        <div>
            <m-navbar :selected="selectedTabIndex"
                      :skin="skinNavbar">
                <m-navbar-item v-for="index in nbTab"
                               :key="index"
                               :value="index"
                               @click="showTab(index)">
                    Tab {{index}}
                </m-navbar-item>
            </m-navbar>
            <m-slide-transition :direction="direction"
                                :automatic-scroll="false">
                <div v-for="index in nbTab"
                     :key="index"
                     v-if="selectedTabIndex === index"
                     class="m-u--margin-top">
                    <h3 class="m-u--no-margin">Tab {{index}}</h3>
                    <p v-for="index in nbParagraphe"
                       :key="index">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A laudantium odio ipsum, quae quos cum dolor, omnis perferendis, veritatis deleniti iusto consectetur? Impedit tempora quam ab laborum maiores sapiente earum?</p>
                </div>
            </m-slide-transition>
        </div>`
    }));

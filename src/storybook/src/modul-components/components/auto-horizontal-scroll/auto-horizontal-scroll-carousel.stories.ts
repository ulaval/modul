import { boolean, select } from '@storybook/addon-knobs';
import { MAutoHorizontalScrollGradientSkin } from '@ulaval/modul-components/dist/components/auto-horizontal-scroll/auto-horizontal-scroll';
import { AUTO_HORIZONTAL_SCROLL } from '@ulaval/modul-components/dist/components/component-names';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${AUTO_HORIZONTAL_SCROLL}/CarouselExample`,
    parameters: { fileName: __filename }
};

const CAROUSEL_TEMPLATE = (
    _currentScrollLeft: number,
    _nbItem: number,
    _displayButton: boolean
) => ({
    props: {
        leftGradientActive: {
            default: boolean('Prop left-gradient-active', true)
        },
        rightGradientActive: {
            default: boolean('Prop right-gradient-active', true)
        },
        previousButtonActive: {
            default: boolean('Prop previous-button-active', _displayButton)
        },
        nextButtonActive: {
            default: boolean('Prop next-button-active', _displayButton)
        },
        gradientSkin: {
            default: select(
                'Prop gradient-skin',
                Enums.toValueArray(
                    MAutoHorizontalScrollGradientSkin
                ),
                MAutoHorizontalScrollGradientSkin.WhiteBackground
            )
        },
        displayHorizontalScrollbar: {
            default: boolean('Prop display-horizontal-scrollbar', true)
        }
    },
    data: () => ({
        currentScrollLeft: _currentScrollLeft,
        crouselItemSize: 200,
        crouselItemSpacing: 16,
        nbItem: _nbItem
    }),
    methods: {
        isActiveBox(currentScrollLeft: number, boxIndex: number): boolean {
            const _this: any = this;
            const boxFullWidth: number = _this.crouselItemSize + _this.crouselItemSpacing;
            return currentScrollLeft >= (((boxIndex - 1) * boxFullWidth) - 160)
                && currentScrollLeft < (((boxIndex - 1) * boxFullWidth) + boxFullWidth - 160);
        },
        onPreviousButtonClick(): void {
            const _this: any = this;
            _this.currentScrollLeft = ((_this.currentScrollLeft - 216) <= 0) ? 0 : _this.currentScrollLeft - 216;
        },
        onNextButtonClick(): void {
            const _this: any = this;
            _this.currentScrollLeft = _this.currentScrollLeft + 216;
        }
    },
    template: `<${AUTO_HORIZONTAL_SCROLL}
        :min-width="crouselItemSize * nbItem + (nbItem + 1) * crouselItemSpacing + 'px'"
        :left-gradient-active="leftGradientActive"
        :right-gradient-active="rightGradientActive"
        :previous-button-active="previousButtonActive"
        :next-button-active="nextButtonActive"
        :current-scroll-left.sync="currentScrollLeft"
        :gradient-skin="gradientSkin"
        :display-horizontal-scrollbar="displayHorizontalScrollbar"
        style="background: #f4f4f4;"
        @click-previous-button="onPreviousButtonClick()"
        @click-next-button="onNextButtonClick()"
    >
        <div style="display: flex; padding: 32px 16px;">
            <article
                v-for="index in nbItem"
                :key="index"
                :data-box-index="index"
                style="transition: background-color 0.3s ease; flex-shrink: 0; padding: 16px;"
                :style="{
                    marginRight: index < nbItem ? crouselItemSpacing + 'px' : undefined,
                    backgroundColor: isActiveBox(currentScrollLeft, index) ? '#ffc103': '#fff',
                    width: crouselItemSize + 'px',
                    height: crouselItemSize + 'px',
                }"
            >
                <p class="m-u--no-margin">Carousel item #{{ index }}</p>
            </article>
        </div>
    </${AUTO_HORIZONTAL_SCROLL}>`
});

export const defaultStory = () => CAROUSEL_TEMPLATE(1200, 20, false);

defaultStory.story = {
    name: 'Sandbox'
};

export const twoItems = () => CAROUSEL_TEMPLATE(0, 2, false);
export const WithButton = () => CAROUSEL_TEMPLATE(120, 14, true);

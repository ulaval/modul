import { boolean, select } from '@storybook/addon-knobs';
import { MAutoHorizontalScrollGradientStyle } from '@ulaval/modul-components/dist/components/auto-horizontal-scroll/auto-horizontal-scroll';
import { AUTO_HORIZONTAL_SCROLL } from '@ulaval/modul-components/dist/components/component-names';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${AUTO_HORIZONTAL_SCROLL}/CarouselExample`,
    parameters: { fileName: __filename }
};

const getCarouselTemplate = (
    _horizontalScrollOffset: number,
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
        gradientStyle: {
            default: select(
                'Prop gradient-style',
                Enums.toValueArray(
                    MAutoHorizontalScrollGradientStyle
                ),
                MAutoHorizontalScrollGradientStyle.White
            )
        },
        displayHorizontalScrollbar: {
            default: boolean('Prop display-horizontal-scrollbar', true)
        }
    },
    data: () => ({
        horizontalScrollOffset: _horizontalScrollOffset,
        crouselItemSize: 200,
        crouselItemSpacing: 16,
        nbItem: _nbItem
    }),
    methods: {
        isActiveBox(horizontalScrollOffset: number, boxIndex: number): boolean {
            const _this: any = this;
            const boxFullWidth: number = _this.crouselItemSize + _this.crouselItemSpacing;
            return horizontalScrollOffset >= (((boxIndex - 1) * boxFullWidth) - 160)
                && horizontalScrollOffset < (((boxIndex - 1) * boxFullWidth) + boxFullWidth - 160);
        },
        onPreviousButtonClick(): void {
            const _this: any = this;
            _this.incrementHorizontalScrollOffset(-_this.crouselItemSize - _this.crouselItemSpacing);
        },
        onNextButtonClick(): void {
            const _this: any = this;
            _this.incrementHorizontalScrollOffset(_this.crouselItemSize + _this.crouselItemSpacing);
        },
        incrementHorizontalScrollOffset(increment: number): void {
            const _this: any = this;
            _this.horizontalScrollOffset = _this.horizontalScrollOffset + increment;
        }
    },
    template: `<${AUTO_HORIZONTAL_SCROLL}
        :min-width="crouselItemSize * nbItem + (nbItem + 1) * crouselItemSpacing + 'px'"
        :left-gradient-active="leftGradientActive"
        :right-gradient-active="rightGradientActive"
        :previous-button-active="previousButtonActive"
        :next-button-active="nextButtonActive"
        :horizontal-scroll-offset.sync="horizontalScrollOffset"
        :gradient-style="gradientStyle"
        :display-horizontal-scrollbar="displayHorizontalScrollbar"
        style="background: #f4f4f4;"
        @previous-button-click="onPreviousButtonClick()"
        @next-button-click="onNextButtonClick()"
    >
        <div style="display: flex; padding: 32px 16px;">
            <article
                v-for="index in nbItem"
                :key="index"
                :data-box-index="index"
                style="transition: background-color 0.3s ease; flex-shrink: 0; padding: 16px;"
                :style="{
                    marginRight: index < nbItem ? crouselItemSpacing + 'px' : undefined,
                    backgroundColor: isActiveBox(horizontalScrollOffset, index) ? '#ffc103': '#fff',
                    width: crouselItemSize + 'px',
                    height: crouselItemSize + 'px',
                }"
            >
                <p class="m-u--no-margin">Carousel item #{{ index }}</p>
            </article>
        </div>
    </${AUTO_HORIZONTAL_SCROLL}>`
});

export const Sandbox = () => getCarouselTemplate(1200, 20, false);

export const TwoItems = () => getCarouselTemplate(0, 2, false);
export const WithButton = () => getCarouselTemplate(120, 14, true);

import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import { componentsHierarchyRootSeparator } from '../../../conf/storybook/utils';
import { MButtonSkin } from '../button/button';
import { PANEL_NAME } from '../component-names';
import PanelPlugin, { MPanelSkin } from './panel';

Vue.use(PanelPlugin);

storiesOf(`${componentsHierarchyRootSeparator}${PANEL_NAME}`, module)
    .add('default', () => ({
        template: `<div class="m-u--padding--m">
                    <m-panel>
                        <h2 slot="header">I am a header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum voluptas quis corporis fugit nobis beatae vel, quia at consequuntur.</p>
                        <p slot="footer">I am footer</p>
                    </m-panel>
                </div>`
    }))
    .add('highlighted="true"', () => ({
        template: `<div class="m-u--padding--m">
                    <m-panel :highlighted="true">
                        <h2 slot="header">I am a header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum voluptas quis corporis fugit nobis beatae vel, quia at consequuntur.</p>
                        <p slot="footer">I am footer</p>
                    </m-panel>
                </div>`
    }))
    .add('shadow="true"', () => ({
        template: `<div class="m-u--padding--m">
                    <m-panel :shadow="true">
                        <h2 slot="header">I am a header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum voluptas quis corporis fugit nobis beatae vel, quia at consequuntur.</p>
                        <p slot="footer">I am footer</p>
                    </m-panel>
                </div>`
    }));

storiesOf(`${componentsHierarchyRootSeparator}${PANEL_NAME}/skin`, module)
    .add(`skin="${MPanelSkin.Light}"`, () => ({
        template: `<div class="m-u--padding--m">
                    <m-panel skin="${MPanelSkin.Light}">
                        <h2 slot="header">I am a header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum voluptas quis corporis fugit nobis beatae vel, quia at consequuntur.</p>
                        <p slot="footer">I am footer</p>
                    </m-panel>
                </div>`
    }))
    .add(`skin="${MPanelSkin.Dark}"`, () => ({
        template: `<div class="m-u--padding--m">
                    <m-panel skin="${MPanelSkin.Dark}">
                        <h2 slot="header">I am a header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum voluptas quis corporis fugit nobis beatae vel, quia at consequuntur.</p>
                        <p slot="footer">I am footer</p>
                    </m-panel>
                </div>`
    }))
    .add(`skin="${MPanelSkin.Darker}"`, () => ({
        template: `<div class="m-u--padding--m">
                    <m-panel skin="${MPanelSkin.Darker}">
                        <h2 slot="header">I am a header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum voluptas quis corporis fugit nobis beatae vel, quia at consequuntur.</p>
                        <p slot="footer">I am footer</p>
                    </m-panel>
                </div>`
    }));

storiesOf(`${componentsHierarchyRootSeparator}${PANEL_NAME}/border`, module)
    .add('border="false"', () => ({
        template: `<div class="m-u--padding--m">
                    <m-panel :border="false">
                        <h2 slot="header">I am a header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum voluptas quis corporis fugit nobis beatae vel, quia at consequuntur.</p>
                        <p slot="footer">I am footer</p>
                    </m-panel>
                </div>`
    }))
    .add('border-large="true"', () => ({
        template: `<div class="m-u--padding--m">
                    <m-panel :border-large="true">
                        <h2 slot="header">I am a header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum voluptas quis corporis fugit nobis beatae vel, quia at consequuntur.</p>
                        <p slot="footer">I am footer</p>
                    </m-panel>
                </div>`
    }));

storiesOf(`${componentsHierarchyRootSeparator}${PANEL_NAME}/padding`, module)
    .add('padding="false"', () => ({
        template: `<div class="m-u--padding--m">
                    <m-panel :padding="false">
                        <h2 slot="header">I am a header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum voluptas quis corporis fugit nobis beatae vel, quia at consequuntur.</p>
                        <p slot="footer">I am footer</p>
                    </m-panel>
                </div>`
    }))
    .add('padding-large="true"', () => ({
        template: `<div class="m-u--padding--m">
                    <m-panel :padding-large="true">
                        <h2 slot="header">I am a header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum voluptas quis corporis fugit nobis beatae vel, quia at consequuntur.</p>
                        <p slot="footer">I am footer</p>
                    </m-panel>
                </div>`
    }))
    .add('padding-header="false"', () => ({
        template: `<div class="m-u--padding--m">
                    <m-panel :padding-header="false">
                        <h2 slot="header">I am a header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum voluptas quis corporis fugit nobis beatae vel, quia at consequuntur.</p>
                        <p slot="footer">I am footer</p>
                    </m-panel>
                </div>`
    }))
    .add('padding-body="false"', () => ({
        template: `<div class="m-u--padding--m">
                    <m-panel :padding-body="false">
                        <h2 slot="header">I am a header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum voluptas quis corporis fugit nobis beatae vel, quia at consequuntur.</p>
                        <p slot="footer">I am footer</p>
                    </m-panel>
                </div>`
    }))
    .add('padding-footer="false"', () => ({
        template: `<div class="m-u--padding--m">
                    <m-panel :padding-footer="false">
                        <h2 slot="header">I am a header</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum voluptas quis corporis fugit nobis beatae vel, quia at consequuntur.</p>
                        <p slot="footer">I am footer</p>
                    </m-panel>
                </div>`
    }));

storiesOf(`${componentsHierarchyRootSeparator}${PANEL_NAME}/$slots example`, module)
    .add('$slots reactivity', () => ({
        data: () => ({
            hasHeader: true,
            hasBody: true,
            hasFooter: true,
            getSkinButton(value: boolean): MButtonSkin {
                return value ? MButtonSkin.Primary : MButtonSkin.Secondary;
            }
        }),
        template: `<div class="m-u--padding--m">
                    <m-panel>
                        <h2 v-if="hasHeader" slot="header">I am a header</h2>
                        <p v-if="hasBody">Lorem ipsum dolor, sit amet consectetur adipisicing elit.Earum voluptas quis corporis fugit nobis beatae vel, quia at consequuntur.</p>
                        <p v-if="hasFooter" slot="footer">I am footer</p>
                    </m-panel>
                    <m-button class="m-u--margin-top" :skin="getSkinButton(hasHeader)"@click="hasHeader = !hasHeader">Toogle $slot.header</m-button>
                    <m-button class="m-u--margin-top":skin="getSkinButton(hasBody)"@click="hasBody = !hasBody">Toogle $slot.default</m-button>
                    <m-button class="m-u--margin-top":skin="getSkinButton(hasFooter)"@click="hasFooter = !hasFooter">Toogle $slot.footer</m-button>
                </div>`
    }));

import { boolean, radios, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { EXPANDABLE_LAYOUT_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MExpandableLayoutPanelPosition, MExpandableLayoutPanelScrollMode } from '@ulaval/modul-components/dist/components/expandable-layout/expandable-layout';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

storiesOf(`${modulComponentsHierarchyRootSeparator}${EXPANDABLE_LAYOUT_NAME}`, module)


    .add('default', () => ({
        props: {
            open: {
                default: boolean('open', true)
            },
            panelScrollMode: {
                default: radios('panel-scroll-mode', { static: MExpandableLayoutPanelScrollMode.Static, follow: MExpandableLayoutPanelScrollMode.Follow }, MExpandableLayoutPanelScrollMode.Static)
            },
            panelPosition: {
                default: radios('panel-position', { left: MExpandableLayoutPanelPosition.Left, right: MExpandableLayoutPanelPosition.Right }, MExpandableLayoutPanelPosition.Left)
            },
            panelWidth: {
                default: text('panel-width', '320px')
            },
            mainContentHeight: {
                default: text('simulated main content height', '200vh')
            },
            panelContentHeight: {
                default: text('simulated panel content height', '300vh')
            },
            overContent: {
                default: boolean('over-content', false)
            }
        },
        template: `
        <m-expandable-layout :open="open" :panel-scroll-mode="panelScrollMode" :panel-position="panelPosition" :panel-width="panelWidth" :over-content="overContent">
            <div :style="{background: 'lightgrey', height: mainContentHeight}"><p class="m-u--h3 m-u--no-margin">Main content</p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:<br/>
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
            The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.<br/><br/>
            The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.</div>
            <div slot="panel" :style="{height: panelContentHeight}" style="background: yellow;"><p class="m-u--h3 m-u--no-margin">Panel content</p>HISTORY<br/>PURPOSE<br/>USAGE</div>
        </m-expandable-layout>`
    }))
    .add('open', () => ({
        template: `<m-expandable-layout :open="true" style="background: yellow;">
            <div style="background: lightgrey">main content</div>
            <template slot="panel">panel content</template>
        </m-expandable-layout>`
    }))
    .add('panel-position="right"', () => ({
        template: `<m-expandable-layout panel-position="right" :open="true" style="background: yellow;">
            <div style="background: lightgrey">main content</div>
            <template slot="panel">panel content</template>
        </m-expandable-layout>`
    }))
    .add('panel-width="600px"', () => ({
        template: `<m-expandable-layout panel-width="600px" :open="true" style="background: yellow;">
            <div style="background: lightgrey">main content</div>
            <template slot="panel">panel content</template>
        </m-expandable-layout>`
    }))
    .add('without panel slot', () => ({
        template: `<m-expandable-layout :panel-width="600" :open="true" style="background: yellow;">
            <div style="background: lightgrey">main content</div>
        </m-expandable-layout>`
    }));

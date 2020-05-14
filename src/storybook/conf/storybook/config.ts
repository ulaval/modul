
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters, configure } from '@storybook/vue';
import Vue from 'vue';
import { getModulConfig } from '../../src/modul';
import modulTheme from './modul-theme';
import { getSandboxPlugin } from './sandbox-loader';


Vue.config.performance = true;

declare module '@storybook/addon-knobs' {
    export function withKnobs(): any;
}

Vue.use(getModulConfig());

// load all sandboxes
Vue.use(getSandboxPlugin());

// Option defaults:
addParameters({
    options: {
        /**
         * show story component as full screen
         * @type {Boolean}
         */
        isFullScreen: false,
        /**
         * display panel that shows a list of stories
         * @type {Boolean}
         */
        showNav: true,
        /**
         * display panel that shows addon configurations
         * @type {Boolean}
         */
        showPanel: true,
        /**
         * where to show the addon panel
         * @type {('bottom'|'right')}
         */
        panelPosition: 'bottom',
        /**
         * sidebar tree animations
         * @type {Boolean}
         */
        sidebarAnimations: true,
        /**
         * enable/disable shortcuts
         * @type {Boolean}
         */
        enableShortcuts: false,

        isToolshown: true,

        theme: modulTheme,
        storySort: (a, b) => {

            if (a[1].id.startsWith('storybook--welcome')) {
                return -1;
            }
            return a[1].id.localeCompare(b[1].id);
        }
    }
});


addDecorator(withA11y);
addDecorator(withKnobs);

configure(require.context('../../src', true, /\.stories\.ts$/), module);

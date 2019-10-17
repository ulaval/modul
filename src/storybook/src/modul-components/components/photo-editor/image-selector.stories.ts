import { storiesOf } from '@storybook/vue';
import { IMAGE_SELECTOR_NAME } from '@ulaval/modul-components/dist/components/photo-editor/component-names';
import ImageSelectorPlugin from '@ulaval/modul-components/dist/components/photo-editor/image-selector/image-selector';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

Vue.use(ImageSelectorPlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}${IMAGE_SELECTOR_NAME}`, module)

    .add('With a photo', () => ({
        template: '<m-image-selector url-photo="http://placekitten.com/g/192/192" :open="true"></m-image-selector>'
    }))
    .add('Without a photo', () => ({
        template: '<m-image-selector :open="true"></m-image-selector>'
    }));

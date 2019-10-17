import { storiesOf } from '@storybook/vue';
import { CROP_IMAGE_NAME } from '@ulaval/modul-components/dist/components/photo-editor/component-names';
import CropImagePlugin from '@ulaval/modul-components/dist/components/photo-editor/crop-image/crop-image';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

Vue.use(CropImagePlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}${CROP_IMAGE_NAME}`, module)

    .add('default', () => ({
        template: '<m-crop-image url-image="http://placekitten.com/g/700/400" :open="true"></m-crop-image>'
    }));

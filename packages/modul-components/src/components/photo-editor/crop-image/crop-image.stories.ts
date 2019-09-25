import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import { componentsHierarchyRootSeparator } from '../../../../conf/storybook/utils';
import { CROP_IMAGE_NAME } from '../../component-names';
import CropImagePlugin from './crop-image';

Vue.use(CropImagePlugin);

storiesOf(`${componentsHierarchyRootSeparator}${CROP_IMAGE_NAME}`, module)

    .add('default', () => ({
        template: '<m-crop-image url-image="http://placekitten.com/g/700/400"></m-crop-image>'
    }));

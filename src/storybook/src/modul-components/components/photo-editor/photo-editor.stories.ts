import { storiesOf } from '@storybook/vue';
import { PHOTO_EDITOR_NAME } from '@ulaval/modul-components/dist/components/component-names';
import PhotoEditorPlugin from '@ulaval/modul-components/dist/components/photo-editor/photo-editor';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

Vue.use(PhotoEditorPlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}${PHOTO_EDITOR_NAME}`, module)

    .add('With a photo', () => ({
        template: '<m-photo-editor url-photo="http://placekitten.com/g/192/192" :open="true"></m-photo-editor>'
    }))
    .add('Without a photo', () => ({
        template: '<m-photo-editor :open="true"></m-photo-editor>'
    }));

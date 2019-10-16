import { storiesOf } from '@storybook/vue';
import { PHOTO_EDITOR_NAME } from '@ulaval/modul-components/dist/components/component-names';
import PhotoEditorPlugin from '@ulaval/modul-components/dist/components/photo-editor/photo-editor';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

Vue.use(PhotoEditorPlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}${PHOTO_EDITOR_NAME}`, module)

    .add('default', () => ({
        template: '<m-photo-editor></m-photo-editor>'
    }));

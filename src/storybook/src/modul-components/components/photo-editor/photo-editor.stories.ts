import { PHOTO_EDITOR_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MPhotoEditor } from '@ulaval/modul-components/dist/components/photo-editor/photo-editor';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${PHOTO_EDITOR_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    components: { MPhotoEditor },
    template: '<m-photo-editor :open="true" @save-image="saveImage" @delete="deleteImage"></m-photo-editor>',
    methods: {
        saveImage: () => {
            Vue.prototype.$log.log('image-saved');
        },
        deleteImage: () => {
            Vue.prototype.$log.log('image-deleted');
        }
    }
});

defaultStory.story = {
    name: 'default'
};

export const withAPhoto = () => ({
    components: { MPhotoEditor },
    template: `<m-photo-editor url-photo="http://placekitten.com/g/192/192" :open="true" @save-image="saveImage" @delete="deleteImage"></m-photo-editor>`,
    methods: {
        saveImage: () => {
            Vue.prototype.$log.log('image-saved');
        },
        deleteImage: () => {
            Vue.prototype.$log.log('image-deleted');
        }
    }
});


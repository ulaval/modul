import { CHARACTER_COUNT_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${CHARACTER_COUNT_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => '<m-character-count value-length="200" max-length="2000"></m-character-count>';

defaultStory.story = {
    name: 'default'
};

export const maxLength = () => '<m-character-count max-length="40" value-length="20"></m-character-count>';

export const transition = () => '<m-character-count :transition="false" max-length="40" value-length="20"></m-character-count>';



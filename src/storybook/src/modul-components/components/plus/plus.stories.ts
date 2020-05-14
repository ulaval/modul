import { PLUS_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${PLUS_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => '<m-plus></m-plus>';

defaultStory.story = {
    name: 'default'
};

export const open = () => '<m-plus :open="true"></m-plus>';

export const large = () => '<m-plus :large="true"></m-plus>';

export const border = () => '<m-plus :border="true"></m-plus>';

export const disabled = () => '<m-plus :disabled="true"></m-plus>';

export const skinLight = () => ` <div style="background:lightgrey;" >
 <m-plus skin = "light" > </m-plus></div>` ;



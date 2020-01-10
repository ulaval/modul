import { actions } from '@storybook/addon-actions';
import { STEPPERS_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${STEPPERS_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    props: {},
    methods: actions(),
    data: () => ({}),
    template: `<m-steppers>
                    <m-steppers-item icon-name="m-svg__profile"
                                    state="visited"
                                    :completed="true">Profil</m-steppers-item>
                    <m-steppers-item icon-name="m-svg__calendar"
                                    state="in-progress">Calandrier</m-steppers-item>
                    <m-steppers-item icon-name="m-svg__logout"
                                    state="disabled">Déconnexion</m-steppers-item>
                </m-steppers>`
});

defaultStory.story = {
    name: 'Default'
};

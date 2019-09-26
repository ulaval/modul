import { Welcome } from './welcome/welcome';

export default {
    title: `storybook`
};

export const welcome: any = () => ({
    components: { Welcome },
    template: '<welcome></welcome>'
});

welcome.story = {
    parameters: { fileName: __filename, options: { showPanel: false, isToolshown: false } }
};

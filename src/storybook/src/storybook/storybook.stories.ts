import { TypoAndStyles } from './typo-and-styles/typo-and-styles';
import { Welcome } from './welcome/welcome';


export default {
    title: `storybook`
};

export const welcome: any = () => ({
    components: { Welcome },
    template: '<welcome></welcome>'
});

export const typoAndStyles: any = () => ({
    components: { TypoAndStyles },
    template: '<typo-and-styles></typo-and-styles>'
});


welcome.story = {
    parameters: { fileName: __filename, options: { showPanel: false, isToolshown: false } }
};

typoAndStyles.story = {
    parameters: { fileName: __filename, options: { showPanel: false, isToolshown: true } }
};

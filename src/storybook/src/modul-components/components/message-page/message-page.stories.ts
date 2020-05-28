import { array, select, text } from '@storybook/addon-knobs';
import { MESSAGE_PAGE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { Link, MMessagePageSkin } from '@ulaval/modul-components/dist/components/message-page/message-page';
import { MMessageState } from '@ulaval/modul-components/dist/components/message/message';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { ModulIconName } from '@ulaval/modul-components/dist/utils/modul-icons/modul-icons';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${MESSAGE_PAGE_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    props: {
        iconName: {
            default: text(
                'Prop icon-name',
                ''
            )
        },
        state: {
            default: select<MMessageState>(
                'Prop state',
                Enums.toValueArray(MMessageState) as MMessageState[],
                MMessageState.Error
            )
        },
        title: {
            default: text(
                'Prop title',
                ''
            )
        },
        skin: {
            default: select<MMessagePageSkin>(
                'Prop skin',
                Enums.toValueArray(MMessagePageSkin) as MMessagePageSkin[],
                MMessagePageSkin.Default
            )
        },
        hints: {
            default: array(
                'Prop hints',
                [
                    'Lorem ipsum dolor sit amet.', 'Excepteur sint occaecat cupidatat non.'
                ]
            )
        }
    },
    template: `<${MESSAGE_PAGE_NAME}
        :icon-name="iconName"
        :state="state"
        :skin="skin"
        :title="title"
        :hints="hints"
    />`
});

defaultStory.story = {
    name: 'Sandbox'
};

export const Skin = () => ({
    data: () => ({
        skins: Enums.toValueArray(MMessagePageSkin) as MMessagePageSkin[]
    }),
    template: `<div>
        <${MESSAGE_PAGE_NAME}
            v-for="(skin, index) in skins"
            :key="index"
            :class="{ 'm-u--margin-top--l': index > 0 }"
            :skin="skin"
            :title="'Prop skin = ' + skin"
        />
    </div>`
});


export const State = () => ({
    data: () => ({
        states: Enums.toValueArray(MMessageState) as MMessageState[]
    }),
    template: `<div>
        <${MESSAGE_PAGE_NAME}
            v-for="(state, index) in states"
            :key="index"
            :class="{ 'm-u--margin-top--xl': index > 0 }"
            :state="state"
            :title="'Prop state = ' + state"
        />
    </div>`
});

export const IconName = () => ({
    props: {
        iconName: {
            default: text(
                'Prop icon-name',
                ModulIconName.Edit
            )
        }
    },
    template: `<${MESSAGE_PAGE_NAME}
        :icon-name="iconName"
        state="${MMessageState.Confirmation}"
    />`
});


export const Hints = () => ({
    props: {
        hints: {
            default: array(
                'Prop hints',
                [
                    'Lorem ipsum dolor sit amet.', 'Excepteur sint occaecat cupidatat non.'
                ]
            )
        }
    },
    template: `<${MESSAGE_PAGE_NAME}
        :hints="hints"
        state="${MMessageState.Confirmation}"
    />`
});


export const Links = () => ({
    data: () => ({
        links: [new Link('Google', 'www.google.ca', true), new Link('FaceBook', 'www.facebook.com', true)]
    }),
    template: `<${MESSAGE_PAGE_NAME}
        :links="links"
        state="${MMessageState.Confirmation}"
    />`
});

export const DefaultSlot = () => ({
    template: `<${MESSAGE_PAGE_NAME}
        state="${MMessageState.Information}"
    >
        Default slot
    </${MESSAGE_PAGE_NAME}>`
});

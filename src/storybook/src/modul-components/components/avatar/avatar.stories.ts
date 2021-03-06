import { actions } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import { MAvatarSize } from '@ulaval/modul-components/dist/components/avatar/avatar';
import { AVATAR_NAME } from '@ulaval/modul-components/dist/components/component-names';
import Vue from 'vue';
import { DefaultMethods } from 'vue/types/options';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

const image192: string = 'http://placekitten.com/192/192';
const methods: DefaultMethods<Vue> = actions(
    'click',
    'touch'
);

storiesOf(`${modulComponentsHierarchyRootSeparator}${AVATAR_NAME}`, module)
    .add('Small', () => ({
        template: `<m-avatar></m-avatar>`
    }))
    .add('Medium', () => ({
        template: `<m-avatar :size="${MAvatarSize.MEDIUM}"></m-avatar>`
    }))
    .add('Large', () => ({
        template: `<m-avatar :size="${MAvatarSize.LARGE}"></m-avatar>`
    }))
    .add('Image slot', () => ({
        template: `<m-avatar :size="${MAvatarSize.LARGE}"><img src="${image192}"></m-avatar>`
    }))
    .add('Svg slot', () => ({
        template: `<m-avatar :size="${MAvatarSize.LARGE}"><m-icon name="m-svg__profile" :size="${MAvatarSize.LARGE}"></m-icon></m-avatar>`
    }))
    .add('Clickable', () => ({
        methods,
        template: `<m-avatar :size="${MAvatarSize.LARGE}" :clickable="true" @click="click" @touch="touch"><img src="${image192}"></m-avatar>`
    }))
    .add('Custom slot - animation', () => ({
        methods,
        template: `<m-avatar :size="${MAvatarSize.LARGE}" :clickable="true" @click="click" @touch="touch">
                        <div slot="content" slot-scope={contentVisible} style="
                            transition: all 0.1s linear;
                            width: 100%;
                            text-align: center;
                            position: absolute;
                            bottom: -30%;
                            height: 30%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background-color: #333;
                            color: white"
                            :style="[contentVisible ? { 'transform': 'translateY(-100%)' } : {}]"
                        >
                            <span class="m-avatar__default-button">Edit</span>
                        </div>
                    </m-avatar>`
    }));


import { actions } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { ICON_FILE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MBadgeState } from '@ulaval/modul-components/dist/directives/badge/badge';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${ICON_FILE_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    template: `<${ICON_FILE_NAME} extension="xyz" />`
});

defaultStory.story = {
    name: 'default'
};

const TEMPLATE_ICON_BADGE: (extension: string, state: MBadgeState) => string = (extension: string, state: MBadgeState) => `<${ICON_FILE_NAME}
    :size="size"
    extension="${extension}"
    v-m-badge="{ state: '${state}'}" />`;

const getBadgeState = (state: MBadgeState) => ({
    props: {
        size: {
            default: text('Prop size', '28px')
        }
    },
    template: `<div>
        ${TEMPLATE_ICON_BADGE('.bmp', state)}
        ${TEMPLATE_ICON_BADGE('.txt', state)}
        ${TEMPLATE_ICON_BADGE('.doc', state)}
        ${TEMPLATE_ICON_BADGE('.ppt', state)}
        ${TEMPLATE_ICON_BADGE('.xls', state)}
        ${TEMPLATE_ICON_BADGE('.ods', state)}
        ${TEMPLATE_ICON_BADGE('.pdf', state)}
        ${TEMPLATE_ICON_BADGE('.mpeg', state)}
        ${TEMPLATE_ICON_BADGE('.mp3', state)}
        ${TEMPLATE_ICON_BADGE('.zip', state)}
        ${TEMPLATE_ICON_BADGE('xyz', state)}
        ${TEMPLATE_ICON_BADGE('.rm', state)}
        ${TEMPLATE_ICON_BADGE('.mov', state)}
        ${TEMPLATE_ICON_BADGE('.wma', state)}
        ${TEMPLATE_ICON_BADGE('.swf', state)}
    </div>`
});

export const Sandbox = () => ({
    props: {
        extension: {
            default: text('Prop extension', '.pdf')
        },
        size: {
            default: text('Prop size', '40px')
        }
    },
    methods: actions(
        'emitClick'
    ),
    template: `<${ICON_FILE_NAME}
        :extension="extension"
        :size="size"
        @click="emitClick"
    />`
});

export const AllExtensions = () => `<div>
    <h2 class="m-u--h6 m-u--no-margin m-u--margin-bottom--s">image</h2>
    <${ICON_FILE_NAME} extension=".bmp" />
    <${ICON_FILE_NAME} extension=".eps" />
    <${ICON_FILE_NAME} extension=".gif" />
    <${ICON_FILE_NAME} extension=".jpeg" />
    <${ICON_FILE_NAME} extension=".jpg" />
    <${ICON_FILE_NAME} extension=".png" />
    <${ICON_FILE_NAME} extension=".tif" />
    <${ICON_FILE_NAME} extension=".tiff" />
    <${ICON_FILE_NAME} extension=".psd" />
    <${ICON_FILE_NAME} extension=".ai" />
    <${ICON_FILE_NAME} extension=".indd" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">txt</h2>
    <${ICON_FILE_NAME} extension=".txt" />
    <${ICON_FILE_NAME} extension=".csv" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">doc</h2>
    <${ICON_FILE_NAME} extension=".doc" />
    <${ICON_FILE_NAME} extension=".docx" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">vsd</h2>
    <${ICON_FILE_NAME} extension=".vsd" />
    <${ICON_FILE_NAME} extension=".vsdx" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">ppt</h2>
    <${ICON_FILE_NAME} extension=".ppt" />
    <${ICON_FILE_NAME} extension=".pptx" />
    <${ICON_FILE_NAME} extension=".pps" />
    <${ICON_FILE_NAME} extension=".ppsx" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">xls</h2>
    <${ICON_FILE_NAME} extension=".xls" />
    <${ICON_FILE_NAME} extension=".xlsx" />
    <${ICON_FILE_NAME} extension=".xlt" />
    <${ICON_FILE_NAME} extension=".xlv" />
    <${ICON_FILE_NAME} extension=".xlw" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">accdb</h2>
    <${ICON_FILE_NAME} extension=".mdb" />
    <${ICON_FILE_NAME} extension=".accdb" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">pdf</h2>
    <${ICON_FILE_NAME} extension=".pdf" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">Realmedia</h2>
    <${ICON_FILE_NAME} extension=".rm" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">Wma</h2>
    <${ICON_FILE_NAME} extension=".wma" />
    <${ICON_FILE_NAME} extension=".wmv" />
    <${ICON_FILE_NAME} extension=".asf" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">Mov</h2>
    <${ICON_FILE_NAME} extension=".mov" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">swf</h2>
    <${ICON_FILE_NAME} extension=".swf" />
    <${ICON_FILE_NAME} extension=".flv" />
    <${ICON_FILE_NAME} extension=".fla" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">video</h2>
    <${ICON_FILE_NAME} extension=".mpeg" />
    <${ICON_FILE_NAME} extension=".mp4" />
    <${ICON_FILE_NAME} extension=".avi" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">audio</h2>
    <${ICON_FILE_NAME} extension=".mp3" />
    <${ICON_FILE_NAME} extension=".ogg" />
    <${ICON_FILE_NAME} extension=".wav" />
    <${ICON_FILE_NAME} extension=".aiff" />
    <${ICON_FILE_NAME} extension=".aac" />
    <${ICON_FILE_NAME} extension=".ra" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">zip</h2>
    <${ICON_FILE_NAME} extension=".zip" />
    <${ICON_FILE_NAME} extension=".rar" />
    <${ICON_FILE_NAME} extension=".tar" />
    <${ICON_FILE_NAME} extension=".gtar" />
    <${ICON_FILE_NAME} extension=".gz" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">openoffice</h2>
    <${ICON_FILE_NAME} extension=".sxw" />
    <${ICON_FILE_NAME} extension=".sxi" />
    <${ICON_FILE_NAME} extension=".sxd" />
    <${ICON_FILE_NAME} extension=".sxc" />
    <${ICON_FILE_NAME} extension=".sxm" />
    <${ICON_FILE_NAME} extension=".sxg" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">odt</h2>
    <${ICON_FILE_NAME} extension=".odt" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">odp</h2>
    <${ICON_FILE_NAME} extension=".odp" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">odg</h2>
    <${ICON_FILE_NAME} extension=".odg" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">ods</h2>
    <${ICON_FILE_NAME} extension=".ods" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">odf</h2>
    <${ICON_FILE_NAME} extension=".odf" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">odb</h2>
    <${ICON_FILE_NAME} extension=".odb" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">dwg</h2>
    <${ICON_FILE_NAME} extension=".dwg" />
    <${ICON_FILE_NAME} extension=".dao" />
    <${ICON_FILE_NAME} extension=".cao" />
    <${ICON_FILE_NAME} extension=".dxf" />
    <${ICON_FILE_NAME} extension=".dwf" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">markup</h2>
    <${ICON_FILE_NAME} extension=".xml" />
    <${ICON_FILE_NAME} extension=".html" />
    <${ICON_FILE_NAME} extension=".htm" />

    <h2 class="m-u--h6 m-u--margin-bottom--s">code</h2>
    <${ICON_FILE_NAME} extension=".css" />
    <${ICON_FILE_NAME} extension=".scss" />
    <${ICON_FILE_NAME} extension=".json" />
    <${ICON_FILE_NAME} extension=".js" />
    <${ICON_FILE_NAME} extension=".ts" />
</div>`;

export const BadgeCompleted = () => getBadgeState(MBadgeState.Completed);

export const BadgeError = () => getBadgeState(MBadgeState.Error);

export const BadgeWarning = () => getBadgeState(MBadgeState.Warning);


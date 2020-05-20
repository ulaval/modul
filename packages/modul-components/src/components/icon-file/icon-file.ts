import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { ModulIconName } from '../../assets/icons/modul-icons';
import { Messages } from '../../utils/i18n/i18n';
import { REGEX_CSS_NUMBER_VALUE } from '../../utils/props-validation/props-validation';
import { ICON_FILE_NAME } from '../component-names';
import IconPluggin from '../icon/icon';
import { MSvg } from '../svg/svg';
import WithRender from './icon-file.html';

// Extensions list
const EXT_IMAGE: string = 'bmp,eps,gif,jpeg,jpg,png,tif,tiff,psd,ai,indd';
const EXT_TEXT: string = 'txt,csv';
const EXT_DOC: string = 'doc,docx';
const EXT_VSD: string = 'vsd,vsdx';
const EXT_PPT: string = 'ppt,pptx,pps,ppsx';
const EXT_XLS: string = 'xls,xlsx,xlt,xlv,xlw';
const EXT_ACCDB: string = 'mdb,accdb';
const EXT_PDF: string = 'pdf';
const EXT_RM: string = 'rm';
const EXT_MOV: string = 'mov';
const EXT_WMA: string = 'wma,wmv,asf';
const EXT_SWF: string = 'swf,flv,fla';
const EXT_VIDEO: string = 'mpeg,mp4,avi';
const EXT_MUSIC: string = 'mp3,ogg,wav,aiff,aac,ra';
const EXT_ARCHIVE: string = 'zip,rar,tar,gtar,gz';
const EXT_OPEN_OFFICE: string = 'sxw,sxi,sxd,sxc,sxm,sxg';
const EXT_ODT: string = 'odt';
const EXT_ODP: string = 'odp';
const EXT_ODG: string = 'odg';
const EXT_ODS: string = 'ods';
const EXT_ODF: string = 'odf';
const EXT_ODB: string = 'odb';
const EXT_DWG: string = 'dwg,dao,cao,dxf,dwf';
const EXT_MARKUP_XML: string = 'xml';
const EXT_MARKUP_HTML: string = 'html,htm';
const EXT_CODE_CSS: string = 'css,scss';
const EXT_CODE_JSON: string = 'json';
const EXT_CODE_SCRIPT: string = 'js,ts';

// Extensions Tooltips
const TOOLTIP_IMAGE: string = 'image';
const TOOLTIP_TEXT: string = 'txt';
const TOOLTIP_WORD: string = 'doc';
const TOOLTIP_VISIO: string = 'vsd';
const TOOLTIP_POWERPOINT: string = 'ppt';
const TOOLTIP_EXCEL: string = 'xls';
const TOOLTIP_ACCESS: string = 'accdb';
const TOOLTIP_PDF: string = 'pdf';
const TOOLTIP_REALPLAYER: string = 'rm';
const TOOLTIP_QUICKTIME: string = 'mov';
const TOOLTIP_MEDIAPLAYER: string = 'wma';
const TOOLTIP_FLASH: string = 'swf';
const TOOLTIP_VIDEO: string = 'video';
const TOOLTIP_AUDIO: string = 'music';
const TOOLTIP_ZIP: string = 'zip';
const TOOLTIP_OPENOFFICE_DEFAULT: string = 'openoffice1';
const TOOLTIP_OPENOFFICE_WRITTER: string = 'odt';
const TOOLTIP_OPENOFFICE_IMPRESS: string = 'odp';
const TOOLTIP_OPENOFFICE_DRAW: string = 'odg';
const TOOLTIP_OPENOFFICE_CALC: string = 'ods';
const TOOLTIP_OPENOFFICE_MATH: string = 'odf';
const TOOLTIP_OPENOFFICE_BASE: string = 'odb';
const TOOLTIP_DWG: string = 'dwg';
const TOOLTIP_MARKUP_XML: string = 'xml';
const TOOLTIP_MARKUP_HTML: string = 'html';
const TOOLTIP_CODE_CSS: string = 'css';
const TOOLTIP_CODE_JSON: string = 'json';
const TOOLTIP_CODE_SCRIPT: string = 'js';
const TOOLTIP_OTHER: string = 'default';

type FileGroup = {
    [key: string]: string
};

@WithRender
@Component({
    components: {
        MSvg
    }
})
export class MIconFile extends Vue {
    @Prop()
    public extension: string;

    @Prop({
        default: '24px',
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value)
    })
    public size: string;

    private tooltipGroup: FileGroup = {};
    private fileMap: FileGroup = {};

    @Emit('click')
    emitClick(event: MouseEvent): void { }

    @Emit('keydown')
    emitKeydown(event: KeyboardEvent): void { }

    public get spriteId(): string {
        let cleanExtension: string = this.extension ? this.extension.replace('.', '').toLowerCase() : '';
        return this.fileMap[cleanExtension] || ModulIconName.FileDefault;
    }

    public beforeMount(): void {
        this.mapExtensionsGroup(EXT_IMAGE, ModulIconName.FileImage, TOOLTIP_IMAGE);
        this.mapExtensionsGroup(EXT_TEXT, ModulIconName.FileText, TOOLTIP_TEXT);
        this.mapExtensionsGroup(EXT_DOC, ModulIconName.FileWord, TOOLTIP_WORD);
        this.mapExtensionsGroup(EXT_VSD, ModulIconName.FileVisio, TOOLTIP_VISIO);
        this.mapExtensionsGroup(EXT_PPT, ModulIconName.FilePowerpoint, TOOLTIP_POWERPOINT);
        this.mapExtensionsGroup(EXT_XLS, ModulIconName.FileExcel, TOOLTIP_EXCEL);
        this.mapExtensionsGroup(EXT_ACCDB, ModulIconName.FileAccess, TOOLTIP_ACCESS);
        this.mapExtensionsGroup(EXT_PDF, ModulIconName.FilePdf, TOOLTIP_PDF);
        this.mapExtensionsGroup(EXT_RM, ModulIconName.FileRealplayer, TOOLTIP_REALPLAYER);
        this.mapExtensionsGroup(EXT_MOV, ModulIconName.FileQuicktime, TOOLTIP_QUICKTIME);
        this.mapExtensionsGroup(EXT_WMA, ModulIconName.FileMediaplayer, TOOLTIP_MEDIAPLAYER);
        this.mapExtensionsGroup(EXT_SWF, ModulIconName.FileFlash, TOOLTIP_FLASH);
        this.mapExtensionsGroup(EXT_VIDEO, ModulIconName.FileVideo, TOOLTIP_VIDEO);
        this.mapExtensionsGroup(EXT_MUSIC, ModulIconName.FileAudio, TOOLTIP_AUDIO);
        this.mapExtensionsGroup(EXT_ARCHIVE, ModulIconName.FileZip, TOOLTIP_ZIP);
        this.mapExtensionsGroup(EXT_OPEN_OFFICE, ModulIconName.FileOpenofficeDefault, TOOLTIP_OPENOFFICE_DEFAULT);
        this.mapExtensionsGroup(EXT_ODT, ModulIconName.FileOpenofficeWritter, TOOLTIP_OPENOFFICE_WRITTER);
        this.mapExtensionsGroup(EXT_ODP, ModulIconName.FileOpenofficeImpress, TOOLTIP_OPENOFFICE_IMPRESS);
        this.mapExtensionsGroup(EXT_ODG, ModulIconName.FileOpenofficeDraw, TOOLTIP_OPENOFFICE_DRAW);
        this.mapExtensionsGroup(EXT_ODS, ModulIconName.FileOpenofficeCalc, TOOLTIP_OPENOFFICE_CALC);
        this.mapExtensionsGroup(EXT_ODF, ModulIconName.FileOpenofficeMath, TOOLTIP_OPENOFFICE_MATH);
        this.mapExtensionsGroup(EXT_ODB, ModulIconName.FileOpenofficeBase, TOOLTIP_OPENOFFICE_BASE);
        this.mapExtensionsGroup(EXT_DWG, ModulIconName.FileDwg, TOOLTIP_DWG);
        this.mapExtensionsGroup(EXT_CODE_CSS, ModulIconName.FileCode, TOOLTIP_CODE_CSS);
        this.mapExtensionsGroup(EXT_CODE_JSON, ModulIconName.FileCode, TOOLTIP_CODE_JSON);
        this.mapExtensionsGroup(EXT_CODE_SCRIPT, ModulIconName.FileCode, TOOLTIP_CODE_SCRIPT);
        this.mapExtensionsGroup(EXT_MARKUP_XML, ModulIconName.FileMarkup, TOOLTIP_MARKUP_XML);
        this.mapExtensionsGroup(EXT_MARKUP_HTML, ModulIconName.FileMarkup, TOOLTIP_MARKUP_HTML);
    }

    public get svgTitle(): string {
        let cleanExtension: string = this.extension ? this.extension.replace('.', '').toLowerCase() : '';
        let currentTooltip: string = this.tooltipGroup[cleanExtension] || TOOLTIP_OTHER;
        let i18n: Messages = (Vue.prototype).$i18n;
        let tooltipContent: string = i18n.translate(`m-icon-file:${currentTooltip}`);

        return tooltipContent;
    }

    private mapExtensionsGroup(extensions, category: string, tooltip: string): void {
        extensions.split(',').forEach(ex => this.fileMap[ex] = category);
        extensions.split(',').forEach(ex => this.tooltipGroup[ex] = tooltip);
    }
}

const IconFilePlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(IconPluggin);
        v.component(ICON_FILE_NAME, MIconFile);
    }
};

export default IconFilePlugin;

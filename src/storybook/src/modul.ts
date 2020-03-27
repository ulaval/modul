import AccordionGroupPlugin from '@ulaval/modul-components/dist/components/accordion-group/accordion-group';
import AccordionPlugin from '@ulaval/modul-components/dist/components/accordion/accordion';
import AddPlugin from '@ulaval/modul-components/dist/components/add/add';
import AutoCompletePlugin from '@ulaval/modul-components/dist/components/autocomplete/autocomplete';
import AvatarPlugin from '@ulaval/modul-components/dist/components/avatar/avatar';
import BreadcrumbsPlugin from '@ulaval/modul-components/dist/components/breadcrumbs/breadcrumbs';
import ButtonPlugin from '@ulaval/modul-components/dist/components/button/button';
import CarouselPlugin from '@ulaval/modul-components/dist/components/carousel/carousel';
import CheckboxPlugin from '@ulaval/modul-components/dist/components/checkbox/checkbox';
import ChipPlugin from '@ulaval/modul-components/dist/components/chip/chip';
import CopyToClipboardPlugin from '@ulaval/modul-components/dist/components/copy-to-clipboard/copy-to-clipboard';
import DatepickerPlugin from '@ulaval/modul-components/dist/components/datepicker/datepicker';
import DaterangepickerPlugin from '@ulaval/modul-components/dist/components/daterangepicker/daterangepicker';
import DecimalfieldPlugin from '@ulaval/modul-components/dist/components/decimalfield/decimalfield';
import DialogPlugin from '@ulaval/modul-components/dist/components/dialog/dialog';
import DropdownPlugin from '@ulaval/modul-components/dist/components/dropdown/dropdown';
import ExpandableLayoutPlugin from '@ulaval/modul-components/dist/components/expandable-layout/expandable-layout';
import FileSelectPlugin from '@ulaval/modul-components/dist/components/file-select/file-select';
import FileUploadPlugin from '@ulaval/modul-components/dist/components/file-upload/file-upload';
import { FormPlugin } from '@ulaval/modul-components/dist/components/form/form.plugin';
import I18nPlugin from '@ulaval/modul-components/dist/components/i18n/i18n';
import IconButtonPlugin from '@ulaval/modul-components/dist/components/icon-button/icon-button';
import IconFilePlugin from '@ulaval/modul-components/dist/components/icon-file/icon-file';
import IconPlugin from '@ulaval/modul-components/dist/components/icon/icon';
import InplaceEditPlugin from '@ulaval/modul-components/dist/components/inplace-edit/inplace-edit';
import InputGroupPlugin from '@ulaval/modul-components/dist/components/input-group/input-group';
import IntegerfieldPlugin from '@ulaval/modul-components/dist/components/integerfield/integerfield';
import LimitTextPlugin from '@ulaval/modul-components/dist/components/limit-text/limit-text';
import LinkPlugin from '@ulaval/modul-components/dist/components/link/link';
import ListItemPlugin from '@ulaval/modul-components/dist/components/list-item/list-item';
import MaskedfieldPlugin from '@ulaval/modul-components/dist/components/maskedfield/maskedfield';
import MenuPlugin from '@ulaval/modul-components/dist/components/menu/menu';
import ModalPlugin from '@ulaval/modul-components/dist/components/modal/modal';
import MoneyFieldPlugin from '@ulaval/modul-components/dist/components/moneyfield/moneyfield';
import MultiSelectPlugin from '@ulaval/modul-components/dist/components/multi-select/multi-select';
import NavbarPlugin from '@ulaval/modul-components/dist/components/navbar/navbar';
import OptionPlugin from '@ulaval/modul-components/dist/components/option/option';
import OrganizeTableColumnsModalPlugin from '@ulaval/modul-components/dist/components/organize-table-columns-modal/organize-table-columns-modal';
import OrganizeTableColumnsPlugin from '@ulaval/modul-components/dist/components/organize-table-columns-modal/organize-table-columns/organize-table-columns';
import OverlayPlugin from '@ulaval/modul-components/dist/components/overlay/overlay';
import PaginationPlguin from '@ulaval/modul-components/dist/components/pagination/pagination';
import PanelPlugin from '@ulaval/modul-components/dist/components/panel/panel';
import PopupPlugin from '@ulaval/modul-components/dist/components/popup/popup';
import PostalcodefieldPlugin from '@ulaval/modul-components/dist/components/postalcodefield/postalcodefield';
import ProgressPlugin from '@ulaval/modul-components/dist/components/progress/progress';
import RadioGroupPlugin from '@ulaval/modul-components/dist/components/radio-group/radio-group';
import SearchfieldPlugin from '@ulaval/modul-components/dist/components/searchfield/searchfield';
import SelectPlugin from '@ulaval/modul-components/dist/components/select/select';
import ShowMorePlugin from '@ulaval/modul-components/dist/components/show-more/show-more';
import SpinnerPlugin from '@ulaval/modul-components/dist/components/spinner/spinner';
import SteppersPlugin from '@ulaval/modul-components/dist/components/steppers/steppers';
import SwitchPlugin from '@ulaval/modul-components/dist/components/switch/switch';
import TableHeaderPlugin from '@ulaval/modul-components/dist/components/table-header/table-header';
import TablePlugin from '@ulaval/modul-components/dist/components/table/table';
import TextareaPlugin from '@ulaval/modul-components/dist/components/textarea/textarea';
import TextfieldPlugin from '@ulaval/modul-components/dist/components/textfield/textfield';
import TimepickerPlugin from '@ulaval/modul-components/dist/components/timepicker/timepicker';
import ToastPlugin from '@ulaval/modul-components/dist/components/toast/toast';
import ToggleButtonsPlugin from '@ulaval/modul-components/dist/components/toggle-buttons/toggle-buttons';
import TooltipPlugin from '@ulaval/modul-components/dist/components/tooltip/tooltip';
import AccordionTransitionPlugin from '@ulaval/modul-components/dist/components/transitions/accordion-transition/accordion-transition';
import SlideTransitionPlugin from '@ulaval/modul-components/dist/components/transitions/slide-transition/slide-transition';
import TreePlugin from '@ulaval/modul-components/dist/components/tree/tree';
import FrenchPlugin from '@ulaval/modul-components/dist/lang/fr';
import '@ulaval/modul-components/dist/styles/main.scss';
import MessagePlugin, { FRENCH } from '@ulaval/modul-components/dist/utils/i18n/i18n';
import ScrollToPlugin from '@ulaval/modul-components/dist/utils/scroll-to/scroll-to';
import DefaultSpritesPlugin from '@ulaval/modul-components/dist/utils/svg/default-sprites';
import UtilsPlugin, { UtilsPluginOptions } from '@ulaval/modul-components/dist/utils/utils-plugin';
import ComponentExamplesPlugin from '@ulaval/modul-website/src/component-examples/component-example-plugins';
import Vue, { PluginObject } from 'vue';
import VueRouter from 'vue-router';
import './styles/storybook.scss';


export const ModulPlugin: PluginObject<any> = {
    install(v, options): void {

        Vue.use(VueRouter);


        let utilsOptions: UtilsPluginOptions = {
            propagateVueParserErrors: false,
            i18PluginOptions: {
                curLang: FRENCH
            }
        };

        Vue.use(UtilsPlugin, utilsOptions);
        Vue.use(FrenchPlugin);
        Vue.use(DefaultSpritesPlugin);

        // modul-components
        Vue.use(ButtonPlugin);
        Vue.use(I18nPlugin);
        Vue.use(IconPlugin);
        Vue.use(IconButtonPlugin);
        Vue.use(AccordionPlugin);
        Vue.use(NavbarPlugin);
        Vue.use(LinkPlugin);
        Vue.use(ModalPlugin);
        Vue.use(DropdownPlugin);
        Vue.use(TextfieldPlugin);
        Vue.use(PanelPlugin);
        Vue.use(MessagePlugin);
        Vue.use(SearchfieldPlugin);
        Vue.use(ButtonPlugin);
        Vue.use(ExpandableLayoutPlugin);
        Vue.use(CarouselPlugin);
        Vue.use(CheckboxPlugin);
        Vue.use(AccordionGroupPlugin);
        Vue.use(DaterangepickerPlugin);
        Vue.use(DialogPlugin);
        Vue.use(FileUploadPlugin);
        Vue.use(FileSelectPlugin);
        Vue.use(IconFilePlugin);
        Vue.use(InplaceEditPlugin);
        Vue.use(TextareaPlugin);
        Vue.use(LimitTextPlugin);
        Vue.use(ListItemPlugin);
        Vue.use(MenuPlugin);
        Vue.use(MessagePlugin);
        Vue.use(ModalPlugin);
        Vue.use(NavbarPlugin);
        Vue.use(OptionPlugin);
        Vue.use(OrganizeTableColumnsPlugin);
        Vue.use(OrganizeTableColumnsModalPlugin);
        Vue.use(OverlayPlugin);
        Vue.use(AddPlugin);
        Vue.use(PopupPlugin);
        Vue.use(ProgressPlugin);
        Vue.use(RadioGroupPlugin);
        Vue.use(ScrollToPlugin);
        Vue.use(ShowMorePlugin);
        Vue.use(SpinnerPlugin);
        Vue.use(SteppersPlugin);
        Vue.use(SwitchPlugin);
        Vue.use(TablePlugin);
        Vue.use(TooltipPlugin);
        Vue.use(DatepickerPlugin);
        Vue.use(TimepickerPlugin);
        Vue.use(InputGroupPlugin);
        Vue.use(AutoCompletePlugin);
        Vue.use(ToggleButtonsPlugin);
        Vue.use(SearchfieldPlugin);
        Vue.use(TableHeaderPlugin);
        Vue.use(SlideTransitionPlugin);
        Vue.use(AccordionTransitionPlugin);
        Vue.use(TreePlugin);
        Vue.use(ToastPlugin);
        Vue.use(PaginationPlguin);
        Vue.use(AvatarPlugin);
        Vue.use(BreadcrumbsPlugin);
        Vue.use(ChipPlugin);
        Vue.use(CopyToClipboardPlugin);
        Vue.use(MultiSelectPlugin);
        Vue.use(SelectPlugin);

        Vue.use(MoneyFieldPlugin);
        Vue.use(DecimalfieldPlugin);
        Vue.use(IntegerfieldPlugin);
        Vue.use(MaskedfieldPlugin);
        Vue.use(PostalcodefieldPlugin);
        Vue.use(FormPlugin);

        // modul-website
        Vue.use(ComponentExamplesPlugin);
    }
};

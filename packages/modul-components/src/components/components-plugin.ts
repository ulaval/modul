import Vue, { PluginObject } from 'vue';
import LoggerPlugin from '../utils/logger/logger';
import ScrollToPlugin from '../utils/scroll-to/scroll-to';
import AccordionGroupPlugin from './accordion-group/accordion-group';
import AccordionPlugin from './accordion/accordion';
import AddPlugin from './add/add';
import AutoCompletePlugin from './autocomplete/autocomplete';
import AvatarPlugin from './avatar/avatar';
import ButtonPlugin from './button/button';
import CalendarPlugin from './calendar/calendar';
import CarouselPlugin from './carousel/carousel';
import CharacterCountPlugin from './character-count/character-count';
import CheckboxPlugin from './checkbox/checkbox';
import MChipPlugin from './chip/chip';
import DatepickerPlugin from './datepicker/datepicker';
import DaterangepickerPlugin from './daterangepicker/daterangepicker';
import DecimalfieldPlugin from './decimalfield/decimalfield';
import DialogPlugin from './dialog/dialog';
import DropdownPlugin from './dropdown/dropdown';
import ErrorAccessDeniedPlugin from './error-pages/error-access-denied/error-access-denied';
import ErrorBrowserNotSupported from './error-pages/error-browser-not-supported/error-browser-not-supported';
import ErrorConfigNotSupportedPlugin from './error-pages/error-config-not-supported/error-config-not-supported';
import ErrorOperationFailedPlugin from './error-pages/error-conflict/error-conflict';
import ErrorCookiesNotSupportedPlugin from './error-pages/error-cookies-not-supported/error-cookies-not-supported';
import ErrorPageNotFoundPlugin from './error-pages/error-page-not-found/error-page-not-found';
import ErrorResourceUnavailablePlugin from './error-pages/error-resource-unavailable/error-resource-unavailable';
import SessionExpiredPlugin from './error-pages/error-session-expired/error-session-expired';
import ErrorTechnicalDifficultyPlugin from './error-pages/error-technical-difficulty/error-technical-difficulty';
import ExpandableLayoutPlugin from './expandable-layout/expandable-layout';
import FileSelectPlugin from './file-select/file-select';
import FileUploadPlugin from './file-upload/file-upload';
import FormPlugin, { FormPluginOptions } from './form/form.plugin';
import I18nPlugin from './i18n/i18n';
import IconButtonPlugin from './icon-button/icon-button';
import IconFilePlugin from './icon-file/icon-file';
import IconPlugin from './icon/icon';
import InplaceEditPlugin from './inplace-edit/inplace-edit';
import InputGroupPlugin from './input-group/input-group';
import IntegerfieldPlugin from './integerfield/integerfield';
import LimitTextPlugin from './limit-text/limit-text';
import LinkPlugin from './link/link';
import ListItemPlugin from './list-item/list-item';
import MenuPlugin from './menu/menu';
import MessagePlugin from './message/message';
import ModalPlugin from './modal/modal';
import MoneyFieldPlugin from './moneyfield/moneyfield';
import MultiSelectPlugin from './multi-select/multi-select';
import NavbarPlugin from './navbar/navbar';
import OptionPlugin from './option/option';
import OrganizeTableColumnsModalPlugin from './organize-table-columns-modal/organize-table-columns-modal';
import OverlayPlugin from './overlay/overlay';
import PaginationPlugin from './pagination/pagination';
import PanelPlugin from './panel/panel';
import PeriodpickerPlugin from './periodpicker/periodpicker';
import PopupPlugin from './popup/popup';
import PostalcodefieldPlugin from './postalcodefield/postalcodefield';
import ProgressPlugin from './progress/progress';
import RadioGroupPlugin from './radio-group/radio-group';
import RadioStylePlugin from './radio-style/radio-style';
import RadioPlugin from './radio/radio';
import ScrollTopPlugin from './scroll-top/scroll-top';
import SearchfieldPlugin from './searchfield/searchfield';
import ShowMorePlugin from './show-more/show-more';
import SpinnerPlugin from './spinner/spinner';
import SteppersPlugin from './steppers/steppers';
import SwitchPlugin from './switch/switch';
import TableHeaderPlugin from './table-header/table-header';
import TablePlugin from './table/table';
import TextareaPlugin from './textarea/textarea';
import TextfieldPlugin from './textfield/textfield';
import TimepickerPlugin from './timepicker/timepicker';
import ToastPlugin from './toast/toast';
import ToggleButtonsPlugin from './toggle-buttons/toggle-buttons';
import TooltipPlugin from './tooltip/tooltip';
import AccordionTransitionPlugin from './transitions/accordion-transition/accordion-transition';
import OpacityTransitionPlugin from './transitions/opacity-transition/opacity-transition';
import SlideTransitionPlugin from './transitions/slide-transition/slide-transition';
import TreePlugin from './tree/tree';
import TypeaheadPlugin from './typeahead/typeahead';
import ValidationMessagePlugin from './validation-message/validation-message';

export interface ComponentPluginOptions {
    formPluginOptions?: FormPluginOptions;
}

const ComponentsPlugin: PluginObject<any> = {
    install(v, options: ComponentPluginOptions = {}): void {
        if (!v.prototype.$log) {
            Vue.use(LoggerPlugin);
        }

        Vue.use(AccordionGroupPlugin);
        Vue.use(AccordionPlugin);
        Vue.use(AccordionTransitionPlugin);
        Vue.use(AddPlugin);
        Vue.use(ButtonPlugin);
        Vue.use(CalendarPlugin);
        Vue.use(CarouselPlugin);
        Vue.use(CharacterCountPlugin);
        Vue.use(CheckboxPlugin);
        Vue.use(DatepickerPlugin);
        Vue.use(DaterangepickerPlugin);
        Vue.use(ModalPlugin);
        Vue.use(DropdownPlugin);
        Vue.use(AutoCompletePlugin);
        Vue.use(OverlayPlugin);
        Vue.use(FileSelectPlugin);
        Vue.use(FileUploadPlugin);
        Vue.use(FormPlugin, options.formPluginOptions ? options.formPluginOptions : undefined);
        Vue.use(I18nPlugin);
        Vue.use(IconPlugin);
        Vue.use(IconButtonPlugin);
        Vue.use(IconFilePlugin);
        Vue.use(InputGroupPlugin);
        Vue.use(LimitTextPlugin);
        Vue.use(LinkPlugin);
        Vue.use(ListItemPlugin);
        Vue.use(MessagePlugin);
        Vue.use(DialogPlugin);
        Vue.use(NavbarPlugin);
        Vue.use(OpacityTransitionPlugin);
        Vue.use(OptionPlugin);
        Vue.use(MenuPlugin);
        Vue.use(PanelPlugin);
        Vue.use(PeriodpickerPlugin);
        Vue.use(PopupPlugin);
        Vue.use(ProgressPlugin);
        Vue.use(RadioPlugin);
        Vue.use(RadioGroupPlugin);
        Vue.use(RadioStylePlugin);
        Vue.use(ScrollTopPlugin);
        Vue.use(ShowMorePlugin);
        Vue.use(SpinnerPlugin);
        Vue.use(SlideTransitionPlugin);
        Vue.use(SteppersPlugin);
        Vue.use(SwitchPlugin);
        Vue.use(TablePlugin);
        Vue.use(MultiSelectPlugin);
        Vue.use(TableHeaderPlugin);
        Vue.use(TextareaPlugin);
        Vue.use(TextfieldPlugin);
        Vue.use(SearchfieldPlugin);
        Vue.use(TimepickerPlugin);
        Vue.use(ToastPlugin);
        Vue.use(ToggleButtonsPlugin);
        Vue.use(TooltipPlugin);
        Vue.use(TreePlugin);
        Vue.use(TypeaheadPlugin);
        Vue.use(ValidationMessagePlugin);
        Vue.use(InplaceEditPlugin);
        Vue.use(PaginationPlugin);
        Vue.use(MChipPlugin);
        Vue.use(PostalcodefieldPlugin);
        Vue.use(MoneyFieldPlugin);
        Vue.use(DecimalfieldPlugin);
        Vue.use(IntegerfieldPlugin);
        Vue.use(ErrorAccessDeniedPlugin);
        Vue.use(ErrorBrowserNotSupported);
        Vue.use(ErrorConfigNotSupportedPlugin);
        Vue.use(ErrorOperationFailedPlugin);
        Vue.use(ErrorCookiesNotSupportedPlugin);
        Vue.use(ErrorPageNotFoundPlugin);
        Vue.use(ErrorResourceUnavailablePlugin);
        Vue.use(SessionExpiredPlugin);
        Vue.use(ErrorTechnicalDifficultyPlugin);
        Vue.use(OrganizeTableColumnsModalPlugin);
        Vue.use(ScrollToPlugin);
        Vue.use(ExpandableLayoutPlugin);
        Vue.use(AvatarPlugin);
    }
};

export default ComponentsPlugin;

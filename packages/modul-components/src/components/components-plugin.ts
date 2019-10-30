import Vue, { PluginObject } from 'vue';
import { AddressLookupPluginOptions } from '../utils/address-lookup/address-lookup.plugin';
import LoggerPlugin from '../utils/logger/logger';
import AccordionGroupPlugin from './accordion-group/accordion-group';
import AccordionPlugin from './accordion/accordion';
import AddPlugin from './add/add';
import AddressPlugin from './address/address';
import AvatarPlugin from './avatar/avatar';
import BreadcrumbsPlugin from './breadcrumbs/breadcrumbs';
import ButtonPlugin from './button/button';
import CalendarPlugin from './calendar/calendar';
import CarouselPlugin from './carousel/carousel';
import CharacterCountPlugin from './character-count/character-count';
import CheckboxPlugin from './checkbox/checkbox';
import ChipPlugin from './chip/chip';
import ChipAddPlugin from './chip/chip-add/chip-add';
import ChipDeletePlugin from './chip/chip-delete/chip-delete';
import DatefieldsPlugin from './datefields/datefields';
import DatepickerPlugin from './datepicker/datepicker';
import DaterangepickerPlugin from './daterangepicker/daterangepicker';
import DialogPlugin from './dialog/dialog';
import DropdownGroupPlugin from './dropdown-group/dropdown-group';
import DropdownPlugin from './dropdown/dropdown';
import DynamicTemplatePlugin from './dynamic-template/dynamic-template';
import ErrorMessage from './error-message/error-message';
import ErrorAccessDenied from './error-pages/error-access-denied/error-access-denied';
import ErrorBrowserNotSupported from './error-pages/error-browser-not-supported/error-browser-not-supported';
import ErrorConfigNotSupported from './error-pages/error-config-not-supported/error-config-not-supported';
import ErrorConflictPlugin from './error-pages/error-conflict/error-conflict';
import ErrorCookiesNotSupported from './error-pages/error-cookies-not-supported/error-cookies-not-supported';
import ErrorPageNotFoundPlugin from './error-pages/error-page-not-found/error-page-not-found';
import ErrorResourceUnavailablePlugin from './error-pages/error-resource-unavailable/error-resource-unavailable';
import ErrorTechnicalDifficultyPlugin from './error-pages/error-technical-difficulty/error-technical-difficulty';
import ExpandableLayoutPlugin from './expandable-layout/expandable-layout';
import FileSelectPlugin from './file-select/file-select';
import FileUploadPlugin from './file-upload/file-upload';
import FlexTemplatePlugin from './flex-template/flex-template';
import FormPlugin from './form/form.plugin';
import I18nPlugin from './i18n/i18n';
import IconButtonPlugin from './icon-button/icon-button';
import IconFilePlugin from './icon-file/icon-file';
import IconPlugin from './icon/icon';
import InplaceEditPlugin from './inplace-edit/inplace-edit';
import InputGroupPlugin from './input-group/input-group';
import InputStylePlugin from './input-style/input-style';
import LimitTextPlugin from './limit-text/limit-text';
import LinkPlugin from './link/link';
import ListItemPlugin from './list-item/list-item';
import LoginPlugin from './login/login';
import MenuPlugin from './menu/menu';
import MessagePagePlugin from './message-page/message-page';
import MessagePlugin from './message/message';
import ModalPlugin from './modal/modal';
import NavbarPlugin from './navbar/navbar';
import OptionPlugin from './option/option';
import Overlay from './overlay/overlay';
import PageNotFoundPlugin from './page-not-found/page-not-found';
import PanelPlugin from './panel/panel';
import PeriodpickerPlugin from './periodpicker/periodpicker';
import PhoneNumberPlugin from './phone-number/phone-number';
import PhotoEditorPlugin from './photo-editor/photo-editor';
import PlusPlugin from './plus/plus';
import PopperPlugin from './popper/popper';
import PopupPlugin from './popup/popup';
import ProgressPluggin from './progress/progress';
import RadioGroupPlugin from './radio-group/radio-group';
import RadioStylePlugin from './radio-style/radio-style';
import RadioPlugin from './radio/radio';
import RichTextEditorPlugin from './rich-text-editor/rich-text-editor';
import RichTextLicensePlugin, { RichTextLicensePluginOptions } from './rich-text-editor/rich-text-license-plugin';
import RichTextPlugin from './rich-text/rich-text';
import ScrollTopPlugin from './scroll-top/scroll-top';
import SearchfieldPlugin from './searchfield/searchfield';
import SessionExpiredPlugin from './session-expired/session-expired';
import ShowMorePlugin from './show-more/show-more';
import SidebarPlugin from './sidebar/sidebar';
import SliderPlugin from './slider/slider';
import SpinnerPlugin from './spinner/spinner';
import Status from './status/status';
import StepPlugin from './step/step';
import SteppersPlugin from './steppers/steppers';
import SwitchPlugin from './switch/switch';
import TabPanelPlugin from './tab-panel/tab-panel';
import TableHeaderPlugin from './table-header/table-header';
import TablePlugin from './table/table';
import TabsPlugin from './tabs/tabs';
import TemplatePlugin from './template/template';
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
    richTextOptions?: RichTextLicensePluginOptions;
    loquateOptions?: AddressLookupPluginOptions;
}

const ComponentsPlugin: PluginObject<any> = {
    install(v, options: ComponentPluginOptions = {}): void {
        if (!v.prototype.$log) {
            Vue.use(LoggerPlugin);
        }

        v.prototype.$log.error('ComponentsPlugin will be deprecated in modul v.1.0, components should now be installed separately');

        Vue.use(AccordionGroupPlugin);
        Vue.use(AccordionPlugin);
        Vue.use(AccordionTransitionPlugin);
        Vue.use(AddPlugin);
        Vue.use(AddressPlugin, { loqateKey: options.loquateOptions ? 'LOQATE_KEY=BT13-ZT19-TB79-DC28' : undefined } as AddressLookupPluginOptions);
        Vue.use(AvatarPlugin);
        Vue.use(BreadcrumbsPlugin);
        Vue.use(ButtonPlugin);
        Vue.use(CalendarPlugin);
        Vue.use(CarouselPlugin);
        Vue.use(CharacterCountPlugin);
        Vue.use(CheckboxPlugin);
        Vue.use(ChipPlugin);
        Vue.use(ChipAddPlugin);
        Vue.use(ChipDeletePlugin);
        Vue.use(DatefieldsPlugin);
        Vue.use(DatepickerPlugin);
        Vue.use(DaterangepickerPlugin);
        Vue.use(ModalPlugin);
        Vue.use(DropdownPlugin);
        Vue.use(DropdownGroupPlugin);
        Vue.use(DynamicTemplatePlugin);
        Vue.use(Overlay);
        Vue.use(ErrorAccessDenied);
        Vue.use(ErrorBrowserNotSupported);
        Vue.use(ErrorConfigNotSupported);
        Vue.use(ErrorCookiesNotSupported);
        Vue.use(ErrorMessage);
        Vue.use(ErrorConflictPlugin);
        Vue.use(ErrorPageNotFoundPlugin);
        Vue.use(ErrorResourceUnavailablePlugin);
        Vue.use(ErrorTechnicalDifficultyPlugin);
        Vue.use(ExpandableLayoutPlugin);
        Vue.use(MessagePagePlugin);
        Vue.use(FileSelectPlugin);
        Vue.use(FileUploadPlugin);
        Vue.use(FlexTemplatePlugin);
        Vue.use(FormPlugin);
        Vue.use(I18nPlugin);
        Vue.use(IconPlugin);
        Vue.use(IconButtonPlugin);
        Vue.use(IconFilePlugin);
        Vue.use(InputGroupPlugin);
        Vue.use(InputStylePlugin);
        Vue.use(LimitTextPlugin);
        Vue.use(LinkPlugin);
        Vue.use(ListItemPlugin);
        Vue.use(LoginPlugin);
        Vue.use(MessagePlugin);
        Vue.use(DialogPlugin);
        Vue.use(NavbarPlugin);
        Vue.use(OpacityTransitionPlugin);
        Vue.use(OptionPlugin);
        Vue.use(MenuPlugin);
        Vue.use(PageNotFoundPlugin);
        Vue.use(PanelPlugin);
        Vue.use(PeriodpickerPlugin);
        Vue.use(PhoneNumberPlugin);
        Vue.use(PhotoEditorPlugin);
        Vue.use(PlusPlugin);
        Vue.use(PopperPlugin);
        Vue.use(PopupPlugin);
        Vue.use(ProgressPluggin);
        Vue.use(RadioPlugin);
        Vue.use(RadioGroupPlugin);
        Vue.use(RadioStylePlugin);
        Vue.use(RichTextLicensePlugin, { key: options.richTextOptions ? options.richTextOptions.key : undefined });
        Vue.use(RichTextPlugin);
        Vue.use(RichTextEditorPlugin);
        Vue.use(ScrollTopPlugin);
        Vue.use(SessionExpiredPlugin);
        Vue.use(ShowMorePlugin);
        Vue.use(SidebarPlugin);
        Vue.use(SliderPlugin);
        Vue.use(SpinnerPlugin);
        Vue.use(Status);
        Vue.use(StepPlugin);
        Vue.use(SlideTransitionPlugin);
        Vue.use(SteppersPlugin);
        Vue.use(SwitchPlugin);
        Vue.use(TabPanelPlugin);
        Vue.use(TablePlugin);
        Vue.use(TableHeaderPlugin);
        Vue.use(TabsPlugin);
        Vue.use(TemplatePlugin);
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
    }
};

export default ComponentsPlugin;

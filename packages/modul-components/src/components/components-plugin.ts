import Vue, { PluginObject } from 'vue';
import { AddressLookupPluginOptions } from '../utils/address-lookup/address-lookup.plugin';
import LoggerPlugin from '../utils/logger/logger';
import ButtonPlugin from './button/button';
import { RichTextLicensePluginOptions } from './rich-text-editor/rich-text-license-plugin';


export interface ComponentPluginOptions {
    richTextOptions?: RichTextLicensePluginOptions;
    loquateOptions?: AddressLookupPluginOptions;
}

const ComponentsPlugin: PluginObject<any> = {
    install(v, options: ComponentPluginOptions = {}): void {
        if (!v.prototype.$log) {
            Vue.use(LoggerPlugin);
        }

        // Vue.use(AccordionGroupPlugin);
        // Vue.use(AccordionPlugin);
        // Vue.use(AccordionTransitionPlugin);
        // Vue.use(AddPlugin);
        // Vue.use(AddressPlugin, { loqateKey: options.loquateOptions ? 'LOQATE_KEY=BT13-ZT19-TB79-DC28' : undefined } as AddressLookupPluginOptions);
        // Vue.use(AvatarPlugin);
        // Vue.use(BreadcrumbsPlugin);
        Vue.use(ButtonPlugin);
        // Vue.use(CalendarPlugin);
        // Vue.use(CarouselPlugin);
        // Vue.use(CharacterCountPlugin);
        // Vue.use(CheckboxPlugin);
        // Vue.use(ChipPlugin);
        // Vue.use(ChipAddPlugin);
        // Vue.use(ChipDeletePlugin);
        // Vue.use(DatefieldsPlugin);
        // Vue.use(DatepickerPlugin);
        // Vue.use(DaterangepickerPlugin);
        // Vue.use(ModalPlugin);
        // Vue.use(DropdownPlugin);
        // Vue.use(DropdownGroupPlugin);
        // Vue.use(DynamicTemplatePlugin);
        // Vue.use(Overlay);
        // Vue.use(ErrorAccessDenied);
        // Vue.use(ErrorBrowserNotSupported);
        // Vue.use(ErrorConfigNotSupported);
        // Vue.use(ErrorCookiesNotSupported);
        // Vue.use(ErrorMessage);
        // Vue.use(ErrorConflictPlugin);
        // Vue.use(ErrorPageNotFoundPlugin);
        // Vue.use(ErrorResourceUnavailablePlugin);
        // Vue.use(ErrorTechnicalDifficultyPlugin);
        // Vue.use(ExpandableLayoutPlugin);
        // Vue.use(MessagePagePlugin);
        // Vue.use(FileSelectPlugin);
        // Vue.use(FileUploadPlugin);
        // Vue.use(FlexTemplatePlugin);
        // Vue.use(FormPlugin);
        // Vue.use(I18nPlugin);
        // Vue.use(IconPlugin);
        // Vue.use(IconButtonPlugin);
        // Vue.use(IconFilePlugin);
        // Vue.use(InputGroupPlugin);
        // Vue.use(InputStylePlugin);
        // Vue.use(LimitTextPlugin);
        // Vue.use(LinkPlugin);
        // Vue.use(ListItemPlugin);
        // Vue.use(LoginPlugin);
        // Vue.use(MessagePlugin);
        // Vue.use(DialogPlugin);
        // Vue.use(NavbarPlugin);
        // Vue.use(OpacityTransitionPlugin);
        // Vue.use(OptionPlugin);
        // Vue.use(MenuPlugin);
        // Vue.use(PageNotFoundPlugin);
        // Vue.use(PanelPlugin);
        // Vue.use(PeriodpickerPlugin);
        // Vue.use(PhoneNumberPlugin);
        // Vue.use(PlusPlugin);
        // Vue.use(PopperPlugin);
        // Vue.use(PopupPlugin);
        // Vue.use(ProgressPluggin);
        // Vue.use(RadioPlugin);
        // Vue.use(RadioGroupPlugin);
        // Vue.use(RadioStylePlugin);
        // Vue.use(RichTextLicensePlugin, { key: options.richTextOptions ? options.richTextOptions.key : undefined });
        // Vue.use(RichTextPlugin);
        // Vue.use(RichTextEditorPlugin);
        // Vue.use(ScrollTopPlugin);
        // Vue.use(SessionExpiredPlugin);
        // Vue.use(ShowMorePlugin);
        // Vue.use(SidebarPlugin);
        // Vue.use(SliderPlugin);
        // Vue.use(SpinnerPlugin);
        // Vue.use(Status);
        // Vue.use(StepPlugin);
        // Vue.use(SlideTransitionPlugin);
        // Vue.use(SteppersPlugin);
        // Vue.use(SwitchPlugin);
        // Vue.use(TabPanelPlugin);
        // Vue.use(TablePlugin);
        // Vue.use(TableHeaderPlugin);
        // Vue.use(TabsPlugin);
        // Vue.use(TemplatePlugin);
        // Vue.use(TextareaPlugin);
        // Vue.use(TextfieldPlugin);
        // Vue.use(SearchfieldPlugin);
        // Vue.use(TimepickerPlugin);
        // Vue.use(ToastPlugin);
        // Vue.use(ToggleButtonsPlugin);
        // Vue.use(TooltipPlugin);
        // Vue.use(TreePlugin);
        // Vue.use(TypeaheadPlugin);
        // Vue.use(ValidationMessagePlugin);
        // Vue.use(InplaceEditPlugin);
    }
};

export default ComponentsPlugin;

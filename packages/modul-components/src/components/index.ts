import Vue from 'vue';
import { PluginObject } from 'vue';

import AccordionGroupPlugin from './accordion-group/accordion-group';
import AccordionPlugin from './accordion/accordion';
import ButtonPlugin from './button/button';
import ButtonGroupPlugin from './button-group/button-group';
import CheckboxPlugin from './checkbox/checkbox';
import DialogPlugin from './dialog/dialog';
import DropdownPlugin from './dropdown/dropdown';
import DynamicTemplatePlugin from './dynamic-template/dynamic-template';
import I18nPlugin from './i18n/i18n';
import IconPlugin from './icon/icon';
import LimitTextPlugin from './limit-text/limit-text';
import LinkPlugin from './link/link';
import ListBulletPlugin from './list-bullet/list-bullet';
import MessagePlugin from './message/message';
import PanelPlugin from './panel/panel';
import PanelDialogPlugin from './panel-dialog/panel-dialog';
import PopperPlugin from './popper/popper';
import PopperListPlugin from './popper-list/popper-list';
import RadioButtonsPlugin from './radio-buttons/radio-buttons';
import SecondaryDialogPlugin from './secondary-dialog/secondary-dialog';
import SpinnerPlugin from './spinner/spinner';
import StatusList from './status-list/status-list';
import StepPlugin from './step/step';
import SwitchPlugin from './switch/switch';
import TabPanePlugin from './tab-pane/tab-pane';
import TablePlugin from './table/table';
import TabsPlugin from './tabs/tabs';
import Template from './template/template';
import TextFieldPlugin from './text-field/text-field';
import UploadPlugin from './upload/upload';
import UploadInputPlugin from './upload-input/upload-input';
import UploadDragdropPlugin from './upload-dragdrop/upload-dragdrop';
import UploadFileslistPlugin from './upload-fileslist/upload-fileslist';
import ValidationMessagePlugin from './validation-message/validation-message';

const ComponentsPlugin: PluginObject<any> = {
    install(v, options) {
        Vue.use(AccordionGroupPlugin);
        Vue.use(AccordionPlugin);
        Vue.use(ButtonPlugin);
        Vue.use(ButtonGroupPlugin);
        Vue.use(CheckboxPlugin);
        Vue.use(DialogPlugin);
        Vue.use(DropdownPlugin);
        Vue.use(DynamicTemplatePlugin);
        Vue.use(I18nPlugin);
        Vue.use(IconPlugin);
        Vue.use(LimitTextPlugin);
        Vue.use(LinkPlugin);
        Vue.use(ListBulletPlugin);
        Vue.use(MessagePlugin);
        Vue.use(PanelPlugin);
        Vue.use(PanelDialogPlugin);
        Vue.use(PopperPlugin);
        Vue.use(PopperListPlugin);
        Vue.use(RadioButtonsPlugin);
        Vue.use(SecondaryDialogPlugin);
        Vue.use(SpinnerPlugin);
        Vue.use(StatusList);
        Vue.use(StepPlugin);
        Vue.use(SwitchPlugin);
        Vue.use(TabPanePlugin);
        Vue.use(TablePlugin);
        Vue.use(TabsPlugin);
        Vue.use(Template);
        Vue.use(TextFieldPlugin);
        Vue.use(UploadPlugin);
        Vue.use(UploadInputPlugin);
        Vue.use(UploadDragdropPlugin);
        Vue.use(UploadFileslistPlugin);
        Vue.use(ValidationMessagePlugin);
    }
};

export default ComponentsPlugin;

import { PluginObject } from 'vue';
import { BirthdayFieldSandbox } from './birtday-field/birthday-field.sandbox';

const ComponentPatternsPlugin: PluginObject<any> = {
    install(v): void {
        v.component(`m-birthday-field-pattern`, BirthdayFieldSandbox);
    }
};

export default ComponentPatternsPlugin;

import { PluginObject } from 'vue';
import { DialogService } from './dialog-service';

declare module 'vue/types/vue' {
    interface Vue {
        $dialog: DialogService;
    }
}


const DialogServicePlugin: PluginObject<any> = {
    install(v): void {
        let dialog: DialogService = new DialogService();
        (v.prototype).$dialog = dialog;
    }
};

export default DialogServicePlugin;

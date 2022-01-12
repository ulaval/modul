import Vue, { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';
import DialogPlugin, { MDialog, MDialogMessageStyle, MDialogState } from '../../../../../../../packages/modul-components/src/components/dialog/dialog';
import WithRender from './dialog-service.sandbox.html';

@WithRender
@Component
export class MDialogServiceSandbox extends Vue {

    $refs: {
        customDialog: MDialog;
    };

    onAlertService(): void {
        this.$dialog.alert('This is an alert').then((result) => {
            if (result) {
                this.$log.info('ok');
            } else {
                this.$log.info('cancelled');
            }
        });
    }

    onConfirmService(): void {

        this.$dialog.confirm('Please Confirm Me').then((result) => {
            if (result) {
                this.$log.info('confirmed!');
            } else {
                this.$log.info('cancelled');
            }

        });
    }

    onConfirmGenericServiceWithOptions(): void {
        this.$dialog.generic({ message: 'Please do an action', title: 'Title', negativeLink: false, messageStyle: MDialogMessageStyle.Regular }).then((result) => {
            if (result) {
                this.$log.info('confirmed!');
            } else {
                this.$log.info('cancelled');
            }

        });
    }

    onConfirmServiceSecondaryButton(): void {
        this.$dialog.generic('Please do an action', MDialogState.Default, 'Title', 'Confirm label', true, 'Secondary label', '250px', true, 'Cancel label').then((result) => {
            if (result) {
                this.$log.info('confirmed!');
            } else {
                this.$log.info('cancelled');
            }

        });
    }

    onCustomConfirmService(): void {

        this.$dialog.show(this.$refs.customDialog).then((result) => {
            this.$log.info('onCustomConfirmService confirmed!');
        });
    }
}

const MDialogServicePlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(DialogPlugin);
        v.component(`m-dialog-service-sandbox`, MDialogServiceSandbox);
    }
};

export default MDialogServicePlugin;

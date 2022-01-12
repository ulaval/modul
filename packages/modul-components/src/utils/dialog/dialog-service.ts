import Vue from 'vue';
import { MDialog, MDialogMessageStyle, MDialogState, MDialogWidth } from '../../components/dialog/dialog';


export class DialogService {

    /**
     *
     * @param message the message of the confirmation dialog
     * @param title a title label if any
     * @param okLabel a cancel label if any
     */
    public alert(message: string, title?: string, okLabel?: string): Promise<boolean> {
        let alertInstance: MDialog = new MDialog({
            el: document.createElement('div')
        });

        document.body.appendChild(alertInstance.$el);
        alertInstance.message = message;
        alertInstance.okLabel = okLabel ? okLabel : undefined;
        alertInstance.title = title ? title : '';
        alertInstance.negativeLink = false;

        return this.show(alertInstance).then((result) => {
            alertInstance.$destroy();
            return result;
        });
    }


    /**
     *
     * @param message the message of the confirmation dialog
     * @param title a title label if any
     * @param okLabel a ok label if any
     * @param cancelLabel a cancel label if any
     */
    public confirm(message: string, title?: string, okLabel?: string, cancelLabel?: string): Promise<boolean> {
        let confirmInstance: MDialog = new MDialog({
            el: document.createElement('div')
        });

        document.body.appendChild(confirmInstance.$el);
        confirmInstance.message = message;
        confirmInstance.state = MDialogState.Confirmation;
        confirmInstance.title = title || '';
        confirmInstance.okLabel = okLabel || undefined;
        confirmInstance.cancelLabel = cancelLabel || undefined;

        return this.show(confirmInstance).then((result) => {
            confirmInstance.$destroy();
            return result;
        });
    }

    /**
     *
     * @param options all configuration options
     * @param message the message of the confirmation dialog
     * @param state the dialog state
     * @param title a title label if any
     * @param okLabel a ok label if any
     * @param secBtn secBtn if any
     * @param secBtnLabel a secBtnLabel label if any
     * @param btnWidth a btnWidth if any
     * @param negativeLink negativeLink if any
     * @param cancelLabel a cancel label if any
     * @param width the width of the dialog if any
     * @param messageStyle Ssyle applied to the message
     */
    public generic(options: {
        message: string;
        messageStyle?: MDialogMessageStyle;
        title?: string;
        state?: MDialogState;
        okLabel?: string;
        secBtn?: boolean;
        secBtnLabel?: string;
        btnWidth?: string;
        negativeLink?: boolean;
        cancelLabel?: string;
        width?: MDialogWidth;
    }): Promise<boolean>;
    public generic(
        message: string,
        state?: MDialogState,
        title?: string,
        okLabel?: string,
        secBtn?: boolean,
        secBtnLabel?: string,
        btnWidth?: string,
        negativeLink?: boolean,
        cancelLabel?: string,
        width?: MDialogWidth,
        messageStyle?: MDialogMessageStyle
    ): Promise<boolean>;
    public generic(...args: any): Promise<boolean> {
        let genericInstance: MDialog;

        if (typeof args[0] === 'string') {
            genericInstance = new MDialog({
                el: document.createElement('div'),
                propsData: {
                    message: args[0],
                    state: args[1] || MDialogState.Default,
                    title: args[2],
                    okLabel: args[3],
                    secBtn: args[4] || false,
                    secBtnLabel: args[5],
                    btnWidth: args[6],
                    negativeLink: args[7] || true,
                    cancelLabel: args[8],
                    width: args[9] || MDialogWidth.Default,
                    messageStyle: args[10]
                }
            });
        } else {
            genericInstance = new MDialog({
                el: document.createElement('div'),
                propsData: {
                    ...{
                        state: MDialogState.Default,
                        title: '',
                        secBtn: false,
                        btnWidth: undefined,
                        negativeLink: true,
                        width: MDialogWidth.Default
                    },
                    ...args[0]
                }
            });
        }

        document.body.appendChild(genericInstance.$el);

        return this.show(genericInstance).then((result) => {
            genericInstance.$destroy();
            return result;
        });
    }


    /**
     *
     * @param mDialogInstance the MDialog instance
     * @param rejectOnCancel if true, the promise will be rejected on cancel
     */
    public show(mDialogInstance: MDialog, rejectOnCancel?: boolean): Promise<boolean> {
        return new Promise((resolve, reject) => {

            let onOk: () => void = () => {
                if (mDialogInstance) {
                    unhook();
                }

                Vue.nextTick(() => {
                    resolve(true);
                });
            };

            let onCancel: () => void = () => {
                if (mDialogInstance) {
                    unhook();
                }

                Vue.nextTick(() => {
                    resolve(false);
                });
            };

            let onSecondaryBtn: () => void = () => {
                if (mDialogInstance) {
                    unhook();
                }

                Vue.nextTick(() => {
                    resolve(false);
                });
            };

            let hook: () => void = () => {
                if (mDialogInstance) {
                    mDialogInstance.$on('ok', onOk);
                    mDialogInstance.$on('cancel', onCancel);
                    mDialogInstance.$on('secondaryBtn', onSecondaryBtn);
                    mDialogInstance.openDialog();

                }
            };

            let unhook: () => void = () => {
                if (mDialogInstance) {
                    mDialogInstance.$off('ok', onOk);
                    mDialogInstance.$off('cancel', onCancel);
                    mDialogInstance.$off('secondaryBtn', onSecondaryBtn);
                }
            };

            if (mDialogInstance) {
                mDialogInstance.$nextTick(() => {
                    hook();
                });
            } else {
                console.error('No instance of dialog');
                reject();
            }

        });
    }
}


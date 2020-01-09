import { FILE_UPLOAD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import FileUploadPlugin from '@ulaval/modul-components/dist/components/file-upload/file-upload';
import Vue, { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './file-upload.sandbox.html';


@WithRender
@Component
export class MFileUploadSandbox extends Vue {
}

const FileUploadSandboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(FileUploadPlugin);
        v.component(`${FILE_UPLOAD_NAME}-sandbox`, MFileUploadSandbox);
    }
};

export default FileUploadSandboxPlugin;

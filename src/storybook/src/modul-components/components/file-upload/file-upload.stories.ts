import { storiesOf } from '@storybook/vue';
import { FILE_UPLOAD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MFile } from '@ulaval/modul-components/dist/utils/file/file';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

storiesOf(`${modulComponentsHierarchyRootSeparator}${FILE_UPLOAD_NAME}`, module)

    .add('default', () => ({
        template: '<m-file-upload><m-button>File upload</m-button></m-file-upload>'
    }))

    .add('allowedExtensionsOnly', () => ({
        template: `<div>
        <h5>Allowed extensions only</h5>
        <span>Allowed extensions: jpg, jpeg, png</span>
        <m-file-upload :allowed-extensions="['jpg', 'jpeg', 'png']"><m-button>File upload</m-button></m-file-upload>
        </div>`
    }))
    .add('rejectedExtensionsOnly', () => ({
        template: `
        <div>
        <h5>Allowed and rejected extensions</h5>
        <span>Allowed extensions: jpg, jpeg, png, mp4</span>
        <m-file-upload :rejected-extensions="['jpg', 'jpeg']" :allowed-extensions="['jpg', 'jpeg', 'png', 'mp4']"><m-button>File upload</m-button></m-file-upload>
        </div>`
    }))
    .add('customValidationFunction', () => ({
        props: {
            customValidationFunction: { default: () => { return (file: MFile) => { return file.name.includes('John') ? Promise.resolve(true) : Promise.resolve(false); }; } },
            customValidationMessage: { default: `Le nom du fichier doit contenir les caractères 'John'.` }
        },
        template: `
        <div>
        <h5>Allowed files based on custom validation function</h5>
        <span>Allowed filenames that contains the string "John" only - else displays custom message</span>
        <m-file-upload :custom-validation-message="customValidationMessage" :custom-validation-function="customValidationFunction" ><m-button>File upload</m-button></m-file-upload>
        </div>`
    }))
    .add('allowedExtensionsHelpMessage', () => ({
        template: `
        <div>
        <m-file-upload :allowed-extensions="['jpg', 'jpeg', 'png']" selection-help-message="Images larger than 400 pixels are recommended"><m-button>File upload</m-button></m-file-upload>
        </div>`
    }))
    .add('singleFileUpload', () => ({
        template: `
        <div>
        <m-file-upload :allowed-extensions="['jpg', 'jpeg', 'png']" :max-files="1"><m-button>File upload</m-button></m-file-upload>
        </div>`
    }))
    .add('replacementFile', () => ({
        template: `
        <div>
        <h5>Replacement file</h5>
        <span>Prop max-files: 1</span>
        <m-file-upload :file-replacement="true" :max-files="1"><m-button>File upload</m-button></m-file-upload>
        </div>`
    }))
    .add('replacementFileMax10', () => ({
        template: `
        <div>
        <h5>Replacement file</h5>
        <span>Prop max-files: 10 - should allowed only one</span>
        <m-file-upload :file-replacement="true" :max-files="1"><m-button>File upload</m-button></m-file-upload>
        </div>`
    }))
    .add('replacementFileUndefined', () => ({
        template: `
        <div>
        <h5>Replacement file</h5>
        <span>Prop max-files: undefined</span>
        <m-file-upload :file-replacement="true"><m-button>File upload</m-button></m-file-upload>
        </div>`
    }))
    .add('headerSlot', () => ({
        template: `
        <div>
        <m-file-upload><template slot="header"><h1>Header</h1></template><m-button>File upload</m-button></m-file-upload>
        </div>`
    }));

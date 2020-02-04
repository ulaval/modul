import { FILE_UPLOAD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MFile } from '@ulaval/modul-components/dist/utils/file/file';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${FILE_UPLOAD_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    template: '<m-file-upload><m-button>File upload</m-button></m-file-upload>'
});

defaultStory.story = {
    name: 'default'
};

export const allowedExtensionsOnly = () => `
<div>
<h5>Allowed extensions only</h5>
<span>Allowed extensions: jpg, jpeg, png</span>
<m-file-upload :allowed-extensions="['jpg', 'jpeg', 'png']"><m-button>File upload</m-button></m-file-upload>
</div>`;

export const rejectedExtensionsOnly = () => `
<div>
<h5>Allowed and rejected extensions</h5>
<span>Allowed extensions: jpg, jpeg, png, mp4</span>
<m-file-upload :rejected-extensions="['jpg', 'jpeg']" :allowed-extensions="['jpg', 'jpeg', 'png', 'mp4']"><m-button>File upload</m-button></m-file-upload>
</div>`;


export const customValidationFunction = () => ({
    data: () => ({
        customValidationFunction: (file: MFile) => { return Promise.resolve(file.name.includes('John')); },
        customValidationMessage: `Le nom du fichier doit contenir le mot 'John'.`
    }),
    template: `
    <div>
<h5>Allowed files based on custom validation function</h5>
<span>Allowed filenames that contains the string "John" - else displays custom message</span>
<m-file-upload :custom-validation-message="customValidationMessage"
:custom-validation-function="customValidationFunction" ><m-button>File upload</m-button></m-file-upload>
</div>`
});

export const allowedExtensionsHelpMessage = () => `
<div>
<m-file-upload :allowed-extensions="['jpg', 'jpeg', 'png']" selection-help-message="Images larger than 400 pixels are recommended"><m-button>File upload</m-button></m-file-upload>
</div>`;

export const singleFileUpload = () => `
<div>
<m-file-upload :allowed-extensions="['jpg', 'jpeg', 'png']" :max-files="1"><m-button>File upload</m-button></m-file-upload>
</div>`;

export const multipleFilesUploads = () => `
<div>
<m-file-upload :allowed-extensions="['jpg', 'jpeg', 'png']" :max-files="5"><m-button>File upload</m-button></m-file-upload>
</div>`;

export const replacementFile = () => `
<div>
<h5>Replacement file</h5>
<span>Prop max-files: 1</span>
<m-file-upload :file-replacement="true" :max-files="1"><m-button>File upload</m-button></m-file-upload>
</div>`;

export const replacementFileMax10 = () => `
<div>
<h5>Replacement file</h5>
<span>Prop max-files: 10 - should allowed only one</span>
<m-file-upload :file-replacement="true" :max-files="1"><m-button>File upload</m-button></m-file-upload>
</div>`;

export const replacementFileUndefined = () => `
<div>
<h5>Replacement file</h5>
<span>Prop max-files: undefined</span>
<m-file-upload :file-replacement="true"><m-button>File upload</m-button></m-file-upload>
</div>`;

export const headerSlot = () => `
<div>
<m-file-upload><template slot="header"><h1>Header</h1></template><m-button>File upload</m-button></m-file-upload>
</div>`;


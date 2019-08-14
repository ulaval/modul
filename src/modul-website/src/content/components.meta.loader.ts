
import { array, boolean, constant, Decoder, object, oneOf, optional, string } from '@mojotech/json-type-validation';

export const componentsFrRequiredContext: any = require.context('./../../public/content/components', true, /\.meta.fr.json$/);

export interface ComponentMeta {
    overview: string;
    preview: string;
    name: string;
    category: string;
    url: string;
    type: string;
    beta: boolean;
    visible: boolean;
    components?: any[];
}

const catogoryDecoder: Decoder<string> = oneOf(
    constant('content'),
    constant('forms'),
    constant('navigation'),
    constant('layout'),
    constant('windows'),
    constant('button')
);

const typeDecoder: Decoder<string> = oneOf(
    constant('components'),
    constant('utils')
);

const componentMetaDecoder: Decoder<ComponentMeta> = object({
    preview: optional(string()),
    overview: optional(string()),
    name: string(),
    url: string(),
    category: catogoryDecoder,
    type: typeDecoder,
    beta: boolean(),
    visible: boolean(),
    components: optional(array())
});

export function loadComponentMeta(): ComponentMeta[] {

    return componentsFrRequiredContext.keys().map((filename) => {
        let componentMeta: any = componentsFrRequiredContext(filename);
        componentMeta.filename = filename;
        try {
            componentMetaDecoder.runWithException(componentMeta);
        } catch (err) {
            console.error('Error while validating json file ' + filename, err);
        }

        return componentMeta as ComponentMeta;
    });
}

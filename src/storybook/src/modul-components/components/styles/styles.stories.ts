import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}styles`,
    parameters: { fileName: __filename }
};


export const Title = () => ({
    template: `<div>
        <h1 class="ms-margin-top">Titre 1</h1>
        <h2>Titre 2</h2>
        <h3>Titre 3</h3>
        <h4>Titre 4</h4>
        <h5>Titre 5</h5>
        <h6>Titre 6</h6>
    <div>`
});


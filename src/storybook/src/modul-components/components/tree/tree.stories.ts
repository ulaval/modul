import { TREE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { TreeNode } from '@ulaval/modul-components/dist/components/tree/tree';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

let currentFile: string[] = ['/folder 1/folder 2/index.html'];

const A_FILE_TREE: TreeNode[] = [
    {
        id: 'folder 1',
        label: 'folder 1',
        hasChildren: true,
        children: [
            {
                id: 'index.html',
                label: 'index.html'
            },
            {
                id: 'menu.html'
            },
            {
                id: 'folder 2',
                label: 'folder 2',
                hasChildren: true,
                children: [
                    {
                        id: 'index.html',
                        label: 'index.html'
                    },
                    {
                        id: 'folder 3',
                        label: 'folder 3',
                        hasChildren: true,
                        children: []
                    }
                ]
            }
        ]
    },
    {
        id: 'poney.jpg',
        label: 'poney.jpg'
    },
    {
        id: 'folder 4',
        label: 'folder 4',
        hasChildren: true
    },
    {
        id: 'big folder',
        label: 'big folder',
        hasChildren: true,
        children: [
            {
                id: 'folder 1',
                label: 'folder 1',
                hasChildren: true,
                children: [
                    {
                        id: 'index.html',
                        label: 'index.html'
                    },
                    {
                        id: 'menu.html'
                    },
                    {
                        id: 'folder 2',
                        label: 'folder 2',
                        hasChildren: true,
                        children: [
                            {
                                id: 'index.html',
                                label: 'index.html'
                            },
                            {
                                id: 'folder 3',
                                label: 'folder 3',
                                hasChildren: true,
                                children: [
                                    {
                                        id: 'folder 1',
                                        label: 'folder 1',
                                        hasChildren: true,
                                        open: true,
                                        children: [
                                            {
                                                id: 'index.html',
                                                label: 'index.html'
                                            },
                                            {
                                                id: 'menu.html'
                                            },
                                            {
                                                id: 'folder 2',
                                                label: 'folder 2',
                                                hasChildren: true,
                                                children: [
                                                    {
                                                        id: 'index.html',
                                                        label: 'index.html'
                                                    },
                                                    {
                                                        id: 'folder 3',
                                                        label: 'folder 3',
                                                        hasChildren: true,
                                                        children: [
                                                            {
                                                                id: 'folder 12',
                                                                label: 'folder 12',
                                                                hasChildren: true,
                                                                children: [
                                                                    {
                                                                        id: 'index.html',
                                                                        label: 'index.html'
                                                                    },
                                                                    {
                                                                        id: 'menu.html'
                                                                    },
                                                                    {
                                                                        id: 'folder 2',
                                                                        label: 'folder 2',
                                                                        hasChildren: true,
                                                                        children: [
                                                                            {
                                                                                id: 'index.html',
                                                                                label: 'index.html'
                                                                            },
                                                                            {
                                                                                id: 'folder 3',
                                                                                label: 'folder 3',
                                                                                hasChildren: true,
                                                                                children: []
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

export default {
    title: `${modulComponentsHierarchyRootSeparator}${TREE_NAME}`,
    parameters: { fileName: __filename }
};

export const storyInError = () => ({
    props: {
        tree: {
            default: A_FILE_TREE
        },
        selectionMode: {
            default: 'single'
        },
        checkboxes: {
            default: 'false'
        },
        selectedNodes: currentFile
    },
    methods: {
        changeSelection(path: string): void {
            this.selection = path;
        },
        changeInputProp(): void {
            currentFile = ['/poney.jpg'];
            alert(currentFile);
        }
    },
    data: () => ({
        selection: currentFile[0]
    }),
    template: `<div><m-tree :tree="tree" :selected-nodes="selectedNodes" :selection-mode="selectionMode" :use-files-icons="true" @select="changeSelection"></m-tree><p>SELECTION : <span>{{selection}}</span></p> <m-button @click="changeInputProp()">Changer selectedNodeProp prop</m-button></div>`
});

storyInError.story = {
    name: 'Default'
};

// export const focus = () => ({
//     data: () => ({
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" :focus="true" ></m-select>`
// });

// export const label = () => ({
//     data: () => ({
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" label="Fruits" ></m-select>`
// });

// export const placeholder = () => ({
//     data: () => ({
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" placeholder="Choose a Fruit" ></m-select>`
// });

// export const labelUp = () => ({
//     data: () => ({
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" label="Fruits" :label-up="true" ></m-select>`
// });

// export const clearable = () => ({
//     data: () => ({
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" label="Fruits" :clearable="true" ></m-select>`
// });

// export const longOptionMenu = () => ({
//     data: () => ({
//         options: LONG_OPTIONS
//     }),
//     template: `<m-select :options="options" label="Fruits" ></m-select>`
// });

// export const readonlyNoSelectionNoLabel = () => ({
//     data: () => ({
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" :readonly="true" ></m-select>`
// });

// export const readonlyNoSelectionWithLabel = () => ({
//     data: () => ({
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" :readonly="true" label="Fruits" ></m-select>`
// });

// export const readonlyNoSelectionNoLabelWithPlaceholder = () => ({
//     data: () => ({
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" :readonly="true" placeholder="Choose a fruit"></m-select>`
// });

// export const readonlyNoSelectionWithLabelWithPlaceholder = () => ({
//     data: () => ({
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" :readonly="true" label="Fruits" placeholder="Choose a fruit"></m-select>`
// });

// export const readonlyItemSelectedWithLabel = () => ({
//     data: () => ({
//         model: 'banana',
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" :readonly="true" label="Fruits" v-model="patate" v-model="model" ></m-select>`
// });

// export const readonlyItemSelectedWithLabelClearable = () => ({
//     data: () => ({
//         model: 'banana',
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" :readonly="true" label="Fruits" :clearable="true" v-model="model" ></m-select>`
// });

// export const disabledNoSelectionNoLabel = () => ({
//     data: () => ({
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" :disabled="true" ></m-select>`
// });

// export const disabledNoSelectionWithLabel = () => ({
//     data: () => ({
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" :disabled="true" label="Fruits" ></m-select>`
// });

// export const disabledNoSelectionNoLabelWithPlaceholder = () => ({
//     data: () => ({
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" :disabled="true" placeholder="Choose a fruit"></m-select>`
// });

// export const disabledNoSelectionWithLabelWithPlaceholder = () => ({
//     data: () => ({
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" :disabled="true" label="Fruits" placeholder="Choose a fruit"></m-select>`
// });

// export const disabledItemSelectedWithLabel = () => ({
//     data: () => ({
//         model: 'banana',
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" :disabled="true" label="Fruits" v-model="model" ></m-select>`
// });

// export const disabledItemSelectedWithLabelClearable = () => ({
//     data: () => ({
//         model: 'banana',
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" :disabled="true" label="Fruits" :clearable="true" v-model="model" ></m-select>`
// });

// export const virtualScroll = () => ({
//     data: () => ({
//         options: buildLongList()
//     }),
//     template: `<m-select :options="options" label="Longlist" :virtual-scroll="true" ></m-select>`
// });

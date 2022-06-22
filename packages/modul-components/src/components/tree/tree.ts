import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { ModulVue } from '../../utils/vue/vue';
import { TREE_NAME } from '../component-names';
import { MMessage } from '../message/message';
import { MTreeNode } from './tree-node/tree-node';
import WithRender from './tree.html?style=./tree.scss';
export interface TreeNode {
    id: string;
    label?: string;
    open?: boolean;
    children?: TreeNode[];
    hasChildren?: boolean;
    data?: any;
    rightIconName?: string;
}

export enum MSelectionMode {
    None = 'none',
    Single = 'single',
    Multiple = 'multiple',
    Readonly = 'readonly'
}

export enum MCheckboxes {
    True = 'true', // Fully independant checkbox selection
    False = 'false', // No Checkboxes
    WithButtonAutoSelect = 'with-button-auto-select', // Fully independat, but a button can handle mass-selection
    WithCheckboxAutoSelect = 'with-checkbox-auto-select', // Selection of parents is 100% related to children
    WithParentAutoSelect = 'with-parent-auto-select' // Children can be selected by parent & children can unselect parent
}
@WithRender
@Component({
    components: {
        MTreeNode,
        MMessage
    }
})
export class MTree extends ModulVue {
    @Prop()
    public readonly tree: TreeNode[];

    @Prop({
        default: MSelectionMode.Single,
        validator: value => Enums.toValueArray(MSelectionMode).includes(value)
    })
    public readonly selectionMode: MSelectionMode;

    @Prop({
        default: MCheckboxes.False,
        validator: value => Enums.toValueArray(MCheckboxes).includes(value)
    })
    public readonly checkboxes: MCheckboxes;

    @Prop()
    public readonly selectedNodes: string[];

    @Prop()
    public readonly useFilesIcons: boolean;

    @Prop()
    public readonly disabledNodes: string[];

    public propSelectedNodes: string[] = this.selectedNodes || [];

    public errorTree: boolean = false;

    private selectedNodesFound: string[] = [];

    @Emit('select')
    public onClick(path: string): string {
        if (!this.pathIsDisabled(path)) {
            if (this.propSelectedNodes.indexOf(path) === -1) {
                if (this.selectionMode === MSelectionMode.Multiple) {
                    this.propSelectedNodes.push(path);
                } else {
                    this.propSelectedNodes = [path];
                }
            } else if (this.selectionMode === MSelectionMode.Multiple) {
                this.propSelectedNodes.splice(this.propSelectedNodes.indexOf(path), 1);
            }
        }
        return path;
    }

    protected created(): void {
        this.browseTree();
    }

    @Watch('tree')
    private browseTree(): void {
        this.errorTree = false;
        this.tree.forEach(node => {
            this.browseNode(node);
        });
        this.propSelectedNodes.forEach(selectedNode => {
            if (this.selectedNodesFound.indexOf(selectedNode) === -1) {
                console.error(`modUL - The selected node was not found: "${selectedNode}"`);
            }
        });
    }

    private pathIsDisabled(path: string): boolean {
        return this.propDisabledNodes.indexOf(path) !== -1;
    }

    private browseNode(node: TreeNode, path: string = ''): void {
        if (node.id.trim() === '') {
            this.errorTree = true;
        }
        let currentPath: string = path + '/' + node.id;
        if (this.propSelectedNodes.indexOf(currentPath) !== -1) {
            this.selectedNodesFound.push(currentPath);
        }
        if (node.children) {
            node.children.forEach(childNode => {
                this.browseNode(childNode, currentPath);
            });
        }
    }

    public get propTreeEmpty(): boolean {
        return !this.tree.length;
    }

    public get propDisabledNodes(): string[] {
        return this.disabledNodes || [];
    }

    public get selectable(): boolean {
        return this.selectionMode !== MSelectionMode.None && !this.isReadonly;
    }

    public get isReadonly(): boolean {
        return this.selectionMode === MSelectionMode.Readonly;
    }

    public get isMultipleSelectWithCheckboxes(): boolean {
        return this.selectionMode === MSelectionMode.Multiple && this.withCheckboxes;
    }

    public get withCheckboxes(): boolean {
        return this.checkboxes !== MCheckboxes.False;
    }

    public get isSingleNodeTree(): boolean {
        return this.tree.length === 1;
    }
}

const TreePlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(TREE_NAME, MTree);
    }
};

export default TreePlugin;

import { TreeNode } from '@ulaval/modul-components/dist/components/tree/tree';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './tree.example.html';

@WithRender
@Component
export class MWTreeExample extends Vue {

    public tree: TreeNode[] = [
        {
            id: '1',
            label: 'Title 1',
            hasChildren: true,
            children: [
                {
                    id: '2',
                    label: 'Subtitle 1'
                },
                {
                    id: '3',
                    label: 'Subtitle 2',
                    children: [
                        {
                            id: '2',
                            label: 'Subtitle 1'
                        },
                        {
                            id: '3',
                            label: 'Subtitle 2',
                            hasChildren: true
                        },
                        {
                            id: '4',
                            label: 'Subtitle 3'
                        },
                        {
                            id: '5',
                            label: 'Subtitle 4'
                        }
                    ]
                },
                {
                    id: '4',
                    label: 'Subtitle 3'
                },
                {
                    id: '5',
                    label: 'Subtitle 4'
                }
            ]
        },
        {
            id: '6',
            label: 'Title 2'
        },
        {
            id: '7',
            label: 'Title 3',
            open: true,
            children: [
                {
                    id: '1',
                    label: 'Subtitle 1'
                },
                {
                    id: '2',
                    label: 'Subtitle 2'
                }
            ]
        }
    ];
}

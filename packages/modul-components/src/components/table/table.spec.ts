import { shallowMount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import { MColumnSortDirection, MColumnTable, MTable } from './table';

let slots: any = {};
const SLOT_EMPTY: string = '<p>EMPTY</p>';
const SLOT_HEADER: string = '<thead><tr><th>SLOT THEAD</th></tr></thead>';
const SLOT_TH: string = 'SLOT TH';
const SLOT_BODY: string = '<tbody><tr><td>SLOT BODY</td></tr></tbody>';
const SLOT_TD: string = 'SLOT TD';
const SLOT_FOOTER: string = '<td>SLOT FOOTER</td>';

let rows: any[] = [];

const columns: MColumnTable[] = [
    { id: 'a', title: 'A', dataProp: 'a', width: '10%', sortable: true, sortDirection: MColumnSortDirection.None },
    { id: 'b', title: 'B', dataProp: 'b', sortDirection: MColumnSortDirection.None }
];

const EMPTY_DATA: any[] = [];
const DATA: any[] = [
    { id: '1', a: 'a1', b: 'b1' },
    { id: '2', a: 'a2', b: 'b2' }
];

let wrapper: Wrapper<MTable>;

const initializeShallowWrapper: any = () => {
    wrapper = shallowMount(MTable, {
        propsData: {
            rows,
            columns
        },
        slots
    });
};

describe(`MTable`, () => {

    describe(`Given an empty table`, () => {

        beforeEach(() => {
            rows = EMPTY_DATA;
        });

        it(`Then should be empty`, () => {
            initializeShallowWrapper();

            expect(wrapper.vm.isEmpty).toBeTruthy();
        });

        describe(`When loading`, () => {
            beforeEach(() => {
                initializeShallowWrapper();
                wrapper.setProps({ loading: true });
            });

            it(`Then should not be empty`, () => {
                expect(wrapper.vm.isEmpty).toBeFalsy();
            });


        });



    });

    describe(`Given a table full of data`, () => {

        beforeEach(() => {
            rows = DATA;
        });

        it(`Then should not be empty`, () => {
            initializeShallowWrapper();

            expect(wrapper.vm.isEmpty).toBeFalsy();
        });

        describe(`When we don't use slots`, () => {

            describe(`When a column is sortable`, () => {
                it(`Should show a button with the label on it`, async () => {
                    const icon: Wrapper<Vue> = wrapper.find('.m-table__sortable-icon');

                    expect(icon.exists()).toBeTruthy();
                });

                describe(`When the arrow is clicked`, () => {
                    it(`Should emit a action event`, () => {
                        wrapper.find('.m-table__sortable-icon').trigger('click');

                        expect(wrapper.emitted('sort-applied')).toBeTruthy();
                    });
                });
            });
        });


    });

    describe(`Given a column`, () => {

        describe(`When the width is specified`, () => {
            it(`Then should be the right width`, () => {
                initializeShallowWrapper();

                expect(wrapper.vm.columnWidth(columns[0])).toEqual({ width: '10%' });
            });
        });

        describe(`When the width is undefined`, () => {
            it(`Then should be the right width`, () => {
                initializeShallowWrapper();

                expect(wrapper.vm.columnWidth(columns[1])).toEqual('');
            });
        });

    });

});

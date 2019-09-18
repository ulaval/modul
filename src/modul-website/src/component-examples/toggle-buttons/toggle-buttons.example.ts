import { MToggleButton } from '@ulaval/modul-components/dist/components/toggle-buttons/toggle-buttons';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './toggle-buttons.example.html';

const JUNE: MToggleButton = { id: 'june', title: 'June' };
const JULY: MToggleButton = { id: 'july', title: 'July' };
const AUGUST: MToggleButton = { id: 'august', title: 'August' };
const SEPTEMBER: MToggleButton = { id: 'september', title: 'September' };
const OCTOBER: MToggleButton = { id: 'october', title: 'October', pressed: true };
const NOVEMBER: MToggleButton = { id: 'november', title: 'November' };
const DECEMBER: MToggleButton = { id: 'december', title: 'December', pressed: true };

const monthsDefault: MToggleButton[] = [JUNE, JULY, AUGUST, SEPTEMBER];

@WithRender
@Component
export class MWToggleButtonsExample extends Vue {

    buttons: MToggleButton[] = monthsDefault;
}

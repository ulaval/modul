import { SORTABLE_NAME } from '@ulaval/modul-components/dist/directives/directive-names';
import { MSortEvent, SortableDirective } from '@ulaval/modul-components/dist/directives/sortable/sortable';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';
import './sortable-sandbox.scss';
import WithRender from './sortable.sandbox.html';

export type ElementSortable = { cle: number, titre: string };

@WithRender
@Component({
    directives: {
        [SORTABLE_NAME]: SortableDirective
    }
})
export class MSortableSandbox extends ModulVue {

    peutEtreDrag: boolean = false;

    element1: ElementSortable = { cle: 1, titre: 'Element 1' };
    element2: ElementSortable = { cle: 2, titre: 'Element 2' };
    element3: ElementSortable = { cle: 3, titre: 'Element 3' };
    element4: ElementSortable = { cle: 4, titre: 'Element 4' };
    element5: ElementSortable = { cle: 5, titre: 'Element 5' };
    element6: ElementSortable = { cle: 6, titre: 'Element 6 - can-drag false' };
    element7: ElementSortable = { cle: 6, titre: 'Element 6 - can-drop false' };

    elements: Array<ElementSortable> = [this.element1, this.element2, this.element3, this.element4, this.element5];
    elementsWithHandle: Array<ElementSortable> = [this.element1, this.element2, this.element3, this.element4, this.element5];

    elementsCanDrag: Array<ElementSortable> = [this.element1, this.element2, this.element3, this.element4, this.element5, this.element6];
    elementsCanDrop: Array<ElementSortable> = [this.element1, this.element2, this.element3, this.element4, this.element5, this.element7];

    get elementsSortable(): ElementSortable[] {
        return this.elements;
    }

    get elementsSortableCanDrag(): ElementSortable[] {
        return this.elementsCanDrag;
    }

    get elementsSortableCanDrop(): ElementSortable[] {
        return this.elementsCanDrop;
    }

    get elementsSortableWithHandle(): ElementSortable[] {
        return this.elementsWithHandle;
    }

    isDraggable(cle: number): string {
        return cle === 6 ? 'false' : 'true';
    }

    isDroppable(cle: number): string {
        return cle === 6 ? 'false' : 'true';
    }

    deplacerElements(event: MSortEvent): void {
        this.arraymove(this.elements, event.sortInfo.oldPosition, event.sortInfo.newPosition);
    }

    deplacerElementsCanDrag(event: MSortEvent): void {
        this.arraymove(this.elementsCanDrag, event.sortInfo.oldPosition, event.sortInfo.newPosition);
    }

    deplacerElementsCanDrop(event: MSortEvent): void {
        this.arraymove(this.elementsCanDrop, event.sortInfo.oldPosition, event.sortInfo.newPosition);
    }

    deplacerElementsWithHandle(event: MSortEvent): void {
        this.arraymove(this.elementsWithHandle, event.sortInfo.oldPosition, event.sortInfo.newPosition);
    }

    arraymove(arr, oldIndex, newIndex): void {
        let elements: Array<ElementSortable> = arr[oldIndex];
        arr.splice(oldIndex, 1);
        arr.splice(newIndex, 0, elements);
    }

    basculePeutEtreDrag(valeur: boolean): void {
        this.peutEtreDrag = valeur;
    }
}

const SortableSandboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(`${SORTABLE_NAME}-sandbox`, MSortableSandbox);
    }
};

export default SortableSandboxPlugin;

export interface MAccordionGroupAPI {
    skin: string;
    concurrent: boolean;
    disabled: boolean;
    isAllOpen: boolean;
    isAllClosed: boolean;
    linkModeButton: string;
    addAccordion: Function;
    removeAccordion: Function;
    closeAllAccordions: Function;
}

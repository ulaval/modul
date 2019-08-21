export const clearUserSelection: () => void = () => {
    // Source: https://jsfiddle.net/mkrivan/hohx4nes/
    if (document.getSelection) { // for all new browsers (IE9+, Chrome, Firefox)
        document.getSelection()!.removeAllRanges();
        document.getSelection()!.addRange(document.createRange());
    } else if (window.getSelection) { // equals with the document.getSelection (MSDN info)
        if ((window as any).getSelection().removeAllRanges) { // for all new browsers (IE9+, Chrome, Firefox)
            (window as any).getSelection().removeAllRanges();
            (window as any).getSelection().addRange(document.createRange());
        } else if ((window as any).getSelection().empty) { // Chrome supports this as well
            (window as any).getSelection().empty();
        }
    } else if ((document as any).selection) { // IE8-
        (document as any).selection.empty();
    }
};

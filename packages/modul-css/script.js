var hasElementFocusInHtml = false;
var isMouseDown = false;
var bodyEl = document.querySelector('body');
const NAME_CLASS_FOCUS_A11Y = 'a11y-focus-active';

function manageFocusA11yClass(isFocus) {
    hasElementFocusInHtml = isFocus;

    var bodyEl = document.querySelector('body');

    if (!bodyEl) {
        return;
    }
    
    if (hasElementFocusInHtml && !bodyEl.classList.contains(NAME_CLASS_FOCUS_A11Y)) {
        bodyEl.classList.add(NAME_CLASS_FOCUS_A11Y)
        console.log('add')
    } else if (!hasElementFocusInHtml && bodyEl.classList.contains(NAME_CLASS_FOCUS_A11Y)) {
        bodyEl.classList.remove(NAME_CLASS_FOCUS_A11Y)
        console.log('remove')
    }
   
}

document.addEventListener('mousemove', e => {
    if (!hasElementFocusInHtml) {
        return;
    }
    manageFocusA11yClass(false);
});

document.addEventListener('mousedown', e => {
    isMouseDown = true;
    manageFocusA11yClass(false);
});

document.addEventListener('mouseup', e => {
    isMouseDown = false;
    manageFocusA11yClass(false);
});

document.addEventListener('focusin', e => {
    if (isMouseDown) {
        return;
    }
    manageFocusA11yClass(true);
});


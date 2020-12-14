class A11yFocusCssClass {
    #elementWhereClassIsAdded;
    #classNameToAddToElement;
    #hasSomeElementFocusInHtml = false;
    #isMouseDown = false;
    #eventMousemove = this.#onMousemove.bind(this);
    #eventMousedown = this.#onMousedown.bind(this);
    #eventMouseup = this.#onMouseup.bind(this);
    #eventFocusin = this.#onFocusin.bind(this);

    constructor(elementWhereClassIsAdded = 'body', classNameToAddToElement = 'a11y-focus-active') {
        this.#elementWhereClassIsAdded = elementWhereClassIsAdded;
        this.#classNameToAddToElement = classNameToAddToElement;
        this.addEventListener();
    }

    addEventListener() {
        document.addEventListener('mousemove', this.#eventMousemove);
        document.addEventListener('mousedown', this.#eventMousedown);
        document.addEventListener('mouseup', this.#eventMouseup);
        document.addEventListener('focusin', this.#eventFocusin);
    }

    removeEventListener() {
        document.removeEventListener('mousemove', this.#eventMousemove);
        document.removeEventListener('mousedown', this.#eventMousedown);
        document.removeEventListener('mouseup', this.#eventMouseup);
        document.removeEventListener('focusin', this.#eventFocusin);
    }

    #onMousemove() {
        if (!this.#hasSomeElementFocusInHtml) {
            return;
        }
        this.#manageFocusA11yClass(false);
    }

    #onMousedown() {
        this.#isMouseDown = true;
        this.#manageFocusA11yClass(false);
    }

    #onMouseup() {
        this.#isMouseDown = false;
        this.#manageFocusA11yClass(false);
    }

    #onFocusin() {
        if (this.#isMouseDown) {
            return;
        }
        this.#manageFocusA11yClass(true);
    }

    #manageFocusA11yClass(isFocus) {
        this.#hasSomeElementFocusInHtml = isFocus;

        if (!this.#elementWhereClassIsAdded) {
            return;
        }
    
        const bodyEl = document.querySelector(this.#elementWhereClassIsAdded);
    
        if (!bodyEl) {
            return;
        }
        
        if (this.#hasSomeElementFocusInHtml && !bodyEl.classList.contains(this.#classNameToAddToElement)) {
            bodyEl.classList.add(this.#classNameToAddToElement)
        } else if (!this.#hasSomeElementFocusInHtml && bodyEl.classList.contains(this.#classNameToAddToElement)) {
            bodyEl.classList.remove(this.#classNameToAddToElement)
        }
    }
}

new A11yFocusCssClass('.mu-app-body', 'mu-a11y-focus-active');
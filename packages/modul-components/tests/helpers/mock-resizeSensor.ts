// Pour mocker la valeur de offsetWidth pour s'échapper de la condition infinie du ResizeSensor invisible dans la fonction reset
beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 500 });
});

// Pour revenir à la valeur initiale 0
afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 0 });
});

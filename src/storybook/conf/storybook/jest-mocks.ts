
jest.mock('@ulaval/modul-components/dist/utils/uuid/uuid', () => ({
    generate(): string { return 'fakeId'; }
}));

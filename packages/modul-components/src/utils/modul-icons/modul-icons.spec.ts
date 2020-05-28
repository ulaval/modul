import { Enums } from '../enums/enums';
import { ModulIcon, ModulIconName, ModulIcons } from './modul-icons';

const modulIconNameAsArray: string[] = Enums.toValueArray(ModulIconName);

describe('modul-icons', () => {

    it('The number of values ​​of ModulIconName enum is equal to the number of items of ModulIcons array', () => {
        expect(modulIconNameAsArray.length === ModulIcons.length).toBeTruthy();
    });

    it('Every value of ModulIconName enum are use in ModulIcon array', () => {
        const comparisonArray: ModulIcon[] = ModulIcons.filter((icon: ModulIcon) =>
            !modulIconNameAsArray.some((iconName: string) =>
                iconName === icon.name
            )
        );
        expect(comparisonArray.length === 0).toBeTruthy();
    });
});

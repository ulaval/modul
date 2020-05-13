import { AsYouType } from 'libphonenumber-js';

export class CustomAsYouType {
    private asYouType: AsYouType;
    constructor() {
        this.asYouType = new AsYouType();
    }

    public inputDigit(digit: string): string {
        return this.asYouType.input(digit);
    }

    public clear(): void {
        return this.asYouType.reset();
    }

}

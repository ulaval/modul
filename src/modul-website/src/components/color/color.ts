import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WithRender from './color.html?style=./color.scss';

@WithRender
@Component
export class MColor extends Vue {
    @Prop()
    public hex!: string;
    @Prop()
    public name!: string;

    private get hexArray(): string[] {
        const shorthandRegex: any = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const hex: string = this.hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });
        const result: string[] | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        if (result) {
            return result;
        } else {
            return [];
        }
    }

    private get red(): number {
        return parseInt(this.hexArray[1], 16);
    }

    private get green(): number {
        return parseInt(this.hexArray[2], 16);
    }

    private get blue(): number {
        return parseInt(this.hexArray[3], 16);
    }

    private get rgb(): string | undefined {
        return this.hexArray ? this.red + ', ' + this.green + ', ' + this.blue : undefined;
    }

    private get textColor(): string {
        let yiq = ((this.red * 299) + (this.green * 587) + (this.blue * 114)) / 1000;
        return (yiq >= 128) ? '#000' : '#fff';
    }

    private get cmyk(): string {
        let r: number = this.red / 255;
        let g: number = this.green / 255;
        let b: number = this.blue / 255;

        let k: number = Math.round(Math.min(1 - r, 1 - g, 1 - b) * 100);
        let c: number = Math.round(((1 - r - k) / (1 - k)) * 100);
        let m: number = Math.round(((1 - g - k) / (1 - k)) * 100);
        let y: number = Math.round(((1 - b - k) / (1 - k)) * 100);

        return c + ', ' + m + ', ' + y + ', ' + k;
    }
}

export const COLOR_NAME: string = 'modul-color';

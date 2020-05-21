import { PluginObject } from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $svgSprite: SvgSpriteService;
    }
}

export interface SvgList {
    [key: string]: string;
}

export class SvgSpriteService {
    private svgList: SvgList = {};

    public addSvg(svgName: string, svgString: string): void {
        if (this.svgList[svgName]) {
            if (this.svgList[svgName] !== svgString) {
                // tslint:disable-next-line: no-console
                console.warn(`The '${svgName}' SVG name is already used to display another SVG. Choose a new name to save the SVG in this sprite.`);
            }
            return;
        }
        this.svgList[svgName] = svgString;
    }

    public removeSvg(svgNames: string[]): void {
        this.svgList = Object.keys(this.svgList).reduce((acc: SvgList, value: string) =>
            (svgNames.some(sn => value === sn) ? acc : {
                ...acc,
                [value]: this.svgList[value]
            }
            ), {});
    }

    public getSvgString(svgName: string): string | undefined {
        if (!this.svgList[svgName]) {
            // tslint:disable-next-line: no-console
            console.warn(this.getErrorMessage(svgName));
            return;
        }

        return this.svgList[svgName];
    }

    public getSvg(svgName: string): SVGElement | undefined {
        if (!this.svgList[svgName]) {
            // tslint:disable-next-line: no-console
            console.warn(this.getErrorMessage(svgName));
            return;
        }
        const domParser: Document | undefined = new DOMParser().parseFromString(this.svgList[svgName], 'text/html');
        return domParser && domParser.querySelector('svg') ? domParser.querySelector('svg') as SVGElement : undefined;
    }

    public getSvgList(): SvgList {
        return this.svgList;
    }

    private getErrorMessage(svgName: string): string {
        return `SVG ${svgName} hasn't added to the sprite yet. Use the 'addSvg(svgName: string, svgString: string)' method to add the SVG to the sprite`;
    }
}

const SvgSpritesPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug('$svgSprite', 'plugin.install');
        let svgSprite: SvgSpriteService = new SvgSpriteService();
        (v.prototype).$svgSprite = svgSprite;
    }
};

export default SvgSpritesPlugin;

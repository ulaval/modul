import Vue, { PluginObject } from 'vue';
import uuid from '../uuid/uuid';

declare module 'vue/types/vue' {
    interface Vue {
        $svg: SpritesService;
    }
}

export class SpritesService {
    private externalSpriteIdPrefixes: Map<string, string> = new Map();
    public static externalSpriteIdPrefixSeparator = '-';

    /** @deprecated Use addInternalSprites or addExternalSprites instead */
    public addSprites(sprites: string): string {
        return this.addInternalSprites(sprites);
    }

    public addInternalSprites(sprites: string): string {
        let div: HTMLDivElement = document.createElement('div');
        let id: string = uuid.generate();
        div.id = id;
        div.setAttribute('aria-hidden', 'true');
        div.style.display = 'none';
        div.innerHTML = sprites;
        document.body.insertBefore(div, document.body.childNodes[0]);

        return id;
    }

    public removeInternalSprite(id: string): void {
        if (document.getElementById(id) !== null) {
            document.getElementById(id)!.remove();
        } else {
            Vue.prototype.$log.warn(`unable to remove internal sprite with id=${id}`);
        }
    }

    public addExternalSprites(sprites: string, externalSpriteIdPrefix: string): void {
        if (this.isInExternalSprites(externalSpriteIdPrefix)) {
            Vue.prototype.$log.warn('"' + externalSpriteIdPrefix + '" already exists in the externalSpriteIdPrefixes. You are overwriting a sprites collection.');
        }

        this.externalSpriteIdPrefixes.set(externalSpriteIdPrefix, sprites);
    }

    public getExternalSpritesFromSpriteId(spriteId: string): string | undefined {
        if (this.isInExternalSprites(this.getExternalSpriteIdPrefixFromSpriteId(spriteId))) {
            return this.getExternalSprites(this.getExternalSpriteIdPrefixFromSpriteId(spriteId)!) + '#' + spriteId;
        }
    }

    public isInExternalSprites(externalSpriteIdPrefix?: string): boolean {
        return externalSpriteIdPrefix !== undefined && this.externalSpriteIdPrefixes.has(externalSpriteIdPrefix);
    }

    private getExternalSpriteIdPrefixFromSpriteId(spriteId: string): string | undefined {
        if (spriteId.indexOf(SpritesService.externalSpriteIdPrefixSeparator) !== -1) {
            return spriteId.split(SpritesService.externalSpriteIdPrefixSeparator)[0];
        }
    }

    private getExternalSprites(externalSpriteIdPrefix: string): string | undefined {
        return this.externalSpriteIdPrefixes.get(externalSpriteIdPrefix);
    }
}

export interface SpritesPluginOptions {
    externalSprites: boolean;
}

const SpritesPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug('$svg', 'plugin.install');
        let svg: SpritesService = new SpritesService();
        (v.prototype).$svg = svg;
    }
};

export default SpritesPlugin;

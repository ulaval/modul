import { PluginObject } from 'vue';
import { SpritesPluginOptions, SpritesService } from './sprites';

const DefaultSpritesPlugin: PluginObject<any> = {
    install(v, options: SpritesPluginOptions = { externalSprites: false }): void {
        v.prototype.$log.debug('sprites-default.svg', 'plugin.install');
        const svg: SpritesService = (v.prototype).$svg;
        if (svg) {
            const sprites: string = require('../../assets/icons/sprites-default.svg');

            if (options.externalSprites) {
                svg.addExternalSprites(sprites, 'm');
            } else {
                svg.addInternalSprites(sprites);
            }
        } else {
            v.prototype.$log.error(
                'DefaultSpritesPlugin.install -> You must use the svg plugin.'
            );
        }
    }
};

export default DefaultSpritesPlugin;

import DefaultSpritesPlugin from '@ulaval/modul-components/dist/utils/svg/default-sprites';
import { SpritesService } from '@ulaval/modul-components/dist/utils/svg/sprites';
import { PluginObject } from 'vue';

const SvgPlugin: PluginObject<any> = {
    install(v, options) {
        v.use(DefaultSpritesPlugin);
        let svg: SpritesService = (v.prototype).$svg;
        svg.addSprites(require('./sprites-website.svg'));
    }
};

export default SvgPlugin;

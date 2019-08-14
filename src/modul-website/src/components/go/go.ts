import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulWebsite } from '../modul-website';
import WithRender from './go.html?style=./go.scss';

@WithRender
@Component
export class MGo extends ModulWebsite {

    @Prop()
    public name!: string;

    @Prop()
    public tab!: string;

    private get url(): string | undefined {
        let result: string;
        if (this.tab) {
            result = this.$routerIndex.for(this.tab, _ => this.name);
        } else {
            result = this.$routerIndex.for(this.name);
        }
        return result ? result : undefined;
    }

    private get meta(): any {
        return {};
        // TODO refactor for
        //    return Meta.getMetaByTag(this.name);
    }

    private get label(): string {
        return this.name;
        //  return this.meta ? this.$i18n.translate(this.meta.name ? this.meta.name : '').toLowerCase() : this.$i18n.translate('pages:' + this.name).toLowerCase();
    }

    private get tag(): string {
        return this.name;
        //   return this.meta ? this.meta.tag : '';
    }

    private defaultSlot(): boolean {
        return !!this.$slots.default;
    }
}

export const GO_NAME: string = 'modul-go';

const GoPlugin: PluginObject<any> = {
    install(v, options) {
        v.component(GO_NAME, MGo);
    }
};

export default GoPlugin;

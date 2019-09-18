import { Getter, ModuleBase, Mutation } from '@ulaval/modul-vuex/dist/vuex-annotations';
import { PluginObject } from 'vue';
import { Store } from 'vuex';

declare module 'vue/types/vue' {
    interface Vue {
        $componentsModule: ComponentsModule;
    }
}

export interface ComponentsModuleState {
    components: { [k: string]: any | undefined };
    version: string;
}

export class ComponentsModule extends ModuleBase<ComponentsModuleState> {
    constructor(store: Store<any>, moduleName: string = 'components') {
        super(moduleName, {
            components: {},
            version: ''
        }, store);
    }

    @Mutation()
    public setVersion(version: string): void {
        this.state.version = version;
    }

    @Getter()
    public getVersion(): string {
        return this.state.version;
    }
}

export const ComponentsModulePlugin: PluginObject<any> = {
    install(v, options): void {
        if (options) {
            v.prototype.$componentsModule = new ComponentsModule(options.store);
        }

    }
};

import { Meta, MetaService } from 'meta-generator/dist';
import { ComponentMeta } from './content/components.meta.loader';

export interface ComponentState {
    [k: string]: ComponentMeta[];
}

export class ModulMeta {

    private _componentState: ComponentState;
    private _metaService: MetaService;

    constructor(private componentMetas: ComponentMeta[], private modulMeta: Meta) {
        this._componentState = this.buildComponentState(componentMetas);
        this._metaService = new MetaService(modulMeta);
    }

    get version(): string {
        return this.modulMeta.packageVersion;
    }

    get componentState(): ComponentState {
        return this._componentState;
    }

    get metaService(): MetaService {
        return this._metaService;
    }

    private buildComponentState(componentMetas: ComponentMeta[]): ComponentState {
        const result: ComponentState = {};
        componentMetas.forEach((componentMeta: ComponentMeta) => {
            if (componentMeta.visible) {
                if (result[componentMeta.category] && result[componentMeta.category].length > 0) {
                    result[componentMeta.category].concat(componentMeta);
                } else {
                    result[componentMeta.category] = [componentMeta];
                }
            }

        });
        return result;
    }
}

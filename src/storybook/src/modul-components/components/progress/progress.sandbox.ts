import { PROGRESS_NAME } from '@ulaval/modul-components/dist/components/component-names';
import ProgressPlugin from '@ulaval/modul-components/dist/components/progress/progress';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './progress.sandbox.html';

const DEFAULT_COUNT: number = 5 * 1000;

@WithRender
@Component
export class MProgressSandbox extends ModulVue {

    count: number = 0;
    interval: number;

    protected mounted(): void {
        this.interval = window.setInterval(() => {
            this.count += 100;
        }, 100);
    }

    get Count(): number {
        if (this.count >= DEFAULT_COUNT) {
            clearInterval(this.interval);
        }
        return Math.round(this.count / DEFAULT_COUNT * 100);
    }

}

const ProgressSandboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(ProgressPlugin);
        v.component(`${PROGRESS_NAME}-sandbox`, MProgressSandbox);
    }
};

export default ProgressSandboxPlugin;

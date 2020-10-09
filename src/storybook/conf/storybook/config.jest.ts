import { configure } from '@storybook/vue';
import { config } from '@vue/test-utils';
import fs from 'fs';
import path from 'path';
import Vue from 'vue';
import { getModulConfig } from '../../src/modul';


// do not display vue error in tests
Vue.config.productionTip = false;
Vue.config.silent = true;

Vue.use(getModulConfig(true));

config.stubs = {};
config.stubs['portal'] = { template: '<div"><slot /></div>' };

// this function mimick a require.context in jest..
// taken from https://stackoverflow.com/questions/38332094/how-can-i-mock-webpacks-require-context-in-jest/54151648#54151648
const requireContext: any = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
    const files: any = {};

    function readDirectory(directory): void {
        fs.readdirSync(directory).forEach((file) => {
            const fullPath: any = path.resolve(directory, file);

            if (fs.statSync(fullPath).isDirectory()) {
                if (scanSubDirectories) {
                    readDirectory(fullPath);
                }
                return;
            }

            if (!regularExpression.test(fullPath)) {
                return;
            }
            files[fullPath] = true;
        });
    }

    readDirectory(path.resolve(__dirname, base));

    function Module(file): any {
        return require(file);
    }

    Module.keys = () => Object.keys(files);

    return Module;
};


// configure(() => loadJestStories(), module);
configure(requireContext('../../src', true, /(^((?!sandbox).)*)\.stories\.ts$/), module);

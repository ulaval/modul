#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';
import { MetaGenerator } from './meta-generator';
import { Meta } from './model';

// tslint:disable-next-line: typedef
const argv = yargs.options({
    dest: { type: 'string', demandOption: true },
    tsconfig: { type: 'string', default: 'tsconfig.json' },
    package: { type: 'string', default: 'package.json' }
}).argv;


let destination: string = path.resolve(argv.dest, 'modul-meta.fr.json');
let packageFilePath: string = path.resolve(argv.package);
let projetFilePath: string = path.resolve(argv.tsconfig);


console.log(`Generating components metadata...`);

const generator: MetaGenerator = new MetaGenerator(projetFilePath);

let meta: Meta = generator.generateMeta();

const packageFileContent: any = JSON.parse(fs.readFileSync(packageFilePath, 'utf8'));

meta.packageVersion = packageFileContent.version;

fs.writeFile(destination, JSON.stringify(meta), 'utf8', (err) => {
    if (err) {
        console.error(`Error occured while generating metadata v2 : [${JSON.stringify(err)}]`);
    } else {
        console.log(`Success! - Generated metadata in ${destination}`);
    }
});

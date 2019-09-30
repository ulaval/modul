import initStoryshots, { multiSnapshotWithOptions, Stories2SnapsConverter } from '@storybook/addon-storyshots';
declare module '@storybook/addon-storyshots' {
    export const Stories2SnapsConverter: any;
}

initStoryshots({
    configPath: 'conf/storybook/config.jest.ts',
    test: multiSnapshotWithOptions({}),
    storyKindRegex: /^((?!.*?storybook|modul-website).)*$/,
    stories2snapsConverter: new Stories2SnapsConverter({
        snapshotExtension: '.ts.snap'
    })
} as any);

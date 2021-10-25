import initStoryshots, { multiSnapshotWithOptions, Stories2SnapsConverter } from '@storybook/addon-storyshots';


initStoryshots({
    configPath: 'conf/storybook/config.jest.ts',
    test: multiSnapshotWithOptions({}),
    storyKindRegex: /^((?!.*?storybook|modul-website).)*$/,
    stories2snapsConverter: new Stories2SnapsConverter({
        snapshotExtension: '.ts.snap'
    })
} as any);

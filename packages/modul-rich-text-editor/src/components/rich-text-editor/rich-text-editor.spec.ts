import ModulPlugin from '@ulaval/modul-components/dist/utils/modul/modul';
import { mount, shallowMount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import { MRichTextEditor, MRichTextEditorOption } from './rich-text-editor';
import { MRichTextEditorDefaultOptions } from './rich-text-editor-options';
import RichTextLicensePlugin from './rich-text-license-plugin';

const froalaLicenseKey: string = 'testKey';
let wrapper: Wrapper<MRichTextEditor>;
let richTextEditor: MRichTextEditor;
let defaultOptions: MRichTextEditorDefaultOptions;
let headerNormalOption: any = { '': 'Normal' };
let i18nTitle: string = 'Title';
let i18nSubtitle: string = 'Subtitle';
let i18nTitleLevel: string = 'Title';

describe('MRichTextEditor', () => {
    beforeEach(() => {
        Vue.use(ModulPlugin);
        Vue.use(RichTextLicensePlugin, { key: froalaLicenseKey });
        wrapper = mount(MRichTextEditor,
            {
                stubs: {
                    froala: '<div></div>'
                }
            });
        richTextEditor = wrapper.vm;
        defaultOptions = new MRichTextEditorDefaultOptions(froalaLicenseKey, richTextEditor.$i18n.currentLang());
        if (wrapper.vm.titleAvailable) {
            defaultOptions.paragraphStyles = wrapper.vm.manageHeaderLevels();
        }
    });

    it('should have a value for each custom translations key', () => {
        Object.keys(richTextEditor.customTranslations).forEach(key => {
            expect(richTextEditor.customTranslations[key]).not.toBe('');
        });
    });

    it('the key is stored', () => {
        expect(richTextEditor.froalaLicenseKey).toEqual(froalaLicenseKey);
    });

    describe('Without options', () => {
        beforeEach(() => {
            wrapper.setProps({
                options: []
            });
        });
        it('default options are standard default options', () => {
            expect(richTextEditor.getOptions()).toEqual(defaultOptions);
        });

    });

    describe('With image option', () => {
        beforeEach(() => {
            wrapper.setProps({
                options: [MRichTextEditorOption.IMAGE]
            });
        });
        it('default options are standard default options', () => {
            expect(richTextEditor.getOptions().pluginsEnabled).toContain('image');
            expect(richTextEditor.getOptions().toolbarButtons.moreRich.buttons).toContain('insertImage');
        });

    });

    describe(`Given the paragraph style option`, () => {

        describe(`when we want only 1 title`, () => {

            it(`then only 1 title is available`, () => {
                wrapper.setProps({ firstHeaderLevel: 1, lastHeaderLevel: 1 });

                let headersOptions: any = wrapper.vm.manageHeaderLevels();

                expect(headersOptions).toEqual({ ...headerNormalOption, 'rte-h1 rte_h_level1': i18nTitle });
            });

        });

        describe(`when we want only a title and a subtitle`, () => {

            it(`then a title and a subtitle are available`, () => {
                wrapper.setProps({ firstHeaderLevel: 1, lastHeaderLevel: 2 });

                let headersOptions: any = wrapper.vm.manageHeaderLevels();

                expect(headersOptions).toEqual({ ...headerNormalOption, 'rte-h1 rte_h_level1': i18nTitle, 'rte-h2 rte_h_level2': i18nSubtitle });
            });

        });

        describe(`when we want multiple titles`, () => {

            it(`then multiple titles are available`, () => {
                wrapper.setProps({ firstHeaderLevel: 1, lastHeaderLevel: 3 });

                let headersOptions: any = wrapper.vm.manageHeaderLevels();

                expect(headersOptions).toEqual({ ...headerNormalOption, 'rte-h1 rte_h_level1': i18nTitleLevel + ' 1', 'rte-h2 rte_h_level2': i18nTitleLevel + ' 2', 'rte-h3 rte_h_level3': i18nTitleLevel + ' 3' });
            });

        });

    });

    describe('without props set', () => {
        it('internal options are defaultOptions', () => {
            const customOptions: any = { placeholderText: ' ', scrollableContainer: 'body', imageHideFloatLayout: false };
            expect(richTextEditor.internalOptions).toEqual({ ...defaultOptions, ...customOptions });
        });
    });

    describe('with props set', () => {
        describe(`with props in error`, () => {
            it('the component should throw an error', () => {
                expect(() => {
                    wrapper = shallowMount(MRichTextEditor, {
                        propsData: { scrollableContainer: '#container' }
                    });
                }).toThrow(richTextEditor.getSelectorErrorMsg('scrollable-container'));

                expect(() => {
                    wrapper = shallowMount(MRichTextEditor, {
                        propsData: { toolbarStickyOffset: '#header' }
                    });
                }).toThrow(richTextEditor.getSelectorErrorMsg('toolbar-sticky-offset'));
            });
        });

        it('internal options are customed defaultOptions', () => {
            const customOptions: any = { toolbarStickyOffset: 1, placeholderText: 'placeholder', imageHideFloatLayout: false };

            wrapper.setProps({ toolbarStickyOffset: 1, placeholder: 'placeholder' });
            expect(richTextEditor.internalOptions).toEqual({ ...defaultOptions, ...customOptions });
        });
    });
});

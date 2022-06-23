import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { CHARACTER_COUNT_NAME } from '../component-names';
import { MAccordionTransition } from '../transitions/accordion-transition/accordion-transition';
import WithRender from './character-count.html?style=./character-count.scss';

@WithRender
@Component({
    components: {
        MAccordionTransition
    }
})
export class MCharacterCount extends Vue {
    @Prop()
    public readonly valueLength: number;

    @Prop({
        required: true, validator: value => {
            if (value === undefined) {
                console.error('character-count component expects prop maxLength to be defined.');
            }

            return value !== undefined;
        }
    })
    public readonly maxLength: number;

    @Prop({ default: 0 })
    public readonly threshold: number;

    @Prop({ default: true })
    public readonly transition: boolean;

    public get hasCounter(): boolean {
        return this.maxLength > 0 && this.valueLength >= Math.max(0, Math.min(this.threshold, this.maxLength));
    }
}

const CharacterCountPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(CHARACTER_COUNT_NAME, MCharacterCount);
    }
};

export default CharacterCountPlugin;

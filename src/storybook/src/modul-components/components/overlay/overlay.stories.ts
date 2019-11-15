import { actions } from '@storybook/addon-actions';
import { OVERLAY_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${OVERLAY_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    methods: actions(
        'save',
        'cancel'
    ),
    template: `<div>
            <m-overlay title="Title" @save="save" @cancel="cancel">
                <m-button slot="trigger">Open</m-button>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </m-overlay>
        </div>`
});

defaultStory.story = {
    name: 'default'
};

export const overflowContent = () => ({
    template: `<div>
            <m-overlay title="Title" @save="save" @cancel="cancel">
                <m-button slot="trigger">Open</m-button>
                <h2 slot="header"
                style="margin:0;">Title</h2>
                <p>Native input</p>
                <input type="text" />
                <input type="text" />
                <p class="m-u--margin-top--l">modUL input</p>
                <p style="margin:0;">
                    <m-textfield label="Lorem ipsum dolor sit amet"></m-textfield>
                </p>
                <p style="margin:0;">
                    <m-textfield label="Lorem ipsum dolor sit amet"></m-textfield>
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                </p>
            </m-overlay>
        </div>`
});


export const loading = () => ({
    data: () => ({
        waiting: false
    }),
    methods: {
        toggleWaiting(): void {
            this.waiting = !this.waiting;
        }
    },
    template: `<div>
                    <m-overlay title="Titre"
                    :waiting="waiting">
                <m-button slot="trigger">Open</m-button>
                <h2 slot="header"
                style="margin: 0;">Title</h2>

                <m-button @click="toggleWaiting">Put waiting mode</m-button>

                </m-overlay>
        </div>`
});

export const customFooter = () => ({
    methods: {
        fermerFenetre(): void {
            console.log('fermer');
        }
    },
    template: `<div>
    <m-overlay title="Title" @save="save" @cancel="cancel">
        <m-button slot="trigger">Open</m-button>
        <h2 slot="header" style="margin:0;">Custom footer</h2>
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
        </p>
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
        </p>
        <div slot="footer">
            <m-link mode="button"
                    @click="fermerFenetre()"
                    ref="boutonFermer">
                fermer
            </m-link>
        </div>
    </m-overlay>
</div>`
});

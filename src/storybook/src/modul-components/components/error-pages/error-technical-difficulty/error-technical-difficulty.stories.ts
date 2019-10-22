import { array, boolean, object, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { ERROR_TECHNICAL_DIFFICULTY_NAME } from '@ulaval/modul-components/dist/components/component-names';
import ErrorTechnicalDifficultyPlugin from '@ulaval/modul-components/dist/components/error-pages/error-technical-difficulty/error-technical-difficulty';
import { Link } from '@ulaval/modul-components/dist/components/message-page/message-page';
// tslint:disable-next-line: import-blacklist
import moment from 'moment';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';

Vue.use(ErrorTechnicalDifficultyPlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}/m-error-pages/${ERROR_TECHNICAL_DIFFICULTY_NAME}`, module)


    .add('default', () => ({
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-technical-difficulty></m-error-technical-difficulty>
                   </div>`
    }))
    .add('title', () => ({
        props: {
            title: {
                default: text('Title', 'A Custom Title')
            }
        },
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-technical-difficulty :title="title"></m-error-technical-difficulty>
                   </div>`
    }))
    .add('links', () => ({
        props: {
            links: [new Link('The first custom link', 'http://www.ulaval.ca', true), new Link(`The second custom
                link`, 'http://www.google.com', true)]
        },
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-technical-difficulty :links="links"></m-error-technical-difficulty>
                   </div>`
    }))
    .add('hints', () => ({
        props: {
            hints: {
                default: array('Hints[Array]', ['My only custom hint', `My second (long) custom hint.Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Nulla egestas urna rhoncus ipsum congue lobortis. `])
            }
        },
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-technical-difficulty :hints="hints"></m-error-technical-difficulty>
                   </div>`
    }))
    .add('errorDate (5 days before now)', () => ({
        props: {
            errorDate: {
                default: object('date (moment)', moment().subtract(moment.duration(5, 'days')))
            }
        },
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-technical-difficulty :errorDate="errorDate"></m-error-technical-difficulty>
                   </div>`
    }))
    .add('errorReferenceNumber', () => ({
        props: {
            errorReferenceNumber: {
                default: text('errorReferenceNumber', 'AX66887IG')
            }
        },
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-technical-difficulty :errorReferenceNumber="errorReferenceNumber"></m-error-technical-difficulty>
                   </div>`
    }))
    .add('showStackTrace', () => ({
        data(): any {
            return {
                errorWithStack(): Error {
                    let error: Error = new Error('Error message');
                    error.stack = `This is a stack Trace\n\rIt is showing because of: (showStackTrace = true)`;
                    return error;
                }
            };
        },
        props: {
            showStackTrace: {
                default: boolean('showStackTrace', true)
            }
        },
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-technical-difficulty :showStackTrace="showStackTrace" :error="errorWithStack()"></m-error-technical-difficulty>
                   </div>`
    }))
    .add('Error', () => ({
        data(): any {
            return {
                errorWithStack(): Error {
                    let error: Error = new Error('Error message');
                    error.stack = `This is a customized Error with a Stack Trace.
                    \n\rIt is showing because of: (showStackTrace = true)`;
                    return error;
                }
            };
        },
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-technical-difficulty :error="errorWithStack()" :showStackTrace="true"></m-error-technical-difficulty>
                   </div>`
    }));

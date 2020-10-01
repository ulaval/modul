import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { MouseButtons } from '../../utils/mouse/mouse';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { MediaQueries, MediaQueriesMixin } from '../media-queries/media-queries';
import { MOpenTrigger, OpenTrigger, OpenTriggerMixin } from '../open-trigger/open-trigger';

export interface PortalMixin {
    propOpen: boolean;
    preload: boolean;
    loaded: boolean;
    getPortalElement(): HTMLElement;
    getTrigger(): HTMLElement | undefined;
    setFocusToPortal(): void;
    setFocusToTrigger(): void;
    tryClose(): void;
}

export interface PortalMixinImpl {
    doCustomPropOpen(value: boolean, el: HTMLElement): boolean;
    handlesFocus(): boolean;
    getBackdropMode(): BackdropMode;
    getPortalElement(): HTMLElement;
}

export enum BackdropMode {
    None,
    ScrollOnly,
    BackdropFast,
    BackdropSlow
}

export enum PortalTransitionDuration {
    Fast = 200,
    Regular = 300,
    Slow = 450,
    XSlow = 600
}

@Component({
    mixins: [OpenTrigger, MediaQueries]
})
export class Portal extends ModulVue implements PortalMixin {
    @Prop({
        default: MOpenTrigger.Click,
        validator: value =>
            value === MOpenTrigger.Click ||
            value === MOpenTrigger.Hover ||
            value === MOpenTrigger.Manual ||
            value === MOpenTrigger.MouseDown
    })
    public openTrigger: MOpenTrigger;

    @Prop()
    public open: boolean;

    @Prop()
    public id: string;

    @Prop()
    public disabled: boolean;

    @Prop()
    public trigger: HTMLElement;

    @Prop()
    public className: string;

    @Prop()
    public preload: boolean;

    @Prop({ default: true })
    public lazy: boolean;

    public loaded: boolean = false;

    private internalTrigger: HTMLElement | undefined = undefined;
    private propId: string = '';
    private portalTargetEl: HTMLElement;
    private internalOpen: boolean = false;
    private stackId: string;
    private internalTransitionDuration: number = PortalTransitionDuration.Regular;
    private opening: boolean = false;
    private portalTargetCreated: boolean = false;
    private portalTargetMounted: boolean = false;
    private clickEventListener: EventListener;
    private mouseenterEventListener: EventListener;
    private mousedownEventListener: EventListener;

    @Emit('update:open')
    public emitUpdateOpen(open: boolean): void { }

    @Emit('open')
    public emitOpen(): void { }

    @Emit('close')
    public emitClose(): void { }

    @Emit('portal-mounted')
    public emitPortalMounted(): void { }

    @Emit('portal-after-open')
    public emitPortalAfterOpen(): void { }

    @Emit('portal-after-close')
    public emitPortalAfterClose(): void { }

    @Emit('click')
    public emitClick(event: MouseEvent): void { }

    @Watch('open', { immediate: true })
    public onOpenChange(open: boolean): void {
        if (this.disabled || open === this.internalOpen) {
            return;
        }

        this.internalOpen = open;
        this.manageOpeningAndClosing(open);
    }

    public setFocusToPortal(): void {
        if (this.as<PortalMixinImpl>().handlesFocus()) {
            let el: HTMLElement = this.as<PortalMixinImpl>().getPortalElement();
            if (el) {
                let x: number = window.pageXOffset; // AEL-53
                let y: number = window.pageYOffset; // AEL-53
                el.setAttribute('tabindex', '0');
                el.focus();
                window.scrollTo(x, y); // AEL-53
                el.blur();
                el.removeAttribute('tabindex');
            }
        }
    }

    public setFocusToTrigger(): void {
        if (this.as<PortalMixinImpl>().handlesFocus() && this.internalTrigger) {
            this.internalTrigger.setAttribute('tabindex', '0');
            this.internalTrigger.focus();
            this.internalTrigger.blur();
            this.internalTrigger.removeAttribute('tabindex');
        }
    }

    public getPortalElement(): HTMLElement {
        return this.portalTargetEl;
    }

    public getTrigger(): HTMLElement | undefined {
        return this.internalTrigger;
    }

    public async tryClose(): Promise<void> {
        if ((this as any).$toast) {
            await (this as any).$toast.clear(); // @todo Portal should not know toast
        }
        if (this.$modul.peekElement() === this.stackId) {
            if (this.$listeners && this.$listeners.beforeClose) {
                this.$emit('portal-before-close', (close: boolean) => {
                    this.propOpen = !close;
                });
            } else {
                this.propOpen = false;
            }
        }
    }

    protected created(): void {
        if (!this.$modul) {
            throw new Error('Portal mixin -> this.$modul is undefined, you must install the Modul plugin.');
        }
    }

    protected mounted(): void {
        this.portalTargetEl = document.getElementById(this.propId) as HTMLElement;
        this.handleTrigger();
        if (!this.lazy) { this.ensurePortalTargetEl(); }
    }

    protected beforeDestroy(): void {
        this.propOpen = false;

        if (this.internalTrigger) {
            if (this.clickEventListener) {
                this.internalTrigger.removeEventListener('click', this.clickEventListener);
            }
            if (this.mouseenterEventListener) {
                this.internalTrigger.removeEventListener('mouseenter', this.mouseenterEventListener);
            }
            if (this.mousedownEventListener) {
                this.internalTrigger.removeEventListener('mousedown', this.mousedownEventListener);
            }

        }

        if (this.portalTargetEl && this.portalTargetEl.parentNode) {
            this.portalTargetEl.parentNode.removeChild(this.portalTargetEl);
            this.portalTargetCreated = false;
            this.portalTargetMounted = false;
        }
    }

    public get propOpen(): boolean {
        if (this.internalOpen) {
            this.loaded = true;
        }
        return this.internalOpen;
    }

    public manageOpeningAndClosing(open: boolean): void {
        if (open) {
            this.ensurePortalTargetEl(() => {
                if (this.portalTargetEl) {
                    this.stackId = this.$modul.pushElement(this.portalTargetEl, this.as<PortalMixinImpl>().getBackdropMode(), this.as<MediaQueriesMixin>().isMqMaxS);
                    if (!this.as<PortalMixinImpl>().doCustomPropOpen(open, this.portalTargetEl)) {
                        this.portalTargetEl.style.position = 'absolute';
                        this.portalTargetEl.style.top = '0';
                        this.portalTargetEl.style.left = '0';

                        // this.opening is important since it's fix a race condition where the portal
                        // could appear behind the content of the page if it was toggled too quickly.
                        this.opening = true;
                        setTimeout(() => {
                            this.emitPortalAfterOpen();
                            this.setFocusToPortal();
                            this.opening = false;
                        }, this.transitionDuration);
                    } else {
                        this.emitPortalAfterOpen();
                    }
                }
            });
            this.emitOpen();
        } else {
            if (this.portalTargetEl) {
                this.$modul.popElement(this.stackId);

                if (!this.as<PortalMixinImpl>().doCustomPropOpen(open, this.portalTargetEl)) {
                    this.setFocusToTrigger();

                    setTimeout(() => {
                        // $emit update:open has been launched, animation already occurs
                        if (!this.opening) {
                            this.portalTargetEl.style.position = '';
                            this.emitPortalAfterClose();
                        }
                    }, this.transitionDuration);
                } else {
                    this.emitPortalAfterClose();
                }
            }
            this.emitClose();
        }
    }

    public set propOpen(open: boolean) {
        if (open !== this.internalOpen && !this.disabled) {
            this.manageOpeningAndClosing(open);

            this.internalOpen = open;
            this.emitUpdateOpen(open);
        }
    }

    public get transitionDuration(): number {
        return this.internalTransitionDuration;
    }

    public set transitionDuration(speed: number) {
        this.internalTransitionDuration = speed;
    }

    public get portalTargetSelector(): string {
        return this.propId ? `#${this.propId}` : '';
    }

    public get portalCreated(): boolean {
        return this.portalTargetCreated;
    }

    public get portalMounted(): boolean {
        return (this.propOpen || this.preload || this.loaded) && (this.portalTargetMounted || !this.lazy);
    }

    @Watch('trigger')
    private onTriggerChange(): void {
        this.handleTrigger();
    }

    @Watch('internalTriggerHook')
    private onTriggerHookChange(): void {
        this.handleTrigger();
    }

    private handleTrigger(): void {
        if (this.trigger) {
            this.internalTrigger = this.trigger;
        } else if (this.$slots.trigger && this.$slots.trigger[0]) {
            this.internalTrigger = this.$slots.trigger[0].elm as HTMLElement;
        } else if (this.as<OpenTriggerMixin>().triggerHook) {
            this.internalTrigger = this.as<OpenTriggerMixin>().triggerHook;
        }
        if (this.internalTrigger) {
            switch (this.openTrigger) {
                case MOpenTrigger.Click:
                    this.clickEventListener = this.toggle.bind(this);
                    this.internalTrigger.addEventListener('click', this.clickEventListener);
                    break;
                case MOpenTrigger.MouseDown:
                    this.mousedownEventListener = this.toggle.bind(this);
                    this.internalTrigger.addEventListener('mousedown', this.mousedownEventListener);
                    break;
                case MOpenTrigger.Hover:
                    this.mouseenterEventListener = this.handleMouseEnter.bind(this);
                    this.internalTrigger.addEventListener('mouseenter', this.mouseenterEventListener);
                    // Closing not supported for the moment, check source code history for how was handled mouse leave
                    break;
            }
        }
    }

    private toggle(event: MouseEvent): void {
        if (!this.disabled && event.button !== undefined && event.button === MouseButtons.LEFT) {
            this.propOpen = !this.propOpen;
            this.emitClick(event);
        }
    }

    private handleMouseEnter(): void {
        this.propOpen = true;
    }

    private ensurePortalTargetEl(onPortalReady: () => void = () => { }): void {
        if (!this.portalTargetEl) {
            this.propId = this.id === undefined ? 'mPortal-' + uuid.generate() : this.id;
            this.portalTargetEl = document.createElement('div');
            this.portalTargetEl.setAttribute('id', this.propId);
            this.portalTargetEl.classList.add('m-u--app-body');
            document.body.appendChild(this.portalTargetEl);
            this.portalTargetCreated = true;

            // We wait for the portal creation / mounting.
            this.$nextTick(() => {
                this.portalTargetMounted = true;
                this.portalTargetEl = document.querySelector(this.portalTargetSelector) as HTMLElement;
                this.emitPortalMounted();
                onPortalReady();
            });
        } else {
            onPortalReady();
        }
    }
}

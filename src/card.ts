import { LitElement, html, css, nothing, render as litRender } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { CardConfig, Hass, MachineState } from "./types";
import { defaults } from "./types";
import { runtimeFor, claimOwner, releaseOwner } from "./runtime";
import { audioKey, isPaired, pair, unpair } from "./device";
import { automaticAudioRetryDelays, initialMuted, isAutomaticAudioUnlocked, shouldRefreshVideoOnActivation, unlockAutomaticAudio } from "./audio";
@customElement("baby-monitor-kiosk-card")
export class Card extends LitElement {
  @property({ attribute: false }) hass?: Hass;
  @state() private machineState: MachineState = "IDLE";
  @state() private muted = true;
  @state() private automaticAudio = false;
  private manualActivation = false;
  private config!: CardConfig;
  private runtime?: ReturnType<typeof runtimeFor>;
  private unsubscribe?: () => void;
  private camera?: any;
  private portal?: HTMLDivElement;
  private cameraSignature = "";
  private currentBrightness = 100;
  private currentVolume = 100;
  private previousBrightness?: number;
  private previousVolume?: number;
  private companionActive = false;
  private audioRestoreTimers: number[] = [];
  static styles = css`
    :host {
      display: block;
      min-height: 1px;
      container-type: inline-size;
    }
    ha-card.setup {
      height: 56px;
      min-height: 56px;
      max-height: 56px;
      padding: 6px 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 9px;
      overflow: hidden;
      border-radius: 16px;
    }
    .monitor-icon {
      border: 0;
      padding: 0;
      position: relative;
      width: 36px;
      height: 36px;
      flex: 0 0 36px;
      border-radius: 11px;
      display: grid;
      place-items: center;
      color: var(--state-icon-color, var(--primary-color));
      background: color-mix(in srgb, var(--state-icon-color, var(--primary-color)) 14%, transparent);
      cursor: pointer;
    }
    .monitor-icon:disabled {
      cursor: default;
      opacity: 0.55;
    }
    .monitor-icon::after {
      content: "";
      position: absolute;
      right: -2px;
      bottom: -2px;
      width: 9px;
      height: 9px;
      border: 2px solid var(--card-background-color, #fff);
      border-radius: 50%;
      background: var(--warning-color, #ff9800);
    }
    .monitor-icon.ready::after {
      background: var(--success-color, #4caf50);
    }
    .monitor-icon ha-icon {
      --mdc-icon-size: 28px;
    }
    .copy {
      min-width: 0;
      flex: 1;
      line-height: 1.2;
    }
    .title {
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status {
      margin-top: 5px;
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--secondary-text-color);
      font-size: 12px;
      white-space: nowrap;
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--warning-color, #ff9800);
    }
    .dot.ok {
      background: var(--success-color, #4caf50);
    }
    .actions {
      display: flex;
      gap: 5px;
      flex: 0 0 auto;
    }
    .icon-button {
      width: 34px;
      height: 34px;
      border: 0;
      border-radius: 10px;
      display: grid;
      place-items: center;
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .icon-button.primary {
      color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color));
    }
    .icon-button ha-icon {
      --mdc-icon-size: 21px;
    }
    @container (max-width:250px) {
      ha-card.setup {
        padding: 6px 8px;
        gap: 6px;
      }
      .copy {
        display: none;
      }
      .actions {
        margin-left: auto;
      }
    }
    .stage {
      position: fixed;
      inset: 0;
      z-index: 2147483000;
      background: #000;
      display: grid;
      place-items: center;
    }
    .stage > *:first-child {
      width: 100%;
      height: 100%;
    }
    .controls {
      position: absolute;
      left: 50%;
      bottom: max(24px, env(safe-area-inset-bottom));
      transform: translateX(-50%);
      display: flex;
      gap: 18px;
    }
    .controls button {
      width: 68px;
      height: 68px;
      border: 0;
      border-radius: 50%;
      font-size: 28px;
      background: #111c;
      color: white;
    }
    .preload {
      position: fixed;
      width: 2px;
      height: 2px;
      opacity: 0.01;
      pointer-events: none;
      overflow: hidden;
      left: -4px;
      top: -4px;
    }
    .debug {
      position: fixed;
      z-index: 2147483001;
      top: 8px;
      left: 8px;
      background: #000b;
      color: #fff;
      padding: 8px;
      font: 14px monospace;
    }
    .idle {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
  `;
  static getConfigElement() {
    return document.createElement("baby-monitor-kiosk-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:baby-monitor-kiosk-card",
      camera: "camera.babykamer",
      sound_sensor: "binary_sensor.babykamer_geluid",
      preload: true,
      silence_duration: 5,
      kiosk: { device_bound: true },
    };
  }
  setConfig(c: CardConfig) {
    if ((!c.camera && !c.stream) || !c.sound_sensor) throw Error("camera or stream, and sound_sensor are required");
    const nextId = c.id ?? `${c.camera ?? c.stream}|${c.sound_sensor}`;
    if (this.config && this.configId !== nextId) {
      this.manualActivation = false;
      this.unsubscribe?.();
      releaseOwner(this.configId, this);
      this.portal?.remove();
      this.portal = undefined;
      this.camera = undefined;
      this.cameraSignature = "";
    }
    this.config = { ...defaults, ...c };
    this.id = this.configId;
    this.currentBrightness = c.companion?.active_brightness ?? 100;
    this.currentVolume = c.companion?.active_volume ?? 100;
    this.automaticAudio = isAutomaticAudioUnlocked(this.configId);
    const stored = c.audio?.remember_state === false ? null : localStorage.getItem(audioKey(this.configId));
    this.muted = this.automaticAudio ? !this.active() : initialMuted(c.preload !== false, stored, c.audio?.default_muted ?? false);
    this.connectRuntime();
    if (this.isConnected) {
      this.ensureCamera();
      this.configureCamera();
    }
  }
  private get configId() {
    return this.config?.id ?? `${this.config?.camera ?? this.config?.stream}|${this.config?.sound_sensor}`;
  }
  private connectRuntime() {
    this.unsubscribe?.();
    this.runtime = runtimeFor(this.config);
    this.unsubscribe = this.runtime.subscribe((s) => {
      this.machineState = s;
      if (s === "IDLE" || s === "MANUAL_COOLDOWN") this.manualActivation = false;
      this.automaticAudio = isAutomaticAudioUnlocked(this.configId);
      this.requestUpdate();
      const canOwn = this.eligible() || this.manualActivation;
      if (canOwn && claimOwner(this.configId, this)) {
        if (s === "ACTIVE" && (this.eligible() || this.manualActivation)) {
          void this.companion(true);
          void this.activateVideo();
        }
        // The fullscreen camera remains visible during the silence timer. A
        // legacy sensor-off automation may already have restored the kiosk's
        // idle brightness, so reassert the active levels for this visible
        // phase as well.
        if (s === "SILENCE_TIMER" && this.active()) void this.companion(true);
        if (s === "IDLE" || s === "MANUAL_COOLDOWN") {
          void this.companion(false);
          this.muteVideo();
        }
      }
    });
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.config) {
      this.connectRuntime();
      this.ensureCamera();
      this.configureCamera();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.();
    this.unsubscribe = undefined;
    this.portal?.remove();
    this.portal = undefined;
    releaseOwner(this.configId, this);
    this.cancelAutomaticAudioRestore();
  }
  updated() {
    if (this.hass) this.runtime?.update(this.hass);
    this.ensureCamera();
    if (this.camera) this.camera.hass = this.hass;
    this.syncPortal();
  }
  private cameraConfig() {
    return {
      type: "custom:webrtc-camera",
      ...(this.config.stream ? { url: this.config.stream } : { entity: this.config.camera }),
      // Reconfiguring an iOS WebRTC player from muted to unmuted can replace
      // or block the media element. Keep its config safe and control the
      // already-playing video element directly instead.
      muted: true,
      controls: true,
    };
  }
  private configureCamera() {
    const config = this.cameraConfig(),
      signature = JSON.stringify(config);
    if (this.camera && signature !== this.cameraSignature) {
      this.camera.setConfig?.(config);
      this.cameraSignature = signature;
    }
  }
  private ensureCamera(manual = false) {
    if (!this.isConnected || this.camera || !this.config || !(manual ? this.manualAllowed() : this.eligible()) || !claimOwner(this.configId, this)) return;
    this.camera = document.createElement("webrtc-camera");
    this.camera.style.cssText = "display:block;width:100%;height:100%;object-fit:contain";
    this.configureCamera();
  }
  private async activateVideo() {
    await this.updateComplete;
    const nav = globalThis.navigator;
    this.automaticAudio = isAutomaticAudioUnlocked(this.configId);
    const restoreAudio = this.automaticAudio;
    // Always resume iOS video muted first. Setting muted=false before play()
    // makes WebKit reject playback and leaves the WebRTC surface black.
    this.muted = true;
    this.applyVideoMuted(this.camera, true);
    this.requestUpdate();
    if (nav && shouldRefreshVideoOnActivation(nav.userAgent, nav.platform, nav.maxTouchPoints, restoreAudio, this.manualActivation)) {
      this.camera?.remove();
      this.camera = undefined;
      this.cameraSignature = "";
      this.ensureCamera(this.manualActivation);
      if (this.camera) this.camera.hass = this.hass;
      this.syncPortal();
    }
    requestAnimationFrame(() => {
      this.playVideos(this.camera);
      if (restoreAudio) this.restoreAutomaticAudioWhenReady();
    });
  }
  private playVideos(root: any): number {
    if (!root) return 0;
    let count = 0;
    for (const video of root.querySelectorAll?.("video") ?? []) {
      count += 1;
      video.muted = this.muted;
      video.playsInline = true;
      void video.play?.().catch(() => {});
    }
    return count + this.playVideos(root.shadowRoot);
  }
  private restoreAutomaticAudioWhenReady() {
    this.cancelAutomaticAudioRestore();
    for (const delay of automaticAudioRetryDelays) {
      const timer = window.setTimeout(() => {
        if (!this.active() || !isAutomaticAudioUnlocked(this.configId)) return;
        if (!this.videoCount(this.camera)) return;
        this.muted = false;
        this.playVideos(this.camera);
        this.applyVideoMuted(this.camera, false);
        this.cancelAutomaticAudioRestore();
        this.requestUpdate();
      }, delay);
      this.audioRestoreTimers.push(timer);
    }
  }
  private cancelAutomaticAudioRestore() {
    for (const timer of this.audioRestoreTimers) clearTimeout(timer);
    this.audioRestoreTimers = [];
  }
  private videoCount(root: any): number {
    if (!root) return 0;
    return (root.querySelectorAll?.("video")?.length ?? 0) + this.videoCount(root.shadowRoot);
  }
  private muteVideo() {
    this.cancelAutomaticAudioRestore();
    this.muted = true;
    this.applyVideoMuted(this.camera, true);
    this.requestUpdate();
  }
  private applyVideoMuted(root: any, muted: boolean) {
    if (!root) return;
    for (const video of root.querySelectorAll?.("video") ?? []) video.muted = muted;
    this.applyVideoMuted(root.shadowRoot, muted);
  }
  private enableAutomaticAudio() {
    unlockAutomaticAudio(this.configId);
    this.automaticAudio = true;
    this.muted = false;
    this.applyVideoMuted(this.camera, false);
    this.playVideos(this.camera);
    if (!this.active()) setTimeout(() => this.muteVideo(), 150);
    this.requestUpdate();
  }
  private eligible() {
    return this.config.kiosk?.enabled !== false && (this.config.kiosk?.device_bound === false || isPaired(this.configId)) && (!this.config.kiosk?.allowed_user_ids?.length || (!!this.hass?.user && this.config.kiosk.allowed_user_ids.includes(this.hass.user.id)));
  }
  private manualAllowed() {
    return this.config.kiosk?.enabled !== false && (!this.config.kiosk?.allowed_user_ids?.length || (!!this.hass?.user && this.config.kiosk.allowed_user_ids.includes(this.hass.user.id)));
  }
  private active() {
    const cameraActive = this.machineState === "ACTIVE" || this.machineState === "SILENCE_TIMER";
    return cameraActive && (this.manualActivation || (this.config.auto_open !== false && this.eligible()));
  }
  private toggleMute() {
    if (this.muted && !this.automaticAudio) {
      this.enableAutomaticAudio();
      return;
    }
    this.muted = !this.muted;
    if (this.config.audio?.remember_state !== false) localStorage.setItem(audioKey(this.configId), String(this.muted));
    this.applyVideoMuted(this.camera, this.muted);
    this.playVideos(this.camera);
    this.requestUpdate();
  }
  private async companion(active: boolean) {
    const service = this.config.companion?.notify_service;
    if (!service || !this.eligible() || !this.hass) return;
    // Initial IDLE subscriptions must not force an arbitrary idle level. Only
    // restore after this card actually activated the kiosk.
    if (!active && !this.companionActive) return;
    if (active && !this.companionActive) {
      this.captureCompanionLevels();
      this.companionActive = true;
    }
    const restorePrevious = this.config.companion?.restore_previous !== false;
    const brightness = active
      ? this.config.companion?.active_brightness
      : restorePrevious && this.previousBrightness != null
        ? this.previousBrightness
        : this.config.companion?.idle_brightness;
    const volume = active
      ? this.config.companion?.active_volume
      : restorePrevious && this.previousVolume != null
        ? this.previousVolume
        : this.config.companion?.idle_volume;
    const commands = [] as {
      message: string;
      data?: Record<string, unknown>;
    }[];
    if (active && this.config.companion?.screensaver !== false) commands.push({ message: "kiosk_hide_screensaver" });
    if (brightness != null)
      commands.push({
        message: "kiosk_set_brightness",
        data: { level: brightness },
      });
    if (volume != null) commands.push({ message: "kiosk_set_volume", data: { volume } });
    if (!active && this.config.companion?.screensaver !== false) commands.push({ message: "kiosk_show_screensaver" });
    for (const command of commands)
      try {
        await this.hass.callService("notify", service, command);
      } catch (e) {
        if (this.config.debug) console.warn("[baby-monitor] Companion command failed", e);
      }
    if (!active) {
      this.companionActive = false;
      this.previousBrightness = undefined;
      this.previousVolume = undefined;
    }
  }
  private captureCompanionLevels() {
    const read = (entityId?: string) => {
      if (!entityId || !this.hass) return undefined;
      const value = Number(this.hass.states[entityId]?.state);
      return Number.isFinite(value) && value >= 0 && value <= 100 ? value : undefined;
    };
    this.previousBrightness = read(this.config.companion?.brightness_sensor);
    this.previousVolume = read(this.config.companion?.volume_sensor);
  }
  private async kioskLevel(kind: "brightness" | "volume", delta: number) {
    const service = this.config.companion?.notify_service;
    if (!service || !this.hass) return;
    const value = Math.max(0, Math.min(100, (kind === "brightness" ? this.currentBrightness : this.currentVolume) + delta));
    if (kind === "brightness") this.currentBrightness = value;
    else this.currentVolume = value;
    const message = kind === "brightness" ? "kiosk_set_brightness" : "kiosk_set_volume";
    const data = kind === "brightness" ? { level: value } : { volume: value };
    try {
      await this.hass.callService("notify", service, { message, data });
    } catch (e) {
      if (this.config.debug) console.warn("[baby-monitor] Companion level command failed", e);
    }
  }
  private syncPortal() {
    if (!this.camera || !claimOwner(this.configId, this)) return;
    if (!this.portal) {
      this.portal = document.createElement("div");
      this.portal.dataset.babyMonitorKiosk = this.configId;
      document.body.append(this.portal);
    }
    const show = this.active(),
      preload = this.config.preload !== false && this.eligible();
    this.portal.style.cssText = show ? "position:fixed;inset:0;z-index:2147483000;opacity:1;pointer-events:auto;background:#000;display:grid;place-items:center;overflow:hidden;" : "position:fixed;inset:0;z-index:-1;opacity:.001;pointer-events:none;background:#000;display:grid;place-items:center;overflow:hidden;";
    litRender(
      show || preload
        ? html`<style>
              .cam {
                width: 100%;
                height: 100%;
                min-width: 100vw;
                min-height: 100vh;
              }
              .controls {
                position: absolute;
                left: 50%;
                bottom: max(24px, env(safe-area-inset-bottom));
                transform: translateX(-50%);
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
                justify-content: center;
              }
              .controls button {
                width: 68px;
                height: 68px;
                border: 0;
                border-radius: 50%;
                font-size: 25px;
                background: #111c;
                color: #fff;
              }
            </style>
            <div class="cam">${this.camera}</div>
            ${show ? html`<div class="controls">${this.config.controls?.brightness ? html`<button aria-label="Helderheid lager" @click=${() => this.kioskLevel("brightness", -20)}>☀−</button><button aria-label="Helderheid hoger" @click=${() => this.kioskLevel("brightness", 20)}>☀+</button>` : nothing}${this.config.controls?.volume ? html`<button aria-label="Volume lager" @click=${() => this.kioskLevel("volume", -20)}>−🔊</button><button aria-label="Volume hoger" @click=${() => this.kioskLevel("volume", 20)}>+🔊</button>` : nothing}${this.config.controls?.mute !== false ? html`<button aria-label=${this.muted ? "Geluid aan" : "Geluid uit"} @click=${() => this.toggleMute()}>${this.muted ? "🔇" : "🔊"}</button>` : nothing}${this.config.controls?.close !== false ? html`<button aria-label="Sluiten" @click=${() => this.runtime?.close()}>✕</button>` : nothing}</div>` : nothing}`
        : nothing,
      this.portal,
    );
  }
  private togglePair() {
    isPaired(this.configId) ? unpair(this.configId) : pair(this.configId);
    if (isPaired(this.configId)) this.ensureCamera();
    this.requestUpdate();
  }
  private openCamera() {
    if (!this.manualAllowed()) return;
    const alreadyActive = this.machineState === "ACTIVE" || this.machineState === "SILENCE_TIMER";
    this.manualActivation = true;
    this.ensureCamera(true);
    this.runtime?.open();
    // A new MANUAL_OPEN transition activates video through the runtime
    // subscriber. Only resume it directly when the shared runtime was already
    // active (for example, sound is active on an unpaired client).
    if (alreadyActive) void this.activateVideo();
    this.requestUpdate();
  }
  render() {
    if (!this.config) return nothing;
    const sensor = this.hass?.states[this.config.sound_sensor]?.state ?? "?";
    const paired = isPaired(this.configId);
    const ready = paired && this.automaticAudio;
    const canOpen = this.manualAllowed();
    return html`${this.config.show_setup
      ? html`<ha-card class="setup"
          ><button class="monitor-icon ${ready ? "ready" : ""}" title=${canOpen ? "Camera openen" : "Camera niet beschikbaar voor deze gebruiker"} aria-label=${canOpen ? "Babycamera openen" : "Babycamera niet beschikbaar voor deze gebruiker"} ?disabled=${!canOpen} @click=${() => this.openCamera()}>
            <ha-icon icon="mdi:baby-face-outline"></ha-icon>
          </button>
          <div class="copy">
            <div class="title">Baby Monitor</div>
            <div class="status"><span class="dot ${ready ? "ok" : ""}"></span>${!paired ? "Niet gekoppeld" : this.automaticAudio ? "Klaar · automatisch geluid" : "Gekoppeld · tik voor geluid"}</div>
          </div>
          <div class="actions">
            ${paired && !this.automaticAudio
              ? html`<button class="icon-button primary" title="Automatisch camerageluid inschakelen" aria-label="Automatisch camerageluid inschakelen" @click=${() => this.enableAutomaticAudio()}>
                  <ha-icon icon="mdi:volume-high"></ha-icon>
                </button>`
              : nothing}<button class="icon-button" title=${paired ? "Dit apparaat ontkoppelen" : "Dit apparaat koppelen"} aria-label=${paired ? "Dit apparaat ontkoppelen" : "Dit apparaat koppelen"} @click=${() => this.togglePair()}>
              <ha-icon icon=${paired ? "mdi:link-variant" : "mdi:link-variant-plus"}></ha-icon>
            </button></div
        ></ha-card>`
      : nothing}${!this.active() && this.config.preload === false ? html`<span class="idle">Baby monitor gereed</span>` : nothing}${this.config.debug ? html`<div class="debug">state=${this.machineState} | value=${sensor} | on≥${this.config.sound_threshold_db ?? "-"} | off≤${this.config.sound_reset_db ?? "-"} | timer=${Math.ceil((this.runtime?.remainingMs() ?? 0) / 1000)}s | kiosk=${this.eligible()} | preload=${this.config.preload !== false && this.eligible()}</div>` : nothing}`;
  }
}

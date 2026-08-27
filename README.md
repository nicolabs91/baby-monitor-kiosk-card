# Baby Monitor Kiosk Card

Device-local, sound-triggered fullscreen baby monitor for Home Assistant. It reuses `custom:webrtc-camera`, keeps one stream warm per page, and only auto-opens on a browser that was explicitly paired. Other clients receiving the same HA entity update do nothing.

## Requirements

- Home Assistant 2024.8+
- [WebRTC Camera](https://github.com/AlexxIT/WebRTC) installed and its Lovelace resource loaded
- A camera entity or go2rtc/WebRTC stream name
- A numeric sound-level sensor or binary sound sensor

## Install

Add this repository in HACS as a custom **Dashboard** repository, install it, then reload the browser. For manual installation copy `dist/baby-monitor-kiosk-card.js` to `/config/www/` and add `/local/baby-monitor-kiosk-card.js` as a JavaScript module resource.

Add the card through the graphical editor. On the intended iPad, edit the card and press **Koppel dit apparaat**. Pairing is stored in that browser's `localStorage`; it is deliberately not synchronized by Home Assistant. Pair again after clearing app/browser data.

## Configuration

```yaml
type: custom:baby-monitor-kiosk-card
id: nursery-ipad
stream: eufy_e21_webrtc # alternatively: camera: camera.babykamer
sound_sensor: sensor.babykamer_sound_level
preload: true
sound_threshold_db: 48
sound_reset_db: 42
trigger_for: 1
silence_duration: 5
manual_close_cooldown: 30
kiosk:
  enabled: true
  device_bound: true
audio:
  default_muted: false
  remember_state: true
controls:
  mute: true
  close: true
  volume: false
  brightness: false
companion:
  notify_service: mobile_app_ipad_van_nico
  restore_previous: true
  brightness_sensor: sensor.ipad_van_nico_kiosk_brightness
  volume_sensor: sensor.ipad_van_nico_kiosk_volume
  active_brightness: 100
  idle_brightness: 10
  active_volume: 100
  idle_volume: 30
debug: false
```

Numeric sensors use hysteresis: activation occurs at or above `sound_threshold_db`; once loud, it remains loud until at or below `sound_reset_db`. Binary sensors use `on`/`off`. Unavailable/unknown/non-numeric values are ignored. `trigger_for`, silence and cooldown are seconds.

`kiosk.device_bound` defaults effectively to **true**. Setting it to false disables device isolation and is discouraged. `preload` only starts a hidden stream on an eligible paired client. A singleton owner prevents duplicate card instances on one page from creating multiple streams or overlays. The fullscreen surface is a body-level portal, so dashboard/card CSS cannot clip it.

## iOS audio and Companion commands

iOS requires one user gesture before unmuted autoplay is permitted. On the paired setup card, tap **Automatically enable camera audio** once after a fresh app/webview start. The permission is shared by duplicate card instances for the current webview session. The stream then unmutes automatically on sound and mutes again on idle. A full app termination, iOS process eviction, reboot, or webview reload requires the gesture again. Forcing an unmuted preload can make iOS block the media element and show a black stream. Optional `companion.notify_service` plus brightness/volume values sends the established `kiosk_*` notification commands. With `restore_previous` (the default) and the two sensor entity IDs configured, the card snapshots the iPad's current levels before activation and restores those exact values afterward; the idle values remain safe fallbacks when a sensor is unavailable. When enabled, the large volume and brightness buttons adjust these values in 20-point steps. Failures are non-fatal. Exact command support depends on the Companion App version and kiosk settings.

## State/debug

Set `debug: true` while tuning. States are `IDLE`, `SOUND_PENDING`, `ACTIVE`, `SILENCE_TIMER`, and `MANUAL_COOLDOWN`. New sound cancels the silence timer. Manual close suppresses reopening for the configured cooldown.

## Migration

Install beside the old solution, pair only the kiosk iPad, and test numeric/binary detection, silence reset, mute, manual close, dashboard navigation and network reconnect. Verify a phone/laptop does not open automatically. Only then disable old global CSS/overlays/automations. This repository does not modify them.

## Development

```sh
npm install
npm test
npm run check
npm run build
```

The optional blueprint is only a fallback for server-side Companion commands; device isolation and fullscreen decisions always remain client-side.

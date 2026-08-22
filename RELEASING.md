# Releasing

1. Run `npm ci && npm run check && npm test && npm run build && npm audit`.
2. Update `package.json` and the version banner in `src/index.ts`.
3. Commit `dist/baby-monitor-kiosk-card.js` and its source map.
4. Create a semver GitHub release and attach `dist/baby-monitor-kiosk-card.js`.
5. HACS reads `hacs.json` and installs the named distribution file. Test the release in a non-production dashboard before promoting it.

The repository can be used as a private HACS Dashboard repository before submission to the HACS default catalog.

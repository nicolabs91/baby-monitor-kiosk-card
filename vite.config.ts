import {defineConfig} from 'vite';
export default defineConfig({build:{lib:{entry:'src/index.ts',formats:['es'],fileName:()=> 'baby-monitor-kiosk-card.js'},rollupOptions:{output:{inlineDynamicImports:true}},sourcemap:true,minify:true}});

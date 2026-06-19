import path from 'path';
import fg from 'fast-glob';

export default function vitePluginBladeScript(options = {}) {
    const jsPath = options.jsPath || 'resources/js/**/*.js';

    return {
        name: 'vite-plugin-blade-script',
        
        configResolved(config) {
            const jsFiles = fg.sync(jsPath);
            
            let input = config.build.rollupOptions.input || [];
            
            if (typeof input === 'string') {
                input = [input];
            } else if (!Array.isArray(input)) {
                input = Object.values(input);
            }

            config.build.rollupOptions.input = [...new Set([...input, ...jsFiles])];
        },
        resolveId(source) {
            if (source.startsWith('@/')) {
                return source.replace('@', path.resolve(process.cwd(), 'resources/js'));
            }
            return null;
        }
    };
}
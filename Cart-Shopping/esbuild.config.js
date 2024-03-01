const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/main.jsx'],
    bundle: true,
    outfile: 'out/bundle.js',
    loader: { '.js': 'jsx' },
    jsxFactory: 'React.createElement',
}).catch(() => process.exit(1));
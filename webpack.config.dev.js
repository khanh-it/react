
const path = require('path');

const config = {
    'entry': './app/index.jsx',
    'output': {
        'path': path.resolve('./app/dist'),
        'filename': 'bundle.js'
    }
};

module.exports = config;
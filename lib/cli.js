import * as muso from './analyser.js';
muso.analyseFiles('res/**/*.mp3')
    .map(console.log)
    .catch(console.err);

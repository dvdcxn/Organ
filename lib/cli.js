import * as muso from './analyser.js';

muso.analyseFiles('res/**/*.mp3')
	.each(song => {		
		if(song.id3){
			console.log(`Read ${song.fileName} ok.`);
		}
		else{
			console.log(`Could not determine id3 of file ${song.fileName}`);
		}
	});
	


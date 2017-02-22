import { readFile } from 'fs-extra';
import * as id3 from 'id3-parser';
import { glob } from 'glob';
import { analysedFile } from './analysedFile';
import * as bluebird from 'bluebird';

export function analyseFile(fileName) {
	let _readFile = bluebird.promisify(readFile);
	return _readFile(fileName)
		.then(id3.parse)
		.then(stats => {	
			if(stats.version){	
				return new analysedFile(fileName, stats);
			}
			else{
				throw `Couldn\'t determine id3 data for file ${fileName}`;
			}		
		});
}

export function analyseFiles(globs) {
	let _glob = bluebird.promisify(glob);
	return _glob(globs)
		.map(analyseFile);
}

import { readFile } from 'fs-extra';
import * as id3 from 'id3-parser';
import { glob } from 'glob';
import { song } from './song';
import * as bluebird from 'bluebird';

export function analyseFile(fileName) {
	let _readFile = bluebird.promisify(readFile);
	return _readFile(fileName)
		.then(id3.parse)
		.then(id3Stats => {
			if (id3Stats.version) {
				return new song(fileName, id3Stats);
			}
			else {
				throw `Couldn\'t determine id3 data for file ${fileName}`;
			}
		});
}

export function analyseFiles(globs) {
	let _glob = bluebird.promisify(glob);
	return _glob(globs)
		.map(analyseFile);
}

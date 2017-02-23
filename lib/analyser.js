import { readFile } from 'fs-extra';
import * as id3 from 'id3-parser';
import { glob } from 'glob';
import { song } from './song';
import * as bluebird from 'bluebird';

function isId3Valid(id3Stats) {
	return id3Stats && id3Stats.version;
}
export function analyseFile(fileName) {
	let _readFile = bluebird.promisify(readFile);
	return _readFile(fileName)
		.then(file => bluebird.resolve(id3.parse(file)))
		.then(id3Stats => {
			if (isId3Valid(id3Stats)) {
				return new song(fileName, id3Stats);
			}
			else {
				return new song(fileName);
			}
		});
}

export function analyseFiles(globs) {
	return bluebird.promisify(glob)(globs)
		.map(analyseFile);
}

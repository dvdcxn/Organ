export default {
	'files': ['res/**/*.mp3'],  //A list of files / patterns to organise 
	'hierachy': [
		{
			'groupBy': '${artist}', //interpolated name for each folder at this level. Any id3 tag belonging to the first file in this folder will be inserted accordingly on format.             
			'where': song => {              //Where only includes files where the return value of this function is truthy
				return !['Aphex Twin', 'Beach House'].includes(song.id3.artist);   //Exclude any files whose artist is Apex Twin or Beach House
			}
		},
		{
			'groupBy': '${album} - ${year}' //Can combine interpolated variables with free text
		},
		{
			'groupBy': song => {
				return song.id3.lyrics ? 'with-lyrics' : 'no-lyrics'; //Use a function to create custom grouping logic
			}
		}
	],
	'renameSongs': {
		'pattern': '{$id3.artist} - ${id3.album} - track ${track} - ${id3.title}', //alternatively use a function taking song as an argument.
		'where': song => { 	     //where only includes files where the return value of the given function is truthy
			return !song.fileName.includes(song.id3.album);  //Optionally, only rename songs where this function is truthy, e.g. filename does not include album
		}
	}
};
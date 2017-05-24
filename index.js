const ncp = require('ncp').ncp;
const fs = require('fs');
const exec = require('child_process').exec;
const clientID = JSON.parse(fs.readFileSync('SoundCloudKEY.json', 'utf8')).KEY;

const outputsDir = "Outputs";
const projectsDir = "Projects";
if (!fs.existsSync(outputsDir)){
    fs.mkdirSync(outputsDir);
}
if (!fs.existsSync(projectsDir)){
    fs.mkdirSync(projectsDir);
}

var author = "";
var title = "";
var fullTitle = "";
var newProjectPath = "";
var trackID = "";
prompt('SoundCloud URL: ', function (input) {
    var request = require('request');
		request('http://api.soundcloud.com/resolve?url=' + input + '&client_id=' + clientID, function (error, response, body) {
			if(error) console.log('error:', error); // Print the error if one occurred 
		  	var object = JSON.parse(body);
		  	author = object.user.username;
		  	title = object.title;
		  	trackID = object.id;

		  	fullTitle = author + " - " + title;
		  	newProjectPath = `Projects/${title}/`;

			ncp("./Template", newProjectPath, function (err) {
				if (err) {
					return console.error(err);
				}
				const videoJSON = {
					title: title,
					author: author,
					url: input
				};

				fs.writeFile(newProjectPath + "video.json", JSON.stringify(videoJSON), function(err) {
				    if(err) {
				        return console.log(err);
				    }
				    console.log("video.json created.");
				    request('https://unsplash.it/1920/1080/?random').pipe(fs.createWriteStream(newProjectPath + '(Footage)/background.jpg'));
					console.log("Background downloaded.");
					const cmd = 'scdl -l ' + input;
					exec(cmd, {maxBuffer: 1024 * 500}, function(error, stdout, stderr) {
						fs.rename(title + ".mp3", newProjectPath + "(Footage)/" + title + ".mp3", () => {
							console.log("Music downloaded.");
							console.log("Opening project...");
							fs.rename(newProjectPath +"Project.aep", newProjectPath + title + ".aep", () => {
								openProject();
							});
						});
					});
				});
			});
	});
});


function prompt(question, callback) {
    var stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}

function openProject(){
const cmd = 'afterfx -r "'+ __dirname + "/" + newProjectPath +'Script.jsx"';
console.log(cmd);
	exec(cmd, function(error, stdout, stderr) {
		console.log(stderr);
		console.log("Rendering...");
	});
}
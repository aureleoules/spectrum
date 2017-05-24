const Youtube = require("youtube-api"),
    readJson = require("r-json"),
    Lien = require("lien"),
    fs = require('fs'),
    Logger = require("bug-killer"),
    opn = require("opn"),
    prettyBytes = require("pretty-bytes"),
    path = require("path");
const watch = require('node-watch');
// I downloaded the file from OAuth2 -> Download JSON
const CREDENTIALS = readJson(`${__dirname}/credentials.json`);
const descSample = fs.readFileSync('sampleDescription.txt', 'utf8');

// Init lien server
var server = new Lien({
    host: "localhost"
  , port: 5000
});
const outputsDir = "./Outputs/";
const uploadsDir = "./Uploads/";
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}
authenticate();
watch(outputsDir, { filter: /\.mp4$/ },  function(evt, path) {
	if (evt == 'update') {
    	upload(path);
	}
});

function authenticate() {
		// Authenticate
	// You can access the Youtube resources via OAuth2 only.
	// https://developers.google.com/youtube/v3/guides/moving_to_oauth#service_accounts
	var oauth = Youtube.authenticate({
	    type: "oauth"
	  , client_id: CREDENTIALS.web.client_id
	  , client_secret: CREDENTIALS.web.client_secret
	  , redirect_url: CREDENTIALS.web.redirect_uris[0]
	});

	opn(oauth.generateAuthUrl({
	    access_type: "offline"
	  , scope: ["https://www.googleapis.com/auth/youtube.upload"]
	}));

	// Handle oauth2 callback
	server.addPage("/oauth2callback", lien => {
	    Logger.log("Getting token...");
	    oauth.getToken(lien.query.code, (err, tokens) => {
	        if (err) {
	            lien.lien(err, 400);
	            return Logger.log(err);
	        }
	        Logger.log("Token received.");
	        oauth.setCredentials(tokens);
	        lien.end(`<script>document.location = "http://google.fr"</script>`);
	        checkOutputFolder();
	    });
	});
}

function upload(videoPath) {
	const videoTitle = path.basename(videoPath).replace(".mp4", "").replace(".avi", "");
	const video = JSON.parse(fs.readFileSync('./Projects/' + videoTitle + '/video.json', 'utf8'));
	const videoDesc = descSample.replace("[@TITLE]", video.title).replace("[@SOUNDCLOUDLINK]", video.url) 
	console.log("Uploading " + video.title);

	var req = Youtube.videos.insert({
	    resource: {
	        // Video title and description
	        snippet: {
	            title: video.title,
	            description: videoDesc
	        },
	        // I don't want to spam my subscribers
	        status: {
	            privacyStatus: "public"
	        }
	    },
	    // This is for the callback function
	    part: "snippet,status",
	    // Create the readable stream to upload the video
	    media: {
	        body: fs.createReadStream(videoPath)
	    }
	}, (err, data) => {
	    console.log(video.title + " uploaded.");
	    clearInterval(upOutput);
	    fs.rename(outputsDir + path.basename(videoPath), uploadsDir + path.basename(videoPath), () => {
	    	console.log("Video was successfuly moved.");
	    });
	    return;
	});
	var upOutput = setInterval(function () {
	    console.log(`${prettyBytes(req.req.connection._bytesDispatched)} bytes uploaded.`);
	}, 250);
}

function checkOutputFolder() {
	const files = fs.readdirSync(outputsDir);
	for(var i = 0; i < files.length; i++) {
		if(files[i].substr(-4) === '.mp4') {
			console.log(files[i]);
			upload(outputsDir + files[i]);
		}
	}
}
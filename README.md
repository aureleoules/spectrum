# My Favorite Music Scripts

## What is it ?
This script will allow you to create videos like: https://www.youtube.com/watch?v=K6VMJTe-nOQ fully automatically!
The script will download a random background, the music you want, put the title on the video, add a visualizer synced to the music. It will render the video fully automatically using **Adobe Media Encoder**, and eventually upload it to YouTube!

## Requirements
* You need to have **Python** installed.
* You need to have **Node.JS** installed.
* You need to have **Adobe After Effects** installed.
* A [SoundCloud API Key](https://soundcloud.com/you/apps).

### (Optional)
You may install **Adobe Media Encoder** for a better video quality.

## Setup
* You firstly have to run a `npm install` or `yarn install` to install all required dependencies.  
* Then you have to install the [SCDL Python Library](https://github.com/flyingrub/scdl) using pip: `pip install scdl` or `git clone https://github.com/flyingrub/scdl.git && cd scdl
python3 setup.py install`.
* Add 'afterfx.exe' to your **Windows PATH**. (Add something like `C:\Programs\Adobe\Adobe After Effects CC 2017\Support Files` to your `WINDOWS PATH`.
* Put your SoundCloud API Key in the file `SoundCloudKEY.json`.
* Make your own adjustements to the `sampleDescription.txt` file.

### (Optional)
If you want to use the YouTube uploader you need new Google OAuth 2.0 API KEY.  
You can register one at https://console.developers.google.com/apis/dashboard.
* Make sure the application type is `Web Application`.
* Add this url: `http://localhost:5000/oauth2callback` as redirect URI
* Add this url: `http://localhost:5000` as JS Origins.
* Download your credentials by clicking the download button next to your new API login. Save this file as `credentials.json` in the root of the project.

## How do I use the Script ?!
* Open the `START.bat` and enter the SoundCloud URL for your desired music!
* Wait and see !

## How do I use the YouTube uploader ?!
* Open the `watcher.bat`, it will prompt you a YouTube Sign In Page to get your Access Token to upload videos.
* Wait until a new video is rendered and it will automatically upload it!
(It will also upload every remaining videos not uploaded at the start of the script!)

## License
Under **MIT** License.

:)


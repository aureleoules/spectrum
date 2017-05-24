//JSON Lib
if(typeof JSON!=="object"){JSON={}}(function(){"use strict";var g=/^[\],:{}\s]*$/;var h=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;var l=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;var m=/(?:^|:|,)(?:\s*\[)+/g;var o=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;var p=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;function f(n){return n<10?"0"+n:n}function this_value(){return this.valueOf()}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};Boolean.prototype.toJSON=this_value;Number.prototype.toJSON=this_value;String.prototype.toJSON=this_value}var q;var r;var s;var t;function quote(b){o.lastIndex=0;return o.test(b)?"\""+b.replace(o,function(a){var c=s[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+"\"":"\""+b+"\""}function str(a,b){var i;var k;var v;var c;var d=q;var e;var f=b[a];if(f&&typeof f==="object"&&typeof f.toJSON==="function"){f=f.toJSON(a)}if(typeof t==="function"){f=t.call(b,a,f)}switch(typeof f){case"string":return quote(f);case"number":return isFinite(f)?String(f):"null";case"boolean":case"null":return String(f);case"object":if(!f){return"null"}q+=r;e=[];if(Object.prototype.toString.apply(f)==="[object Array]"){c=f.length;for(i=0;i<c;i+=1){e[i]=str(i,f)||"null"}v=e.length===0?"[]":q?"[\n"+q+e.join(",\n"+q)+"\n"+d+"]":"["+e.join(",")+"]";q=d;return v}if(t&&typeof t==="object"){c=t.length;for(i=0;i<c;i+=1){if(typeof t[i]==="string"){k=t[i];v=str(k,f);if(v){e.push(quote(k)+(q?": ":":")+v)}}}}else{for(k in f){if(Object.prototype.hasOwnProperty.call(f,k)){v=str(k,f);if(v){e.push(quote(k)+(q?": ":":")+v)}}}}v=e.length===0?"{}":q?"{\n"+q+e.join(",\n"+q)+"\n"+d+"}":"{"+e.join(",")+"}";q=d;return v}}if(typeof JSON.stringify!=="function"){s={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};JSON.stringify=function(a,b,c){var i;q="";r="";if(typeof c==="number"){for(i=0;i<c;i+=1){r+=" "}}else if(typeof c==="string"){r=c}t=b;if(b&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number")){throw new Error("JSON.stringify");}return str("",{"":a})}}if(typeof JSON.parse!=="function"){JSON.parse=function(d,e){var j;function walk(a,b){var k;var v;var c=a[b];if(c&&typeof c==="object"){for(k in c){if(Object.prototype.hasOwnProperty.call(c,k)){v=walk(c,k);if(v!==undefined){c[k]=v}else{delete c[k]}}}}return e.call(a,b,c)}d=String(d);p.lastIndex=0;if(p.test(d)){d=d.replace(p,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(g.test(d.replace(h,"@").replace(l,"]").replace(m,""))){j=eval("("+d+")");return(typeof e==="function")?walk({"":j},""):j}throw new SyntaxError("JSON.parse");}}}());

var scriptLocation = "./";
var videoJSON = {};
var videoJSON_File = File('video.json');
if(videoJSON_File.open("r")){
    videoJSON_File.encoding = "UTF-8";
    videoJSON = videoJSON_File.read();
    videoJSON = JSON.parse(videoJSON);
    videoJSON_File.close();
}

const txtTitle = videoJSON.title;
app.open(File(txtTitle + '.aep'));
var theComposition;
for (var i = 1; i <= app.project.numItems; i++) {
    if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === 'Title + Logo')) {
        theComposition = app.project.item(i);
        break;
    }
}

var finalComp;
for (var i = 1; i <= app.project.numItems; i++) {
    if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === 'final')) {
        finalComp = app.project.item(i);
        break;
    }
}

var previewLast;
for (var i = 1; i <= app.project.numItems; i++) {
    if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === 'preview')) {
        previewLast = app.project.item(i);
        break;
    }
}

var musicComp;
for (var i = 1; i <= app.project.numItems; i++) {
    if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === 'Music')) {
        musicComp = app.project.item(i);
        break;
    }
}

var BGcomp;
for (var i = 1; i <= app.project.numItems; i++) {
    if ((app.project.item(i) instanceof CompItem) && (app.project.item(i).name === 'BG')) {
        BGcomp = app.project.item(i);
        break;
    }
}

var myFootage;
for (var i = 1; i <= app.project.numItems; i++) {
    if ((app.project.item(i) instanceof FootageItem) && (app.project.item(i).name === 'background.jpg')) {
        myFootage = app.project.item(i);
        break;
    }
}

// var myMusic;
// for (var i = 1; i <= app.project.numItems; i++) {
//     if ((app.project.item(i) instanceof FootageItem) && (app.project.item(i).name === 'music.mp3')) {
//         myMusic = app.project.item(i);
//         break;
//     }
// }


var authorLayer = theComposition.layers[3];
var titleLayer = theComposition.layers[4];

var layerCollection = BGcomp.layers;
var layerCollectionMusic = musicComp.layers;
makeStuff();

function makeStuff() {
    // authorLayer.property("Source Text").setValue(txtAuthor.toUpperCase());
    titleLayer.property("Source Text").setValue(txtTitle.toUpperCase());
    var musicPath = "(Footage)/" + txtTitle + ".mp3";
    var io = new ImportOptions(File(musicPath));
    if (io.canImportAs(ImportAsType.FOOTAGE)) {
        io.importAs = ImportAsType.FOOTAGE;
    }
    myMusic = app.project.importFile(io);   
    musicComp.layers.add(myMusic);

    finalComp.duration = myMusic.duration;
    theComposition.duration = myMusic.duration;
    musicComp.layer(1).outPoint = musicComp.layer(1).inPoint + myMusic.duration;
    finalComp.layer(2).property("Opacity").setValueAtTime(finalComp.duration - 5, 100);
    finalComp.layer(2).property("Opacity").setValueAtTime(finalComp.duration, 0);

    BGcomp.layer(1).property("Opacity").setValue(65);

    var scaleW = 1920 / myFootage.width * 100;
    var scaleH = 1080 / myFootage.height * 100;

    BGcomp.layer(1).property("Scale").setValue([scaleW, scaleH]);
    app.project.renderQueue.items.add(finalComp);
    app.project.renderQueue.queueInAME(true);
    app.project.save();
}
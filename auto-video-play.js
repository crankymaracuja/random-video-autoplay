//# generate random number

var currentSourcesIndex = 0;
var videoSources = [];

var fadingOut = false;
for (var i = 1; i < videoCount; i++) {
    videoSources.push("videos/" + i + ".mp4");
}
shuffleArray(videoSources);
console.log(JSON.stringify(videoSources));

createVideo();

function createVideo() {

    //# create video element to append into above <a> tag           
    tmpElement = document.createElement( "video");
	tmpElement.style.opacity = 0;
	
    tmpElement.setAttribute("autoPlay", "true");
    tmpElement.setAttribute("src", videoSources[currentSourcesIndex % (videoCount - 1)]);

    currentSourcesIndex += 1;

    //# append the dynamically created element...
    var container = document.getElementById("myVideoTag");
    container.appendChild(tmpElement);
	fadeIn(tmpElement);

    tmpElement.addEventListener("timeupdate", function () {  
        const played = tmpElement.currentTime;
        const duration = tmpElement.duration;
		if (!fadingOut && (duration - played).toFixed(1) <= 1) {
			fadingOut = true;
			fadeOut(tmpElement);
		}
        if ((duration - played).toFixed(1) < 0.1) {
            removeVideo();

            setTimeout( function() { 
                createVideo();
				fadingOut = false;
            }, 30000);
        }
     }, false);
}

function fadeIn(element) {
    var op = 0;
    var timer = setInterval(function() {
        if (op >= 1) clearInterval(timer);
        element.style.opacity = op;
		element.volume = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1 || 0.1;
    }, 15);
}

function fadeOut(element) {
    var op = 1;
    var timer = setInterval(function() {
        if (op.toFixed(2) < 0.01) {
			element.style.opacity = 0;
			element.volume = 0;
			element.style.filter = 'alpha(opacity=' + 0 + ")";
			clearInterval(timer);
			}
        element.style.opacity = op;
		element.volume = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 15);
}

function removeVideo() {
    var container = document.getElementById("myVideoTag");
    var videoTag = document.getElementsByTagName("video")[0];
    container.removeChild(videoTag);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
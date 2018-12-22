WebSpeech.ready(function() {
    WebSpeech.server = 'http://120.24.87.124/cgi-bin/ekho2.pl';
    WebSpeech.setVoice('EkhoCantonese');
  });
  
 
var end = 100;
var begin = 0;
var answer = Math.floor(Math.random() * ((end-1) - (begin+1)) + (begin+1));
console.log("answer:" + answer);
refreshCurrentRange();

function updateBegin(newBegin){
	begin = newBegin;
}

function updateEnd(newEnd){
	end = newEnd;
}

function refreshCurrentRange(){
	refreshBeginComponent();
	refreshEndComponent();
}

function refreshBeginComponent(){
	var beginObj = document.getElementById("begin");
	beginObj.className = beginObj.className.replace("rotateActionStyle", "");
	setTimeout(function(){
		beginObj.className += " rotateActionStyle";
		beginObj.innerHTML = begin + "";
	}, 10);
	
}

function refreshEndComponent(){
	var endObj = document.getElementById("end");
	endObj.className = endObj.className.replace("rotateActionStyle", "");
	setTimeout(function(){
		endObj.className += " rotateActionStyle";
		endObj.innerHTML = end;
	}, 10);
}

function speakCurrentRange(callBackFunc){
		WebSpeech.speak(begin + "");
		WebSpeech.onfinish = function () { 
			WebSpeech.speak("至");
			WebSpeech.onfinish = function () { 
				WebSpeech.speak(end + "");
				WebSpeech.onfinish = function () {
					callBackFunc();
					WebSpeech.onfinish = function (){};
				};
			};
		};
}

function displayBingoStyle(){
	var effectOn = false;
	var beginStyle = document.getElementById("begin").className;
	var endStyle = document.getElementById("end").className;
	
	setInterval(function(){
		if(effectOn){
			beginStyle = beginStyle.replace("bingoNumberStyle", ' ');
			endStyle = endStyle.replace("bingoNumberStyle", ' ');
			effectOn = false;
		}else{
			beginStyle += " bingoNumberStyle" ;
			endStyle += " bingoNumberStyle" ;
			effectOn = true;
		}
		document.getElementById("begin").className = beginStyle;
		document.getElementById("end").className = endStyle;
	}, 1000);
	
}

function mute(isMute){
	var player = videojs('my-player');
	player.ready(function() {
		player.muted(isMute);
	});
}

function playHeartbeat(callBackFunc){
	var player = videojs('my-player');
	var originalSrc = player.src();
	var originalVolume = player.volume();
	player.src('http://img.tukuppt.com/preview_music/00/03/15/preview-5b835c9543dfb4039.mp3');
	player.volume(30); 
	player.ready(function() {
		player.play();
		setTimeout(function(){
			player.pause();
			player.src(originalSrc);
			player.volume(originalVolume); 
			callBackFunc();
		}, 4000);
	});
}

var enterProcessing = false;
function enter(){
	if(enterProcessing){
		return;
	}else{
		enterProcessing = true;
	}
	var text = document.getElementById("speakNum").value.trim();
	if(text == undefined || text == null || text.length==0){
		enterProcessing = false;
		return;
	}
	var speakNum = parseInt(text, 10);
	playHeartbeat(function(){
		if(speakNum == answer){ // answer hit
			updateBegin(speakNum);
			updateEnd(speakNum);
			refreshCurrentRange();
			var player = videojs('my-player');
			setTimeout(function(){
				displayBingoStyle();
				player.ready(function() {
					player.volume(0.5); 
					player.play();
				});
			}, 500);
		}else{										// update range
			if(speakNum > answer && speakNum < end){
				updateEnd(speakNum);
				speakCurrentRange(refreshEndComponent);
			}else if(speakNum < answer && speakNum > begin){
				updateBegin(speakNum);
				speakCurrentRange(refreshBeginComponent);
			}else{
				WebSpeech.speak("数字必须在范围内");
			}
		}
		document.getElementById("speakNum").value = "";
		enterProcessing = false;
	});
}

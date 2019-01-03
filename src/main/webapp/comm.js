WebSpeech.ready(function() {
    WebSpeech.server = 'http://120.24.87.124/cgi-bin/ekho2.pl';
    WebSpeech.setVoice('EkhoCantonese');
  });
  
var bingoIntervalJob;
var bingoEffectOn;
var end = 100;
var begin = 0;
var answer = 1;
var totalMp4 = 5;
var currentMp4 = 0;
init();
function init(){
	if(bingoIntervalJob != undefined && bingoIntervalJob != null){
		window.clearInterval(bingoIntervalJob);
	}
	bingoEffectOn = false;
	var beginStyle = document.getElementById("begin").className;
	var endStyle = document.getElementById("end").className;
	beginStyle = beginStyle.replace('bingoNumberStyle', ' ');
	endStyle = endStyle.replace('bingoNumberStyle', ' ');
	document.getElementById("begin").className = beginStyle;
	document.getElementById("end").className = endStyle;
	
	end = 100;
	begin = 0;
	answer = Math.floor(Math.random() * ((end-1) - (begin+1)) + (begin+1));
	console.log("answer:" + answer);
	refreshCurrentRange();

	var tmpPlayer2 = videojs('my-player2');
	currentMp4 = (currentMp4+1) % totalMp4;
	tmpPlayer2.src('./mp4/' + currentMp4 + '.mp4');
	
	setInterval(ajaxGetInputNumber, 500);
}
var prevInputNum = "0";
var prevMute = "0";
var prevNextGame = false;
function ajaxGetInputNumber(){
	var xmlhttp;
	var data;

	if(window.XMLHttpRequest){ //Mozilla chrome
	  xmlhttp = new XMLHttpRequest();

	}else if(window.ActiveXObject) { //IE浏览器
	  try{
	      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); 
	  }catch(e){
	      try {
	          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
	      }catch(e){}
	  }
	}
	xmlhttp.open("GET", "/getData", true);
	xmlhttp.onload = function(){
		
			if (xmlhttp.readyState == 4) {
				 if (xmlhttp.status ==200) {

					 var dataJson = xmlhttp.responseText;
					 var data = JSON.parse(dataJson);
					 var inputNum = data.number;
					 if(inputNum != undefined && inputNum != null && inputNum != "0" &&  inputNum != prevInputNum){
						 
						 enter(inputNum);
						 prevInputNum = inputNum;
					 }
					 
					 var isMute = data.mute;
					 if(isMute != undefined && isMute != null && isMute != prevMute){
						 mute(isMute);
						 prevMute = isMute;
					 }
					 
					 var nextGame = data.nextGame;
					 if(nextGame != undefined && nextGame != null && nextGame != prevNextGame ){
						 if(nextGame){
							 init();
							 var xmlhttp2;
								var data2;

								if(window.XMLHttpRequest){ //Mozilla chrome
								  xmlhttp2 = new XMLHttpRequest();

								}else if(window.ActiveXObject) { //IE浏览器
								  try{
								      xmlhttp2 = new ActiveXObject("Msxml2.xmlhttp2"); 
								  }catch(e){
								      try {
								          xmlhttp2 = new ActiveXObject("Microsoft.xmlhttp2"); 
								      }catch(e){}
								  }
								}
								xmlhttp2.open("POST", "/setNextGame?nextGame=false", true);
								xmlhttp2.onload = function(){
										if (xmlhttp2.readyState == 4) {
											 if (xmlhttp2.status ==200) {
												 
												 
							              	 }
										}
									};
								xmlhttp2.send(data2);
						 }
						 prevNextGame = nextGame;
					 }
              }
			}
		};
	xmlhttp.send(data);
}



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
					if(callBackFunc != undefined && callBackFunc != null){
						callBackFunc();
					}
					
					WebSpeech.onfinish = function (){};
				};
			};
		};
}

function displayBingoStyle(){
	var beginStyle = document.getElementById("begin").className;
	var endStyle = document.getElementById("end").className;
	
	bingoIntervalJob = setInterval(function(){
		if(bingoEffectOn){
			beginStyle = beginStyle.replace('bingoNumberStyle', ' ');
			endStyle = endStyle.replace('bingoNumberStyle', ' ');
			bingoEffectOn = false;
		}else{
			beginStyle += " bingoNumberStyle" ;
			endStyle += " bingoNumberStyle" ;
			bingoEffectOn = true;
		}
		document.getElementById("begin").className = beginStyle;
		document.getElementById("end").className = endStyle;
	}, 1000);
	
}

function mute(isMute){
//	var player = videojs('my-player');
//	player.ready(function() {
//		player.muted(isMute);
//	});
	
	var player2 = videojs('my-player2');
	player2.ready(function() {
		player2.muted(isMute);
	});
}

function playHeartbeat(callBackFunc){
	var player = videojs('my-player3');
	//var originalSrc = player.src();
	//var originalVolume = player.volume();
	//player.src('/mp4/heartbeat.mp3');
	player.volume(30); 
	player.ready(function() {
		player.play();
		setTimeout(function(){
			//player.pause();
			//player.src(originalSrc);
			//player.volume(originalVolume); 
			callBackFunc();
		}, 4000);
	});
}

var enterProcessing = false;
function enter(text){
	if(enterProcessing){
		return;
	}else{
		enterProcessing = true;
	}
	//var text = document.getElementById("speakNum").value.trim();
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
			//var musicPlayer = videojs('my-player');
			var moviePlayer = videojs('my-player2');
			setTimeout(function(){
				moviePlayer.ready(function() {
					//moviePlayer.muted(true);
					moviePlayer.play();
				});
				displayBingoStyle();
//				musicPlayer.ready(function() {
//					musicPlayer.volume(0.5); 
//					musicPlayer.play();
//				});
				//document.getElementById("nextGameBtn").disabled = false;
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
		//document.getElementById("speakNum").value = "";
		enterProcessing = false;
	});
}

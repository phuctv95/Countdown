var isCounting = false;
var interval = null;
var secs = 0;
var audio = new Audio('Alarm-tone.mp3');

function playAlarm() {
    audio.loop = true;
    audio.play();
}

function stopAlarm() {
    audio.pause();
    audio.currentTime = 0;
}

function getUI(secsNow, minsNow, hoursNow) {
    var hoursUI = hoursNow.toString().length == 1 ? "0" + hoursNow : "" + hoursNow;
    var minsUI = minsNow.toString().length == 1 ? "0" + minsNow : "" + minsNow;
    var secsUI = secsNow.toString().length == 1 ? "0" + secsNow : "" + secsNow;
    var ui = (hoursUI == "00" ? "" : hoursUI + ":") + minsUI + ":" + secsUI;
    return ui;
}

function doTheIntervalJob() {
    secs--;
    var hoursNow = parseInt(secs / 60 / 60);
    var minsNow = parseInt(secs / 60) - hoursNow * 60;
    var secsNow = secs - hoursNow * 60 * 60 - minsNow * 60;
    console.log(`${secs} ${hoursNow} ${minsNow} ${secsNow}`);
    var uiNow = getUI(secsNow, minsNow, hoursNow);
    document.getElementById("ui").innerText = uiNow;
    document.title = uiNow;
    if (secs == 0) {
        clearInterval(interval);
        playAlarm();
    }
}

function startOrStop() {
    if (isCounting) {
        clearInterval(interval);
        stopAlarm();
        document.getElementById("mainBtn").innerText = "Start";
        isCounting = false;
    }
    else {
        document.getElementById("mainBtn").innerText = "Stop";
        isCounting = true;
        
        var hours = parseInt(document.getElementById("hours").value);
        var mins = parseInt(document.getElementById("mins").value);
        secs = mins * 60 + hours * 60 * 60;
        
        secs++;
        doTheIntervalJob();
        interval = setInterval(doTheIntervalJob, 1000);
    }
}
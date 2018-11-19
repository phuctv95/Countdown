var isCounting = false;
var interval = null;
var totalSecs = 0;
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
    totalSecs--;
    var hoursNow = parseInt(totalSecs / 60 / 60);
    var minsNow = parseInt(totalSecs / 60) - hoursNow * 60;
    var secsNow = totalSecs - hoursNow * 60 * 60 - minsNow * 60;
    console.log(`${totalSecs} ${hoursNow} ${minsNow} ${secsNow}`);
    var uiNow = getUI(secsNow, minsNow, hoursNow);
    document.getElementById("ui").innerText = uiNow;
    document.title = uiNow;
    if (totalSecs == 0) {
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
        var secs = parseInt(document.getElementById("secs").value);
        totalSecs = secs + mins * 60 + hours * 60 * 60;
        
        totalSecs++;
        doTheIntervalJob();
        interval = setInterval(doTheIntervalJob, 1000);
    }
}
function playLowC() {
    const selectEl = document.querySelector("select");
    const folderName = selectEl.value;
    console.log(folderName);

    const audio = document.querySelector("audio");
    audio.src = "scales/" + folderName + "/C_low.mp3";
    audio.play();
}

function playD() {
    const audio = document.querySelector("audio");
    audio.src = "scales/scale4/D.mp3";
    audio.play();
}

function playE() {
    const audio = document.querySelector("audio");
    audio.src = "scales/scale4/E.mp3";
    audio.play();
}

function playF() {
    const audio = document.querySelector("audio");
    audio.src = "scales/scale4/F.mp3";
    audio.play();
}

function playG() {
    const audio = document.querySelector("audio");
    audio.src = "scales/scale4/G.mp3";
    audio.play();
}

function playA() {
    const audio = document.querySelector("audio");
    audio.src = "scales/scale4/A.mp3";
    audio.play();
}

function playB() {
    const audio = document.querySelector("audio");
    audio.src = "scales/scale4/B.mp3";
    audio.play();
}

function playHighC() {
    const audio = document.querySelector("audio");
    audio.src = "scales/scale4/C_high.mp3";
    audio.play();
}

function getPath(note) {
    const folder = document.querySelector("#folder").value;
    return "scales/" + folder + "/" + note + ".mp3";
}

function playNote(note) {
    const audio = document.querySelector("audio");
    audio.src = getPath(note);
    audio.play();
}
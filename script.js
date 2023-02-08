let allMusic = [
  {
    name: "Parshawan",
    artist: "Harnoor",
    img: "./images/parshawan-img.jpg",
    audio: "./songs/Parshawan.mp3",
  },
  {
    name: "Chan-Vekhya",
    artist: "Harnoor",
    img: "./images/chanvekhya-img.jpg",
    audio: "./songs/Chan-Vekhya.mp3",
  },
  {
    name: "Evergreen",
    artist: "jatt",
    img: "./images/ever-img.jpg",
    audio: "./songs/Evergreen.mp3",
  },
  {
    name: "Chan-Sitare",
    artist: "Ammy Wirk",
    img: "./images/chan-img.jpg",
    audio: "./songs/Chann-Sitare.mp3",
  },
  {
    name: "Chan-Vekhya",
    artist: "Harnoor",
    img: "./images/chanvekhya-img.jpg",
    audio: "./songs/Chan-Vekhya.mp3",
  },
  {
    name: "Parshawan",
    artist: "Harnoor",
    img: "./images/parshawan-img.jpg",
    audio: "./songs/Parshawan.mp3",
  },
];

const wrapper = document.querySelector(".wrapper"),
  musicImg = document.querySelector(".img-area img"),
  musicName = document.querySelector(".song-details .name"),
  musicArtist = document.querySelector(".song-details .artist"),
  mainAudio = document.querySelector("#main-audio"),
  playPauseBtn = document.querySelector(".play-pause"),
  previousBtn = document.querySelector("#prev"),
  nextBtn = document.querySelector("#next"),
  progressBar = document.querySelector(".progress-bar"),
  progressArea = document.querySelector(".progress-area"),
  musicList = document.querySelector(".music-list"),
  showMoreBtn = document.querySelector("#more-music");

let musicIndex = 2;

window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

const loadMusic = (indexNumb) => {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = allMusic[indexNumb - 1].img;
  mainAudio.src = allMusic[indexNumb - 1].audio;
};

function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

// next music function

function nextMusic() {
  musicIndex++;
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}

// previous music function

function prevMusic() {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}

// play or button event
playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused");

  isMusicPaused ? pauseMusic() : playMusic();
});

// Next button event

nextBtn.addEventListener("click", () => {
  nextMusic();
});

// previous button event

previousBtn.addEventListener("click", () => {
  prevMusic();
});

// update progress bar according to the music current time

mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = document.querySelector(".current");
  let musicDuration = document.querySelector(".duration");
  mainAudio.addEventListener("loadeddata", () => {
    // update song total duration
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);

    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song current time

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);

  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update playing current time according to the progress

progressBar.addEventListener("change", () => {
  mainAudio.currentTime = (progressWidth * duration) / 100;
  progressBar.value = mainAudio.currentTime;
});

// progressArea.addEventListener("click", (e) => {
//   let progressWidthVal = progressArea.clientWidth;
//   let clickedoffSetX = e.OffsetX;
//   let songDuration = mainAudio.duration;

//   mainAudio.currentTime = (clickedoffSetX / progressWidthVal) * songDuration;
// });

// repeat suffle song according to the icon

const repeatBtn = document.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
  let getText = repeatBtn.innerText;

  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "song looped");

      break;

    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "playback shuffle");

      break;

    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "playlist looped");

      break;
  }
});

mainAudio.addEventListener("ended", () => {
  let getText = repeatBtn.innerText;

  switch (getText) {
    case "repeat":
      nextMusic();
      break;

    case "repeat_one":
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;

    case "shuffle":
      let randIndex = Math.floor(Math.random() * allMusic + 1);
      do {
        randIndex == Math.floor(Math.random() * allMusic + 1);
      } while (musicIndex == randIndex);
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      break;
  }
});

showMoreBtn.addEventListener("click", () => {
  if (musicList.style.opacity == "1") {
    musicList.style.opacity = "0";
  } else {
    musicList.style.opacity = "1";
  }
});

const ulTag = wrapper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
  let liTag = ` <li li-index='${i + 1}'>
                 <div class="row">
                     <span>${allMusic[i].name}</span>
                     <p>${allMusic[i].artist}</p>
                 </div>
                 <audio class='${allMusic[i].src}'  src="songs/${
    allMusic[i].src
  }"></audio>
                 <span id="${
                   allMusic[i].src
                 }" class="audio-duration">3:40</span>
               </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);
}

// play particular songs on click

// const allLiTags = ulTag.querySelectorAll("li");

// for (let j = 0; j < allLiTags.length; j++) {
//   if (allLiTags[j].getAttribute("li-index") == musicIndex) {
//     allLiTags[j].classList.add("playing");
//   }
//   allLiTags[j].setAttribute("onclick", "clicked(this)");
// }

// function clicked(element) {
//   let getLiIndex = element.getAttribute("li-index");
//   musicIndex = getLiIndex;
//   loadMusic(musicIndex);
//   playMusic();
// }

// let's select all required tags or elements
var mainVideo = document.querySelector("#main-Video");
const musicList = document.querySelector(".music-list");
const playlist = document.getElementById("playlist");
const AllLessons = document.querySelector(".AllLessons");
const videoTitle = document.querySelector(".title"); 

const ulTag = document.querySelector("ul");
AllLessons.innerHTML = `${allVideos.length} Lessons`;

let musicIndex = 1;
window.addEventListener("load", () => {
  // loadMusic(musicIndex);
  playingNow();
  loadVideo(musicIndex);
});
function playMusic() {
  mainVideo.play();
  playlist.classList.add("active");
}
function loadMusic(indexNumb) {
  mainVideo.src = `media/${allVideos[indexNumb - 1].src}.mp4`;
  videoTitle.innerHTML = `${indexNumb}. ${allVideos[indexNumb - 1].name}`;
}

for (let i = 0; i < allVideos.length; i++) {
  let liTag = `<li li-index="${i + 1}" id="${allVideos[i].id}">
      <div class="row">
         <span>${i + 1}. ${allVideos[i].name}</span>
      </div>
   </li>`;
  playlist.insertAdjacentHTML("beforeend", liTag);

  // let liVideoDuration = ulTag.querySelector(`#${allVideos[i].id}`);
  // let liVideoTag = ulTag.querySelector(`.${allVideos[i].id}`);

  // liVideoTag.addEventListener("loadeddata", () => {
  //   let videoDuration = liVideoTag.duration;
  //   let totalMin = Math.floor(videoDuration / 60);
  //   let totalSec = Math.floor(videoDuration % 60);
  //   // if totalSec is less then 10 then add 0 at the beginging
  //   totalSec < 10 ? (totalSec = "0" + totalSec) : totalSec;
  //   liVideoDuration.innerText = `${totalMin}:${totalSec}`;
  //   // adding t duration attribe which we'll use below
  //   liVideoDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  // });
}
// let's work on play particular song on click
const allLiTags = playlist.querySelectorAll("li");
function playingNow() {
  for (let j = 0; j < allVideos.length; j++) {
    if (allLiTags[j].classList.contains("playing")) {
      allLiTags[j].classList.remove("playing");
    }
    if (allLiTags[j].getAttribute("li-index") == musicIndex) {
      allLiTags[j].classList.add("playing");
    }
    // adding onclick attribute in all li tags
    allLiTags[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(element) {
  // getting li index of particular clicked li tag
  let getIndex = element.getAttribute("li-index");
  let id = element.getAttribute("id")
  console.log(id);
  musicIndex = getIndex;
  // loadMusic(musicIndex);
  loadVideo(musicIndex);
  playMusic();
  playingNow();
}


// Adding HLS ~~~
function loadByLink(videoSrc) {
  var video = mainVideo; // document.getElementById('video');
  videoSrc = videoSrc + "/index.m3u8";
  if (Hls.isSupported()) {
      var hls = new Hls();

      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          console.log('video and hls.js are now bound together !');
      });
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          console.log(
          'manifest loaded, found ' + data.levels.length + ' quality level'
          );
      });

      hls.loadSource(videoSrc);
      hls.attachMedia(video);
  }
  else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
  }
}

// Load music change
function loadVideo(index) {
  let videoLink = allVideos[index - 1].src;
  let parent = $("#video_player");
  
  $("#main-Video").remove();
  if (typeof videoLink != "undefined" && videoLink != "") {
    parent.prepend("<video controls id=\"main-Video\" src=\"\"></video>")
    mainVideo = document.querySelector("#main-Video");
    loadByLink(videoLink);
  }
  videoTitle.innerHTML = `${index}. ${allVideos[index - 1].name}`;
}
// let's select all required tags or elements
var mainVideo = document.querySelector("#main-Video");
const musicList = document.querySelector(".music-list");
const playlist = document.getElementById("playlist");
const AllLessons = document.querySelector(".AllLessons");

const ulTag = document.querySelector("ul");
// AllLessons.innerHTML = `${allVideos.length} Lessons`;

let musicIndex = 1;
window.addEventListener("load", () => {
  // loadMusic(musicIndex);
  // playingNow();
  // loadVideo(musicIndex);
  $("#main-Video").css("visibility", "hidden");
  initialize();
});
function playMusic() {
  // mainVideo.play();
  playlist.classList.add("active");
}
function loadMusic(indexNumb) {
  mainVideo.src = `media/${allVideos[indexNumb - 1].src}.mp4`;
}

function initialize() {
  for (let i = 0; i < allVideos.length; i++) {
    let liTag = `<li li-index="${i + 1}" id="${allVideos[i].id}" onClick='clicked(this)'>
        <div class="row">
           <span>${i + 1}. ${allVideos[i].name}</span>
        </div>
     </li>`;
    playlist.insertAdjacentHTML("beforeend", liTag);
  }
}

// let's work on play particular song on click
function playingNow() {
  const allLiTags = playlist.querySelectorAll("li");
  for (let j = 0; j < allVideos.length; j++) {
    if (allLiTags[j].classList.contains("playing")) {
      allLiTags[j].classList.remove("playing");
    }
    if (allLiTags[j].getAttribute("li-index") == musicIndex) {
      allLiTags[j].classList.add("playing");
    }
  }
}

function clicked(element) {
  // getting li index of particular clicked li tag
  let getIndex = element.getAttribute("li-index");
  let id = element.getAttribute("id")
  console.log(id);
  musicIndex = getIndex;
  // loadMusic(musicIndex);
  loadVideo(musicIndex, id);
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
function loadVideo(index, id) {
  $(".title").empty();
  $(".desc").empty();
  $("#filelist").empty();
  $.getJSON('/lecture_content/Lecture/' + id, data => {
    let videoLink = data.videoUrl;
    let parent = $("#video_player");
    console.log(data)
    if (data.content)
      $(".desc").text(data.content);
    for (let i = 0; i < data.files.length; i++) {
        $("#filelist").append(`
      <i class="fa fa-file-pdf-o" aria-hidden="true"></i> <a href=${data.files[i].path} class="files" style="color: black;">${data.files[i].name}</a>
        `);
    }
    
    
    $("#main-Video").css("visibility", "hidden");
    if (typeof videoLink != "undefined" && videoLink != "") {
      // parent.prepend("<video controls id=\"main-Video\" src=\"\"></video>")
      $("#main-Video").css("visibility", "visible");
      mainVideo = document.querySelector("#main-Video");
      loadByLink(videoLink);
    }
  })
}
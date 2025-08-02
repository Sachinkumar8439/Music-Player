const currenttimetag = document.getElementById("current-time");
const durationtag = document.getElementById("duration");
const importbtn = document.getElementById("importbtn");
const slider = document.getElementById("timeSlider");
const playpausebtn = document.getElementById("playpausebtn");
const listitems = document.getElementById("list-items");
const music = document.getElementById("audiotag");
const songimage = document.getElementById("songimage");
const mainmusicgif = document.getElementById('mainmusicgif');
// const musicdescription = document.getElementById('musicdescription')
const musicname = document.getElementById('musicname')
let loop = false;
let previousMusicElement = null;
let predictedelement = null;
let currentmusic = {
  id: songs[0].id,
  name: songs[0].name,
  audioUrl: songs[0].audioUrl,
  imgUrl: songs[0].imgUrl,
};
musicname.innerText = currentmusic.name;
let predictedsong = { ...currentmusic };
const setcurrentdata = () => {
  music.setAttribute("src", currentmusic.audioUrl);
  songimage.setAttribute("src", currentmusic.imgUrl);
};

const changesong = (element) => {
  // e.preventDefault();
  if (previousMusicElement) {
    previousMusicElement.classList.remove("currentmusicstyle");
  }
  element.classList.add("currentmusicstyle");
  const idcontent = element.id.split("../");
  currentmusic = {
    _id: idcontent,
    id: idcontent[0],
    name: idcontent[1],
    imgUrl: idcontent[2],
    audioUrl: idcontent[3],
  };
  previousMusicElement = element;
  setcurrentdata();

  playpausebtn.firstChild.setAttribute("src", `./icons/pause.png`);
  musicname.innerText = currentmusic.name

  music.play();
  isplaying = true;
};
const looper = document.getElementById("loopbtn");
const togelloop = () => {
  if (loop) {
    looper.firstElementChild.setAttribute("src", "./icons/exit-loop.svg");
    loop = false;
  } else {
    looper.firstElementChild.setAttribute("src", "./icons/arrow.png");
    loop = true;
  }
};
const addsongs = () => {
  songs.forEach((song) => {
    let li = document.createElement("li");
    li.innerText = `${song.name}`;
    li.id = `${song.id}../${song.name}../${song.imgUrl}../${song.audioUrl}`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      changesong(e.target);
    });
    listitems.appendChild(li);
  });
  listitems.firstElementChild.classList.add("currentmusicstyle");
  previousMusicElement = listitems.firstElementChild;
  predictedelement = listitems.firstElementChild;
  currenttimetag.innerText = "00:00";
};

addsongs();
let isplaying = false;
const handleplaying = () => {
  if (isplaying) {
    playpausebtn.firstChild.setAttribute("src", `./icons/play-buttton.png`);
    music.pause();
    mainmusicgif.style.width = '0px'
    isplaying = false;
  } else {
    playpausebtn.firstChild.setAttribute("src", `./icons/pause.png`);
    music.play();
        mainmusicgif.style.width = 'auto';

    isplaying = true;
  }
};
const playpre = () => {
  if (loop) {
    music.currentTime = 0;
    music.play();
    return;
  }

  if (previousMusicElement) {
    previousMusicElement.classList.remove("currentmusicstyle");
  }

  if (currentmusic.id <= 1) {
    currentmusic = songs.at(-1);

    listitems.lastElementChild.classList.add("currentmusicstyle");
    previousMusicElement = listitems.lastElementChild;
  } else {
    currentmusic = songs[currentmusic.id - 2];
    previousMusicElement.previousElementSibling.classList.add(
      "currentmusicstyle"
    );
    previousMusicElement = previousMusicElement.previousElementSibling;
  }
  setcurrentdata();
  music.play();
};
const playnext = () => {
  if (loop) {
    music.currentTime = 0.0;
    music.play();
    return;
  }
  if (previousMusicElement) {
    previousMusicElement.classList.remove("currentmusicstyle");
  }

  if (currentmusic.id >= songs.length) {
    currentmusic = songs[0];

    listitems.firstElementChild.classList.add("currentmusicstyle");
    previousMusicElement = listitems.firstElementChild;
  } else {
    currentmusic = songs[currentmusic.id];
    previousMusicElement.nextElementSibling.classList.add("currentmusicstyle");
    previousMusicElement = previousMusicElement.nextElementSibling;
  }
  setcurrentdata();
  music.play();
  playpausebtn.firstChild.setAttribute("src", `./icons/pause.png`);
  isplaying = true;

};
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}
music.addEventListener("loadedmetadata", () => {
  slider.max = music.duration;
  durationtag.innerText = formatTime(music.duration);
});
music.addEventListener("timeupdate", () => {
  slider.value = music.currentTime;

  currenttimetag.innerText = formatTime(music.currentTime);
  if (music.currentTime === music.duration) playnext();
});

slider.addEventListener("input", () => {
  music.currentTime = slider.value;
});

// let mute = false;
const handleslide = (type) => {
  if (predictedelement) {
    predictedelement.classList.remove("predictedsong");
  }
  // console.log("down")
  if (type === "down") {
    if (predictedsong.id >= songs.length) {
      predictedsong = songs[0];

      listitems.firstElementChild.classList.add("predictedsong");
      predictedelement = listitems.firstElementChild;
    } else {
      predictedsong = songs[predictedsong.id];
      predictedelement.nextElementSibling.classList.add("predictedsong");
      predictedelement = predictedelement.nextElementSibling;
    }
  } else {
    if (predictedsong.id <= 1) {
      predictedsong = songs.at(-1);

      listitems.lastElementChild.classList.add("predictedsong");
      predictedelement = listitems.lastElementChild;
    } else {
      predictedsong = songs[predictedsong.id - 2];
      predictedelement.previousElementSibling.classList.add("predictedsong");
      predictedelement = predictedelement.previousElementSibling;
    }
  }
};
const togelmute = () => {
  if (music.muted) music.muted = false;
  else music.muted = true;
};
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  // event.preventDefault();

  switch (key) {
    case "arrowright":
      playnext(); 
      console.log("Right Arrow pressed");
      break;

    case "arrowup":
     
      console.log("Up Arrow pressed");
      handleslide("up");
      break;
    case "arrowdown":
      console.log("down Arrow pressed");
      handleslide("down");
      break;

    case "arrowleft":
      playpre(); 
      console.log("Left Arrow pressed");
      break;

    case "m":
      togelmute();
      break;

    case " ":
      event.preventDefault(); 
      handleplaying();
      break;

    case "l":
      togelloop(); 
      break;
    case "enter":
      changesong(predictedelement);
      break;

    default:
      console.log(`Other key pressed: ${event.key}`);
      break;
  }
});

let importmusic = 0;
const handleimport = (e) => {
  let audioObject = null;

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "audio/*";

  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      audioObject = new Audio(fileURL);
      let li = document.createElement("li");
      li.innerText = `${file.name}`;
      li.id = `${songs.length + 1}../${
        file.name
      }../${"icons/music.png"}../${fileURL}`;
      li.addEventListener("click", (e) => {
        e.preventDefault();
        changesong(e.target);
      });
      listitems.appendChild(li);
      const newsong = {
        id: songs.length + 1,
        name: file.name.split('.')[0],
        imgUrl: `icons/music.png`,
        audioUrl: fileURL,
      };
      songs.push(newsong);
    }
  });

  input.click();
};


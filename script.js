const currenttimetag = document.getElementById("current-time");
const durationtag = document.getElementById("duration");

const slider = document.getElementById("timeSlider");
const playpausebtn = document.getElementById("playpausebtn");
const listitems = document.getElementById("list-items");
const music = document.getElementById("audiotag");
const songimage = document.getElementById("songimage");
let loop = false;
let previousMusicElement = null;
let predictedelement = null;
let currentmusic = {
  id: songs[0].id,
  name: songs[0].name,
  audioUrl: songs[0].audioUrl,
  imgUrl: songs[0].imgUrl,
};
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
  console.log("this ", document.getElementById(currentmusic._id));
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
    playpausebtn.firstChild.setAttribute("src", `pause.png`);
    music.play();
    isplaying = true;
};
const looper = document.getElementById("loopbtn");
const togelloop  = ()=>{
  console.log(looper)
  if(loop)
  {
    looper.firstElementChild.setAttribute('src','exit-loop.svg')
    loop = false;

  }
  else{
    looper.firstElementChild.setAttribute('src','arrow.png')
    loop=true;

  }
 console.log("loop togels")
}
const addsongs = () => {
  songs.forEach((song) => {
    let li = document.createElement("li");
    li.innerText = `${song.name}`;
    li.id = `${song.id}../${song.name}../${song.imgUrl}../${song.audioUrl}`;
    console.log(li);
    li.addEventListener("click",(e)=>{e.preventDefault();changesong(e.target)});
    listitems.appendChild(li);
});
listitems.firstElementChild.classList.add("currentmusicstyle");
previousMusicElement = listitems.firstElementChild;
predictedelement = listitems.firstElementChild;
currenttimetag.innerText = '00:00';
};

addsongs();
let isplaying = false;
const handleplaying = () => {
  console.log(playpausebtn.firstChild);
  console.log("clicked i am");
  if (isplaying) {
    playpausebtn.firstChild.setAttribute("src", `play-buttton.png`);
    music.pause();
    isplaying = false;
  } else {
    playpausebtn.firstChild.setAttribute("src", `pause.png`);
    music.play();
    isplaying = true;
  }
};
const playpre = () => {

   if(loop)
    {
      music.currentTime=0;
      music.play();
      return;
    }
   
    if(previousMusicElement) 
    {
        previousMusicElement.classList.remove("currentmusicstyle");

    }

  if (currentmusic.id <= 1) {
    currentmusic = songs.at(-1);
    console.log(currentmusic);
    
    listitems.lastElementChild.classList.add("currentmusicstyle");
    previousMusicElement = listitems.lastElementChild;
  }
  else
  {
      currentmusic = songs[currentmusic.id - 2];
      previousMusicElement.previousElementSibling.classList.add('currentmusicstyle');
      previousMusicElement = previousMusicElement.previousElementSibling;

  }
  setcurrentdata();
  music.play();

};
const playnext = () => {
  console.log("itruns")
  if(loop)
  {
    music.currentTime = 0.0;
    music.play();
    return;
  }
    if(previousMusicElement) 
        {
            
            previousMusicElement.classList.remove("currentmusicstyle");
    
        }
    
      if (currentmusic.id >= songs.length) {
        currentmusic = songs[0];
        console.log(currentmusic);
        
        listitems.firstElementChild.classList.add("currentmusicstyle");
        previousMusicElement = listitems.firstElementChild;
      }
      else
      {
          currentmusic = songs[currentmusic.id];
          previousMusicElement.nextElementSibling.classList.add('currentmusicstyle');
          previousMusicElement = previousMusicElement.nextElementSibling;
    
      }
      setcurrentdata();
      music.play();
      playpausebtn.firstChild.setAttribute("src", `pause.png`);
      isplaying=true;

      
  console.log("clicked i am");
};
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
music.addEventListener("loadedmetadata", () => {
  slider.max = music.duration; 
  durationtag.innerText = formatTime(music.duration);
  console.log("audio duration", formatTime(music.duration));
});
music.addEventListener("timeupdate", () => {
  slider.value = music.currentTime;

  currenttimetag.innerText = formatTime(music.currentTime)
  if(music.currentTime === music.duration) playnext();
  console.log(`Current Time:`, formatTime(music.currentTime));
});

slider.addEventListener("input", () => {
  music.currentTime = slider.value;
  console.log(`Slider moved to: ${slider.value} seconds`);
});

// let mute = false;
const handleslide = (type)=>{
  if(predictedelement) 
    {
        predictedelement.classList.remove("predictedsong");

    }
  // console.log("down")
  if(type === 'down')
  {
   
      if (predictedsong.id >= songs.length) {
        predictedsong = songs[0];
        console.log(predictedsong);
        
        listitems.firstElementChild.classList.add("predictedsong");
        predictedelement = listitems.firstElementChild;
      }
      else
      {
        predictedsong = songs[predictedsong.id];
        predictedelement.nextElementSibling.classList.add('predictedsong');
        predictedelement = predictedelement.nextElementSibling;
    
      }

  }
  else
  {
    if(predictedsong.id <= 1) {
      predictedsong = songs.at(-1);
      // console.log(currentmusic);
      
      listitems.lastElementChild.classList.add("predictedsong");
      predictedelement = listitems.lastElementChild;
    }
    else
    {
        predictedsong = songs[predictedsong.id - 2];
        predictedelement.previousElementSibling.classList.add('predictedsong');
        predictedelement = predictedelement.previousElementSibling;
  
    }

  }

}
const togelmute = ()=>{
  if(music.muted) music.muted = false;
  else music.muted = true;
}
document.addEventListener("keydown", (event) => {
  // Convert the key to lowercase for consistent handling
  const key = event.key.toLowerCase();
  event.preventDefault();

  // Check which key is pressed
  switch (key) {
    case "arrowright":
      playnext(); // Call your custom function to play the next track
      console.log("Right Arrow pressed");
      break;

    case "arrowup":
      // event.preventDefault();
      console.log("Up Arrow pressed");
      handleslide('up');
      break;
    case "arrowdown":
      console.log("down Arrow pressed");
      handleslide('down');
      break;

    case "arrowleft":
      playpre(); // Call your custom function to play the previous track
      console.log("Left Arrow pressed");
      break;

    case "m":
      togelmute();
      break;

    case " ":
      event.preventDefault(); // Prevent page scrolling
      handleplaying(); // Call your custom function to handle play/pause
      console.log("Space pressed");
      break;

    case "l":
      togelloop(); // Call your custom function for play/pause or other logic
      console.log("'l' or 'L' pressed");
      break;
    case "enter":
      changesong(predictedelement);
      console.log("'l' or 'L' pressed");
      break;

    default:
      console.log(`Other key pressed: ${event.key}`);
      break;
  }
});

const dailyTrendBtn = document.getElementById("trendingToday");
const weeklyTrendBtn = document.getElementById("weeklyTrending");
const mainSection = document.querySelector("main section");

const myKey = "your_key_here";
const TRENDING_TODAY = `https://api.themoviedb.org/3/trending/all/day?api_key=${myKey}`;
const WEEKLY_TRENDING = TRENDING_TODAY.replace("day", "week");

const dailyTrendResults = async function loadInital() {
  const response = await fetch(TRENDING_TODAY);
  const data = await response.json();
  const result = data.results;
  return showDetails(result);
};

const weeklyTrendResults = async function trendingWeekly() {
  const res = await fetch(WEEKLY_TRENDING);
  const data = await res.json();
  const result = data.results;
  return showDetails(result);
};

var ids = [];

function showDetails(data) {
  const prePath = "http://image.tmdb.org/t/p/original";
  ids = [];
  var myArr = [];
  mainSection.innerHTML = "";
  data.forEach((item) => {
    var vid = `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${myKey}`;
    ids.push(vid);
    var poster = prePath.concat(item.poster_path);
    myArr.push(`<div class="container">
  <figure>
      <img src="${poster}" loading = "lazy">
    <figcaption>
      <h1>${item.title}</h1>
    </figcaption>
  </figure>
  <div>
    <h3>Rating : <em>${item.vote_average}</em></h3>
    <h3>Release Date :<em>${item.release_date}</em></h3>
    <h3>Language : <em>${item.original_language}</em></h3>
  </div>
  <div class="summary">
    <details>
      <summary>Read More</summary>
      <p>
      ${item.overview}
      </p>
    </details>
  </div>
</div>`);
  });

  myArr.forEach((item) => {
    mainSection.innerHTML += item;
  });
  return ids;
}

async function loadVideo(video_link) {
  const youTube = "https://www.youtube.com/watch?v=";
  const response = await fetch(video_link);
  const data = await response.json();
  const trailerId = data.results[0].key;
  const fullLink = youTube.concat(trailerId);
  return fullLink;
}


function selectImages(vid_links) {
  const images = document.querySelectorAll("img");
  for (let i = 0; i < vid_links.length; i++) {
    images[i+1].addEventListener("click", () => {
      loadVideo(vid_links[i]).then(
        (data) => {
          window.open(data, "_blank");
        },
        (err) => console.log(err)
      );
    });
  }
}

window.addEventListener('load', ()=>{
  dailyTrendResults().then(
    (data) => {
      selectImages(data);
    },
    (err) => {
      console.log(err);
    })
});



dailyTrendBtn.addEventListener("click", () => {
  dailyTrendResults().then(
    (data) => {
      selectImages(data);
    },
    (err) => {
      console.log(err);
    }
  );
});

weeklyTrendBtn.addEventListener("click", () => {
  weeklyTrendResults().then(
    (data) => {
      selectImages(data);
    },
    (err) => {
      console.log(err);
    }
  );
});



const button = document.querySelector("#button-addon2");
const display = document.querySelector(".row.mt-4");
const text = document.querySelector(".form-control");
function getURL(key) {
  return `https://www.omdbapi.com/?apikey=b1b4d324&s=${key}`;
}
function getFilm(keywords) {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const data = JSON.parse(xhr.responseText);
    clearDisplay();
    ShowDisplay(data);
  };
  const url = getURL(keywords);
  xhr.open("get", url);
  xhr.send();
}

function clearDisplay() {
  display.textContent = "";
}
function ShowDisplay(data) {
  let urut = data.Search;
  let hasil = "";
  for (let col in urut) {
    hasil += `<div class="col-sm mt-3">
    <div class="card" style="width: 20rem">
      <img class="card-img-top" src="${urut[col].Poster}" />
      <div class="card-body">
        <h5 class="card-title">${urut[col].Title}</h5>
        <p class="card-text">
         ${urut[col].Year}
        </p>
        <button
        type="button"
        class="btn btn-primary hit"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
     data-show=${urut[col].imdbID}
      >
        Show
      </button>
      </div>
    </div>
  </div>`;
  }
  display.innerHTML = hasil;
  const dpt = document.querySelectorAll(".hit");
  dpt.forEach((m) => {
    m.addEventListener("click", function () {
      let get = this.getAttribute("data-show");
      getFilmShow(get);
    });
  });
}
button.addEventListener("click", function () {
  getFilm(text.value);
});

function getURLShow(key) {
  return `https://www.omdbapi.com/?apikey=b1b4d324&i=${key}`;
}
function getFilmShow(keywords) {
  const xhrr = new XMLHttpRequest();
  xhrr.onload = () => {
    const gass = JSON.parse(xhrr.responseText);
    show(gass);
  };
  const url = getURLShow(keywords);
  xhrr.open("get", url);
  xhrr.send();
}

function show(kun) {
  let txt = "";
  txt += `<div class="card mb-3" style="max-width: 540px">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${kun.Poster}" class="img-fluid rounded-start"  />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item"><strong>Released</strong> : ${kun.Released}</li>
          <li class="list-group-item"><strong>Genre</strong> : ${kun.Genre}</li>
          <li class="list-group-item"><strong>Writer</strong> : ${kun.Writer}</li>
          <li class="list-group-item"><strong>Actors</strong> : ${kun.Actors}</li>
          <li class="list-group-item"><strong>Plot</strong> : ${kun.Plot}</li>
        </ul>
      </div>
    </div>
  </div>
  </div>`;
  const modal_content = document.querySelector(".modal-body");
  modal_content.innerHTML = txt;
}

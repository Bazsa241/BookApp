
const input = document.querySelector("#input");
const searchBtn = document.querySelector("#search-btn");
const container = document.querySelector(".container");

searchBtn.addEventListener("click", event => {
  console.log(event);
  // getBooks(input.value)
});

document.addEventListener("keypress", event => {
  if(event.key === "Enter") {
      getBooks(input.value)
  }
});

function getBooks(search, maxResult = 20, startIndex = 0) {
  container.innerHTML = "";
  fetch(`https://www.googleapis.com/books/v1/volumes?q=
  ${search}&maxResults=${maxResult}&startIndex=${startIndex}`)
  .then(response => response.json())
  .then(result => {
    for (let i = 0; i < result.items.length; i++) {
      renderBooks(result.items[i].volumeInfo.title,
                  result.items[i].volumeInfo.authors,
                  result.items[i].volumeInfo.imageLinks.thumbnail
                  );
    }
  })
};

function renderBooks(title, author, thumbnail) {
  container.innerHTML +=
   `<div class="card">
      <img src="${thumbnail}" alt="thumbnail">
      <div class="info">
        <h3>${title}</h3>
        <p>by ${author}</p>
        <div class="rating">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star-half-alt"></i>
        <i class="far fa-star"></i>
        </div>
      </div>
    </div>`
}

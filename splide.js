async function fetchTemp() {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/movies/",
    {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUzYmMyOGVjNWEzNTAwMTU0MGQ2Y2IiLCJpYXQiOjE2MTYxMDAzOTMsImV4cCI6MTYxNzMwOTk5M30.-yh_2Jt2q8yWna_zvYT9JlXMtFCzyKCUNHMVLUgoPyc",
      }),
    }
  );
  const data = await response.json();
  displayMovies(data);
  console.log(data);
  return data;
}
const displayMovies = async (data) => {
  console.log(data);
  let mainContent = document.querySelector("#splide-list-2");
  data.forEach((data) => {
    mainContent.innerHTML += `<li class="splide__slide"><div class="container"><img
      class="carousel-img"
      src="${data.img}" height=250 width="145"
      alt=""/><div class="book-btns"><p class="price">${data.price}$</p><i data-attribute="${data.asin}" onclick="addToCart(event)" class="fas fa-cart-arrow-down"></i><i onclick="openInfo()"class="fas fa-info-circle"></i></div></div></li>`;
  });
  await new Splide("#splide2", {
    perPage: 7,
    breakpoints: {
      1583: {
        perPage: 6,
      },
      1000: {
        perPage: 5,
      },
      577: {
        perPage: 1,
      },
    },
  }).mount();
};

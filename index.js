const authKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUzYmMyOGVjNWEzNTAwMTU0MGQ2Y2IiLCJpYXQiOjE2MTYxMDAzOTMsImV4cCI6MTYxNzMwOTk5M30.-yh_2Jt2q8yWna_zvYT9JlXMtFCzyKCUNHMVLUgoPyc";
const startEngine = () => {
  fetchTemp();
  fetchTemp2();
};

let allCategories = [];
const navColorOnScroll = () => {
  let nav = document.querySelector(".navbar");
  const yaxis = window.scrollY;
  if (yaxis == 0 || yaxis == 1) {
    nav.style.backgroundColor = "transparent";
  } else {
    nav.style.backgroundColor = "#141414";
  }
};

const postShow = async () => {
  event.preventDefault();
  const newShow = {
    name: document.querySelector("#inputShowName").value,
    description: document.querySelector("#inputShowDescription").value,
    category: document.querySelector("#inputGenre").value,
    imageUrl: document.querySelector("#inputShowImageUrl").value,
  };

  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/movies/",
      {
        method: "POST",
        body: JSON.stringify(newShow),
        headers: new Headers({
          Authorization: authKey,
          "Content-Type": "application/json",
        }),
      }
    );

    alert("Show successfully added");
    window.location.assign("/index.html");
    fetchTemp();
    return;
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
};
async function fetchAllCategories() {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/movies/",
    {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: authKey,
      }),
    }
  );
  const data = await response.json();
  allCategories.push(data);

  return data;
}
async function fetchCategories() {
  const query = document.querySelector(".filter-select").value;
  if (query === "All Movies") {
    // const response = await fetch(
    //   "https://striveschool-api.herokuapp.com/api/movies/",
    //   {
    //     method: "GET",
    //     headers: new Headers({
    //       "Content-type": "application/json",
    //       Authorization: authKey,
    //     }),
    //   }
    // );
    // const data = await response.json();
    // allCategories.push(data);

    // let allMoviess = await Promise.all(
    //   allCategories.forEach((element) => {
    //     // do something with this response like parsing to JSON
    //     fetch("https://striveschool-api.herokuapp.com/api/movies/" + element, {
    //       method: "GET",
    //       headers: new Headers({
    //         "Content-type": "application/json",
    //         Authorization: authKey,
    //       }),
    //     })
    //       .then((response) => response)
    //       .then((data) => {
    //         console.log(data.json());
    //       });
    //   })
    // );
    // console.log(allMoviess);
    alert("COMING SOON");
  } else {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/movies/" + query,
      {
        method: "GET",
        headers: new Headers({
          "Content-type": "application/json",
          Authorization: authKey,
        }),
      }
    );
    const data = await response.json();
    console.log(data);

    const tableContainer = document.querySelector("#summary-table-body");
    tableContainer.innerHTML = "";

    data.forEach((e) => {
      const newTableItem = document.createElement("tbody");
      newTableItem.innerHTML += `
    <tr><th scope="row"><img src="${e.imageUrl}" height="100" width="120"/></th>
        <td>${e.name}</td>
        <td>${e._id}</td>
        <td><button  class="btn btn-warning d-inline-block mr-2 edit-btn">Edit</button>
        <button class="btn btn-danger delete-btn">Delete</button></td>
    </tr>               
      `;

      tableContainer.appendChild(newTableItem);
      newTableItem
        .querySelector(".edit-btn")
        .addEventListener("click", () => triggerEditData(e._id));
      newTableItem
        .querySelector(".delete-btn")
        .addEventListener("click", () => removeMovieData(e._id));
    });
    return data;
  }
}
async function fetchTemp() {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/movies/Comedy",
    {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: authKey,
      }),
    }
  );
  const data = await response.json();
  displayMovies(data);
  console.log(data);
  return data;
}
const displayMovies = async (data) => {
  let mainContent = document.querySelector("#splide-list-1");
  data.forEach((data) => {
    mainContent.innerHTML += `<li class="splide__slide"><div class="container"><img
      class="carousel-img"
      src="${data.imageUrl}" 
      alt=""/><div class="movie-btns"><p class="title">${data.name}</p></div></div></li>`;
  });
  await new Splide("#splide", {
    perPage: 7,
    type: "loop",
    autoWidth: true,
    breakpoints: {
      1583: {
        perPage: 6,
      },
      1000: {
        perPage: 5,
      },
      577: {
        perPage: 2,
      },
    },
  }).mount();
};
async function fetchTemp2() {
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/movies/Anime",
    {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: authKey,
      }),
    }
  );
  const data2 = await response.json();
  displayMovies2(data2);
  console.log(data2);
  return data2;
}
const displayMovies2 = async (data2) => {
  let mainContent2 = document.querySelector("#splide-list-2");
  console.log(mainContent2);
  data2.forEach((data) => {
    mainContent2.innerHTML += `<li class="splide__slide"><div class="container"><img
      class="carousel-img"
      src="${data.imageUrl}" 
      alt=""/><div class="movie-btns"><p class="price">${data.name}</p></div></div></li>`;
  });
  await new Splide("#splide-2", {
    perPage: 7,
    type: "loop",
    autoWidth: true,
    breakpoints: {
      1583: {
        perPage: 6,
      },
      1000: {
        perPage: 5,
      },
      577: {
        perPage: 2,
      },
    },
  }).mount();
};
const removeMovieData = async (id) => {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/movies/" + `${id}`,
      {
        method: "DELETE",
        headers: new Headers({
          Authorization: authKey,
        }),
      }
    );
    alert("Show successfully removed");

    return;
  } catch (error) {
    alert("Error, action did not complete successfully");
    console.error(`ERROR: ${error.message}`);
  }
};
function deleteShow(e) {
  e.preventDefault();

  const id = document.querySelector("#inputShowID").value;
  removeMovieData(id);
}
const setEditData = async (id) => {
  const editedMovie = {
    name: document.querySelector("#modal-show-name").value,
    description: document.querySelector("#modal-show-description").value,
    category: document.querySelector("#modal-show-genre").value,
    imageUrl: document.querySelector("#modal-show-img").value,
  };
  console.log(editedMovie);
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/movies/" + id,
      {
        method: "PUT",

        body: JSON.stringify(editedMovie),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: authKey,
        }),
      }
    );
    alert("gj");
    const data = await response.json();
    console.log(data);
    return;
  } catch (error) {
    alert("Error, action did not complete successfully");
    console.error(`ERROR: ${error.message}`);
  }
};
function triggerEditData(id) {
  console.log(id);
  let modal = document.querySelector(".self-made-modal");
  modal.classList.toggle("d-none");

  modal.firstElementChild.lastElementChild.addEventListener("click", () =>
    setEditData(id)
  );
}

window.onload = startEngine();

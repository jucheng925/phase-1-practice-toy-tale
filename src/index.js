let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  loadToy()
});

function loadToy() {
  fetch("http://localhost:3000/toys")
  .then(resp=>resp.json())
  .then(data=> data.forEach(toy => renderOneToy(toy)))
}

function renderOneToy(toy){
  let card = document.createElement("div")
  card.className = "card"
  card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `
  card.querySelector('.like-btn').addEventListener("click",()=> {
      toy.likes++
      card.querySelector('p').textContent = `${toy.likes} Likes`
      updateLikes(toy)
  })
  document.querySelector("#toy-collection").appendChild(card)
}


const createButton = document.querySelector(".add-toy-form")
createButton.addEventListener("submit", handleForm)

function handleForm(e) {
  e.preventDefault()
  let toyObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  renderOneToy(toyObj)
  addNewToy(toyObj)
}


function addNewToy(toyObj){
  fetch("http://localhost:3000/toys", {
  method: "POST",
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(toyObj)
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
}

function updateLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: "PATCH",
    headers:
    {
     "Content-Type": "application/json",
     Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": toyObj.likes
    })
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}

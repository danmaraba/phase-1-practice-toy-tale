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
});

document.querySelector('.add-toy-form').addEventListener('submit',toSubmit)

function toSubmit(e) {
  e.preventDefault()
  let newToy={
    name:e.target.name.value,
    image:e.target.image.value,
    likes:0
  }
  addToys(newToy)
  
}

function addToys(newToy){
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(newToy)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

function displayCharacters(character){
  let card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.image}"  class="toy-avatar" />
        <p>
        <span class = "likes-count">${character.likes} </span> Likes </p>
        <button class="like-btn" id="[toy_id]">Like</button>
        `
      card.querySelector('.like-btn').addEventListener('click',() => {
        character.likes+= 1
        card.querySelector('span').textContent = character.likes
      } )
        document.querySelector('#toy-collection').appendChild(card)
  }

  function updateToys(newToy){
    fetch(`http://localhost:3000/toys/${newToy.id}`,{
      method: 'PATCH',
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:JSON.stringify(newToy)
    })
    .then(res => res.json())
    .then(toy => console.log(toy))
  }
  
  acquireAllToys()

  function acquireAllToys(){
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toyData => toyData.forEach(toy => displayCharacters(toy) ))
    
  }
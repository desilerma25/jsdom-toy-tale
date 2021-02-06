let addToy = false;

const toyCollection = document.getElementById('toy-collection')

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

  const grabSubmit = document.getElementsByClassName("submit")[0]

  grabSubmit.addEventListener("click", newToy);
});


// need fetch, after fetch req. add to DOM
fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(json => gotToys(json)) //callback funt. need def of fun. 
// .then(gotToys) json gets passed as arg automatically

function gotToys(toys) {
  //debugger
  toys.forEach(toy => {
    createCard(toy)
  });
}

function createCard(toy) {
  // make a div with class card
  const card = document.createElement('div')
  card.classList.add('card')
  
  const h2 = document.createElement('h2')
  h2.innerText = toy.name

  const image = document.createElement('img')
  image.classList.add('toy-avatar')
  image.src = toy.image

  //debugger
  const para = document.createElement('p')
  para.innerText = `${toy.likes} Likes`

  const button = document.createElement('button')
  button.classList.add('like-btn')
  button.innerText = "Like <3"

  toyCollection.appendChild(card)
  card.appendChild(h2)
  card.appendChild(image)
  card.appendChild(para)
  card.appendChild(button)

  button.addEventListener('click', (e) => updateLike(e, toy)) //callback funct.
  // review pod video to see how addEvent arg works
}

function updateLike(e, toy) {
  // needs to increase w/ every click
  // capture how many likes currently 
  // update innerText to rep new total
  // update db with new total
  toy.likes++
  // let totalLikes = toy.likes
  // get toy.likes from passing in through in addEvent
  //totalLikes++;
  //toy.likes = totalLikes
  // need to reset amount to update each time new like is added
  e.target.parentElement.querySelector('p').innerText = `${toy.likes} likes`
  // from target (what was clicked) goes up DOM tree to parent
  // then back down to select p tag
  // then updates innerText with new total likes

  // need to update db

  const configObj = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify( {
      "likes": toy.likes
    })
  }

  //const likesInfo = { "likes": toy.likes.value }

  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
  .then(resp => resp.json())
  .then(json => console.log(json))

  
}

// adding a new toy



function newToy(event) {

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": document.getElementsByName("name")[0].value,
      "image": document.getElementsByName("image")[0].value,
      "likes": 0
      // "name": "Jessie",
      // "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      // "likes": 0 
    })
  }

  fetch("http://localhost:3000/toys", configObj)
  .then(resp => resp.json())
  .then(json => createCard(json))
}




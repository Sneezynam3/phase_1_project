// //event listeners
// document.querySelector('#refreshList').addEventListener('submit', handleSubmit);
// function refreshList(){

// //Event Handlers
// function handleSubmit(e){
//   e.preventDefault()
//   let animalObj = {
//     name:e.target.name.value,
//     imgUrl:e.target.name.value,
//     description:e.target.description.value,
//     donations: 0
//   }
//   renderOneAnimal(animalObj)
// }

// //DOM Render Functions
// function renderOneAnimal(animal){
//   //build animal
//   let card = document.createElement('li')
//   card.className = 'card'
//   card.id = animal.id
//   card.innerHTML = `
//   <img src="${animal.name}"
//   <div class="content">
//     <h4>${animal.name}</h4>
//     <p>
//       $<span class = donation-count">${animal.donations}</span> Donated
//     <p>
//     <p>${animal.description}</p>
//   </div>
//   <div class = "buttons">
//     <button id='donate'> Donate $10 </button>
//     <button id='set_free' > Set Free </button>
//   </div>
//   `
// card.querySelector('#donate').addEventListener('click', () => console.log('click'))
//   //add animal card to DOM
//   document.querySelector('animal-list').appendChild(card)
// }









  car.innerHTML = `
  <form id="color-form">
      <h1>Color possibilites?</h1>
          <div id="colors-container">
              <h1>Your turn to vote!</h1>
              <input type="radio" id="primer" name="color" value=0>
              <label for="primer">Primer</label><br>
  
              <input type="radio" id="wrap" name="color" value=0>
              <label for="wrap">Wrap</label><br>     
  
              <input type="radio" id="red" name="color" value=0>
              <label for="red">Red</label><br>
  
              <input type="radio" id="white" name="color" value=0>
              <label for="white">White</label><br>
  
              <input type="radio" id="blue" name="color" value=0>
              <label for="blue">Blue</label><br>
          </div>
          <br>
      <input type="submit" value="Submit">
  </form>
  `
  fetch('http://localhost:3000/colors')
    .then(response => response.json())
    .then(data => {
      console.log(data); // Check the parsed JSON data

      // Iterate over the color objects in the JSON data in reverse order
      data.reverse().forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('color');

        const colorImage = document.createElement('img');
        colorImage.src = './Assets/' + color.image;

        const colorSaying = document.createElement('p');
        colorSaying.textContent = color.saying;

        // Create elements for color, image, and votes
        const colorName = document.createElement('h2');
        colorName.textContent = color.color;

        const colorVotes = document.createElement('p');
        colorVotes.textContent = `Votes: ${parseInt(color.votes)}`;

        // Append the elements to the color div
        colorDiv.appendChild(colorName);
        colorDiv.appendChild(colorImage);
        colorDiv.appendChild(colorSaying);
        colorDiv.appendChild(colorVotes);

        // Prepend the color div to the colors container
        colorsContainer.insertBefore(colorDiv, colorsContainer.firstChild);
      });
    })

    .catch(error => {
      console.error('Error:', error);
    });
  }
  const inputForm = document.querySelector('#color-form');
  inputForm.addEventListener('submit', event => {
  event.preventDefault();

  const selectedColor = document.querySelector('input[name="color"]:checked').value;
  const votes = parseInt(document.querySelector('input[name="color"]:checked').value);
    
    fetch('http://localhost:3000/colors', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ votes }), // Include the votes value in the request body
    })
    .then(response => response.json())
    .then(updatedData => {
      // Update the votes number in the DOM
      const selectedColorElement = document.querySelector(`input[value="${selectedColor}"]`);
      const selectedColorVotesElement = selectedColorElement.nextElementSibling;

      // Increment the vote count
      const currentVotes = parseInt(selectedColorVotesElement.textContent.split(' ')[1]);
      const newVotes = currentVotes + 1;

      selectedColorVotesElement.textContent = `Votes: ${newVotes}`;

      // Remove unselected color elements from the DOM
      const unselectedColorElements = document.querySelectorAll(`input[name="color"]:not(:checked)`);
      unselectedColorElements.forEach(element => {
        const colorDiv = element.parentElement;
        if (colorsContainer.contains(colorDiv)) {
          colorDiv.remove(unselectedColorElements);
        }
      });
      console.log(response)
    })
      .catch(error => {
        console.log('Error:', error);
      });

  });




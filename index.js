document.addEventListener('DOMContentLoaded', () => {
  const colorsContainer = document.querySelector('#colors-container');

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
    })
      .catch(error => {
        console.log('Error:', error);
      });

  });

});


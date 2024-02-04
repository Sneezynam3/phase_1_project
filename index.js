//AI Prompt
// In less then a hundred words can you write in plain english a list of steps to complete the javascript, or pseudo code, for displaying the images from a db.json file using mouse over to start the set timeout that displays only one image at a time for one second before going to the next in the array wrapped in a DomContentLoaded of course.

//Pseudo Code
// DOM Content Loaded Event: Listen for the DOMContentLoaded event.
// Fetch Data: Fetch image data from 'db.json' using fetch().
// Parse JSON: Parse the JSON response.
// Mouseover Event: Add a mouseover event listener to a designated element.
// Start Timeout: When mouseover event triggers, start a timeout function.
// Display Image: On timeout, display one image for one second.
// Transition Images: After one second, transition to the next image in the array.
// Loop: Repeat the process until all images are displayed.
// Error Handling: Implement error handling for fetch failures or JSON parsing errors.



document.addEventListener('DOMContentLoaded', () => {
  // Fetch colors data from the server
  fetch('http://localhost:3000/colors')
    .then(response => response.json())
    .then(data => { 
      console.log(data)
      data.forEach(image => {
        // Assuming each 'image' contains a URL to an image
        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        imgElement.alt = image.saying;

        // Assuming there's a container with id 'imageContainer' where you want to append the images
        document.getElementById('imageContainer').appendChild(imgElement);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});


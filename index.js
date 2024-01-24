document.addEventListener('DOMContentLoaded', () => {
  // Fetch colors data from the server
  fetch('http://localhost:3000/colors')
    .then(response => response.json())
    .then(data => { 
      console.log(data);
      data.forEach(color => {
        // Create an <img> element
        const imageElement = document.createElement('img');

        // Set the src attribute to the image URL from the object
        imageElement.src = './Assets/' + color.image;

        // Append the <img> element to the image container
        const imageContainer = document.getElementById('image-container');
        imageContainer.appendChild(imageElement);

          
        const images = document.querySelectorAll('img');

        images.forEach(image => {
          image.addEventListener('mouseover', () => {
            image.style.filter = 'none';
          });
      
          image.addEventListener('mouseout', () => {
            image.style.filter = 'blur(10px)';
      });
    })
  })

    });
});

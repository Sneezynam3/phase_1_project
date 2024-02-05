document.addEventListener('DOMContentLoaded', () => {
  let timeOutIds = []; 

  fetch('http://localhost:3000/colors')
    .then(response => response.json())
    .then(data => {
      const imgElement = document.getElementById("img");

      imgElement.addEventListener("mouseover", () => {
        data.slice(0, 5).forEach((color, index) => { 
          let timeOutId = setTimeout(() => {
            imgElement.src = `assets/${color.image}`;
          }, 1000 * (index + 1)); 

          timeOutIds.push(timeOutId);
        });
      });

      imgElement.addEventListener("mouseout", () => {
        timeOutIds.forEach(id => clearTimeout(id));
        imgElement.src = "../phase-1/assets/4-20copy.jpeg";
        timeOutIds = []; // Clear the array for future use
      })

      img.addEventListener("click", () => {
        const element = document.createElement("ol");
        data.forEach(color => {
          const listItem = document.createElement("li");
          listItem.textContent = color.saying;
          element.appendChild(listItem);
        });

        const h3Element = document.querySelector('h3');
        h3Element.appendChild(element);
      })
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
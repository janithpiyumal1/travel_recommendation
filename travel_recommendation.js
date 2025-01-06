const btnSearch = document.getElementById('btnSearch');

function searchPlace() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      // Find the place by matching the input
      const place = data.countries.find(item => item.name.toLowerCase() === input);
      if (place) {
        console.log("Place found:", place);
        for (let i = 0; i < place.cities.length; i++) {
          const city = place.cities[i];
          const imageUrl = city.imageUrl;
          const description = city.description;
          displayResult(city.name, imageUrl, description);
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });

}


function displayResult(name, imageUrl, description) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML += `<h2>${name}</h2>`;
  if (imageUrl) {
      resultDiv.innerHTML += `<img src="${imageUrl}" alt="${name}">`;
  }
  if (description) {
      resultDiv.innerHTML += `<p>${description}</p>`;
  }
}

btnSearch.addEventListener('click', searchPlace);


document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      searchPlace();
      displayResult();
    }
});

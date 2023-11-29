document.addEventListener('DOMContentLoaded', () => {
    const charactersList = document.getElementById('characters-list');
    const characterDetails = document.getElementById('character-details');
    const details = document.getElementById('details');
  
    // para obtener datos de la API
    function fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          displayCharacterNames(data.results);
        })
        .catch(error => console.log(error));
    }
  
    // Mostrar lista de nombres de personajes
    function displayCharacterNames(characters) {
      charactersList.innerHTML = '';
      characters.forEach(character => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.innerHTML = `<a href="#" data-id="${character.id}" class="character-link">${character.name}</a>`;
        row.appendChild(nameCell);
        charactersList.appendChild(row);
      });
  
      // Manejar clic en el nombre del personaje
      const characterLinks = document.querySelectorAll('.character-link');
      characterLinks.forEach(link => {
        link.addEventListener('click', event => {
          event.preventDefault();
          const characterId = event.target.getAttribute('data-id');
          const selectedCharacter = characters.find(character => character.id === parseInt(characterId));
          showCharacterDetails(selectedCharacter);
        });
      });
    }
  
    // Mostrar detalles del personaje
    function showCharacterDetails(character) {
      details.innerHTML = `
        <p><strong>Name:</strong> ${character.name}</p>
        <p><strong>Status:</strong> ${character.status}</p>
        <p><strong>Species:</strong> ${character.species}</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
        <p><strong>Location:</strong> ${character.location.name}</p>
        <!-- Mostrar más detalles si es necesario -->
      `;
      characterDetails.classList.remove('hidden');
    }
  
    // Obtener datos de personajes utilizando la URL proporcionada
    const charactersUrl = 'https://rickandmortyapi.com/api/character';
    fetchData(charactersUrl);
  });
  
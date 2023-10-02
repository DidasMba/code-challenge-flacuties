// Your code here

document.addEventListener('DOMContentLoaded', () => {
    const characterBar = document.getElementById('character-bar');
    const detailedInfo = document.getElementById('detailed-info');
    const votesForm = document.getElementById('votes-form');
  
    // Function to fetch and display a list of all animal names
    function displayAnimalNames() {
      fetch('http://localhost:3000/characters')
        .then((response) => response.json())
        .then((characters) => {
          characters.forEach((character) => {
            const span = document.createElement('span');
            span.textContent = character.name;
            span.addEventListener('click', () => displayCharacterDetails(character.id));
            characterBar.appendChild(span);
          });
        });
    }
  
    // Function to display a specific animal's details
    function displayCharacterDetails(id) {
      fetch(`http://localhost:3000/characters/${id}`)
        .then((response) => response.json())
        .then((character) => {
          detailedInfo.innerHTML = `
            <p id="name">${character.name}</p>
            <img id="image" src="${character.image}" alt="${character.name}" />
            <h4>Total Votes: <span id="vote-count">${character.votes}</span></h4>
            <form id="votes-form">
              <input type="text" placeholder="Enter Votes" id="votes" name="votes" />
              <input type="submit" value="Add Votes" />
            </form>
            <button id="reset-btn">Reset Votes</button>
          `;
  
          // Add event listener to the votes form
          votesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const votesInput = document.getElementById('votes');
            const voteCount = document.getElementById('vote-count');
  
            const newVotes = parseInt(votesInput.value);
            const currentVotes = parseInt(voteCount.textContent);
            const totalVotes = currentVotes + newVotes;
  
            // Display the updated votes count
            voteCount.textContent = totalVotes;
          });
        });
    }
  
    // Call the function to display animal names when the page loads
    displayAnimalNames();
  });
  

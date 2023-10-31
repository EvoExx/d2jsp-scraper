async function searchData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    
    // Fetch and parse the JSON data from the file
    const response = await fetch('tableData.json'); // Replace with your JSON file path
    const jsonData = await response.json();
    
    // Search for matches in the JSON data
    const matches = jsonData.filter((item) => {
      return item.title.toLowerCase().includes(searchInput);
    });
    
    // Display the search results as links
    if (matches.length > 0) {
      searchResults.innerHTML = 'Search Results:';
      matches.forEach((match) => {
        const link = document.createElement('a');
        link.textContent = `Title: ${match.title}`;
        link.href = `https://forums.d2jsp.org/${match.href}`;
        link.target = '_blank'; // Open links in a new tab/window
        searchResults.appendChild(link);
        searchResults.appendChild(document.createElement('br')); // Add line breaks between links
      });
    } else {
      searchResults.innerHTML = 'No matches found.';
    }
  }
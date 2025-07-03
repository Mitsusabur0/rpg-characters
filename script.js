document.addEventListener('DOMContentLoaded', () => {
    // Global store for all character data
    let allCharacters = [];

    // DOM element references
    const gallery = document.getElementById('character-gallery');
    const searchInput = document.getElementById('search-input');

    /**
     * Fetches character data from the .jsonl file and parses it.
     * JSONL format is one JSON object per line.
     */
    async function fetchCharacters() {
        try {
            const response = await fetch('misc/synth_lore_dataset.jsonl');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const textData = await response.text();
            
            // Parse the JSONL data
            allCharacters = textData
                .trim() // Remove leading/trailing whitespace
                .split('\n') // Split into individual lines
                .map(line => {
                    try {
                        return JSON.parse(line); // Parse each line as a JSON object
                    } catch (e) {
                        console.error('Failed to parse line:', line, e);
                        return null; // Return null for invalid lines
                    }
                })
                .filter(character => character !== null); // Filter out any parsing errors

        } catch (error) {
            console.error("Could not fetch or parse character data:", error);
            gallery.innerHTML = '<p class="loading-message">Failed to summon characters. The æther is unstable.</p>';
        }
    }

    /**
     * Renders an array of character objects into the gallery.
     * @param {Array<Object>} charactersToDisplay - The characters to render.
     */
    function renderCharacters(charactersToDisplay) {
        // Clear the gallery before rendering new content
        gallery.innerHTML = '';

        if (charactersToDisplay.length === 0) {
            gallery.innerHTML = '<p class="no-results-message">No champions match your call...</p>';
            return;
        }

        charactersToDisplay.forEach(character => {
            // Extract a name from the backstory if possible, otherwise use a default
            const nameMatch = character.generated_backstory.match(/^([A-Z][a-z]+(?: [A-Z][a-z]+)?)/);
            const name = nameMatch ? nameMatch[1] : "A Mysterious Figure";

            const cardHTML = `
                <article class="character-card">
                    <img src="imgs/${character.source_image}" alt="${character.visual_caption}">
                    <div class="card-story">
                        <h2>${name}</h2>
                        <p>${character.generated_backstory}</p>
                    </div>
                </article>
            `;
            // Use insertAdjacentHTML for better performance than repeated innerHTML+=
            gallery.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    /**
     * Handles the search input event, filtering characters and re-rendering the gallery.
     */
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        const filteredCharacters = allCharacters.filter(character => {
            // Search in both the backstory and the visual caption for broader results
            const backstory = character.generated_backstory.toLowerCase();
            const caption = character.visual_caption.toLowerCase();
            return backstory.includes(searchTerm) || caption.includes(searchTerm);
        });

        renderCharacters(filteredCharacters);
    }
    
    /**
     * Main initialization function
     */
    async function init() {
        // Add the event listener for the search input
        searchInput.addEventListener('input', handleSearch);

        // Fetch character data
        await fetchCharacters();

        // Perform the initial render with all characters
        renderCharacters(allCharacters);
    }

    // Run the app
    init();
});
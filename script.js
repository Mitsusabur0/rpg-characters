document.addEventListener('DOMContentLoaded', () => {
    // Global store for all character data
    let allCharacters = [];

    // DOM element references
    const gallery = document.getElementById('character-gallery');
    const searchInput = document.getElementById('search-input');
    
    // Path to your data file
    const dataFilePath = 'synth_lore_dataset.jsonl'; 

    /**
     * Fetches character data from the .jsonl file and parses it.
     */
    async function fetchCharacters() {
        try {
            const response = await fetch(dataFilePath);
            if (!response.ok) {
                throw new Error(`File not found or network error! Status: ${response.status}`);
            }
            const textData = await response.text();
            
            allCharacters = textData
                .trim()
                .split('\n')
                .map(line => {
                    try {
                        if (line) return JSON.parse(line);
                        return null;
                    } catch (e) {
                        console.error('Failed to parse line:', line, e);
                        return null;
                    }
                })
                .filter(character => character !== null);
            
            allCharacters.reverse();

        } catch (error) {
            console.error("Could not fetch or parse character data:", error);
            gallery.innerHTML = `<p class="loading-message">Error: Could not load character data. Check the file path in script.js and the browser console (F12) for details.</p>`;
        }
    }

    /**
     * Renders an array of character objects into the gallery.
     */
    function renderCharacters(charactersToDisplay) {
        gallery.innerHTML = '';

        if (charactersToDisplay.length === 0) {
            gallery.innerHTML = '<p class="no-results-message">No champions match your call...</p>';
            return;
        }

        charactersToDisplay.forEach(character => {
            // --- NEW, CLEAN LOGIC ---
            // Directly access the dedicated fields. No more splitting the backstory!
            const nameAndTitleString = character.character_name || "A Mysterious Figure";
            const backstory = character.generated_backstory || "No lore available.";

            // We still keep the logic to split the name from a title if a comma exists.
            let name;
            let titleHTML = '';
            const commaIndex = nameAndTitleString.indexOf(',');

            if (commaIndex !== -1) {
                name = nameAndTitleString.substring(0, commaIndex).trim();
                const title = nameAndTitleString.substring(commaIndex + 1).trim();
                titleHTML = `<span class="character-title">, ${title}</span>`;
            } else {
                name = nameAndTitleString;
            }
            // --- END OF NEW LOGIC ---

            const cardHTML = `
                <article class="character-card">
                    <div class="card-image-container">
                        <img src="imgs/${character.source_image}" alt="${character.visual_caption}">
                    </div>
                    <div class="card-story">
                        <h2>${name}${titleHTML}</h2>
                        <p>${backstory}</p>
                    </div>
                </article>
            `;
            gallery.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    /**
     * Handles the search input event, filtering characters and re-rendering the gallery.
     */
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        const filteredCharacters = allCharacters.filter(character => {
            // --- ENHANCED SEARCH ---
            // Now we can also search by the character's dedicated name field.
            const name = (character.character_name || '').toLowerCase();
            const backstory = (character.generated_backstory || '').toLowerCase();
            const caption = (character.visual_caption || '').toLowerCase();
            
            return name.includes(searchTerm) || 
                   backstory.includes(searchTerm) || 
                   caption.includes(searchTerm);
        });

        renderCharacters(filteredCharacters);
    }
    
    /**
     * Main initialization function
     */
    async function init() {
        searchInput.addEventListener('input', handleSearch);
        await fetchCharacters();
        if (allCharacters.length > 0) {
            renderCharacters(allCharacters);
        }
    }

    // Run the app
    init();
});
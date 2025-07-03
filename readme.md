# Synth-Lore: Asset Guidance

This project uses several placeholder assets for its visual theme. To get the full experience, you should replace the placeholder files in the `assets/` directory with your own images.

## Main Background

-   **File:** `assets/images/background.jpg`
-   **Purpose:** This is the full-page background for the entire site.
-   **Suggestions:** Look for a dark, high-resolution image that fits the high-fantasy theme. Good keywords to search for are "dark fantasy landscape," "ancient stone texture," "moody forest," or "castle dungeon wall."
-   **Sources:**
    -   [Unsplash](https://unsplash.com/) (for high-quality free photos)
    -   [Pexels](https://www.pexels.com/) (another great source for free stock photos)
    -   AI Art Generators (like Midjourney or Stable Diffusion) can create perfect thematic backgrounds.

## Character Card Texture

-   **File:** `assets/images/parchment.png`
-   **Purpose:** This image is used as the background texture for each character card, giving it an old, papery feel.
-   **Suggestions:** Search for "parchment texture," "old paper background," or "scroll texture." A seamless (tileable) texture is ideal but not required.
-   **Sources:**
    -   [Textures.com](https://www.textures.com/) (great for game and graphic design textures)
    -   Public domain image repositories.

## Character Portraits

-   **Directory:** `imgs/`
-   **Purpose:** This folder holds all the character portrait images (e.g., `elf_archer.jpg`). The `script.js` file dynamically loads images from this directory based on the `source_image` field in the `synth_lore_dataset.jsonl` file.
-   **Action:** Place all your character images in this folder. Make sure the filenames match the data in your `.jsonl` file exactly.
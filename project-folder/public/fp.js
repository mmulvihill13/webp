async function getRandomDog() {
    try {
        // Fetch a random dog image
        let response = await fetch("https://dog.ceo/api/breeds/image/random");
        let data = await response.json();
        const dogImageUrl = data.message;

        // Get the meme caption from the backend
        const memeText = await generateCaption(dogImageUrl);

        // Update the image and caption on the page
        const imageContainer = document.getElementById("image-container");
        imageContainer.innerHTML = ""; // Clear the container first

        const img = document.createElement("img");
        img.src = dogImageUrl;
        img.alt = "Dog Meme";
        img.style.width = "500px"; // You can adjust the size
        img.style.height = "500px"; // You can adjust the size

        const caption = document.createElement("p");
        caption.textContent = memeText;

        imageContainer.appendChild(img);
        imageContainer.appendChild(caption);

    } catch (error) {
        console.error("Error fetching the dog image or generating the caption:", error);
    }
}

async function generateCaption(imageUrl) {
    try {
        const response = await fetch('/generate-caption', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl }),
        });

        const data = await response.json();
        if (data.caption) {
            return data.caption;  // Return the generated caption
        } else {
            throw new Error('No caption received from backend');
        }
    } catch (error) {
        console.error('Error generating caption:', error);
        return 'Oops! Something went wrong.';
    }
}

// Event listener for the Generate Meme button
document.getElementById("load-dog-btn").addEventListener("click", getRandomDog);

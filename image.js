// Import the dotenv library to load environment variables from .env
require('dotenv').config();

// Access environment variables
const huggingFaceApiKey = process.env.HUGGINGFACE_API_KEY;
const facebookAppId = process.env.FACEBOOK_APP_ID;

document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generateButton");
    const textInput = document.getElementById("textInput");
    const imageContainer = document.getElementById("imageContainer");

    generateButton.addEventListener("click", async function () {
        const inputText = textInput.value;
        const textArray = inputText.split("\n");

        // Replace with your Hugging Face API endpoint
        const apiUrl = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5";

        try {
            // Generate images with variations of the input text
            for (let i = 0; i < 1; i++) {
                const modifiedText = modifyText(textArray[0], i);
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${huggingFaceApiKey}`
                    },
                    body: JSON.stringify({ inputs: modifiedText }),
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const image = document.createElement("img");
                    image.src = URL.createObjectURL(blob);
                    imageContainer.appendChild(image);

                    // Create a download link for the image
                    const downloadLink = document.createElement("a");
                    downloadLink.href = URL.createObjectURL(blob);
                    downloadLink.download = `generated_image_${i + 1}.png`;
                    downloadLink.textContent = `Download Image ${i + 1}`;
                    downloadLink.style.display = "block";
                    imageContainer.appendChild(downloadLink);
                } else {
                    console.error(`Failed to generate image ${i + 1}.`);
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    // Modify the text function to create variations
    function modifyText(text, index) {
        const randomWords = ["beautiful", "colorful", "amazing", "fantastic", "wonderful", "realistic", "authentic", "true-to-life", "natural", "genuine"];
  
        const clearWords = ["crystal clear", "razor-sharp", "high definition", "ultra-realistic", "unbelievably clear"];
  
        const realWords = [
            "majestic mountains",
            "serene lake",
            "lush forest",
            "vibrant cityscape",
            "sunset over the ocean",
            "snow-covered landscape",
            "bustling street market",
            "starry night sky",
            "tranquil beach",
            "rustic countryside"
        ];

        // Randomly select a word from the list and add it to the text
        const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
        return text + " " + randomWord + " (Variation " + (index + 1) + ")";
    }
});













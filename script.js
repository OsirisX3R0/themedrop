// Grab elements
/** @type {HTMLInputElement} */
const container = document.querySelector(".container");
const fileInput = document.querySelector("#fileInput");
const preview = document.querySelector("#preview");
const previewLabel = document.querySelector("#preview label");
const colors = document.querySelectorAll("#theme .color");
const colorValue = document.querySelector("#value");

// Initialize properties
/** @type {File} */
let file = null;
/** @type {EyeDropper} */
let eyeDropper = null;

// Show alert if not supported
try {
  eyeDropper = new Eyeropper();
} catch (e) {
  preview.style.display = "none";
  const banner = document.createElement("div");
  banner.id = "notSupported";
  banner.innerHTML = "Eyedropper is not available in this browser";
  container.prepend(banner);
}

// Add click/touch events for each color selector
colors.forEach((color) => {
  let startTime;

  // If a file is selected, initiate eye dropper color selection
  color.addEventListener("click", () => {
    if (file !== null) {
      eyeDropper.open().then((colorResult) => {
        color.style.backgroundColor = colorResult.sRGBHex;
        color.dataset.hex = colorResult.sRGBHex;
      });
    }
  });

  // If a background color is already selected, display its hex value
  color.addEventListener("mouseover", () => {
    if (color.style.backgroundColor) colorValue.innerHTML = color.dataset.hex;
  });

  // Clear the innerHTML and start a timer
  color.addEventListener("touchstart", () => {
    colorValue.innerHTML = "";
    startTime = Date.now();
  });

  // Clear the innerHTML
  color.addEventListener("mouseleave", () => {
    colorValue.innerHTML = "";
  });

  // If the time between touchstart and touchend is more than 200 milliseconds and a background color is already selected, display its hex value
  color.addEventListener("touchend", (e) => {
    const duration = Date.now() - startTime;

    if (duration > 200) {
      e.preventDefault();
      if (color.style.backgroundColor) colorValue.innerHTML = color.dataset.hex;
    }
  });
});

// If a file is selected, display the image
fileInput.addEventListener("input", () => {
  setTimeout(() => {
    try {
      if (fileInput.files?.length) {
        const existingImage = document.querySelector("#previewImage");
        const existingFileName = document.querySelector("#fileName");
        if (existingImage) preview.removeChild(existingImage);
        if (existingFileName) preview.removeChild(existingFileName);
        colors.forEach((color) => (color.style.backgroundColor = ""));
        file = fileInput.files[0];

        const image = document.createElement("img");
        image.id = "previewImage";
        image.src = URL.createObjectURL(file);
        image.alt = file.name;
        const fileName = previewLabel.cloneNode();
        fileName.id = "fileName";
        fileName.innerHTML = file.name;
        preview.prepend(fileName);
        preview.prepend(image);
      }
    } catch (e) {
      alert(`ERROR: ${e.message}`);
    }
  }, 10);
});

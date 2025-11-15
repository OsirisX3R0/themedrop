/** @type {HTMLInputElement} */
const fileInput = document.querySelector("#fileInput");
const preview = document.querySelector("#preview");
const previewLabel = document.querySelector("#preview label");
const colors = document.querySelectorAll("#theme .color");
const colorValue = document.querySelector("#value");
/** @type {File} */
let file = null;
const eyeDropper = new EyeDropper();

colors.forEach((color) => {
  let startTime;

  color.addEventListener("click", () => {
    if (file !== null) {
      eyeDropper.open().then((colorResult) => {
        color.style.backgroundColor = colorResult.sRGBHex;
        color.dataset.hex = colorResult.sRGBHex;
      });
    }
  });

  color.addEventListener("mouseover", () => {
    if (color.style.backgroundColor) colorValue.innerHTML = color.dataset.hex;
  });
  color.addEventListener("touchstart", () => {
    colorValue.innerHTML = "";
    startTime = Date.now();
  });

  color.addEventListener("mouseleave", () => {
    colorValue.innerHTML = "";
  });
  color.addEventListener("touchend", (e) => {
    const duration = Date.now() - startTime;

    if (duration > 200) {
      e.preventDefault();
      if (color.style.backgroundColor) colorValue.innerHTML = color.dataset.hex;
    }
  });
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length) {
    file = fileInput.files[0];
    const image = document.createElement("img");
    image.src = URL.createObjectURL(file);
    image.alt = file.name;
    previewLabel.innerHTML = file.name;
    preview.prepend(image);
  }
});

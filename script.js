alert("SCRIPT LOADED");
/** @type {HTMLInputElement} */
const fileInput = document.querySelector("#fileInput");
const preview = document.querySelector("#preview");
const previewLabel = document.querySelector("#preview label");
const colors = document.querySelectorAll("#theme .color");
const colorValue = document.querySelector("#value");

alert("fileInput found: " + (fileInput !== null));
alert("fileInput id: " + fileInput?.id);
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

if (fileInput) alert("Adding listener");
fileInput.addEventListener("input", () => {
  alert("Listener fired");
  alert(`files ${fileInput.files?.[0]?.name}`);
  alert(`value ${fileInput.value}`);
  if (fileInput.files?.length || fileInput.value) {
    const existingImage = document.querySelector("#previewImage");
    const existingFileName = document.querySelector("#fileName");
    if (existingImage) preview.removeChild(existingImage);
    if (existingFileName) preview.removeChild(existingFileName);
    colors.forEach((color) => (color.style.backgroundColor = ""));
    file = fileInput.files?.[0] || fileInput.value;

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
});
alert("Added listener");

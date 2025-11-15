/** @type {HTMLInputElement} */
const fileInput = document.querySelector("#fileInput");
const preview = document.querySelector("#preview");

const updatePreview = () => {
  if (fileInput.files.length) {
    const file = fileInput.files[0];
    const image = document.createElement("img");
    image.src = URL.createObjectURL(file);
    // image.style = "width:100%";
    image.alt = file.name;
    preview.prepend(image);
  }
};

fileInput.addEventListener("change", updatePreview);

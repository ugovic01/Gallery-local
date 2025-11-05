const gallery = document.getElementById('gallery');
const imageInput = document.getElementById('imageInput');
const imageTitle = document.getElementById('imageTitle');
const addImage = document.getElementById('addImage');

let images = JSON.parse(localStorage.getItem('galleryImages')) || [];

function displayGallery() {
  gallery.innerHTML = '';
  images.forEach((img, index) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <img src="${img.src}" alt="${img.title}">
      <p>${img.title}</p>
      <button onclick="deleteImage(${index})">Delete</button>
    `;
    gallery.appendChild(div);
  });
}

addImage.addEventListener('click', () => {
  const file = imageInput.files[0];
  const title = imageTitle.value.trim();
  if (!file || !title) return alert('Please select an image and enter a title.');

  const reader = new FileReader();
  reader.onload = function(e) {
    const image = { title, src: e.target.result };
    images.push(image);
    localStorage.setItem('galleryImages', JSON.stringify(images));
    displayGallery();
    imageInput.value = '';
    imageTitle.value = '';
  };
  reader.readAsDataURL(file);
});

function deleteImage(index) {
  images.splice(index, 1);
  localStorage.setItem('galleryImages', JSON.stringify(images));
  displayGallery();
}

displayGallery();

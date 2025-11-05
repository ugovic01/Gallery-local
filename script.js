const imageInput = document.getElementById('imageInput');
const imageTitle = document.getElementById('imageTitle');
const addImageBtn = document.getElementById('addImageBtn');
const gallery = document.getElementById('gallery');

let images = JSON.parse(localStorage.getItem('galleryImages')) || [];

function displayGallery() {
  gallery.innerHTML = '';
  if (images.length === 0) {
    gallery.innerHTML = '<p class="empty">No images in gallery yet.</p>';
    return;
  }

  images.forEach((img, index) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <img src="${img.src}" alt="${img.title}">
      <p id="title-${index}">${img.title}</p>
      <button onclick="editImage(${index})">Edit</button>
      <button onclick="deleteImage(${index})">Delete</button>
    `;
    gallery.appendChild(div);
  });
}

// ==== Add Image ====
addImageBtn.addEventListener('click', () => {
  const file = imageInput.files[0];
  const title = imageTitle.value.trim();

  if (!file || !title) {
    alert('Please select an image and enter a title.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const newImage = {
      src: e.target.result,
      title: title
    };
    images.push(newImage);
    localStorage.setItem('galleryImages', JSON.stringify(images));
    displayGallery();
  };
  reader.readAsDataURL(file);

  imageInput.value = '';
  imageTitle.value = '';
});

function editImage(index) {
  const newTitle = prompt('Enter new title:', images[index].title);
  if (newTitle && newTitle.trim() !== '') {
    images[index].title = newTitle.trim();
    localStorage.setItem('galleryImages', JSON.stringify(images));
    displayGallery();
  }
}

function deleteImage(index) {
  if (confirm('Are you sure you want to delete this image?')) {
    images.splice(index, 1);
    localStorage.setItem('galleryImages', JSON.stringify(images));
    displayGallery();
  }
}

displayGallery();

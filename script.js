const imageInput = document.getElementById('imageInput');
const imageTitle = document.getElementById('imageTitle');
const addImageBtn = document.getElementById('addImageBtn');
const gallery = document.getElementById('gallery');
const clearGalleryBtn = document.getElementById('clearGalleryBtn');

let images = JSON.parse(localStorage.getItem('galleryImages')) || [];

function saveImages() {
  localStorage.setItem('galleryImages', JSON.stringify(images));
}

function displayGallery() {
  gallery.innerHTML = '';

  if (images.length === 0) {
    gallery.innerHTML = '<p class="empty">No images in gallery yet.</p>';
    return;
  }

  images.forEach((img, index) => {
    const div = document.createElement('div');
    div.className = 'item';

    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.title;

    const title = document.createElement('p');
    title.textContent = img.title;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editImage(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteImage(index));

    div.append(image, title, editBtn, deleteBtn);
    gallery.appendChild(div);
  });
}

// ==== Add Image ====
addImageBtn.addEventListener('click', () => {
  const file = imageInput.files[0];
  let title = imageTitle.value.trim();

if (!file) {
  alert('Please select an image.');
  return;
}

if (!title) {
  title = file.name;
}


  const reader = new FileReader();
  reader.onload = e => {
    images.push({ src: e.target.result, title });
    saveImages();
    displayGallery();
  };
  reader.readAsDataURL(file);

  imageInput.value = '';
  imageTitle.value = '';
});

// ==== Edit Image ====
function editImage(index) {
  const newTitle = prompt('Enter new title:', images[index].title);
  if (newTitle && newTitle.trim()) {
    images[index].title = newTitle.trim();
    saveImages();
    displayGallery();
  }
}

// ==== Delete Image ====
function deleteImage(index) {
  if (confirm('Delete this image?')) {
    images.splice(index, 1);
    saveImages();
    displayGallery();
  }
}

// ==== Clear Gallery ====
clearGalleryBtn.addEventListener('click', () => {
  if (confirm('Clear entire gallery?')) {
    images = [];
    localStorage.removeItem('galleryImages');
    displayGallery();
  }
});

displayGallery();

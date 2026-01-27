const imageInput = document.getElementById('imageInput');
const imageTitle = document.getElementById('imageTitle');
const addImageBtn = document.getElementById('addImageBtn');
const gallery = document.getElementById('gallery');
const clearGalleryBtn = document.getElementById('clearGalleryBtn');
const searchInput = document.getElementById('searchInput');
const preview = document.getElementById('preview');

let images = JSON.parse(localStorage.getItem('galleryImages')) || [];

function saveImages() {
  localStorage.setItem('galleryImages', JSON.stringify(images));
}

function displayGallery(list = images) {
  gallery.innerHTML = '';

  if (list.length === 0) {
    gallery.innerHTML = '<p class="empty">No images found.</p>';
    return;
  }

  list.forEach((img, index) => {
    const div = document.createElement('div');
    div.className = 'item';

    const image = document.createElement('img');
    image.src = img.src;

    const title = document.createElement('p');
    title.textContent = img.title;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editImage(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteImage(index);

    div.append(image, title, editBtn, deleteBtn);
    gallery.appendChild(div);
  });
}

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    preview.innerHTML = `<img src="${reader.result}" />`;
  };
  reader.readAsDataURL(file);
});

addImageBtn.addEventListener('click', () => {
  const file = imageInput.files[0];
  let title = imageTitle.value.trim();

  if (!file) {
    alert('Select an image first');
    return;
  }

  if (!title) title = file.name;

  const reader = new FileReader();
  reader.onload = () => {
    images.push({ src: reader.result, title });
    saveImages();
    displayGallery();

    imageInput.value = '';
    imageTitle.value = '';
    preview.innerHTML = '';
  };
  reader.readAsDataURL(file);
});

searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();
  const filtered = images.filter(img =>
    img.title.toLowerCase().includes(value)
  );
  displayGallery(filtered);
});

clearGalleryBtn.addEventListener('click', () => {
  if (confirm('Clear gallery?')) {
    images = [];
    localStorage.clear();
    displayGallery();
  }
});

function editImage(index) {
  const newTitle = prompt('New title:', images[index].title);
  if (newTitle) {
    images[index].title = newTitle.trim();
    saveImages();
    displayGallery();
  }
}

function deleteImage(index) {
  if (confirm('Delete image?')) {
    images.splice(index, 1);
    saveImages();
    displayGallery();
  }
}

displayGallery();

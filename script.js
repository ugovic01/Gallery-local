const imageInput = document.getElementById('imageInput');
const imageTitle = document.getElementById('imageTitle');
const addImageBtn = document.getElementById('addImageBtn');
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const preview = document.getElementById('preview');

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');

let images = JSON.parse(localStorage.getItem('galleryImages'));
if (!Array.isArray(images)) images = [];

localStorage.setItem('galleryImages', JSON.stringify(images));

function displayGallery(filter = '') {
  gallery.innerHTML = '';

  const filtered = images.filter(img =>
    img.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    gallery.innerHTML = '<p class="empty">No images found.</p>';
    return;
  }

  filtered.forEach((img, index) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <img src="${img.src}" alt="${img.title}" onclick="openModal(${index})">
      <p>${img.title}</p>
      <button onclick="editImage(${index})">Edit</button>
      <button onclick="deleteImage(${index})">Delete</button>
    `;
    gallery.appendChild(div);
  });
}

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    preview.innerHTML = `<img src="${e.target.result}">`;
  };
  reader.readAsDataURL(file);
});

addImageBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const file = imageInput.files[0];
  const title = imageTitle.value.trim();

  if (!file || !title) {
    alert('Please select an image and enter a title.');
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    images.push({ src: e.target.result, title });
    saveImages();
    displayGallery(searchInput.value);
  };
  reader.readAsDataURL(file);

  imageInput.value = '';
  imageTitle.value = '';
  preview.innerHTML = '';
});

function editImage(index) {
  const newTitle = prompt('Enter new title:', images[index].title);
  if (newTitle && newTitle.trim() !== '') {
    images[index].title = newTitle.trim();
    saveImages();
    displayGallery(searchInput.value);
  }
}

function deleteImage(index) {
  if (confirm('Delete this image?')) {
    images.splice(index, 1);
    saveImages();
    displayGallery(searchInput.value);
  }
}

searchInput.addEventListener('input', () => {
  displayGallery(searchInput.value);
});

function openModal(index) {
  modalImg.src = images[index].src;
  modalTitle.textContent = images[index].title;
  modal.classList.remove('hidden');
}

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.add('hidden');
});

displayGallery();

const darkToggle = document.getElementById('darkToggle');

if (localStorage.getItem('darkMode') === 'on') {
  document.body.classList.add('dark');
}

darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem(
    'darkMode',
    document.body.classList.contains('dark') ? 'on' : 'off'
  );
});


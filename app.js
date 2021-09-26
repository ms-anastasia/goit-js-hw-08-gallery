   
const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.lightbox');
const backdrop = document.querySelector('.lightbox__overlay');
const modalContent = document.querySelector('.lightbox__content');
const imageRef = document.querySelector('.lightbox__image');

const buttonClose = document.querySelector('[data-action="close-lightbox"]');

const imagesLayout = createImagesList(galleryItems);
gallery.insertAdjacentHTML("beforeend", imagesLayout);

gallery.addEventListener('click', onImageClick);
buttonClose.addEventListener('click', onCloseBtn);
backdrop.addEventListener('click', onBackdropClick);
document.addEventListener("keydown", onArrowClick);
document.addEventListener("keydown", onLeftRigthClick);

function createImagesList(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `<li class = "gallery__item">
        <a class = "gallery__link" href = '${original}'>
        <img class ="gallery__image"
        src="${preview}" 
        alt="${description}" 
        data-source = "${original}">
        </a>
        </li>`;
    }
    )
        .join('')
};
function onImageClick(e) {
    e.preventDefault();
    if (e.target.classList != "gallery__image") { return }
    modal.classList.add('is-open');
    window.addEventListener('keydown', onEscBtn);
    imageRef.src = e.target.dataset.source;
}
function onCloseBtn() {
   modal.classList.remove('is-open');
    window.removeEventListener('keydown', onEscBtn);
    imageRef.src = '';
    
}
function onBackdropClick(e) {
    if (backdrop == e.target) {
        onCloseBtn();
    }
 }

function onEscBtn(e) {
    if (e.code === 'Escape') {
       onCloseBtn(); 
    }
}

function onArrowClick(e) {
    const imgCurrentLink = galleryItems.map(({ original }) => original);
	let currentIndex = imgCurrentLink.indexOf(imageRef.src);
    if (e.key === "ArrowLeft") {
        leftClick(currentIndex);
    }
    else if (e.key === "ArrowRight") {
        rightClick(currentIndex);
    }

function leftClick(currentIndex) {
    let nextIndex = currentIndex - 1;
    if (nextIndex === -1) {
        nextIndex = imgCurrentLink.length - 1;
    }
    imageRef.src = imgCurrentLink[nextIndex];
}
function rightClick(currentIndex) {
    let nextIndex = currentIndex + 1;
    if (nextIndex === imgCurrentLink.length) {
        nextIndex =  0;
    }
    imageRef.src = imgCurrentLink[nextIndex];
}
};
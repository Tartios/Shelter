'use strict'
// burger
const burgerBtn = document.querySelector('.header__burger');
const headerNavigation = document.querySelector('.header__nav-mobile-background');
const headerNavItems = document.querySelectorAll('.header__nav-mobile-item');
burgerBtn.addEventListener('click', () => {
    headerNavigation.classList.toggle('header__nav-mobile-background_is-active');
    burgerBtn.classList.toggle('header__burger_is-active');
});
headerNavItems.forEach(item => {
    item.addEventListener('click', () => {
        headerNavigation.classList.toggle('header__nav-mobile-background_is-active');
        burgerBtn.classList.toggle('header__burger_is-active');
    });
});


// cards generator

let petsArray = [[{// массив массивов в котором лежат начальные и добавляются все последующие слайды
    "name": "Jennifer",
    "img": "../../assets/images/pets/pets-jennifer.png",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Sophia",
    "img": "../../assets/images/pets/pets-sophia.png",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Woody",
    "img": "../../assets/images/pets/pets-woody.png",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
  }],];
let cardOnSliderIndex = 0;// индекс слайда
const cardsContainer = document.querySelector('.slider__items'); // контейнер в котором лежит слайд со старта
const newCardGenerator = () => {
    const newCard = [];
    for (let index = 0; index < 3;) {// индекс = количеству карточек в слайде
        const nextItem = Math.floor(Math.random() * (pets.length-1)); // случайный элемент из pets
        if(!newCard.find(item => item === pets[nextItem])) {
            index++;
            newCard.push(pets[nextItem]);
        } else {
            continue;
        }
    }
    petsArray.push(newCard);
    cardOnSliderIndex++;
}
const cardGenerator = (array, container) => {// генератор карточек в слайде
    array.forEach((item) => {
        const cardTemplate = document.querySelector('#card-template').content.querySelector('.slider__card').cloneNode(true);
        const card = cardTemplate;
        const name = card.querySelector('.pets__slider-name');
        const photo = card.querySelector('.pets__slider-img');
        name.textContent = item.name;
        photo.src = item.img;
        modalListener(card);
        container.append(card);
    });
};

const slideGenerator = (index, bool = true) => {// создает новые слайды каждый раз при нажатии вперед или назад на последнем или первом слайде соответственно
    const slideTemplate = document.querySelector('#slide-template').content.querySelector('.slider__item').cloneNode(true);
    slideTemplate.setAttribute('id', 'container-' + index);
    slideTemplate.setAttribute('item-index', slideIndex);
    if(bool) {
    cardsContainer.append(slideTemplate)
    } else {
    cardsContainer.prepend(slideTemplate)
    };
    cardGenerator(petsArray[index], slideTemplate);
};

// slider 
const nextBtn = document.querySelector('#btn-next');
const prevBtn = document.querySelector('#btn-prev');
let slideIndex = 0;
const activeSlide = (i) => {
    const slideItems = document.querySelectorAll('.slide');
    const active = document.querySelector('[item-index="' + i + '"]');
    slideItems.forEach(item => {
        item.classList.remove('active');
    });
    active.classList.add('active');
};

const nextSlide = () => {//если уже есть слайд с индексом то просто переключаемся на индекс, если нет - создаем новый слайд с этим индексом
    slideIndex++;
    if(document.querySelector('[item-index="' + slideIndex + '"]')) {
        activeSlide(slideIndex);
    } else {
        newCardGenerator();
        slideGenerator(cardOnSliderIndex);
        activeSlide(slideIndex);
    };
};

const prevSlide = () => {
    slideIndex--;
    if(document.querySelector('[item-index="' + slideIndex + '"]')) {
        activeSlide(slideIndex);
    } else {
        newCardGenerator();
        slideGenerator(cardOnSliderIndex, false);
        activeSlide(slideIndex);
    }
};

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

slideGenerator(cardOnSliderIndex);


// modals

const petItem = document.querySelectorAll('.pets__slider-card');
const modal = document.querySelector('.pets-modal');
const petPhoto = document.querySelector('.pet-modal__img');
const petAge = document.querySelector('#pet-age');
const petInoculations = document.querySelector('#pet-inoculations');
const petDiseases = document.querySelector('#pet-diseases');
const petParasites = document.querySelector('#pet-parasites');
const petName = document.querySelector('.pet-modal__title');
const petBreed = document.querySelector('.pet-modal__breed');
const petAbout = document.querySelector('.pet-modal__about');
const modalCloseBtn = document.querySelector('.pet-modal__close-btn');

const closeModal = (e) => {
    if(e.target === modal || e.target === modalCloseBtn) {
        modal.classList.remove('pets-modal_isActive');
        modal.removeEventListener('click', closeModal);
    };
};

function modalListener(item) {// собираю информацию для модалки
    item.addEventListener('click', (e) => {
        modal.classList.add('pets-modal_isActive');
        const activePetName = item.querySelector('.pets__slider-name').textContent;
        const petData = pets.find(item => { if(item.name === activePetName) return item; });
        petName.textContent = petData.name;
        petBreed.textContent = petData.type + ' - ' + petData.breed;
        petAbout.textContent = petData.description;
        petPhoto.src = petData.img;
        petAge.textContent = petData.age;
        petInoculations.textContent = petData.inoculations;
        petDiseases.textContent = petData.diseases;
        petParasites.textContent = petData.parasites;
        modal.addEventListener('click', closeModal);
    });
};

petItem.forEach(item => {
    modalListener(item);
});


// window.addEventListener('resize', () => {
//     if(window.innerWidth >= 1184) {
        
//     }
// });
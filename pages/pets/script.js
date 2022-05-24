'use strict'
// card generator
const cardsContainerMain = document.querySelector('#slider-main');
const cardsContainerMiddle = document.querySelector('#slider-middle');
const cardsContainerSmall = document.querySelector('#slider-small');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.pets__slider-item').cloneNode(true);
let petsArray = [];
let petsArrayMiddle = [];
let petsArraySmall = [];
function shuffle(arr) {
	let j, temp;
	for(let i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
};

const former = (pets, petsArray) => {
    const shufflePets = shuffle(pets);
    petsArray.push(shufflePets);
    petsArray.length <= 5 ? former(pets, petsArray) : petsArray; 
};

former(pets, petsArray);

let cardOnSliderIndex = 0;// индекс слайда
const newCardGenerator = (pets, slideLength, petsArray) => {//наполняет массив карточек для слайдера
    const newCard = [];
    for (let index = 0; index < slideLength;) {// индекс = количеству необходимых карточек в слайде. длина каждого массива в массиве равна индексу
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

const cardGenerator = (array, container) => {// берет из массива данные о карточках и наполняет ими слайд
    array.forEach((item) => {
            const cardTemplate = document.querySelector('#card-template').content.querySelector('.pets__slider-item').cloneNode(true);
            const card = cardTemplate;
            const name = card.querySelector('.pets__slider-name');
            const photo = card.querySelector('.pets__slider-img');
            name.textContent = item.name;
            photo.src = item.img;
            modalListener(card);
            container.append(card);
    });
};

const slideGenerator = (index, petsArray, containerFromSlide) => {//создает слайды и наполняет ими сайт
    const slideTemplate = document.querySelector('#slide-template').content.querySelector('.slider__item').cloneNode(true);
    slideTemplate.setAttribute('id', containerFromSlide.id + '-' + index);
    containerFromSlide.append(slideTemplate)
    cardGenerator(petsArray[index], slideTemplate);
};
//нужно универсализировать и заменить нижний вариант на верхний
// вроде сделал, доделываю нижний вариант и переношу в функцию
// сейчас все слайды падают в один контейнер, нужно сделать слайд контейнер и потом уже
// кард контейнер
petsArray.forEach((itemArr, index) => {
    const slideTemplate = document.querySelector('#slide-template').content.querySelector('.slider__item').cloneNode(true);
    slideTemplate.setAttribute('id', cardsContainerMain.id + '-' + index);
    cardsContainerMain.append(slideTemplate);
    itemArr.forEach((item) => {
        const cardTemplate = document.querySelector('#card-template').content.querySelector('.pets__slider-item').cloneNode(true);
        const card = cardTemplate;
        const name = card.querySelector('.pets__slider-name');
        const photo = card.querySelector('.pets__slider-img');
        name.textContent = item.name;
        photo.src = item.img;
        modalListener(card);
        slideTemplate.append(card);
    });
});

function slideInArrayLength (pets, slideLength, petsArray, containerFromSlide, arrayLength) {
    for (let index = 0; index < arrayLength; index++) {
        newCardGenerator(pets, slideLength, petsArray);
        slideGenerator(index, petsArray, containerFromSlide)     
    }
}

// основной слайдер
// slideInArrayLength(pets, 8, petsArray, 6);
// слайдер на 768
slideInArrayLength(pets, 6, petsArrayMiddle, cardsContainerMiddle, 8);
// слайдер на 320
slideInArrayLength(pets, 3, petsArraySmall, cardsContainerSmall, 16);

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

// modals

const petItem = document.querySelectorAll('.pets__slider-item');
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
});

// slider-main
const firstPage = document.querySelector('#first-page');
const prevBtn = document.querySelector('#prev-page');
const pageNum = document.querySelector('#page-number');
const nextBtn = document.querySelector('#next-page');
const lastPage = document.querySelector('#last-page');
const slideItems = document.querySelectorAll('#slider-main .slide');
const activeSlides = document.querySelectorAll('#slider-main .active');
let slideIndex = 0;
const activeSlide = (i) => {
    slideItems.forEach(item => {
        item.classList.remove('active');
    });
    slideItems[i].classList.add('active');
};

const activeDot = (i) => {
    dots.forEach(item => {
        item.classList.remove('active');
    });
    console.log(i);
    dots[i].classList.add('active');
}

const nextSlide = () => {
    console.log(slideIndex);
    if(slideIndex === slideItems.length - 1) {
        slideIndex = 0;
        activeSlide(slideIndex);
        // activeDot(slideIndex);
    } else {
        slideIndex++;
        activeSlide(slideIndex);
        // activeDot(slideIndex);
    }
};

const prevSlide = () => {
    if(slideIndex === 0) {
        slideIndex = slideItems.length - 1;
        activeSlide(slideIndex);
        // activeDot(slideIndex);
    } else {
        slideIndex--;
        activeSlide(slideIndex);
        // activeDot(slideIndex);
    }
};

// dots.forEach((item, i) => {
//     item.addEventListener('click', () => {
//         slideIndex = i;
//         activeSlide(slideIndex);
//         activeDot(slideIndex);
//     })
// })
activeSlide(slideIndex);
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);


// slider-middle

const firstPage_middle = document.querySelector('#first-page');
const prevBtn_middle = document.querySelector('#prev-page');
const pageNum_middle = document.querySelector('#page-number');
const nextBtn_middle = document.querySelector('#next-page');
const lastPage_middle = document.querySelector('#last-page');
const slideItems_middle = document.querySelectorAll('#slider-middle .slide');
const activeSlides_middle = document.querySelectorAll('#slider-middle .active');
let slideIndex_middle = 0;
const activeSlide_middle = (i) => {
    slideItems_middle.forEach(item => {
        item.classList.remove('active');
    });
    slideItems_middle[i].classList.add('active');
};

const activeDot_middle = (i) => {
    dots.forEach(item => {
        item.classList.remove('active');
    });
    console.log(i);
    dots[i].classList.add('active');
}

const nextSlide_middle = () => {
    console.log(slideIndex_middle);
    if(slideIndex_middle === slideItems_middle.length - 1) {
        slideIndex_middle = 0;
        activeSlide_middle(slideIndex_middle);
        // activeDot(slideIndex);
    } else {
        slideIndex_middle++;
        activeSlide_middle(slideIndex_middle);
        // activeDot(slideIndex);
    }
};

const prevSlide_middle = () => {
    if(slideIndex_middle === 0) {
        slideIndex_middle = slideItems_middle.length - 1;
        activeSlide_middle(slideIndex_middle);
        // activeDot(slideIndex);
    } else {
        slideIndex_middle--;
        activeSlide_middle(slideIndex_middle);
        // activeDot(slideIndex);
    }
};

// dots.forEach((item, i) => {
//     item.addEventListener('click', () => {
//         slideIndex = i;
//         activeSlide(slideIndex);
//         activeDot(slideIndex);
//     })
// })
activeSlide_middle(slideIndex_middle);
nextBtn_middle.addEventListener('click', nextSlide_middle);
prevBtn_middle.addEventListener('click', prevSlide_middle);

// slider-small
const firstPage_small = document.querySelector('#first-page');
const prevBtn_small = document.querySelector('#prev-page');
const pageNum_small = document.querySelector('#page-number');
const nextBtn_small = document.querySelector('#next-page');
const lastPage_small = document.querySelector('#last-page');
const slideItems_small = document.querySelectorAll('#slider-small .slide');
const activeSlides_small = document.querySelectorAll('#slider-small .active');
let slideIndex_small = 0;
const activeSlide_small = (i) => {
    slideItems_small.forEach(item => {
        item.classList.remove('active');
    });
    slideItems_small[i].classList.add('active');
};

const activeDot_small = (i) => {
    dots.forEach(item => {
        item.classList.remove('active');
    });
    console.log(i);
    dots[i].classList.add('active');
}

const nextSlide_small = () => {
    console.log(slideIndex_small);
    if(slideIndex_small === slideItems_small.length - 1) {
        slideIndex_small = 0;
        activeSlide_small(slideIndex_small);
        // activeDot(slideIndex);
    } else {
        slideIndex_small++;
        activeSlide_small(slideIndex_small);
        // activeDot(slideIndex);
    }
};

const prevSlide_small = () => {
    if(slideIndex_small === 0) {
        slideIndex_small = slideItems_small.length - 1;
        activeSlide_small(slideIndex_small);
        // activeDot(slideIndex);
    } else {
        slideIndex_small--;
        activeSlide_small(slideIndex_small);
        // activeDot(slideIndex);
    }
};

// dots.forEach((item, i) => {
//     item.addEventListener('click', () => {
//         slideIndex = i;
//         activeSlide(slideIndex);
//         activeDot(slideIndex);
//     })
// })
activeSlide(slideIndex_small);
nextBtn_small.addEventListener('click', nextSlide_small);
prevBtn_small.addEventListener('click', prevSlide_small);



// вот тут случайно сформированный массив массивов собирается в единый массив где ни одна из карточек не повторяется в пределах восьми шагов, это на перспективу
// const newArray = petsArray.reduce((newArray, item) => {return newArray.concat(item)}, []);

// console.log(newArray);
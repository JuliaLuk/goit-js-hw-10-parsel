import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const divPicture = document.querySelector('.div-picture');

function toggleLoader(display) {
  loader.style.display = display;
}

function toggleCanInfo(display) {
  catInfo.style.display = display;
}

toggleLoader('none');

toggleLoader('block');

fetchBreeds()
  .then(breeds => {
    toggleLoader('none');

    const positionBreeds = breeds.map(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      return option;
    });
    breedSelect.append(...positionBreeds);

    new SlimSelect({
      select: '.breed-select',
    });
    breedSelect.classList.remove('is-hidden');
  })
  .catch(() => {
    Notiflix.Notify.warning(
      '❌ Oops! Something went wrong! Try reloading the page!',
      {
        position: 'center-top',
      }
    );
    error.classList.remove('is-hidden');
  })
  .finally(() => {
    toggleLoader('none');
  });

breedSelect.addEventListener('change', event => {
  toggleCanInfo('none');
  toggleLoader('block');

  fetchCatByBreed(event.target.value)
    .then(cat => {
      toggleLoader('none');
      toggleCanInfo('block');

      divPicture.innerHTML = `
    <img class="picture" src="${cat.url}" alt="${cat.breeds[0].name}">`;
      catInfo.innerHTML = `
      <h2 class="title">${cat.breeds[0].name}</h2>
      <p class="text">${cat.breeds[0].description}</p>
      <p class="temp"><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>`;
    })

    .catch(() => {
      Notiflix.Notify.warning(
        '❌ Oops! Something went wrong! Try reloading the page!',
        {
          position: 'center-top',
        }
      );
    })
    .finally(() => {
      toggleLoader('none');
    });
});

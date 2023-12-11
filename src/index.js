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
          //  position: 'center-top' ,
        }
      );
    })
    .finally(() => {
      toggleLoader('none');
    });
});

// -----------другий розвязок прошу не брати його під увагу
// import { fetchBreeds, fetchCatByBreed } from './cat-api';
// // import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select';

// const select = document.querySelector('.breed-select');
// const loader = document.querySelector('.loader');
// const divPicture = document.querySelector('.div-picture');
// const catInfo = document.querySelector('.cat-info');

// fetchBreeds()
//   .then(breeds => {
//     console.log('jcm lt', breeds);
//     select.style.visibility = 'visible';
//     // loader.style.display = 'none';
//     // const cat = breeds
//     //   .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
//     //   .join('');

//     select.insertAdjacentHTML('beforeend', createMarkup(breeds.data));
//   })

//   .catch(error => {
//     console.log(error);
//     loader.style.display = 'none';
//     // Notiflix.Notify.failure(
//     //   'Oops! Something went wrong! Try reloading the page!'
//     // );
//   });
// fetchBreeds();

// select.addEventListener('change', hendelSelect);
// divPicture.innerHTML = '';
// catInfo.innerHTML = '';
// function hendelSelect(event) {
//   event.preventDefault();
//   const selectedBreed = this.value;

//   loader.style.display = 'block';

//   fetchCatByBreed(selectedBreed).then(breeds => {
//     // loader.style.display = 'none';
//     const catData = breeds[0];
//     divPicture.innerHTML = `
//     <img class="picture" src="${catData.url}" alt="${catData.breeds[0].name}">`;
//     catInfo.innerHTML = `
//       <h2 class="title">${catData.breeds[0].name}</h2>
//       <p class="text">${catData.breeds[0].description}</p>
//       <p class="temp"><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>`;
//   });
// }

// function createMarkup(arr) {
//   return arr

//     .map(
//       ({ name, image, temperament, description }) => `
//     <div class="cat-info">
//       <p class="cat-name">${name}</p>
//       <img class="div-picture" src="${image}" alt="${name}" />
//       <p class="cat-temp">${temperament}</p>
//       <p class="cat-descr">${description}</p>
//     </div>
//   `
//     )
//     .join('');
// }

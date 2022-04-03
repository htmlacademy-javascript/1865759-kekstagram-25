import {EFFECTS} from './data.js';

const imageUploadPreview = document.querySelector('.img-upload__preview img');
const effectsItems = document.querySelectorAll('.effects__item');
const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const fieldSetEffect = document.querySelector('.img-upload__effect-level');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => (Number.isInteger(value)) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

const resetFilter = () => {
  effectLevelSlider.classList.add('hidden');
  fieldSetEffect.classList.add('hidden');
  effectLevelValue.value = 0;
  imageUploadPreview.class = '';
  effectsList.querySelector('#effect-none').checked = true;
};

effectLevelSlider.noUiSlider.on('update', () => {
  const selectedFilter = effectsList.querySelector('input:checked').id;
  const sliderValue = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  imageUploadPreview.style.filter = `${EFFECTS[selectedFilter].filter}(${sliderValue}${EFFECTS[selectedFilter].unit})`;
});

effectsItems.forEach((efectItem) => {
  efectItem.addEventListener('click',() => {
    const typeEffect = efectItem.querySelector('input').id;
    if (EFFECTS[typeEffect].filter !== 'none'){
      imageUploadPreview.classList = EFFECTS[typeEffect].class;
      effectLevelSlider.noUiSlider.updateOptions(EFFECTS[typeEffect].sliderOptions);
      effectLevelSlider.classList.remove('hidden');
      fieldSetEffect.classList.remove('hidden');
    }
    else{
      resetFilter();
    }
  });
});

export{ resetFilter };

import {SCALE_MAX, SCALE_MIN} from './data.js';

const imagePreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlMinus = document.querySelector('.scale__control--smaller');
const scaleControlPlus = document.querySelector('.scale__control--bigger');

const setScale = (scale) => {
  scaleControlValue.value = `${scale}%`;
  imagePreview.style.transform = `scale(${scale/100})`;
};

const resetScale = () => {
  setScale(SCALE_MAX);
};

scaleControlPlus.addEventListener('click', () => {
  const scale = parseInt(scaleControlValue.value, 10) < SCALE_MAX ? parseInt(scaleControlValue.value, 10)+ SCALE_MIN : SCALE_MAX;
  setScale(scale);
});

scaleControlMinus.addEventListener('click', () => {
  const scale = parseInt(scaleControlValue.value, 10) > SCALE_MIN ? parseInt(scaleControlValue.value, 10)- SCALE_MIN : SCALE_MIN;
  setScale(scale);
});

export { resetScale };

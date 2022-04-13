const SCALE_MAX = 100;
const SCALE_MIN = 25;

const EFFECTS = {
  'effect-none' :{
    class:'',
    filter:'none',
    unit: '',
    sliderOptions: {
      range: {
        min: 0,
        max: 0
      },
      start: 0,
      step: 0
    }},
  'effect-chrome':{
    class:'effects__preview--chrome',
    filter:'grayscale',
    unit: '',
    sliderOptions: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    }},
  'effect-sepia':{
    class:'effects__preview--sepia',
    filter:'sepia',
    unit: '',
    sliderOptions: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    }},
  'effect-marvin':{
    class:'effects__preview--marvin',
    filter:'invert',
    unit: '%',
    sliderOptions: {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    }},
  'effect-phobos':{
    class:'effects__preview--phobos',
    filter:'blur',
    unit: 'px',
    sliderOptions: {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    }},
  'effect-heat':{
    class:'effects__preview--heat',
    filter:'brightness',
    unit: '',
    sliderOptions: {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1
    }},
};

const RERENDER_DELAY = 500;

export {SCALE_MAX, SCALE_MIN, EFFECTS, RERENDER_DELAY};

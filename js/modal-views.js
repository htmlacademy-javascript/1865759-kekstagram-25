const openModal = (onEscKeydownHandler,viewerSection) => {
  document.body.classList.add('modal-open');
  viewerSection.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydownHandler);
};

const closeModal = (onEscKeydownHandler,viewerSection) => {
  document.body.classList.remove('modal-open');
  viewerSection.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeydownHandler);
};

export{openModal, closeModal};

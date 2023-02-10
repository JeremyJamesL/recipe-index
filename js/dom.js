const addArea =  document.querySelector('.add');
const overlay =  document.querySelector('.overlay');


export const openModal = () => {
    addArea.classList.add('show');
    overlay.classList.add('show');
}

export const closeModal = () => {
    addArea.classList.remove('show');
    overlay.classList.remove('show');
}


console.log('it works no jutsu!');

const cardButtons = document.querySelectorAll('.card button');

function handleCardButtonClick() {
    
    //const outerModal = document.querySelector('.modal-outer');
    //outerModal.classList.add('open');
};

cardButtons.forEach(button => button.addEventListener('click', handleCardButtonClick));


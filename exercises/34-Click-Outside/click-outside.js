console.log('it works no jutsu!'); //this line checks to see if the html + css are properly linked

const cardButtons = document.querySelectorAll('.card button'); // select the buttons on the cards

const modalInner = document.querySelector('.modal-inner'); // select the modal-inner html element

const modalOuter = document.querySelector('.modal-outer'); // select the modal-outer html element

function handleCardButtonClick(event) { // function to handle the button click. Setting the event param allows us to collect information about the event
    const button = event.currentTarget; // scoped variable that anchors the event.currentTarget for the rest of the variables
    const card = button.closest('.card'); // the .closest() method looks "up" the DOM tree for the html element that matches the argument provided
    // console.log(card);

    //Grab the img src
    const imgSrc = card.querySelector('img').src; // .src (an attribute) can be appeneded; didn't know this was a thing
    const desc = card.dataset.description; //`.dataset` allows grabbing a custom data attribute from an html element
    const name = card.querySelector('h2').textContent; // 2nd example of grabbing a standard attribute from an html element
    console.log(desc);
    //Populate modal with info
    modalInner.innerHTML = `
        <img height='600' width="600" src="${imgSrc.replace('200', '600')}" alt="${name}"> 
        <p>${desc}</p> 
    `; // innerHTNML is an attribute that sets the innerHTML of modalInner to whatever is assigned to innerHTML
    
    //Show the modal
    modalOuter.classList.add('open'); // this line adds the .open class to modalOuter, making it visible
};

cardButtons.forEach(button => button.addEventListener('click', handleCardButtonClick)); // this allows us to loop over each button and add the eventlistener
//it's worth noting that the forEach() method is called on the cardButtons variable we defined earlier

function closeModal() {
    modalOuter.classList.remove('open'); // this function removes the `.open` class from the the modalOuter element, making it invisible
}

//Click Outside Technique
// Click Outside technique puts an event listener on a parent element that listens for 
// a click event, and runs the code in the block when the click event fires

modalOuter.addEventListener('click', function (e) {
    const isOutside = !e.target.closest('.modal-inner') //this is a function expression looking for the closest element with the modal-inner class relative to the target of the event (e)
    console.log(isOutside); // the above statement says, "to be true, the target of the click event must not have an element with the modal-inner class in the DOM tree. if it does have that element, return false"

    if (isOutside) { // this effective sets "isOutside", to "true"
        closeModal(); // if the condition is true, execute this function, which removes the open class from modalOuter
    };
});

window.addEventListener('keydown', (event) => { // this function utilizes the `keydown` event
    console.log(event);
    if (event.key === 'Escape') { // if the key registered to keydown is the ESC key, execute the stuff in the proceeding block
        closeModal(); // is the function that removes the open class from modalOuter
    };
});
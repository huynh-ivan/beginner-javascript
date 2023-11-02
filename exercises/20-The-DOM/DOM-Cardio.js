// Make a div
const div = document.createElement('div');

// add a class of wrapper to it
div.classList.add('wrapper');

// put it into the body
document.body.appendChild(div);

// make an unordered list
// add three list items with the words "one, two, three" in them
// put that list into the above wrapper

const uList = `
    <ul>
      <li>one</li>
      <li>two</li>
      <li>three</li>
    <ul>`;

div.innerHTML = uList; // innerHTML is a method that takes one method and translates it into HTML// create an image

console.log(div);

// create an image
const img = document.createElement('img')
// set the source to an image
img.src = 'http://www.cutenessoverflow.com/wp-content/uploads/2014/02/Little-Cute-Puppy-1600x1200.jpg';
// set the width to 250
img.width = 250;
// add a class of cute
img.classList.add('cute');
// add an alt of Cute Puppy
img.alt = 'Cute Pupper!'
// Append that image to the wrapper
div.appendChild(img);

// with HTML string, make a div, with two paragraphs inside of it
// put this div before the unordered list from above
// add a class to the second paragraph called warning
// remove the first paragraph

const div2 = `<div class = myDiv>
        <p>P1</p>
        <p>P2</p>
</div>`;

const uListElement = div.querySelector('ul');

//uListElement.insertAdjacentElement('beforebegin',div2);
uListElement.insertAdjacentHTML('beforebegin',div2);
console.log(uListElement);

const myDiv = div.querySelector('.myDiv');
console.log(myDiv.children[1]);
myDiv.children[1].classList.add('warning');

myDiv.firstElementChild.remove();


// create a function called generatePlayerCard that takes in three arguments: name, age, and height
// have that function return html that looks like this:
// <div class="playerCard">
//   <h2>NAME — AGE</h2>
//   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
// </div>

function generatePlayerCard(name, age, height) {
    const html = `
        <div class="playerCard">
            <h2>${name} - ${age}</h2>
            <p>Their height is ${height} cm and ${age} years old. In Dog years this person would be ${age * 7}. That would be a tall dog!</p>
            <button class="delete" type="button">&times Delete</button>
        </div>`;
    return html;

};

// make a new div with a class of cards

const cards = document.createElement('div');
cards.classList.add('cards');

// make 4 player cards using generatePlayerCard

let cardsHTML = generatePlayerCard('ivan', 17, 180);
cardsHTML += generatePlayerCard('conster', 18, 115);
cardsHTML += generatePlayerCard('chenpai', 18, 115);
cardsHTML += generatePlayerCard('corndog', 18, 115);

console.log(cardsHTML);
cards.innerHTML = cardsHTML;

div.insertAdjacentElement("beforebegin", cards);
// append those cards to the div
// put the div into the DOM just before the wrapper element
// Bonus, put a delete Button on each card so when you click it, the whole card is removed

// select all the buttons!
const buttons = document.querySelectorAll('.delete');
console.log(buttons);
// make out delete function
function deleteButton(event) {
    const clickedButton = event.currentTarget;
    //clickedButton.parentElement.remove();
    clickedButton.closest('.playerCard').remove();
    console.log(event.currentTarget);
    console.log("delete!")
};

// loop over them and attach a listener
buttons.forEach(button => button.addEventListener('click', deleteButton));
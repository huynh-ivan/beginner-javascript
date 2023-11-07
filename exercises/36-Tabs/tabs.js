//console.log('ya ya wes we get it.. IT WORKS!');

const tabs = document.querySelector('.tabs'); // select the tabs container
const tabButtons = tabs.querySelectorAll('[role = "tab"]'); // select the buttons within the tab .div where the role attribute is set to `tab`
const tabPanels = Array.from(tabs.querySelectorAll('[role = "tabpanel"]')); //select the divs where the attribute is set to `tabpanel` then convert the selected nodelist into an array

function handleTabClick(e) {
    //Hide tabpanels
    tabPanels.forEach(panel => { //it would be possible to write this as single line function but it's less readable, esp w/ implicit returns
        panel.hidden = true
    })
    //mark tabs as unselected
    tabButtons.forEach(tab => {
        tab.setAttribute('aria-selected', false);
    })
    //mark the clicked tab is selected
    e.currentTarget.setAttribute('aria-selected', true); //some attributes like aria-* can only be accessed using the setAttribute method
    //Also to note, as used, e.currentTarget would be set to tabButtons (see line 37)

    //find associateds tabpanel and show it
    const { id } = e.currentTarget; // this is an exmaple of destructuring
    //In this case, we are creating an ID variable from the ID attribute of the currentTarget of the event object
    
    /* Method 1
    const tabPanel = document.querySelector(`[aria-labelledby = ${id}]`); // select the element where the id is equal to the interpolated id variable that was destructured from the e.currentTarget
    tabPanel.hidden = false;
    */

    // Method 2: find() method in the array of panels

    const tabPanel = tabPanels.find(panel => panel.getAttribute('aria-labelledby') === id); 
    // the above line says: within the tabPanels nodelist, find the panel where the attribute `aria-labelledby` is an exact match to the destructured ID variable 
    tabPanel.hidden = false;
    console.log(tabPanel);
} 

tabButtons.forEach(button => button.addEventListener('click', handleTabClick));

// As a reminder:
// target = element that was interacted with (i.e. clicked)
// currentTarget = thing element that the event listener is attached to

/*Additional note:
As a learning best practice, everytime you declare a variable or a function
you can console.log() that declared variable/function to make sure you've 
selected it properly. Note: if the function isn't set to return something,
the return value will be undefined.

Moreover, you can write a function like the below, and pass it to an eventlistener
as a callback function to really understand what exactly you're interacting with.

function(e) {
    console.log(e.target);
    console.log(e.currentTarget);
} 
*/
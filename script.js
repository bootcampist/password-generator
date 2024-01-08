// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

//Global Variables
let user = {
              length: 8,
              lowercase: false,
              uppercase: false,
              numeric: false,
              special: false,
}

let pass = false;
let characterArray = [
                      lowerCasedCharacters,
                      upperCasedCharacters,
                      numericCharacters, 
                      specialCharacters
                    ];
let selectedCharacterTypes = [];
let randomPassword="";

function initialise (){
  randomPassword = "";
  selectedCharacterTypes = [];
};

// Function to prompt user for password options
function getPasswordOptions(object) {
   // * Present a series of prompts for password criteria
  //   * Length of password
    object.length = parseInt(prompt('Choose a length for your password. Enter a number between 8 and 128.'));
    console.log(object.length);
  //     * At least 8 characters but no more than 128.
    switch (object.length >= 8 && object.length <= 128){
      case true:
        characterTypes(user);
        break;
      default:
       
      //Confirm and cancel if false;
        alert('You have not entered a number between 8 and 128. Please make sure you enter a number only.');
        getPasswordOptions(user);
      break;
    };
};

function characterTypes(object){
  //   * Character types
  alert('Choose the character types for your password. Make sure at least one character type is selected.');
  //     * Lowercase
    object.lowercase = confirm(`Include ${Object.keys(object)[1]} characters`);
  //     * Uppercase
    object.uppercase = confirm(`Include ${Object.keys(object)[2]} characters`);
  //     * Numeric
    object.numeric = confirm(`Include ${Object.keys(object)[3]} characters`);
  //     * Special characters ($@%&*, etc)
    object.special = confirm(`Include ${Object.keys(object)[4]} characters`);
  
   // * Code should validate for each input and at least one character type should be selected
  let passArray = Object.values(user);
  passArray = passArray.slice(1);

  switch (passArray.includes(true)){
    case true:
        pass = true;
        console.log(`selected: ${selectedCharacterTypes}`);
        console.log(`passArray: ${passArray}`);
      
        for (let i=0; i < passArray.length; i++) {
          if (passArray[i]){
              selectedCharacterTypes = selectedCharacterTypes.concat(characterArray[i]);
          };
        };
        console.log(`selected: ${selectedCharacterTypes}`);
        getRandom(selectedCharacterTypes);
        break;
    default: 
        alert('You have not chosen a character type. Try again.');
        characterTypes(user);
        break;
  };
};

// Function for getting a random element from an array
function getRandom(arr) {
// * Once prompts are answered then the password should be generated and displayed in an alert or written to the page

console.log(arr);
for (let i=0; i<user.length; i++){
  let ranNum = Math.floor(Math.random()*arr.length);

  randomPassword += arr[ranNum];
};

console.log('You called?');
console.log(randomPassword);
}

// Function to generate password with user input
function generatePassword() {
 // * Generate a password when the button is clicked
 initialise();
 getPasswordOptions(user);
 return randomPassword;
 
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
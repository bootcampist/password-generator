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

let userLength = 0;
let userLow = false;
let userUpp = false;
let userNum = false;
let userSpec = false;
const form = document.getElementById('card-form');
const card = document.querySelector('.card-body');
const numberAlert = document.getElementById('number-alert');
const characterAlert = document.getElementById('character-alert');

let pass = true;
let characterArray = [
                      lowerCasedCharacters,
                      upperCasedCharacters,
                      numericCharacters, 
                      specialCharacters
                    ];
let selectedCharacterTypes = [];
let randomPassword="";
let guaranteedCharacters = [];

function initialise (){
  randomPassword = "";
  selectedCharacterTypes = [];
  guaranteedCharacters = [];
  card.style.display = 'none';
  form.style.display = 'block';
  pass = true;
  console.log('initialised.' + randomPassword);
};

// Function to prompt user for password options
function getPasswordOptions(object) {
   // * Present a series of prompts for password criteria
  //   * Length of password
userLength = parseInt(document.getElementById('form-number').value);


    console.log(userLength);
    console.log(userLow);
    console.log(userUpp);
    console.log(userNum);
    console.log(userSpec);
  //     * At least 8 characters but no more than 128.
    switch (userLength >= 8 && userLength <= 128){
      case true:
        numberAlert.style.display = 'none';
        object.length = userLength;
        console.log(`Length: ${object.length}`);
        characterTypes(user);
        break;
      default:
        numberAlert.style.display = 'block';
      break;
    };
};

function characterTypes(object){
  //   * Character types
  //     * Lowercase
    object.lowercase = document.getElementById('value1').checked;
  //     * Uppercase
    object.uppercase = document.getElementById('value2').checked;
  //     * Numeric
    object.numeric = document.getElementById('value3').checked;
  //     * Special characters ($@%&*, etc)
    object.special = document.getElementById('value4').checked;

    console.log(`Lowercase: ${object.lowercase}`);
    console.log(`Uppercase: ${object.uppercase}`);
    console.log(`Numeric: ${object.numeric}`);
    console.log(`Special: ${object.special}`);
  
   // * Code should validate for each input and at least one character type should be selected
  let passArray = Object.values(user);
  passArray = passArray.slice(1);

  switch (passArray.includes(true)){
    case true:
        characterAlert.style.display = 'none';
        console.log(`selected: ${selectedCharacterTypes}`);
        console.log(`passArray: ${passArray}`);
      
        for (let i=0; i < passArray.length; i++) {
          if (passArray[i]){
              selectedCharacterTypes = selectedCharacterTypes.concat(characterArray[i]);
              let currentArray = characterArray[i];
              let num = Math.floor(Math.random()*currentArray.length);
              let includeCharacter = currentArray[num];
              guaranteedCharacters.push(includeCharacter);
              console.log(`Guaranteed characters: ${guaranteedCharacters}`);
          };
        };
        console.log(`selected: ${selectedCharacterTypes}`);
        getRandom(selectedCharacterTypes);
        form.style.display = 'none';
        card.style.display = 'block';    
        break;
    default:
        characterAlert.style.display = 'block';
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
console.log(randomPassword);
pass = false;
}

// Function to generate password with user input
function generatePassword() {
 // * Generate a password when the button is clicked
 if (pass){
  getPasswordOptions(user);
  return randomPassword;
 } else {
 initialise();
 }
 
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
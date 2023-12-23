// Array of special characters to be included in password

const specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];

// Array of numeric characters to be included in password
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Array of uppercase characters to be included in password
const upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//Initialising randomPassword variable which will eventually hold the completed password that is generated
let randomPassword = [];

//Function to get required password length & ensuring that user input is correct
function getLength() {
  
  let passwordLength = prompt('Please state how many characters long the password should be (At least 8 characters but no more than 128.)');
  //while loop checks: 
  // The first 2 arguments check if the PasswordLength input is equal to or greater than 8 or equal to or less than 128 - anything outside this returns false incl letters
  // The last argument checks for floating points - if PasswordLength remainder = 0 then its a whole number
  while (!(passwordLength > 7) || !(passwordLength < 129) || !(passwordLength % 1 === 0)) {
    alert('Incorrect submission. Please try again.');
    return getLength();
  };
  return passwordLength;
};

//Function to get character requirements ensuring that at least one is provided
function getRequiredCharacters() {
  let includeLowercase = confirm('Should the password include lowercase characters? \n\nClick "OK" for yes or "Cancel" for no');
  let includeUppercase = confirm('Should the password include uppercase characters? \n\nClick "OK" for yes or "Cancel" for no');
  let includeNumeric = confirm('Should the password include numerical characters? \n\nClick "OK" for yes or "Cancel" for no');
  let includeSpecialChars = confirm('Should the password include Special characters ($@%&*, etc.) \n\nClick "OK" for yes or "Cancel" for no');

  //while loop checks if all confirms are false and if so asks the user to provide at least one option
  while (!includeLowercase && !includeUppercase && !includeNumeric && !includeSpecialChars) {
    alert('Incorrect submission. You must include at least one character option');
    return getRequiredCharacters();
  };

  let charactersRequired = [];
  if (includeLowercase) {
    randomPassword.push(getRandom(lowerCasedCharacters));
    charactersRequired = charactersRequired.concat(lowerCasedCharacters);
  };

  if (includeUppercase) {
    randomPassword.push(getRandom(upperCasedCharacters));
    charactersRequired = charactersRequired.concat(upperCasedCharacters);
  };

  if (includeNumeric) {
    randomPassword.push(getRandom(numericCharacters));
    charactersRequired = charactersRequired.concat(numericCharacters);
  };

  if (includeSpecialChars) {
    randomPassword.push(getRandom(specialCharacters));
    charactersRequired = charactersRequired.concat(specialCharacters);
  };
  return charactersRequired;
};

// Function for getting a random element from an array
function getRandom(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

// Function to generate password with user input
function generatePassword() {
  randomPassword = []; //resets randomPassword to empty an array if generateBtn is clicked again

  //Use func to get correct input for password length
  let passwordLength = getLength();
  
  //Use func to get password criteria from user
  let charactersRequired = getRequiredCharacters()

  //Check how many more random characters are needed to reach required password length and add that amount of randomly selected chars to the password
  let remainingCharsNeeded = passwordLength - randomPassword.length;
  for (let i = 0; i < remainingCharsNeeded; i++) {
    randomPassword.push(getRandom(charactersRequired));
  };

  //turn randomPassword array into a string
  randomPassword = randomPassword.join('');
  return randomPassword;
};

// Get references to the #generate element
let generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector('#password');

  passwordText.value = password;
};

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
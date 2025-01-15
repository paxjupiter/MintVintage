
/*
$(document).ready(function() {
    console.log("Shake registration div called");
    $("#registrationDiv").effect("shake", { times: 3, distance: 5 }, 500);
});
*/

function showRegistration(){
    var regDiv = document.getElementById("registrationDiv");
    regDiv.style.display = "block";
}//end showRegistration
//$(document).ready(function() {
function validateForm() {
    
    //DECLARE VARIABLES - form field values

    var username = document.forms["registrationForm"]["username"].value;
    var password = document.forms["registrationForm"]["password"].value;
    var confirmPassword = document.forms["registrationForm"]["confirmPassword"].value;
    var email = document.forms["registrationForm"]["email"].value;
    var phone = document.forms["registrationForm"]["phone"].value;

    //DEFINE REGEX - email, phone, password patterns
    
    //valid email has: 
        //alphanumeric characters or ".","_","-"
        //followed by "@"
        //followed by alphanumeric characters or ".", "-"
        //followed by alpha, 2-6 characters in length)

    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    //valid phone number has:
        //10 digits, not separated by parethesis, whitespace, or hyphens

    var phonePattern = /^\d{10}$/;

    //valid password has:
        //at least one uppercase letter
        //at least one lowercase letter
        //at least one number
        //at least one one symbol

    var hasUpperCase = /[A-Z]/;
    var hasLowerCase = /[a-z]/;
    var hasNumbers = /\d/;
    var hasNonalphas = /\W/;

    //USERNAME must not be blank

    if (username == "") {
        alert("Please enter a username.");
        return false;
    }

    //PASSWORD must not be blank

    if (password == "") {
        alert("You need a password!");
        return false;
    }

    //PASSWORD must be at least 8 characters

    if (password.length < 8){
        alert("Password must be at least 8 characters.");
        return false;
    }

    //PASSWORD must meet minimum strength requirements

    if (!hasUpperCase.test(password)) {
        alert("Password must have at least one uppercase letter.");
        return false;
    }
    
    if (!hasLowerCase.test(password)) {
        alert("Password must have at least one lowercase letter.");
        return false;
    }
        
    if (!hasNumbers.test(password)) {
        alert("Password must have at least one Number.");
        return false;
    }

    if (!hasNonalphas.test(password)) {
        alert("Password must have at least one symbol.");
        return false;
    }

    //CONFIRM PASSWORD must not be blank

    if (confirmPassword == "") {
        alert("Please confirm your password!");
        return false;
    }

    //PASSWORD and CONFIRM PASSWORD must match

    if (password != confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    //EMAIL must not be blank
    if (email == "") {
        alert("You need to enter an email address!");
        return false;
    }

    //EMAIL must match regex pattern
    if (!emailPattern.test(email)) {
        alert("The email you entered is not a valid email address.");
        return false;
    }

    //PHONE NUMBER must not be blank
    if (phone == "") {
        alert("Phone number is required!");
        return false;
    }

    //PHONE NUMBER must match regex pattern
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number (no spaces or symbols).");
        return false;
    }

    return true;
}//end validateForm     
//});

//REGISTRATION FORM SUBMISSION
function submitForm(){

    //DECLARE LOCAL VARIABLES - form field values for encoding
    var username = document.forms["registrationForm"]["username"].value;
    var email = document.forms["registrationForm"]["email"].value;
    var phone = document.forms["registrationForm"]["phone"].value;
    var queryString;

    //CALL validateForm
    if (validateForm(document.forms["registrationForm"])){

        //ENCODE DATA - this is what shows up in the URL
        //? indicates start of string
        //encoding values are "=" and "&"
        queryString = `?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;

        //NAVIGATES TO RegistrationSubmit.html and PASSES queryString TO RegistrationSubmit.html 
        //RegistrationSubmit.html WILL CALL getQueryParams FUNCTION
        //Use this to pass values from one page to another

        window.open(`/MintVintage/pages/RegistrationSubmit.html${queryString}`, '_blank');

    }

        //PREVENT FORM FROM SUBMITTING IF INPUT NOT VALID
        return false;

}//end submitForm

//RETREIVE FORM DETAILS AND DECODE
function getQueryParams() {
    var params = {}; //final array of decoded substrings
    var queryString; //passed from submitForm()
    var pairs; //substring split at "&"
    var pair; //substring split at "="
    var i;

    //window.location.search FINDS URL AND ASSIGNS queryString WITH ENCODED VALUES THAT WERE PASSED (as substring at location 1)
    queryString = window.location.search.substring(1);

    //SPLIT STRING at "&" (first split for decoding)
    pairs = queryString.split("&");

    //FOR LOOP navigates the rest of the queryString array and splits again at "="
    for (i = 0; i < pairs.length; i++) {
        pair = pairs[i].split("=");
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    return params;
}//end getQueryParams

//DISPLAY FORM RESULTS 
//ONLOAD FUNCTION - supercedes all other javaScript
//The "onload" call is embedded in the HTML 

function displayFormResults() {
        
    //DECLARE LOCAL VARIABLE
    var params = getQueryParams();

    //DISPLAY decoded params
    document.getElementById("displayUsername").innerText = params["username"];
    document.getElementById("displayEmail").innerText = params["email"];
    document.getElementById("displayPhone").innerText = params["phone"];
}
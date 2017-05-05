jQuery(document).ready(function ($) {

    //Peform the register button click event
    document.getElementById("btnRegister").onclick = function () { Register() };

    //Derive the user key
    //then trigger the submit button to send the user details to the server
    function Register() {
        var password = document.getElementById('Password').value;
        var salt = document.getElementById('Salt').value;
        var iterationCount = document.getElementById('IterationCount').value;
        var mypbkdf2 = new PBKDF2(password, salt, iterationCount, 16);
        var status_callback = function (percent_done) {

        };
        var result_callback = function (key) {
            document.getElementById('UserKey').value = key;
            document.getElementById('reg').click();
        };
        mypbkdf2.deriveKey(status_callback, result_callback);   
    }
});
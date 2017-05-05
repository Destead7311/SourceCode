function validateform() {
    var isValid = true;
    document.getElementById("status").innerText = "";
    var uname = document.getElementById("UserName").value;
    var pwd = document.getElementById("Password").value;
    var salt = document.getElementById("Salt").value;
    var iterationcount = document.getElementById("IterationCount").value;
    var confirmpwd = document.getElementById("ConfirmPassword").value;

    var chkpwd = /^(?=.*\d)(?=.*[a-z])(?=.*[a-z])/;

    if (iterationcount == null || iterationcount == "")
    {
        document.getElementById("status").innerText += "\n please enter an iteration count";
        document.getElementById("IterationCount").focus()
        document.getElementById("IterationCount").value = "";

        isValid = false;
    }

    if (uname == null || uname == "") {

        document.getElementById("status").innerText += "\n please enter a new user name";
        document.getElementById("UserName").focus()
        document.getElementById("UserName").value = "";
        
        isValid = false;
    }
    else if (uname.length < 4) {
        document.getElementById("status").innerText += "\n user name should be atleast 4 characters long";
        document.getElementById("UserName").focus()
        document.getElementById("UserName").value = "";
        isValid = false;
    }
    if (pwd == null || pwd == "") {
        document.getElementById("status").innerText += "\n please enter a new password";
        document.getElementById("Password").focus()
        isValid = false;
    }
    if (pwd.length < 6 || pwd.length > 18) {
        document.getElementById("status").innerText  += "\n password should be between 6 to 18 characters long";
        document.getElementById("Password").focus()
        document.getElementById("Password").value = "";
        isValid = false;
    }
    else if (!pwd.match(chkpwd)) {
        document.getElementById("status").innerText  += "\n Password must have atleast one upper case, one lower case and one number";
        document.getElementById("Password").focus()
        document.getElementById("Password").value = "";
        isValid = false;
    }
    if (salt == null || salt == "") {
        document.getElementById("status").innerText   += "\n please enter a salt";
        document.getElementById("Salt").focus()
        document.getElementById("Salt").value = "";
        isValid = false;
    }
    else if (salt.length < 6) {
        document.getElementById("status").innerText += "\n salt should be atleast 6 characters long";
        document.getElementById("Salt").focus()
        document.getElementById("Salt").value = "";

        isValid = false;
    }

    if (confirmpwd == null || confirmpwd == "" || confirmpwd != pwd) {
        document.getElementById("status").innerText += "\n Confirm Password should match Password";
        document.getElementById("ConfirmPassword").focus();
        document.getElementById("ConfirmPassword").value = "";
        
        isValid = false;
    }
    if(isValid)
        getUserKey();
    
    return isValid;

}

//Derive the user key from key derivation function
getUserKey = function DeriveUserKey() {
    var password = document.getElementById('Password').value;
    var salt = document.getElementById('Salt').value;
    var iterationcount = document.getElementById('IterationCount').value;
    
    var mypbkdf2 = new PBKDF2(password, salt, iterationcount, 16);
    var status_callback = function (percent_done) {

    };
    var result_login_callback = function (key) {
        saveUserDetails(key);
    };
    mypbkdf2.deriveKey(status_callback, result_login_callback);
}

saveUserDetails = function SaveUserDetails(key) {
    username = document.getElementById('UserName').value;
    salt = document.getElementById('Salt').value;
    iterationcount = document.getElementById('IterationCount').value;
    $.ajax({
        type: "GET",
        url: "http://localhost/ZKP/Account/Register.aspx/SaveUserDetails",
        data: { 'username': JSON.stringify(username), 'userkey': JSON.stringify(key), 'salt': JSON.stringify(salt), 'iterationcount': JSON.stringify(iterationcount) },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            document.getElementById("status").innerText += "\n" + data.d;
            reset();
        },
        error: function (response) {
            document.getElementById("status").innerText += "\n" + "Registration is not successful";
            reset();
        }
        
    });
}

function reset()
{
    document.getElementById("UserName").value = "";
    document.getElementById("Salt").value = "";
    document.getElementById("Password").value = "";
    document.getElementById("IterationCount").value = "";
    document.getElementById("ConfirmPassword").value = "";

    document.getElementById("UserName").placeholder = "select a username";
    document.getElementById("Salt").placeholder = "select a salt";
    document.getElementById("Password").placeholder = "enter password";
    document.getElementById("IterationCount").placeholder = "select an iteration count";
    document.getElementById("ConfirmPassword").placeholder = "confirm password";

}

document.getElementById('register').addEventListener('click', validateform);

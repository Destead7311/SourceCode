jQuery(document).ready(function ($) {
    var user = this;
    user.initialValue = '7583945720389475';

    // Perform login click functions
    document.getElementById("btnLogin").onclick = function () { getUserDetails(); getUserKey(); };
    

    //get user details from the server
    getUserDetails = function GetUserDetails()
    {
        username = document.getElementById('UserName').value;
        $.ajax({
            type: "GET",
            url: "Login.aspx/GetUserDetails",
            data: { 'username': JSON.stringify(username) },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                
                user.p = data.d.P;
                user.g = data.d.G;
                user.iterationCount = data.d.IterationCount;
                user.salt = data.d.Salt;

                user.x = GenerateRandom(0, 3435973);
                user.gx = ComputeModularExp(user.g, user.x, user.p);
                

                console.log("x:" + user.x);
                console.log("gx: " + user.gx);
                console.log("p:" + user.x);
                console.log("g: " + user.gx);
                console.log("iterationCount: " + user.iterationCount);
                
            },
            error: function (response)
            {
                alert("Login is not successful");
            }
        });
    }

    //Derive the user key from key derivation function
    getUserKey = function DeriveUserKey() {
        var password = document.getElementById('Password').value;
        var mypbkdf2 = new PBKDF2(password, user.salt, user.iterationCount, 16);
        var status_callback = function (percent_done) {

        };
        var result_login_callback = function (key) {
            user.userkey = key;
            Encrypt(key, user.gx);
        };
        mypbkdf2.deriveKey(status_callback, result_login_callback);
    }

    //Compute the modular exp
    function ComputeModularExp(base, exp, mod)
    {
        var baseBigInt = bigInt(base);
        var expBigInt = bigInt(exp);
        var result = baseBigInt.modPow(expBigInt, mod);

        return result;
    }

    //Generate random number
    function GenerateRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //Encrypt data=gx using the userKey
    //then call proverstate0 to send the result encGx to the server (verifierstate0) 
    function Encrypt(userkey, data)
    {
        var key = CryptoJS.enc.Utf8.parse(userkey);
        console.log("key: " + key);
        var iv = CryptoJS.enc.Utf8.parse(user.initialValue);
        console.log("iv: " + iv);

        var encGx = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, { iv: iv , mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7, keySize:256, blockSize:128 });
        console.log("encGx: " + encGx.valueOf().toString());

        ProverState0(encGx.valueOf().toString(), userkey);
    }

    //send the encGx to the server (prover) 
    //get the first round results from the server - authVerifier, encGy
    //the call decrypt to get gy from encGy
    function ProverState0(encryptedData, userkey)
    {
            uname = document.getElementById('UserName').value;
            $.ajax({
                type: "GET",
                url: "Login.aspx/VerifierState0",
                data: { 'encryptedData': JSON.stringify(encryptedData), 'userName': JSON.stringify(uname) },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (data) {
                    var authVerifier = data.d.AuthVerifier;
                    var encGy = data.d.EncryptedGy;

                    Decrypt(authVerifier, encGy, userkey);
                   
                },
                error: function (response) {
                    alert("Login is not successful");
                }
            });
    }

    //Decrypt encyGy to get gy 
    //Call proverstate1 to send data to verifierstate1
    //Hash sessionkey || iteration count and verify the result with the sent by the proverstate0
    function Decrypt(authVerifier, data, userkey) {

        var key = CryptoJS.enc.Utf8.parse(userkey);
        var iv = CryptoJS.enc.Utf8.parse(user.initialValue); 
        console.log("encGy: " + data);

        var decryptedData = CryptoJS.AES.decrypt(data, key, {
            iv: iv, mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7, keySize: 256, blockSize: 128
        });
        console.log("gy: " + decryptedData.toString(CryptoJS.enc.Utf8));
        user.gy = decryptedData.toString(CryptoJS.enc.Utf8);
        user.gxy = ComputeModularExp(user.gy, user.x, user.p);
        user.sessionKey = user.gx.toString().concat(user.gy.toString()).toString().concat(user.gxy.toString());
        user.hashedString0 = SHA256(user.sessionKey.toString().concat(user.iterationCount));
        console.log("hasedstring0: " + user.hashedString0);
        //validate the outcome of verifier0 before continue the protocol
        if (user.hashedString0 == authVerifier)
            ProverState1();
    }

    //send the Hashing of gx || gy || gxy || iteration_count + 1
    //where gx || gy || gxy = sessionKey
    function ProverState1() {
        var data = SHA256(user.sessionKey.toString().concat(user.iterationCount + 1));
        $.ajax({
            type: "GET",
            url: "Login.aspx/VerifierState1",
            data: { 'hashedData': JSON.stringify(data) },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (response) {
                if (response.d) {
                    alert("Login is successful");
                }
                else {
                    alert("Login is not successful");
                }

            },
            error: function (response) {
                alert(response.responseText);

            }
        });
    }
});
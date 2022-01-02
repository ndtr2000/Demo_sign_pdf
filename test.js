<html>

<head>
    <title>Sample Application for RSA signing in JavaScript</title>
    <script language="JavaScript" type="text/javascript" src="../jsrsasign-all-min.js"></script>
    <script language="JavaScript" type="text/javascript">
        function doSign() {
            var rsa = new RSAKey();
            rsa.readPrivateKeyFromPEMString(document.form1.prvkey1.value);
            var hashAlg = document.form1.hashalg.value;
            var hSig = rsa.sign(document.form1.msgsigned.value, hashAlg);
            document.form1.siggenerated.value = linebrk(hSig, 64);
        }

        function doVerify() {
            var sMsg = document.form1.msgverified.value;
            var hSig = document.form1.sigverified.value;
            hSig = hSig.replace(/[^0-9a-f]+/g, "");

            var pubKey = KEYUTIL.getKey(document.form1.cert.value);
            var isValid = pubKey.verify(sMsg, hSig);

            // display verification result
            if (isValid) {
                _displayStatus("valid");
            } else {
                _displayStatus("invalid");
            }
        }

        function copyMsgAndSig() {
            _displayStatus("reset");
            document.form1.msgverified.value = document.form1.msgsigned.value;
            document.form1.sigverified.value = document.form1.siggenerated.value;
        }

        function _displayStatus(sStatus) {
            var div1 = document.getElementById("verifyresult");
            if (sStatus == "valid") {
                div1.style.backgroundColor = "skyblue";
                div1.innerHTML = "This signature is *VALID*.";
            } else if (sStatus == "invalid") {
                div1.style.backgroundColor = "deeppink";
                div1.innerHTML = "This signature is *NOT VALID*.";
            } else {
                div1.style.backgroundColor = "yellow";
                div1.innerHTML = "Please fill values below and push [Verify this sigunature] button.";
            }
        }
    </script>
    <style type="text/css">
        TD {
            vertical-align: top
        }
    </style>
</head>

<body>
    <h1>Sample Application for RSA signing in JavaScript</h1>

    <form name="form1">
        <table border="0">
            <tr>
                <th>Signer</th>
                <th></th>
                <th>Verifier</th>
            </tr>

            <tr>
                <td>
                    PEM RSA Private Key<br/>
                    <!-- _test/z5.* for X.509v1 certificate and private key -->
                    <textarea name="prvkey1" rows="10" cols="80">
-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQDRhGF7X4A0ZVlEg594WmODVVUIiiPQs04aLmvfg8SborHss5gQ
Xu0aIdUT6nb5rTh5hD2yfpF2WIW6M8z0WxRhwicgXwi80H1aLPf6lEPPLvN29EhQ
NjBpkFkAJUbS8uuhJEeKw0cE49g80eBBF4BCqSL6PFQbP9/rByxdxEoAIQIDAQAB
AoGAA9/q3Zk6ib2GFRpKDLO/O2KMnAfR+b4XJ6zMGeoZ7Lbpi3MW0Nawk9ckVaX0
ZVGqxbSIX5Cvp/yjHHpww+QbUFrw/gCjLiiYjM9E8C3uAF5AKJ0r4GBPl4u8K4bp
bXeSxSB60/wPQFiQAJVcA5xhZVzqNuF3EjuKdHsw+dk+dPECQQDubX/lVGFgD/xY
uchz56Yc7VHX+58BUkNSewSzwJRbcueqknXRWwj97SXqpnYfKqZq78dnEF10SWsr
/NMKi+7XAkEA4PVqDv/OZAbWr4syXZNv/Mpl4r5suzYMMUD9U8B2JIRnrhmGZPzL
x23N9J4hEJ+Xh8tSKVc80jOkrvGlSv+BxwJAaTOtjA3YTV+gU7Hdza53sCnSw/8F
YLrgc6NOJtYhX9xqdevbyn1lkU0zPr8mPYg/F84m6MXixm2iuSz8HZoyzwJARi2p
aYZ5/5B2lwroqnKdZBJMGKFpUDn7Mb5hiSgocxnvMkv6NjT66Xsi3iYakJII9q8C
Ma1qZvT/cigmdbAh7wJAQNXyoizuGEltiSaBXx4H29EdXNYWDJ9SS5f070BRbAIl
dqRh3rcNvpY6BKJqFapda1DjdcncZECMizT/GMrc1w==
-----END RSA PRIVATE KEY-----
</textarea><br/> Text message to be signed.<br/>
                    <input type="text" name="msgsigned" size="82" value="aaa" /><br/>
                </td>
                <td></td>
                <td>
                    Verification Result
                    <div id="verifyresult" style="background: yellow">Please fill values below and push "Verify this sigunature" button.</div>
                </td>
            </tr>

            <tr>
                <td>
                    <select name="hashalg">
<option value="sha1">SHA1
<option value="sha256" selected>SHA256
<option value="sha512">SHA512
<option value="md5">MD5
<option value="ripemd160">RIPEMD-160
</select>
                    <input type="button" value="Sign to this message &darr;" onClick="doSign();" /><br/>
                </td>
                <td>
                    <input type="button" value="Copy &rarr;" onClick="copyMsgAndSig();" /><br/>
                </td>
                <td>
                    <input type="button" value="Verify this signature &uarr;" onClick="doVerify();" /><br/>
                </td>
            </tr>

            <tr>
                <td>
                    Generated Signature<br/>
                    <textarea name="siggenerated" rows="4" cols="80"></textarea>
                </td>
                <td>
                </td>
                <td>
                    Verifying Signature<br/>
                    <textarea name="sigverified" rows="4" cols="80">
6f7df91d8f973a0619d525c319337741130b77b21f9667dc7d1d74853b644cbe
5e6b0e84aacc2faee883d43affb811fc653b67c38203d4f206d1b838c4714b6b
2cf17cd621303c21bac96090df3883e58784a0576e501c10cdefb12b6bf887e5
48f6b07b09ae80d8416151d7dab7066d645e2eee57ac5f7af2a70ee0724c8e47
</textarea><br/> Text message to be verified.<br/>
                    <input type="text" name="msgverified" size="82" value="aaa" /><br/> Signer's Public Key Certificate.<br/>
                    <textarea name="cert" rows="10" cols="80">
-----BEGIN CERTIFICATE-----
MIIBvTCCASYCCQD55fNzc0WF7TANBgkqhkiG9w0BAQUFADAjMQswCQYDVQQGEwJK
UDEUMBIGA1UEChMLMDAtVEVTVC1SU0EwHhcNMTAwNTI4MDIwODUxWhcNMjAwNTI1
MDIwODUxWjAjMQswCQYDVQQGEwJKUDEUMBIGA1UEChMLMDAtVEVTVC1SU0EwgZ8w
DQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBANGEYXtfgDRlWUSDn3haY4NVVQiKI9Cz
Thoua9+DxJuiseyzmBBe7Roh1RPqdvmtOHmEPbJ+kXZYhbozzPRbFGHCJyBfCLzQ
fVos9/qUQ88u83b0SFA2MGmQWQAlRtLy66EkR4rDRwTj2DzR4EEXgEKpIvo8VBs/
3+sHLF3ESgAhAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAEZ6mXFFq3AzfaqWHmCy1
ARjlauYAa8ZmUFnLm0emg9dkVBJ63aEqARhtok6bDQDzSJxiLpCEF6G4b/Nv/M/M
LyhP+OoOTmETMegAVQMq71choVJyOFE5BtQa6M/lCHEOya5QUfoRF2HF9EjRF44K
3OK+u3ivTSj3zwjtpudY5Xo=
-----END CERTIFICATE-----
</textarea><br/>
                </td>
            </tr>

        </table>
    </form>

    <h3>How to sign and verify a text message (simple usage)</h3>
    <ol>
        <li>Modify the text message 'aaa' to anything you want.</li>
        <li>Choose hash algorithm for signing 'SHA1' or 'SHA256'.</li>
        <li>Push 'Sign to this message' button in the left.</li>
        <li>Push 'Copy' button in the middle to copy the message to be signed and the generated signature value to verification form in the right.</li>
        <li>Push 'Verify this message' in the right.</li>
        <li>Then you can see signature verification result in the top of right.</li>
    </ol>
    <h3>Note for signing in the left form.</h3>
    See below when you want to specify message and private key to be signed.
    <ul>
        <li>In the 'PEM RSA Private Key' text area, you can specify signer's private key. The format of the key should be PKCS#1 PEM text formatted and unencrypted RSA private key.</li>
    </ul>

    <h3>Note for signature verification in the right form.</h3>
    See below when you want to specify message, signature value and public key certificate to be verified.
    <ul>
        <li>In the 'Verifying Signature' field, you can specify any signature value to be verified. Signature value should be hexa decimal encoded 'RSASSA-PKCS1-v1_5' signature. Currently this supports 'SHA1withRSA' and 'SHA256withRSA' signature algorihtm.
            RSA key length have been tested from 512bit to 2048bit for this program.
        </li>
        <li>
            In the "Signer's Public Key Certificate" field, you can specify signer's public key certificate to be verified. The value should be PEM encoded X.509 certificate with RSA public key. X.509v1 and X.509v3 is available however X.509v2 is not supported now.
        </li>
    </ul>
    <center>
        Copyright &copy; 2010-2021 Kenji Urushima, All Rights Reserved.
    </center>

    <div align="right">
        <a href="index.html">Go back to index</a>
    </div>

</body>

</html>
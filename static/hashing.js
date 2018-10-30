
function test() {
    savedhash = document.getElementById("hashkey_saved");
    obj = document.getElementById("hashkey");
    savedhash.value = obj.value;
    updatesaved(obj.value);
    }


function updatesaved(newhash) {
    savedhash = document.getElementById("hashkey_saved");
    if (savedhash) {
            if (savedhash.value.trim().toUpperCase() == newhash.trim().toUpperCase()) {
                    savedhash.classList.remove("red");
                    savedhash.classList.add("green");                                
            } else {
                    savedhash.classList.remove("green");
                    savedhash.classList.add("red");                                
                }
            } else alert("error cannot find savedhash");
            
    }
            
function verify(){
    obj = document.getElementById("hashkey");
    updatesaved(obj.value);
    }


function hashit() {
        obj = document.getElementById("cleartext");
        message = "";
        if (obj){
                message = obj.value;
        }
        hashkey = document.getElementById("hashkey");
        hashkey.value = sha256(message).toUpperCase();
        updatesaved(hashkey.value);
   }
            
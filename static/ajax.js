
function hashit() {
        obj = document.getElementById("cleartext");
        message = "empty";
        if (obj){
                message = obj.value;
        }
        data = JSON.stringify({"message":message});
        url = "http://localhost:5000/sha256";
        //url = "http://pcl21388.dn.lan/sha256";
        if (ajax(url,data,receiveHash))
         ;
   }


function addOnChange(obj,func) {
        if (obj.addEventListener) {  // all browsers except IE before version 9
            obj.addEventListener ("change", func, false);
        }
        else {
            if (obj.attachEvent) {   // IE before version 9
                obj.attachEvent ("onchange", func);
            }
        }
    }

function init(){
    savedhash = document.getElementById("hashkey_saved");
    //addOnChange(savedhash,verify)
    cleartext = document.getElementById("cleartext");         
    //addOnChange(cleartext,hashit)
    }

function ajax(url,data,callback) {
        var req = false;
        try{
                req = new XMLHttpRequest();
                }
        catch(e) {
                try {
                        req = new ActiveXObject("Msxml2.XMLHTTP");
                        }
                catch(e) {
                        try{
                                req = new ActiceXObject("Microsoft.XMLHTTP");
                                }
                        catch(e) {
                                // browser does not support AJAX
                                return false;
                                }
                        }
                }
        req.open("POST",url,true);
        req.setRequestHeader("Content-Type","application/json");
        req.onreadystatechange = function() {
                if (req.readyState == 4) callback(req);
                    }
        req.send(data);
        return true;
        }
        
function log(text){
        obj = document.getElementById("logger");
        if(obj)
            obj.innerHTML += "<p>"+text+"</p>";
            obj.scrollTop = obj.scrollHeight-obj.offsetHeight -1;
        }        
        
function receiver(req){
        if (req.status==200){
                message = JSON.parse(req.responseText);
                log(message["message"])
                }
        else {
            alert("Error Message Code:"+req.status+", "+req.statusText);
                
                }
        
        }
        
function test() {
    savedhash = document.getElementById("hashkey_saved");
    obj = document.getElementById("hashkey");
    savedhash.value = obj.value;
    updatesaved(obj.value);
    }

function test2(){
        data = JSON.stringify({"message":"Hello"});
        url = "http://localhost:5000/json";
        //url = "http://pcl21388.dn.lan/json";
        //alert(data);
        if (ajax(url,data,receiver))
         //alert("ajax was sent")
         ;
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

function receiveHash(req) {
    if (req.status==200){
            message = JSON.parse(req.responseText);
            obj = document.getElementById("hashkey");
            obj.value = message["hashkey"];
            updatesaved(message["hashkey"]);
            }
    else {
        alert("Error Message Code:"+req.status+", "+req.statusText);
            }
    }


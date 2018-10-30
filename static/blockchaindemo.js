   var currentblock = null;
   var PoW = 2
   var blockcount = 0

   var copyobj = null;

   function getPrevious(num){
     if (num > 0) {
       currentblock = document.getElementById("block"+(num-1));
       hashcode = getHTML("hash");
       currentblock = document.getElementById("block"+num);
       obj = getObj("previous");
       obj.className = "hashfield right";
       obj.innerHTML = hashcode;
       updateHash(num);
     }
   }

   function cloneBlock(){
     clone = copyobj.cloneNode(true);
     clone.id="block"+blockcount;
     clone.innerHTML=clone.innerHTML.replace(new RegExp('!!block!!', 'g'),blockcount);
     console.log(clone);
     blockcount++;
     console.log(blockcount);
     document.getElementById("scroller").style.width="calc("+blockcount*400+"px+50%)";
     document.getElementById("scroller").style.width="calc(50vw + "+426*blockcount+"px)";
     document.getElementById("scroller").appendChild(clone);
     currentblock=clone;
     updateHash(blockcount-1);
     getPrevious(blockcount-1);
     return clone;
    }

   //obj = document.getElementById("hash2");
   //obj.innerHTML = cut(hashcode,16,"<br/>");
   /*
   document.writeln(hashcode+"<br/>")
   document.writeln(""+hashcode.length+"<br/>")
   document.writeln(""+othercode.length+"<br/>")
   */



    function testsub(){
      obj=document.getElementById("block02");
      element = obj.querySelector("[id='previous']");
      element.innerHTML =getHTML("hash");
    }

   function getHTML(objname){
     return getObj(objname).innerHTML;
     //return document.getElementById(objname).innerHTML
   }
   function getValue(objname){
     return getObj(objname).value;
     //return document.getElementById(objname).value
   }

   function getObj(objname){
     return currentblock.querySelector("[id='"+objname+"']");
   }

   function setvalue(objname,value){
     document.getElementById(objname).value = value
   }

   function setHTML(objname,html){
     document.getElementById(objname).innerHTML = html
   }

   function cut(text,len,delimeter){
     output = text.substring(0,len)
     text = text.substring(len)
     while (text != "") {
       output += delimeter + text.substring(0,len)
       text = text.substring(len)
     }
     return output

     document.getElementById(objname).innerHTML = html
   }

   function getTX(){
     TX = getHTML("nonce")+";"
     TX += getHTML("previous")+";"
     TX += getValue("sender")+";"
     TX += getValue("receiver")+";"
     TX += getValue("amount")+";"
     return TX

   }

   function resetNonce(num){
     currentblock = document.getElementById("block"+num);
     getObj('nonce').innerHTML=""+0;
     updateHash(num);
   }


   function updateHash(num){
      currentblock = document.getElementById("block"+num);
      hashcode = sha256(getTX());
      obj = getObj("hash");
      //obj.innerHTML = getTX()+"<br/>"+hashcode
      obj.innerHTML = cut(hashcode,16,"<br/>");
      if (hashcode.substring(0,PoW) != "0000000".substring(0,PoW)) {
          obj.style.color="#a00";
      } else {
          obj.style.color="#fff";
      }
      if (num+1 < blockcount){
        currentblock = document.getElementById("block"+(num+1));
        obj2 = getObj("previous");
        if (obj2.innerHTML != obj.innerHTML) obj2.className = "hashfield right red";
        else
           obj2.className = "hashfield right";

        //obj2.style.color="#a00";
      }

      return hashcode;
   }

   function test(num){
     currentblock = document.getElementById("block"+num);
     hashcode = sha256(getTX());
     if (hashcode.substring(0,PoW) != "000000".substring(0,PoW)){
      nonce = parseInt(getHTML("nonce"));
       nonce++;
       obj = getObj("nonce");
       obj.innerHTML = ""+nonce;
       //alert(nonce);
       hashcode = updateHash(num);
       if (hashcode.substring(0,PoW) != "0000000".substring(0,PoW)) setTimeout("test("+num+")",0);
     }
   }


function intro(){
   copyobj = document.getElementById("copyholder").children[0];

   for(i=0;i<1;i++){
     cloneBlock();
   }

   nonce = 0;
   payload = "Payload:{'nonce':"+nonce+"}";
   hashcode = sha256(payload);
   othercode = '1d229271928d3f9e2bb0375bd6ce5db6c6d348d9';
   obj = document.getElementById("hash");
   obj.innerHTML = cut(hashcode,16,"<br/>");
   var currentblock = clone;
   test(0);

}


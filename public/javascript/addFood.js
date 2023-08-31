console.log("minu rules");

let addlink = document.getElementById("addlink");

addlink.addEventListener("click",function(){
    let c = document.getElementsByClassName("link-container")[0];
    let v = "<div class='linkele'><input name='Linkname' class='input-f-linkname' id='input-linkname' type='text'/><input name='Linkval' class='input-f-linkval' id='input-linkval' type='url'/></div>";
    c.insertAdjacentHTML('beforeend',v);
    //checkaddlink();
})

function checkaddlink(){
    let count = document.getElementsByClassName("input-f-linkval").length;
    let lastchild = document.getElementsByClassName("input-f-linkval")[count-1];
    if(lastchild.value == null){
        document.getElementById("addlink").Disabled=true;
    }
}


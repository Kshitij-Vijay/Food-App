console.log("minu rules");

const form = document.querySelector('form');


// form.addEventListener('submit',(e) => {
//     e.preventDefault();

//     const img = document.getElementsByClassName("the-image")[0];
//     const formdata = new FormData();
//     formdata.append("image",img);
//     console.log(formdata);

//     fetch('/add/food', {
//         method: 'post',
//         body:formdata,
//     }).then(res => res.json())
//     .then(data => console.log(data));
// })

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


let droparea = document.getElementById("image-drop-area");
let inputfile = document.getElementById("input-image");
let imageview = document.getElementById("image-view");

inputfile.addEventListener("change",uploadimg);

function uploadimg(){
    let imagelink = URL.createObjectURL(inputfile.files[0]);
    imageview.style.backgroundImage = `url(${imagelink})`;
}

function rangeslide(vals){
    document.getElementsByClassName("ratings-slider-val")[0].innerHTML = vals;
}

let difficultyLevels = ["EASY","BEGINNER","NOVICE","NORMAL","INTERMEDIATE","ROOKIE","PRO","ADVANCED","MASTER","LEGENDARY","GOD"]


function diffslide(vals){
    document.getElementsByClassName("difficulty-range-value")[0].innerHTML = difficultyLevels[vals];
}


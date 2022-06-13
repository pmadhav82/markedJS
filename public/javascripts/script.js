let modal = document.querySelector(".m");
let deleteBtn = document.querySelector("#deletebtn");
let cancleBtn = document.querySelector("#canclebtn");


const toggaleModel = ()=>{
    modal.classList.toggle("s-m");
}

deleteBtn.addEventListener("click",toggaleModel);
cancleBtn.addEventListener("click", toggaleModel);

window.addEventListener("click", (e)=>{
   if(e.target === modal){
       toggaleModel();
   }
})
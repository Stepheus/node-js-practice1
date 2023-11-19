document.addEventListener("readystatechange", (e)=>{
    if(e.target.readyState === "complete"){
        //create array of service captions and save it in session
        //check logic and if array is saved
        const caption = ["Kitchen", "Bathroom", "Flooring", "Outdoor"];
        sessionStorage.setItem("caption", JSON.stringify(caption));
    }
})

document.addEventListener("DOMContentLoaded", ()=>{
    function slideLeft(){
        const slides = document.getElementById('slides');
        slides.classList.add("slides-left");
        //changeServiceCaption();
    }
    
    function changeServiceCaption(){
    
    }
    
    
    
    //Button service click. Check if image move. 
    const serviceBttn = document.getElementById('leftBttn');
    serviceBttn.addEventListener("click", ()=>slideLeft());
})

 
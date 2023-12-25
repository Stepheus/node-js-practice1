// document.addEventListener("readystatechange", (e)=>{
//     if(e.target.readyState === "complete"){
//         //create array of service captions and save it in session
//         //check logic and if array is saved
//         const caption = ["Kitchen", "Bathroom", "Flooring", "Outdoor"];
//         sessionStorage.setItem("caption", JSON.stringify(caption));
//     }
// })

document.addEventListener("DOMContentLoaded", ()=>{ 
      //Get lengh of first img to be used as offset move
      const firstImg = document.getElementById("kitchen-cover");
      console.log({firstImg});
      const imgWidth = firstImg.getBoundingClientRect().width;
      console.log({imgWidth});

      //Create an array of offsets that will added as dat inside the html
      //document of each img slide
      const imgSlides = document.getElementsByClassName("slide");
      let imgArray = Array.from(imgSlides);
      for (let i= 0; i < imgArray.length; i++){
        let offset = imgWidth * i;
        console.log({offset})
        imgSlides[i].dataset.position = offset;
      }
      sessionStorage.setItem("totalWidth", JSON.stringify(offset));

})


function slide(direction){
    const slides = document.getElementById('slides');
    const currentSlide = slides.querySelector('[data-selected="yes"]');
    const captions = document.getElementById('box-caption');
    const currentCaption = captions.querySelector('[data-show="yes"]');
    if(direction==="left"){
        if(currentSlide.nextElementSibling){
            //data-position is updated soon as the doc loads.
            amountToMove = "-" + currentSlide.nextElementSibling.dataset.position;
            currentSlide.parentElement.style.transform = 'TranslateX('+ amountToMove + "px" + ')';
            //Move anchor to next slide and next text
            currentSlide.nextElementSibling.dataset.selected = "yes";
            currentSlide.dataset.selected = "no";
            currentCaption.nextElementSibling.dataset.show ="yes";
            currentCaption.dataset.show ="no";
        }else{

        }
    }else if(direction==="right"){
        if(currentSlide.previousElementSibling){
            // find total length in px of slide
            wholeSlideWidth =JSON.parse(sessionStorage.getItem("totalWidth"));
            console.log({wholeSlideWidth});
            amountToMove = wholeSlideWidth - currentSlide.previousElementSibling.dataset.position;
            console.log({amountToMove});
            currentSlide.parentElement.style.transform = 'TranslateX('+ amountToMove + "px" +')';
             //Move anchor to next slide and next text
            currentSlide.previousElementSibling.dataset.selected = "yes"; 
            currentSlide.dataset.selected = "no";
            currentCaption.previousElementSibling.dataset.show="yes";
            currentCaption.dataset.show="no";

        }else{

        }
    }
    
}

function changeServiceCaption(){

}
//Service button event
const serviceBttnLeft = document.getElementById('rightBttn');
serviceBttnLeft.addEventListener("click", ()=>slide("left"));
const serviceBttnRight = document.getElementById('leftBttn');
serviceBttnRight.addEventListener("click",()=>slide("right"));

                            //Scroll events
//About page
// const aboutPage = document.getElementById("transition-about");
// const aboutStory = document.getElementById("about-story");
// const sections = aboutStory.querySelectorAll("section");

// window.addEventListener("scroll", ()=>{
//     const scrolled = window.scrollY;
//     const offSet = aboutPage.offsetTop;
//     const offHeight = document.getElementById("about").offsetHeight;
//     if(scrolled >= offSet && scrolled <= (offSet + offHeight)){
//         const richie = document.getElementById("richie-img");
//         richie.classList.add("richie-appear");
//         sections.forEach(text => {
//             text.classList.add("section-about-appear");
//         })
//     }

// })
// //Reviews appear
// const reviewPage = document.getElementById("reviewPage");
// const homeReviews = document.getElementsByClassName("home-review");
// window.addEventListener("scroll", ()=>{
//     const scrolled = window.scrollY;
//     const offSet = reviewPage.offsetTop;
//     const offHeight = reviewPage.offHeight;
//     if(scrolled >= offSet && scrolled <= (offSet + offHeight)){
//         Array.from(homeReviews).forEach(review=>{
//             review.className.add("show-review");
//         })
//     }
// })

 
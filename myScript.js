
function slide(direction){
    const slides = document.getElementById('slides');
    const currentSlide = slides.querySelector('[data-selected="yes"]');
    const captions = document.getElementById('box-caption');
    const currentCaption = captions.querySelector('[data-show="yes"]');
    if(direction==="left"){
        document.getElementById('leftBttn').style.display= "block";
        if(currentSlide.nextElementSibling){
            //data-position is updated soon as the doc loads.
            amountToMove = "-" + currentSlide.nextElementSibling.dataset.position;
            currentSlide.parentElement.style.transform = 'TranslateX('+ amountToMove + "px" + ')';
            //Move anchor to next slide and next text
            currentSlide.nextElementSibling.dataset.selected = "yes";
            currentSlide.dataset.selected = "no";
            currentCaption.nextElementSibling.dataset.show ="yes";
            currentCaption.dataset.show ="no";

            //make button disappear if there's nothing after
            if (!currentSlide.nextElementSibling.nextElementSibling){
                document.getElementById('rightBttn').style.display= "none";
            }
            
        }else{
            //Nothing
        }
    }else if(direction==="right"){
        document.getElementById('rightBttn').style.display= "block";
        if(currentSlide.previousElementSibling){
            // amountToMove = wholeSlideWidth - currentSlide.previousElementSibling.dataset.position;
            amountToMove = "-" + currentSlide.previousElementSibling.dataset.position;
            console.log({amountToMove});
            currentSlide.parentElement.style.transform = 'TranslateX('+ amountToMove + "px" +')';
             //Move anchor to next slide and next text
            currentSlide.previousElementSibling.dataset.selected = "yes"; 
            currentSlide.dataset.selected = "no";
            currentCaption.previousElementSibling.dataset.show="yes";
            currentCaption.dataset.show="no";

            //make button disappear if there's nothing before
            if (!currentSlide.previousElementSibling.previousElementSibling){
                document.getElementById('leftBttn').style.display= "none";
            }

        }else{
            //Nothing
        }
    }
    
}

function richieAppear(entries, observer1){
    entries.forEach(entry =>{
        if (!entry.isIntersecting){
            return;
        }
        
        entry.target.classList.add("richie-appears");
        observer1.unobserve(entry.target)
    })

}

function sectionsAppear(entries, observer2){
    entries.forEach(entry =>{
        if(!entry.isIntersecting){
            return;
        }

        const sections = entry.target.querySelectorAll("section");
        sections.forEach(section=>{
            section.classList.add("section-appear");
        })

        observer2.unobserve(entry.target)
    })
    
}

function reviewsAppear(entries, observer3){
    entries.forEach(entry =>{
        if(!entry.isIntersecting){
            return;
        }

        const reviews = entry.target.querySelectorAll("section");
        reviews.forEach(review=>{
            review.classList.add("show-review");
        })

        observer3.unobserve(entry.target);


    })
}


document.addEventListener("DOMContentLoaded", ()=>{ 
    //Get lengh of first img to be used as offset move
    const firstImg = document.getElementById("kitchen-cover");
    console.log({firstImg});
    const imgWidth = firstImg.getBoundingClientRect().width;
    console.log({imgWidth});

    //Create an array of offsets that will be added as dat inside the html
    //document of each img slide
    const imgSlides = document.getElementsByClassName("slide");
    let imgArray = Array.from(imgSlides);
    let offset;
    for (let i= 0; i < imgArray.length; i++){
      offset = imgWidth * i;
      imgSlides[i].dataset.position = offset;
    }

     //Service button event(Add it in load event listener)
    const serviceBttnLeft = document.getElementById('rightBttn');
    serviceBttnLeft.addEventListener("click", ()=>slide("left"));
    const serviceBttnRight = document.getElementById('leftBttn');
    serviceBttnRight.addEventListener("click",()=>slide("right"));

                                //Intersection Observer
    //Observe richie picture
    let option1 = {
        root: null,
        rootMargin: "-20% 0px -50% 0px",
        threshold: 1
    };
    let observer1 = new IntersectionObserver(richieAppear, option1);
    const richiePic = document.getElementById("richie-img");
    observer1.observe(richiePic);


    //observe sections stories from about page
    let option2 = {
        root: null,
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0,
    };
    let observer2 = new IntersectionObserver(sectionsAppear, option2);
    const articleAbout = document.getElementById("story-box");
    observer2.observe(articleAbout);


    //observe reviews   
    let option3 ={
        root: null,
        rootMargin: "-10% 0px -10% 0px",
        threshold: 0.75,
    };
    let observer3 = new IntersectionObserver(reviewsAppear, option3);
    const reviewPage = document.getElementById("review-page");
    observer3.observe(reviewPage);
    console.log({reviewPage});


})


 
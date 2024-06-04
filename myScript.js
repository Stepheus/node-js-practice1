
function hideMenu(){
    const menuInput = document.getElementById("nav-logo");
    if (menuInput.checked){
        menuInput.checked = false;
    }
}

function slideSlider(slideLeft, currtSlide){
    
    //change text caption too
    const captions = document.getElementById('box-caption');
    const currentCaption = captions.querySelector('[data-show="yes"]');

    //Move slider
    let amountToMove;

    if(slideLeft){
      amountToMove = "-" + currtSlide.nextElementSibling.dataset.position;
      currtSlide.nextElementSibling.dataset.selected = "yes";
      currtSlide.dataset.selected = "no";
      currentCaption.nextElementSibling.dataset.show ="yes";
      currentCaption.dataset.show ="no";

    }else{
        amountToMove = "-" + currtSlide.previousElementSibling.dataset.position;
        currtSlide.previousElementSibling.dataset.selected = "yes"; 
        currtSlide.dataset.selected = "no";
        currentCaption.previousElementSibling.dataset.show="yes";
        currentCaption.dataset.show="no";
        
    }
    currtSlide.parentElement.style.transform = 'TranslateX('+ amountToMove + "px" + ')';
    console.log("New Data");
    console.log("boundingClientRecLeft: " + currtSlide.parentElement.getBoundingClientRect().left);
}

function slide(direction){
    const slides = document.getElementById('slides');
    const currentSlide = slides.querySelector('[data-selected="yes"]');
    if(direction){
        document.getElementById('leftBttn').style.display= "block";
        if(currentSlide.nextElementSibling){
            slideSlider(direction, currentSlide);

            //make button disappear if there's nothing after
            if (!currentSlide.nextElementSibling.nextElementSibling){
                document.getElementById('rightBttn').style.display= "none";
            }
        }
    }else{
        document.getElementById('rightBttn').style.display= "block";
        if(currentSlide.previousElementSibling){
            slideSlider(direction, currentSlide);

            //make button disappear if there's nothing before
            if (!currentSlide.previousElementSibling.previousElementSibling){
                document.getElementById('leftBttn').style.display= "none";
            }
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

function contactAppear(entries, observer4){
    entries.forEach(entry=>{
        if(!entry.isIntersecting){
            return;
        }
        const areaText = document.getElementById("user-note");
        areaText.classList.add("area-show");
        observer4.unobserve(entry.target);
    })

    
}

function contactListAppear(entries, observe5){
    entries.forEach(entry=>{
        if(!entry.isIntersecting){
            return;
        }
        const listContact = entry.target.querySelectorAll("a");
        console.log({listContact});
        let i;
        for(i=0; i< listContact.length; i++){
            listContact[i].classList.add("flash-red");
        }

        observe5.unobserve(entry.target)  

    })
}


document.addEventListener("DOMContentLoaded", ()=>{ 

    //Make Menu go back after we click on a option
    const navList = document.getElementById("nav-page");
    //create loop instead
    const listNavigation = Array.from(navList.children);
    //create a click loop click event listener for each of them
    listNavigation.forEach((list)=>{
        list.addEventListener("click", ()=>hideMenu())
    })


    //Get lengh of first img to be used as offset move
    const firstImg = document.getElementById("kitchen-cover");
    const imgWidth = firstImg.getBoundingClientRect().width;

    //Create an array of offsets that will be added as dat inside the html
    //document of each img slide
    const imgSlides = document.getElementsByClassName("slide");
    console.log("Previous Data");
    let imgArray = Array.from(imgSlides);
    let offset;
    for (let i= 0; i < imgArray.length; i++){
      offset = imgWidth * i;
      imgSlides[i].dataset.position = offset;
    }

     //Service click button event
    const serviceBttnRight = document.getElementById('rightBttn');
    serviceBttnRight.addEventListener("click", ()=>slide(true));

    const serviceBttnLeft = document.getElementById('leftBttn');
    serviceBttnLeft.addEventListener("click", ()=>slide(false));



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

    //observe textarea
    let option4={
        root: null,
        rootMargin: "-20% 0px -5% 0px",
        threshold: 0.6,
    };
    let observer4 = new IntersectionObserver(contactAppear, option4);
    const contactPage = document.getElementById("contact-field");
    observer4.observe(contactPage);


    //observe ul-contact
    let option5={
        root:null,
        rootMargin:"0px",
        threshold: 0.7,
    };
    let observer5 = new IntersectionObserver(contactListAppear, option5);
    const listContact = document.getElementById("contact-list");
    observer5.observe(listContact);

    //Touch events variable for swipe
    /**
     * Connect phone to laptop
     */
    /**
     I'll need several results
     *Slides to move when touchstart touch move
     *Touchend if swipe fast enough. Slide to be moved to next position within
     a small, maybe 1/4 of amountToMove touchobject.pageX
     *If not fast enought. I
         if dist > 1/2 of amountTomove move slide by AmountToMove
         If not Slide moves back to previous position
     *
     */
    let startX, startY,  distTraveled, timeOfSwipe;
    const slideBox = document.getElementById("slides");
    slideBox.addEventListener("touchstart", (e)=>{

        let touchobject = e.changedTouches[0];
        startX = touchobject.pageX;
        startY = touchobject.pageY;
        distTraveled = 0;
        timeOfSwipe = new Date().getTime();
        console.log("Touchstart is clicked")
        e.preventDefault();
    }, false)

    slideBox.addEventListener("touchmove", (e)=>{
        console.log("Touch move happening")

        e.preventDefault();
        
    }, false)

    //Touch event but with mouse for check

    slideBox.addEventListener("touchend", (e)=>{
        console.log("touchend over");
        //if we swipe more than 1/3 the lenght of the picture and within Y distance 
        //the swipe happens
        //getclient reco has width
        let tchobj = e.changedTouches[0];
        distTraveled = tchobj.pageX - startX;
        let changeY = tchobj.pageY - startY;

        const secondImg = document.getElementById("kitchen-cover");
        const moveTreshold  = firstImg.getBoundingClientRect().width/3;

        if((Math.abs(distTraveled) <= moveTreshold) && (changeY <70)){
            //which direction to swipe
            if (distTraveled < 0){
                slide(true);
            }else{
                slide(false);
            }
        }
            


        e.preventDefault();
    }, false)

})


 
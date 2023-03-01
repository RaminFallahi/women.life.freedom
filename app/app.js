//GETTING ELEMENTS FROM THE DOM: -1
//taking all necessary elements from the DOM
const container = document.querySelector('.slider-container');
const slides = document.querySelectorAll(".slide");
const arrLeft = document.querySelector('.arrow-left');
const arrRight = document.querySelector('.arrow-right');

//OFFSET VALUE FOR THE SLIDES CONTAINER -2
//I need this variable later
let offset = 0;

//SLIDE ID ON INCREMENT -3
let slideIncrement = 0;

//SLIDE ID ON DECREMENT -4
let slideDecrement = slides.length - 1;

//ADDING EVENT LISTENERS TO THE RIGHT ARROW -5
arrRight.addEventListener('click', () => {

  //disable right arrow button if the last slide is active -6
  arrRight.disabled = true;

  //set offset to the width of the slide -7
  offset = slides[0].offsetWidth;
  
  //setting container transition -8
  //applying the slide transition to the container.
  container.style.transition = "ease-in-out 0.500ms";

  //move slides container by negative offset -9
  //always move the container to the left property to keep animations consistant
  container.style.left = -offset + "px";

  //set a timeout -10
  //I will wait until animation is done, then I will remove the transition, because I dont want to move the container with a transition anymore.
  setTimeout(() => {
    //remove container transition -11
    container.style.transition = "none";

    //move the first slide to the end of the container -12
    slides[slideIncrement].style.order = slides.length - 1;

    //move the container back to the starting position -13
    //this will happened unnoticed because we removed the transition.
    container.style.left = 0;

    //increment slideIncrement ID -14
    //we can repeat this with the next slide when right arrow is clicked again.
    slideIncrement++;

    //set the decrement ID to the perivious increment ID -15
    slideDecrement = slideIncrement - 1;

    //if the slide increment ID reaches the slide length -16
    //we need to reset the increment ID to 0, so we can start from the beginning(loop).
    if (slideIncrement === slides.length) {
      //setting the increment ID to zero -17
      slideIncrement = 0;

      //select all slides -18
      slides.forEach(slide => {

        //reset all slides order -19
        slide.style.order = "initial";
      });
    }
    //enable right arrow button -20
    arrRight.disabled = false;

    //reenable the right arrow click, user can slide to the next slide. -21
  }, 500);
});

//ADDING EVENT LISTENERS TO THE LEFT ARROW -22
arrLeft.addEventListener('click', () => {
  //disable the left arrow button -23
  arrLeft.disabled = true;

  //set offset to the width of the slide -24
  offset = slides[0].offsetWidth;

  //removing container transition first -25
  container.style.transition = "none";

  //check if the slide decrement is below zero -26
  //if yes we restart the order of all slides and we set 
  //the decrement ID to the last slide index value.
  if (slideDecrement < 0) {

    //selest all slides -27
    slides.forEach(slide => {

      //reset all slides order -28
      slide.style.order = "initial";
    });
    //set decrement ID to the last slide index value -29
    slideDecrement = slides.length - 1;
  }

  //move the current slide to the fist position -30
  //setting it on -1 to make sure it is on the first slide by the order property.
  slides[slideDecrement].style.order = "-1";

  //move the slides container by negative offset -31
  container.style.left = -offset + "px";

    //now I need to make a short time out to prevent the code above from cancelling out.
    //set a short timeout -32
    setTimeout(() => {
      container.style.transition = "ease-in-out 0.500ms";

      //move the container to the starting position -33
      container.style.left = 0;

      //34
    },1);

    //set another timeout to wait for the transition to finish -35
    
    //the I will decrement the decrement ID, 
    //set the increment ID to the previous decrement ID in case the user clicks the right arrow next and finally, 
    //re-enable the left arrow click.
    setTimeout(() => {
      //decrement the slide decrement ID -36
      slideDecrement--;

      //set the increment ID to the previous decrement ID -37
      slideIncrement = slideDecrement + 1;

      //enable the left arrow button -38
      arrLeft.disabled = false;

    }, 500);//end of timeout -39
});
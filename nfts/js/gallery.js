// for storing mouse x / y position
var mousePos = {
  x: -10,
  y: -10
};

// select the .box DOM elements
var boxElements = document.getElementsByClassName('box');

// create an array of objects to store the box elements and their image
// positions
var boxes = [];
for (var i = 0; i < boxElements.length; i++) {
  boxes.push({
    el: boxElements[i],
    targetX: 0,
    targetY: 0,
    prevX: 0,
    prevY: 0,
    x: 0,
    y: 0,
    left: boxElements[i].offsetLeft,
    top: boxElements[i].offsetTop,
    size: boxElements[i].offsetWidth
  })
}

function mousemove(e) {
  // update mouse position
  mousePos.x = e.pageX;
  mousePos.y = e.pageY;
}

function updateBox(box) {
  // check if mouse is in box area
  if (mousePos.x > box.left && mousePos.x < (box.left+box.size) &&
    mousePos.y > box.top && mousePos.y < (box.top+box.size)) {
    // the mouse is in the space over the box - update the box image target position dependent on how far the mouse position is from the center of the box (box size/2)
    box.targetX = (box.size/2 - (mousePos.x - box.left)) * 0.1;
    box.targetY = (box.size/2 - (mousePos.y - box.top)) * 0.1;
  } else {
    // otherwise the box isn't being hovered, its target is 0
    box.targetX = 0;
    box.targetY = 0;
  }
  
  // update the image element position by lerping position to target
  // https://codepen.io/rachsmith/post/animation-tip-lerp
  box.x += (box.targetX - box.x)*0.2;
  box.y += (box.targetY - box.y)*0.2;
  
  // check that the values aren't really small already, to overcome javascripts poor handling of high precision math
  if(Math.abs(box.x) < .001) box.x = 0;
  if(Math.abs(box.y) < .001) box.y = 0;
  
  // only update CSS if the position has changed since last loop
  if (box.prevX !== box.x && box.prevY !== box.y) {
    // update css of image element
    box.el.children[0].children[0].style.transform = 'translate3d('+box.x+'px, '+box.y+'px, 0)';
  }
  
  // update prev values for next comparison
  box.prevX = box.x;
  box.prevY = box.y;
}

function loop() {
  // in the loop - updated each of the boxes
  for (var i = 0, l = boxes.length; i < l; i++) {
    updateBox(boxes[i]);
  }
  requestAnimationFrame(loop);  
}

function resize() {
  // the box positions/sizes have updated on resize, so they need to be
  // reset
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].left = boxes[i].el.offsetLeft;
    boxes[i].top = boxes[i].el.offsetTop;
    boxes[i].size = boxes[i].el.offsetWidth;
  }
}

// attach the mouse event listener to the document
document.addEventListener('mousemove', mousemove);
// listen for resize event, so box sizes can be updated
window.addEventListener('resize', resize);
// run the animation loop
loop();

function updateTime(specie,countDownDate,functionName) {

  var now = new Date().getTime();
  var timeleft = countDownDate - now;

  if (timeleft < 0) {
    // Display the message when countdown is over
      //clearInterval(window[functionName]);
      document.getElementById(specie+"_days").innerHTML = ""
      document.getElementById(specie+"_hours").innerHTML = "" 
      document.getElementById(specie+"_mins").innerHTML = ""
      document.getElementById(specie+"_secs").innerHTML = ""
      document.getElementById(specie+"_end").innerHTML = "TIME UP!!";
      var addresDiv = document.getElementById("addressdetail");
      if (addresDiv){
        addresDiv.innerHTML = '<br><h3>THE SALE FOR THIS NFT HAS ENDED :(</h3>';
      }
  } else {
      // Calculating the days, hours, minutes and seconds left
      var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
          
      // Result is output to the specific element
      document.getElementById(specie+"_days").innerHTML = days + "d "
      document.getElementById(specie+"_hours").innerHTML = hours + "h " 
      document.getElementById(specie+"_mins").innerHTML = minutes + "m " 
      document.getElementById(specie+"_secs").innerHTML = seconds + "s " 
  }
}


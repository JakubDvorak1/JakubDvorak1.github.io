window.onload = function() {	
	var originalGifDuration = 7000; // e.g., 15 seconds
	
	var mainGif = document.getElementById('mainGif');
	var loopMainGif = document.getElementById('loopMainGif');
	
	setTimeout(function() {		 
		 mainGif.style.display = 'none';		 
		 loopMainGif.style.display = 'inline';
		 loopMainGif.classList.add('show');
	}, originalGifDuration);
};

window.addEventListener('scroll', function() {
	const navbar = document.querySelector('.navbar');
	const scrollPosition = window.scrollY || document.documentElement.scrollTop;

	const scrollThreshold = 880; 

	if (scrollPosition > scrollThreshold) {
		 navbar.classList.add('show'); 
	} else {
		 navbar.classList.remove('show');
	}
});

// window.addEventListener('scroll', function() {
// 	const line = document.querySelector('.transitionLine');
// 	const gif = document.getElementById('gifLine');	
// 	const scrollPosition = window.scrollY || document.documentElement.scrollTop;
	
// 	const scrollThresholdTop = 880; 
// 	const scrollThresholdBottom = 2500; 
// 	const totalFrames = 36;
// 	const frameWidth= 800;	

//     // Check if the scroll position is within the defined bounds
// 	 if (scrollPosition > scrollThresholdTop && scrollPosition < scrollThresholdBottom) {
//         // Calculate the percentage of scroll within the range
//         const scrollPercent = (scrollPosition - scrollThresholdTop) / (scrollPosition - scrollThresholdTop);

//         // Calculate which frame should be displayed
//         const currentFrame = Math.floor(scrollPercent * totalFrames);

//         // Update the background position for the sprite sheet
//         document.querySelector('.transitionLine').style.backgroundPosition = `-${currentFrame * frameWidth}px 0px`;
// 	 }
// 	if (scrollPosition > scrollThresholdTop && scrollPosition < scrollThresholdBottom) {			 
// 		if(line.style.display != 'flex' ){
// 		gif.src= 'images/transitionLine.gif';
// 		}
// 		line.style.display = 'flex';			
		
// 	} else {
// 		gif.src='images/invisible_box.png';
// 		line.style.display = 'none'; 		
// 	}
// });

document.addEventListener('scroll', function() {
	
	const minScrollY = 880;  
	const maxScrollY = 3000; 
	
	const totalFrames = 37; 	
	const transitionLine = document.querySelector('.transitionLine');
	const box = document.querySelector('.invisibleBox');
   const frameWidth = transitionLine.offsetWidth; //jakou má formu tohle číslo?
	console.log('initial frameWidth: ',frameWidth);
	const frameDiff =frameWidth/37;	

	let scrollY = window.scrollY;
	
	if (scrollY > minScrollY && scrollY < maxScrollY) {
		 
		 const scrollPercent = (scrollY - minScrollY) / (maxScrollY - minScrollY);		 
		 const currentFrame = Math.floor(scrollPercent * totalFrames);	
		 console.log('frame: ',currentFrame);
		 const move = currentFrame * frameWidth;
		 console.log('moved by: -',move);

		 transitionLine.style.backgroundPosition = `-${currentFrame * frameWidth}px 0px`;	//tady to frame width by mělo být asi menší? počítat to nějak jinak nebo to nějak vydělit, takhle to funguje když mám size of background 3700%	
	}
});




const observer = new IntersectionObserver((entries) =>{
	entries.forEach((entry)=>{
		console.log(entry)
		if(entry.isIntersecting){
			entry.target.classList.add("show");
		} else{
			entry.target.classList.remove("show");
		}
	});
});

const hiddenElements = document.querySelectorAll('.hiddenLeft, .hiddenRight, .hiddenDown');
hiddenElements.forEach((el) => observer.observe(el));

// ..........................Slider............................

const track = document.getElementById("slider");
const trivia = document.getElementById("trivia");
const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }

  trivia.animate({
	transform: `translate(${nextPercentage}%, -50%)`
 }, { duration: 1200, fill: "forwards" });
 
 for(const image of trivia.getElementsByClassName("list")) {
	image.animate({
	  objectPosition: `${100 + nextPercentage}% center`
	}, { duration: 1200, fill: "forwards" });
 }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);
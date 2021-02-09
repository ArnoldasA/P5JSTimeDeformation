

let video;
let detector;
let detections = [];
//Array used to shift video to create delay effect
let f = [];
//delay
let s = 40;
let v;
//defining screen distortion  sizes
let z=640;
let w=640;


function preload() {
  // load our object library cocossd - you could use 'YOLO'
  detector = ml5.objectDetector('cocossd');
}

function setup() {
  createCanvas(640, 480);
  colorMode(HSB, 255);
    
  // load our webcam feed
 v= video = createCapture(VIDEO, videoReady);
  video.size(640, 480);
  v.hide();
}

function videoReady(stream) {
  // we now know the video is ready, so we'll start the detection.
  
  // start our detector, give the callback function of detected()
  detector.detect(video, detected);
}


function draw() {
  background(0);
   
   image(video, 0, 0);
if (detections.length > 0 && detections[0].label == "person")
{
     f.push(v.get());//getting video 
  // draw webcam frame
//create video delay 
if (n = f.length > s) f.shift();
	if (f.length == s) {
 		for (let i = 0; i < s; i++) {
 			h = int(z / s) + 1;
 			p = f[i].get(x = 0, y = map(i, 0, s, 0, z), w, h);
           
           let t= map(i,-1,1,0,50);
            //creating unique tint by using our increment data
             tint((i*3)%255, t, 100, 250);
            
            
 			image(p, x, y);// tint // shift on distortion 
            
           
           
 		}
 	}
}
    else
    {
       tint(0, 0, 204); 
}
 

   
	
    
  // loop through all our detections and draw them
  for (let object of detections) {
    // we use lerp to color the border somewhere between red and green based on the confidence of the prediction
    stroke(lerpColor(color(255,0,0), color(0, 255, 0), object.confidence));
    strokeWeight(3);
    noFill();
    
    // here we use the normalised values, these represent the percentage across the screen as a value between 0 and 1 - so we multiply these out by the width and height of the canvas.
    rect(object.normalized.x * video.width, object.normalized.y * video.height, object.normalized.width * video.width, object.normalized.height * video.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}

function detected(error, results) {
  if (error) {
    console.log("We had an error with the detection -> "+error);
  }
  
  // remember our detections so that we can draw them in draw()
  detections = results;
  
  // recursively call detect method to keep everything updated
  detector.detect(video, detected);
}

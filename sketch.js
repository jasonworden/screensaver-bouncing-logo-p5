/**
 * Logo bouncing around screen like the DVD bouncing logo "screensaver"
 * Based on the Processing example "Circle Collision with Swapping Velocities"
 * by Ira Greenberg, which was based on Keith Peter's ActionScript animation
 * "Making Things Move!"
 */

var BACKGROUND_COLOR = 0;
 
var logoImage;
var logo;

function setup() {
  createCanvas(640, 480);
  
  imageMode(CENTER);
  rectMode(CENTER);
  
  logoImage = loadImage("assets/dvd-logo-white-on-black.png");
  logo = new ScreensaverLogo(logoImage);
  
  tint(200, 0, 200);
}

function draw() {
  background(BACKGROUND_COLOR);

  logo.update();
  logo.display();
  logo.checkBoundaryCollision();
}

//////////////////////////////

var ScreensaverLogo = function(logo, v) {
  if(! this instanceof ScreensaverLogo) return new ScreensaverLogo(logo, v);
  var that = this;
  
  that.logo = logo;
  that.position = createVector(logo.width/2, logo.height/2);
  
  //default velocity to 0.9
  v = (typeof v === 'undefined') ? 1.0 : v;
  that.velocity = createVector(v, v);
  
  //changes color each time it hits a boundary
  that.colors = [
    color(200, 0, 200),
    color(0, 200, 200),
    color(200, 200, 0),
    color(240, 140, 0)
  ];
  that.colorIndex = 0;

  that.update = function() {
    var that = this;
    
    that.position.add(that.velocity);
  };

  that.checkBoundaryCollision = function() {
    var that = this;
    
    var hitBoundary = false;
    var w = that.logo.width;
    var h = that.logo.height;
    
    if (that.position.x > width-w/2) {
      hitBoundary = true;
      that.position.x = width-w/2;
      that.velocity.x *= -1;
    }
    else if (that.position.x < w/2) {
      hitBoundary = true;
      that.position.x = w/2;
      that.velocity.x *= -1;
    } 
    else if (that.position.y > height-h/2) {
      hitBoundary = true;
      that.position.y = height-h/2;
      that.velocity.y *= -1;
    } 
    else if (that.position.y < h/2) {
      hitBoundary = true;
      that.position.y = h/2;
      that.velocity.y *= -1;
    }
    
    if(hitBoundary) {
      that.colorIndex = ++that.colorIndex % that.colors.length;
      tint(that.colors[that.colorIndex]);
    }
  };

  this.display = function() {
    var that = this;
    
    image(that.logo, that.position.x, that.position.y);
    
    // //testing with rectangle:
    // noStroke();
    // fill(200, 200, 200, 100);
    // rect(that.position.x, that.position.y, that.logo.width, that.logo.height);
  };
}
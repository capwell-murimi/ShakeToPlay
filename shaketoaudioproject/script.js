const audio = new Audio('Glass Animals - Heat Waves.mp3');
const shakeThreshold = 10; // Adjust this value to control the shake sensitivity.

let lastX, lastY, lastZ;
let shakeCounter = 0;

// Function to play the message
function playMessage() {
  audio.play();
}

// Function to detect device shake
function deviceShake(event) {
  const { x, y, z } = event.accelerationIncludingGravity;
  const deltaX = Math.abs(x - lastX);
  const deltaY = Math.abs(y - lastY);
  const deltaZ = Math.abs(z - lastZ);

  if (deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold) {
    shakeCounter++;
  } else {
    shakeCounter = 0;
  }

  if (shakeCounter >= 2) { // Adjust this threshold as needed
    playMessage();
    shakeCounter = 0;
  }

  lastX = x;
  lastY = y;
  lastZ = z;
}

// Add event listener for device motion
if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', deviceShake);
}

// Add an event listener for a button click to trigger the message
document.getElementById('play-button').addEventListener('click', playMessage);

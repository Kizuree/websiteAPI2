const button =document.querySelector("button")

button.addEventListener("click", shine)
const sensor = new AmbientLightSensor();
sensor.onreading = () => console.log(sensor.illuminance);
sensor.onerror = event => console.log(event.error.name, event.error.message);
sensor.start();

function shine(){
    
}
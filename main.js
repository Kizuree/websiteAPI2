const button =document.querySelector("button")

button.addEventListener("click",doVibrate )


function doVibrate(){
    window.navigator.vibrate([50, 100, 150]);
    window.navigator.vibrate(0);

    console.log("vibrating")
 
}


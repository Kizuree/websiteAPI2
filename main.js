const button =document.querySelector("button")

button.addEventListener("click",doVibrate )


function doVibrate(){
    navigator.vibrate([50, 100, 150]);
    console.log("vibrating")
}


const button =document.querySelector("button")

button.addEventListener("click", shine)


function shine(){
    const sensor = new AmbientLightSensor();
sensor.onreading = () => console.log(sensor.illuminance);
sensor.onerror = event => console.log(event.error.name, event.error.message);
sensor.start();
navigator.permissions.query({ name: 'ambient-light-sensor' }).then(result => {
    if (result.state === 'denied') {
        console.log('Permission to use ambient light sensor is denied.');
        return;
    }

    const als = new AmbientLightSensor({frequency: 20});
    als.addEventListener('activate', () => console.log('Ready to measure EV.'));
    als.addEventListener('error', event => console.log(`Error: ${event.error.name}`));
    als.addEventListener('reading', () => {
        // Defaut ISO value.
        const ISO = 100;
        // Incident-light calibration constant.
        const C = 250;

        let EV = Math.round(Math.log2((als.illuminance * ISO) / C));
        console.log(`Exposure Value (EV) is: ${EV}`);
    });

    als.start();
});

const als = new AmbientLightSensor();

als.onreading = () => {
    let str = luxToWorkplaceLevel(als.illuminance);
    if (str) {
        console.log(`Light level is suitable for: ${str}.`);
    }
};

als.start();

function luxToWorkplaceLevel(lux) {
    if (lux > 20 && lux < 100) {
        return 'public areas, short visits';
    } else if (lux > 100 && lux < 150) {
        return 'occasionally performed visual tasks';
    } else if (lux > 150 && lux < 250) {
        return 'easy office work, classes, homes, theaters';
    } else if (lux > 250 && lux < 500) {
        return 'normal office work, groceries, laboratories';
    } else if (lux > 500 && lux < 1000) {
        return 'mechanical workshops, drawing, supermarkets';
    } else if (lux > 1000 && lux < 5000) {
        return 'detailed drawing work, visual tasks of low contrast';
    }

    return;
}
}

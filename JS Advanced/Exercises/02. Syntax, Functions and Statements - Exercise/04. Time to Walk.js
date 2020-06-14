function timeToWalk(steps, footprintInMeter, speedInKilometar){

    const distanceInMeters = steps * footprintInMeter;
    const speedInMeter = speedInKilometar * 1000 / 60 / 60;
    
    const walkTimeInSeconds = Math.ceil(distanceInMeters / speedInMeter);
    const restTimeInSeconds = Math.floor(distanceInMeters / 500) * 60;

    const seconds = (walkTimeInSeconds + restTimeInSeconds) % 60;
    const minutes = (walkTimeInSeconds + restTimeInSeconds - seconds) / 60;
    const hours = (walkTimeInSeconds + restTimeInSeconds - seconds) % 60;

    console.log(`${hours.toString().padStart(2, '0')}` +
        `:${minutes.toString().padStart(2, '0')}` +
        `:${seconds.toString().padStart(2, '0')}`);
}

timeToWalk(4000, 0.60, 5)
timeToWalk(2564, 0.70, 5.5)
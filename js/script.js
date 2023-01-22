const track = document.getElementById("image-track");
window.onpointerdown = e => {
    track.dataset.mouseDownAt = e.clientX;
    e.preventDefault()
}

window.onpointermove = e => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
          maxDelta = window.innerWidth / 2;

    
    const percentage = (mouseDelta / maxDelta) * -100,
          nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    
    Math.max(percentage, 0);
    Math.min(percentage, -100);
    if (nextPercentage >= 0) return;
    if (nextPercentage <= -100)return;
    track.dataset.percentage = nextPercentage;
    
    //add an auto moving gallery | checkbox
    

    for(const image of track.getElementsByClassName('image')){
        image.animate({
            objectPosition: `${100 + nextPercentage}% 50%`
        },{duration:3500, fill: "forwards"});
        track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        },{duration: 3500, fill: "forwards"});
    }
}
window.onpointerup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}
window.onpointercancel = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}
const body = document.querySelector("body");
const IMG_NUMBER = 5;

const handleImgLoad = () => {
    console.log("finished loadings");
};

const paintImage = imgNumber => {
    const image = new Image();
    image.src = `./images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);

    //when using api
    //image.addEventListener("loadend", handleImgLoad);
};

const genRandom = () => {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
};

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();

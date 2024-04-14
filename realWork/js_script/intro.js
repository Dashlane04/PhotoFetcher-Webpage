






const img_link = ["assets/pexels-pixabay-36744.jpg","assets/pexels-tobi-620337.jpg","assets/pexels-photo-3419791.jpeg"];
const timer = setInterval(animate, 3000);
var img = document.getElementById("img_displ");
var dots = document.querySelectorAll("#dots div");
let i = 0;
function animate(){
    for(k = 0; k < dots.length; k++){
        dots[k].style.backgroundColor = "whitesmoke";
    }
    dots[i].style.backgroundColor = "gray";
    img.style.backgroundImage = "url" + "('" + img_link[i] + "')";
    i++;
    if(i >= dots.length){
        i = 0;
    }
}


document.querySelector(".tech svg").addEventListener("click", () => {
    window.location.href = "https://www.pexels.com/api/";
})

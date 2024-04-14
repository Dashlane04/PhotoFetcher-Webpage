
const API_KEY = "563492ad6f917000010000012d35456b2b074467a37ba4ad61d27445"; //pexels api key

var isSearchResultsProcess;
var currentQUERY;
const num = 15;
var pg = 1;
var imageList = document.querySelectorAll(".results .child");
var loader = document.querySelector("#loader");

var searchInput = document.querySelector("#queries");
document.getElementById("close").addEventListener("click", () => {
    document.querySelector(".backdrop").style.display = "none";
    document.querySelector(".popUp").style.display = "none";
    document.body.classList.remove("stop-scrolling")
})



document.addEventListener("keyup", (e) => {
    e.preventDefault()
   
    if(e.key === "Enter" && searchInput == document.activeElement){
        

        
        let QUERY = searchInput.value;
        currentQUERY = QUERY;
        imgDisplay.innerHTML = "";
        pg = 1;

       
       
        setTimeout(waitImage(),2000);
        loader.style.display = "block";
        
        function waitImage(){
            document.getElementById("stats").innerText = "";
            searchImages(QUERY,15,1);
            
        }
        
        
}})


var imgDisplay = document.querySelector(".results");
var popUp = document.querySelector("#details");




document.addEventListener('DOMContentLoaded', function(e) {
    document.getElementById("stats").style.display = "none";
    document.querySelector(".backdrop").style.display = "none";
    fetchImages(15,1)
})
async function searchImages(query,number,page){
     isSearchResultsProcess = true;
     loader.style.display = "none";
     
    let data = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${number}`, {
        method: 'GET',
        mode: "cors",
        headers: {    
            'Authorization': API_KEY
        }
    }).then(res => res.json());
    document.getElementById("stats").style.display = "block";
    document.getElementById("stats").innerText = `Found ${data.total_results} images about "${currentQUERY}"`;
    const images = data.photos;
    GenerateHTML(images);
    console.log(`Search for ${query} successful!`)
}

async function fetchImages(number,page){
    let data = await fetch(`https://api.pexels.com/v1/curated?page=${page}&per_page=${number}`, {
        method: 'GET',
        mode: "cors",
        headers: {    
            'Authorization': API_KEY,
        }
    }).then(res => res.json());
    console.log(data)
    const images = data.photos;
    GenerateHTML(images);
}


//observer API
const options = {
    root: null, 	// sets the framing element to the viewport
    rootMargin: "500px" ,
    threshold: 0
}
const checkpointObserver = new IntersectionObserver((entries) => {            //observe checkpoints when user scroll to, load more images, only triggers once then unobserve that checkpoint 
    entries.forEach(entry => {
        if(entry.isIntersecting){
            pg++;
            
            if(isSearchResultsProcess == true){
                searchImages(currentQUERY,num,pg)
            }
            else{
                fetchImages(num,pg);

            }   
            checkpointObserver.unobserve(entry.target)        
            
        }
        else{
            console.log("bye")
        }
       
    })
}, options)
  
const imageObserver = new IntersectionObserver((entries) => {       //observe every image when comes in viewport, loads image
    entries.forEach(entry => {
        if(entry.isIntersecting){
            let newURL = entry.target.getAttribute("data-src");
            entry.target.src = newURL
        }
        else{
           
        }
    })
}, options)

function GenerateHTML(d){
    for(let i = 0; i < d.length; i++){
        let wrapper = document.createElement("div");          
        let inside = document.createElement("div")
        let newImg = document.createElement("img");

        let newDiv = imgDisplay.appendChild(wrapper);       //outermost layer of image card, container
        let info = newDiv.appendChild(inside)              //info section : when hovered at bottom of card
        let content = newDiv.appendChild(newImg)          //image
        
        newDiv.classList.add("container")
        info.classList.add("overlay_info")
        info.innerHTML = `<p class = "details">${d[i].photographer} - ${d[i].id}</p>`;
        
      


        content.setAttribute("data-src", d[i].src.large2x)
        content.setAttribute("data-original", d[i].src.original)           //image sizes and orientations
        content.setAttribute("data-medium", d[i].src.medium)
        content.setAttribute("data-landscape", d[i].src.landscape)
        content.setAttribute("data-portrait", d[i].src.portrait)

        content.src = "";
        content.classList.add("child")
        
        content.addEventListener("click", () => {
           let order = ['original','src','medium','landscape','portrait']
           for(let i = 0; i < imageSizing.length; i++){
               let selfURL = content.getAttribute(`data-${order[i]}`)
               imageSizing[i].setAttribute("src-download", selfURL) ;
           }
           initializeURLForDownload();




            document.querySelector(".backdrop").style.display = "block";
            document.querySelector(".popUp").style.display = "block";
            let org_src = content.getAttribute("data-src");
            let show = document.getElementById("showcaseImage");
            document.body.classList.add("stop-scrolling")
            show.src = org_src;
            show.style.width = "20em";
            show.style.height = "fit-content";
            show.style.marginTop = "10px"
        })

        
    }

    

    
    imageList = document.querySelectorAll(".results .child");
    console.log(imageList)
    imageList.forEach(image => {imageObserver.observe(image)})    //observe every image 

    for(let i = 0; i < imageList.length; i++){
        if(i = num * pg - 1){
            imageList[i].classList.add("checkpoint");
            var check = imageList[i];
            checkpointObserver.observe(check);
        }
    }
   
    
}





//DOWNLOAD IMAGES
const imageSizing = document.getElementsByClassName("download-option");

function initializeURLForDownload(){
    for(let i = 0; i < imageSizing.length; i++){
        imageSizing[i].addEventListener('click', (event) => {
            let url = imageSizing[i].getAttribute("src-download");
            event.preventDefault();
            console.log(url)
            downloadImage(url);
          }) 
    }
}


function downloadImage(url) {
  /*fetch(url, {
    mode : 'no-cors',
  })
    .then(response => response.blob())
    .then(blob => {
    let blobUrl = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.download = url.replace(/^.*[\\\/]/, '');
    a.href = blobUrl;
    document.body.appendChild(a);
    a.click();
    a.remove();
  })*/

  var a = document.createElement('a');
  a.href = url; 
  a.download = 'image.jpg';
  document.body.appendChild(a);
  a.setAttribute("target", "blank")
  window.open(a.href)
 
}










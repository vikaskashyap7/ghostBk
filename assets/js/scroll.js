document.addEventListener("scroll", (event) => {
    const elem = document.getElementById("fadeout-animation");
    // console.log(event);
    // console.log(window.scrollY, window.screen.height);
    if (window.scrollY / window.screen.height >= 0.7) {
        // console.log("yes");
        //fade out
        elem.classList.add("fade");
    } else {
        elem.classList.remove("fade");
    }

})

function checkHeight() {
    const elem = document.getElementById("homepage_newposts");
    const childs = elem.childNodes;
    const postcards = [];
    var maxHeight = 0;
    childs.forEach((child) => {
        if (child.classList) {
            if (child.classList.contains("col-md-6")) {
                postcards.push(child);
            }
        }
    });
    console.log(postcards);
    postcards.map((card) => {
        const height = card.offsetHeight;
        console.log(height);
        if (maxHeight < height) {
            maxHeight = height;
        }
    })
    return maxHeight;
}

function setHeight() {
    const height = checkHeight();
    console.log(height);
    const elem = document.getElementById("homepage_newposts");
    const btn1 = document.getElementById("postscrollbutton1");
    const btn2 = document.getElementById("postscrollbutton2");
    elem.style.height = height + "px";
    btn1.style.height = height + "px";
    btn2.style.height = height + "px";
}


// new ResizeObserver(() => {
//     setTimeout(() => {
//     // setHeight();
        
//     }, 500);
// }).observe(document.body)


function scrollPostsLeft() {
    const temp = document.getElementById("homepage_newposts");
    temp.scroll({
        left: temp.scrollLeft - window.screen.width/2,
        behavior: "smooth"
});
}


function scrollPostsRight() {
    const temp = document.getElementById("homepage_newposts");
    temp.scroll({
        left: temp.scrollLeft + window.screen.width/2,
        behavior: "smooth"
});
}
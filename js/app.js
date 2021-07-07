console.log("Coded By MKZ");
const links = document.querySelector("#navbarLinks")
storeScrollPosition(); // for first load

document.addEventListener('scroll', () => {
    storeScrollPosition();
});

function storeScrollPosition(){
    document.documentElement.dataset.scroll = window.scrollY;
}

function mobileNavbar(){
    // if (links.style.display === "flex") {
    //     links.style.display = "none";
    //   } else {
    //     links.style.display = "flex";
    //   }
}
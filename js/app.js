console.log("Coded By MKZ");
storeScrollPosition(); // for first load
const projectsElement = document.querySelector("#projectsBody ul");

let projectsArr = [
    {
        photoUrl: "mryazilim.jpg",
        header: "MR Yazılım",
        description:
            "Arkadaşımla birlikte Türkçe içerikli yazılım öğretimine destek amacıyla oluşturulan içerinde Ne Nedir? gibi bilgilendirme amaçlı bölümlerde olan Websitesi.",
        link:"https://www.mryazilim.net/"    
    },
    {
        photoUrl: "citywalkz.jpg",
        header: "City Walkz",
        description:"Youtube Iframe API kullanılarak oturduğumuz yerden dünya üzerindeki şehirleri yürüyerek gezme hazzı yaşatması için yapılan Websitesi.",
        link:"https://citywalkz.herokuapp.com/"    
    },
];

projectsArr.forEach(p => {
    const li = document.createElement("li");

    const liPhoto = document.createElement("div");
    liPhoto.id = "liPhoto";
    
    const liPhotoImg = document.createElement("img");
    liPhotoImg.src = "./images/projects/" + p.photoUrl;
    liPhotoImg.alt = p.photoUrl;
    liPhotoImg.className = "imageRadius";
    liPhotoImg.style.width = "100%";

    const liHeader = document.createElement("div");
    liHeader.id = "liHeader";
    liHeader.innerHTML = "<h2>"+ p.header +"</h2>"
    
    const liData = document.createElement("div");
    liData.id = "liData";
    liData.innerHTML = p.description;
    
    const link = document.createElement("div");
    link.id = "Link";
    
    const linkAElement = document.createElement("a");
    linkAElement.href = p.link;
    linkAElement.target = "_blank";
    
    const span = document.createElement("span");
    span.innerHTML = " " + p.header + " ";
    
    const svg = document.createElement("img");
    svg.src = "./images/svg/external-link.svg";
    svg.alt = "linkSVG";
    svg.style.height = "18px";
    svg.style.marginLeft = "2px";
    svg.style.marginBottom = "-2px";
    
    liPhoto.appendChild(liPhotoImg);

    linkAElement.appendChild(span);
    linkAElement.appendChild(svg);

    link.appendChild(linkAElement);

    li.appendChild(liPhoto);
    li.appendChild(liHeader);
    li.appendChild(liData);
    li.appendChild(link);

    projectsElement.appendChild(li);
});

document.addEventListener("scroll", () => {
    storeScrollPosition();
});

function storeScrollPosition() {
    document.documentElement.dataset.scroll = window.scrollY;
}

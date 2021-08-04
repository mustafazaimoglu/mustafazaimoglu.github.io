console.log("Coded By MKZ");
storeScrollPosition(); // for first load
const projectsElement = document.querySelector("#projectsBody ul");
const sayingElement = document.querySelector("#footerUp");
let sayings = [
    "We all have two lives. The second begins when you realise you only have one",
    "The real knowledge is to know that you know nothing",
    "Trees grow in silence",
    "Yesterday is history, tomorrow is a mistery but today is a gift. That is why it is called present",
    "Have more than you show, speak less than you know",
    "If you believe you will never get better, you are correct. If you believe you can get better, you are more correct",
];
getJSON();

function getJSON() {
    fetch("./js/projects.json")
        .then((response) => response.json())
        .then((data) => renderUI(data))
        .catch((err) => console.error(err));
}

sayingElement.innerHTML =
    '"' + sayings[Math.floor(Math.random() * sayings.length)] + '"';

function renderUI(projetcs) {
    projetcs.forEach((p) => {
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
        liHeader.innerHTML = "<h2>" + p.header + "</h2>";

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
}

document.addEventListener("scroll", () => {
    storeScrollPosition();
});

function storeScrollPosition() {
    document.documentElement.dataset.scroll = window.scrollY;
}

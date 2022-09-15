console.log("Coded By MKZ");

storeScrollPosition(); // for first load

var dropDownStatus = false;
const projectsElement = document.querySelector(
    "#projectsBody #projectListParent"
);
const sayingElement = document.querySelector("#footerUp");
const dropDownOpenButton = document.querySelector("#mobileNavOpenButton img");
const dropDownCloseButton = document.querySelector("#mobileNavCloseButton");
const dropDownMenu = document.querySelector("#mobileDropDownNav");
const accounts = document.querySelector(".accounts-position");
const navLinks = document.getElementsByClassName("shutDropDown");

for (let element of navLinks) {
    element.addEventListener("click", closeDropDown);
}

dropDownOpenButton.addEventListener("click", openDropDown);
dropDownCloseButton.addEventListener("click", closeDropDown);

window.addEventListener("resize", reportWindowSize);

document.addEventListener("scroll", () => {
    storeScrollPosition();
});

let sayings = [
    "We all have two lives. The second begins when you realise you only have one",
    "The real knowledge is to know that you know nothing",
    "Trees grow in silence",
    "The trouble is, you think you have time",
    "Yesterday is history, tomorrow is a mistery but today is a gift. That is why it is called present",
    "Have more than you show, speak less than you know",
    "Dear past, thanks for all the lessons",
    "Work until you no longer have to introduce yourself",
    "If you believe you will never get better, you are correct. If you believe you can get better, you are more correct",
];

getJSON();

function reportWindowSize() {
    if (window.innerWidth > 768) {
        resetMarginAccounts();
    } else {
        if (!dropDownStatus) {
            addMarginToAccounts();
        }
    }
}

function openDropDown() {
    dropDownMenu.style.height = "100%";
    resetMarginAccounts();
    dropDownStatus = true;
}

function closeDropDown() {
    dropDownMenu.style.height = "0%";
    addMarginToAccounts();
    dropDownStatus = false;
}

function addMarginToAccounts() {
    accounts.style.marginBottom = "-3.5rem";
}

function resetMarginAccounts() {
    accounts.style.marginBottom = "unset";
}

function getJSON() {
    fetch("./js/projects.json")
        .then((response) => response.json())
        .then((data) => renderUI(data))
        .catch((err) => console.error(err));
}

function storeScrollPosition() {
    document.documentElement.dataset.scroll = window.scrollY;
}

sayingElement.innerHTML =
    '"' + sayings[Math.floor(Math.random() * sayings.length)] + '"';

function renderUI(projetcs) {
    projetcs.forEach((p) => {
        const projectListItemHolder = document.createElement("div");
        projectListItemHolder.id = "projectListItemHolder";

        const projectListItem = document.createElement("div");
        projectListItem.id = "projectListItem";

        const date = document.createElement("div");
        date.id = "date";
        date.innerHTML = "Yayın Tarihi : " + p.releaseDate;

        const upDiv = document.createElement("div");

        const liPhoto = document.createElement("div");
        liPhoto.id = "liPhoto";

        const liPhotoImg = document.createElement("img");
        liPhotoImg.src = "./images/projects/" + p.photoUrl;
        liPhotoImg.alt = p.photoUrl;
        liPhotoImg.className = "imageRadius";
        liPhotoImg.style.width = "100%";

        liPhoto.appendChild(liPhotoImg);

        const liHeader = document.createElement("div");
        liHeader.id = "liHeader";
        liHeader.innerHTML = "<h2>" + p.header + "</h2>";

        const liData = document.createElement("div");
        liData.id = "liData";
        liData.innerHTML = p.description;

        upDiv.appendChild(liPhoto);
        upDiv.appendChild(liHeader);
        upDiv.appendChild(liData);

        const downDiv = document.createElement("div");

        const technologiesDiv = document.createElement("div");
        technologiesDiv.className = "technologies";

        p.technologies.forEach((techs) => {
            const badgeSpan = document.createElement("span");
            badgeSpan.className = "badge";
            badgeSpan.innerHTML = techs;
            technologiesDiv.appendChild(badgeSpan);
        });

        const AElement = document.createElement("a");
        AElement.href = p.link;
        AElement.target = "_blank";

        const link = document.createElement("div");
        link.id = "Link";

        const span = document.createElement("span");
        span.innerHTML = " " + p.header + " ";

        const svg = document.createElement("img");
        svg.src = "./images/svg/external-link.svg";
        svg.alt = "linkSVG";
        svg.style.height = "18px";
        svg.style.marginLeft = "2px";
        svg.style.marginBottom = "-2px";

        link.appendChild(span);
        link.appendChild(svg);

        AElement.appendChild(link);

        downDiv.appendChild(technologiesDiv);
        downDiv.appendChild(AElement);

        projectListItem.appendChild(upDiv);
        projectListItem.appendChild(downDiv);

        projectListItemHolder.appendChild(projectListItem);
        projectListItemHolder.appendChild(date);

        projectsElement.appendChild(projectListItemHolder);
    });
}

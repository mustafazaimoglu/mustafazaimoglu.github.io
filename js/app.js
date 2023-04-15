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

getProjects();
getSayings();

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

function getProjects() {
    fetch("./res/projects.json")
        .then((response) => response.json())
        .then((data) => renderProjectsOnUI(data))
        .catch((err) => console.error(err));
}

function getSayings() {
    fetch("./res/sayings.json")
        .then((response) => response.json())
        .then((data) => renderOneSayingOnUI(data))
        .catch((err) => console.error(err));
}

function storeScrollPosition() {
    document.documentElement.dataset.scroll = window.scrollY;
}

function renderOneSayingOnUI(sayings){
    sayingElement.innerHTML =
    '"' + sayings[Math.floor(Math.random() * sayings.length)] + '"';
}

function offlineProjectFooter(){
    const offlineLinkContainer = document.createElement("div");
    offlineLinkContainer.id = "offlineLinkContainer"

    const offlineLink = document.createElement("div");
    offlineLink.id = "offlineLink";

    const span = document.createElement("span");
    span.innerHTML = " Offline ";

    offlineLink.appendChild(span);
    offlineLinkContainer.appendChild(offlineLink);

    return offlineLinkContainer;
}

function onlineProjectFooter(links){
    const length = links.length;
    const onlineLinkContainer = document.createElement("div");
    onlineLinkContainer.id = "onlineLinkContainer"
    links.forEach((l,index) => {
        const AElement = document.createElement("a");
        AElement.href = l.url;
        AElement.target = "_blank";
        
        const link = document.createElement("div");
        link.id = "Link";   
        
        if (length > 1) {
            if (index === 0) {
                link.className = "right-border-1px"
            } else if (index === length - 1) {
                link.className = "left-border-1px"
            } else {
                link.className = "right-border-1px left-border-1px"
            }
        }
    
        const span = document.createElement("span");
        span.innerHTML = " " + l.name + " ";
    
        const svg = document.createElement("img");
        svg.src = "./images/svg/external-link.svg";
        svg.alt = "linkSVG";
        svg.style.height = "18px";
        svg.style.marginLeft = "2px";
        svg.style.marginBottom = "-2px";
    
        link.appendChild(span);
        link.appendChild(svg);
    
        AElement.appendChild(link);
        onlineLinkContainer.appendChild(AElement)
    });

    return onlineLinkContainer;
}

function renderProjectsOnUI(projetcs) {
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

        downDiv.appendChild(technologiesDiv);
        if (p.isLive) {
            downDiv.appendChild(onlineProjectFooter(p.links))
        } else {
            downDiv.appendChild(offlineProjectFooter());
        }

        projectListItem.appendChild(upDiv);
        projectListItem.appendChild(downDiv);

        projectListItemHolder.appendChild(projectListItem);
        projectListItemHolder.appendChild(date);

        projectsElement.appendChild(projectListItemHolder);
    });
}

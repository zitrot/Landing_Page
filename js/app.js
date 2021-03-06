/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
let SectionActive;
const Sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function BuildNav() {
    let NavElement = document.querySelector('#navbar__list');
    for (let section of Sections) {
        let SectionName = section.getAttribute('data-nav');
        let LinkItem = document.createElement('li');
        LinkItem.textContent = SectionName;
        LinkItem.classList.add("menu__link");
        NavElement.appendChild(LinkItem);
        LinkItem.addEventListener('click', ScrollToAnchorID);
    }

}

// Add class 'active' to section when near top of viewport, 
function AddClassActiveToSection(e) {

    let TopResponsive, BottomResponsive;
    if (document.documentElement.clientWidth < 1000) {
        TopResponsive = 500, BottomResponsive = 500;
    } else {
        TopResponsive = 100, BottomResponsive = 100;
    }
    for (let section of Sections) {
        var rect = section.getBoundingClientRect();
        console.log("recttop" + rect.top + TopResponsive);
        console.log(rect.bottom - BottomResponsive);
        if (rect.top + TopResponsive >= 0 &&
            rect.left >= 0 &&
            rect.bottom - BottomResponsive <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)) {
            console.log(section);
            if (section.classList.contains("your-active-class") == false)
                section.classList.add("your-active-class");
        } else if (section.classList.contains("your-active-class")) {
            section.classList.remove("your-active-class");
        }
    }
}

// Scroll to anchor ID using scrollTO event
function ScrollToAnchorID(e) {
    for (let section of Sections) {
        if (e.target.textContent == section.getAttribute('data-nav')) {
            let TopResponsive
            if (document.documentElement.clientWidth < 1000) {
                TopResponsive = 180;
            } else {
                TopResponsive = 120;
            }
            window.scrollTo({
                top: getOffset(section).top - TopResponsive,
                left: getOffset(section).left,
                behavior: 'smooth'
            });
        }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
document.addEventListener('DOMContentLoaded', BuildNav());

// Scroll to section on link click

// Set sections as active
window.addEventListener("scroll", AddClassActiveToSection);
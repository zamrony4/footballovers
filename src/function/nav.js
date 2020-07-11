// Import Data
import navData from "../data/navData.js";

// Import Function
import { loadPage } from "./page.js";

// Activate sidebar nav
const sidenavElem = document.querySelectorAll(".sidenav");
const option = {'isFixed': true}
M.Sidenav.init(sidenavElem, option);

// Function
const loadNav = () => {
    let navHtml = ""
    navData.forEach(result => {
        navHtml += `
            <li><a class="waves-effect" href="${result.url}">${result.name}</a></li>
        `
    });

    document.querySelectorAll(".mainnav, .sidenav").forEach(elm => {
        elm.innerHTML = navHtml;                    
    })

    document.querySelectorAll(".sidenav a, .mainnav a").forEach(elm => {
        elm.addEventListener("click", event => {
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            const page = event.target.getAttribute("href").split('/')[1];
            loadPage(page)
        })
    })
}

export {loadNav};
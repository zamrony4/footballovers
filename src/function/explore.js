// Import Data
import league from "../data/league.js";

// import Function
import { dateFormat } from "./fnDateFormat.js";
import { loadPage } from "./page.js";
import { getStanding, getMatches } from "./fnLeague.js";

const loadLeague = () => {
    const exploreLeague = document.getElementById("explore-league")

    let leageuHtml = `<div class="row">`
    league.forEach(result => {
        leageuHtml += `
        <a href="#/explore/${result.id}" class="data-league">
            <div class="col s6 m4">
                <div class="card">
                    <div class="card-content">
                        <img class="responsive-img" data-league="${result.id}" src="./assets/images/logo/${result.logo}">
                    </div>
                </div>
            </div>
            </a>
        `
    });

    leageuHtml += `</div>`

    exploreLeague.innerHTML = leageuHtml

    document.querySelectorAll(".data-league").forEach(elm => {
        elm.addEventListener("click", event => {
            const page = window.location.hash.split('/')[1]
            const idLeague = event.target.getAttribute("data-league");
            loadPage(page, idLeague)
        })
    })
}

const loadExploreLeague = (idLeague) => {
    const exploreLeague = document.getElementById("explore-league");
    const exploreTabsHtml = `
                    <div class="row">
                        <div class="col s12 mb-3">
                            <ul class="tabs mb-3" id="explore-tabs">
                                <li class="tab col s3"><a class="active" href="#explorestanding">Standing</a></li>
                                <li class="tab col s3"><a href="#explorefixtures">Fixtures</a></li>
                            </ul>
                        </div>
                        <div id="explorestanding" class="col s12 center-align">
                            <div class="preloader-wrapper big active mt-5">
                                <div class="spinner-layer spinner-green-only">
                                    <div class="circle-clipper left">
                                        <div class="circle"></div>
                                    </div><div class="gap-patch">
                                        <div class="circle"></div>
                                    </div><div class="circle-clipper right">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="explorefixtures" class="col s12 center-align">
                            <div class="preloader-wrapper big active mt-5">
                                <div class="spinner-layer spinner-green-only">
                                    <div class="circle-clipper left">
                                        <div class="circle"></div>
                                    </div><div class="gap-patch">
                                        <div class="circle"></div>
                                    </div><div class="circle-clipper right">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
    exploreLeague.innerHTML = exploreTabsHtml

    const tabExplore = document.querySelectorAll('.tabs');
    M.Tabs.init(tabExplore);

    getStanding(idLeague, 'explorestanding')
    getMatches(idLeague, 'explorefixtures', dateFormat(1, -3), dateFormat(1, 3))
}

export {loadLeague, loadExploreLeague}
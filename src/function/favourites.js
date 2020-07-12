// import Data
import league from "../data/league.js";

// import Function
import { getMatchAll, getClubAll } from "./database.js";

const loadFavourite = () => {
    const tabClass = document.querySelectorAll('.tabs');
    M.Tabs.init(tabClass);

    getMatchAll().then((favmatch) => {
        const favouritematch = document.getElementById("favouritematch");
        let resHtmlHead = "";
        if (favmatch.length > 0) {
            for (let i = 0; i < league.length; i++) {
                const resLeague = league[i];
                let resHtmlBody = ""
                let countMatches = 0
                favmatch.forEach(res => {
                    const scoreHome = res.score.fullTime.homeTeam === null ? '' : res.score.fullTime.homeTeam
                    const scoreAway = res.score.fullTime.awayTeam === null ? '' : res.score.fullTime.awayTeam
                    const statusMatch = res.status === 'FINISHED' ? `${scoreHome} <br> ${scoreAway}` : res.status
                    if (resLeague.id === res.competition.id) {
                        countMatches++
                        resHtmlBody += `<tr>
                        <td>${res.homeTeam.name} <br> ${res.awayTeam.name}</td>
                        <td>${statusMatch}</td>
                        <td width="8%">
                            <a href="javascript:void(0)" class="det-match"><i class="material-icons" data-id="${res.id}">info</i></a>
                        </td>
                        </tr>`
                    }
                });
    
                if (countMatches > 0) {
                    resHtmlHead += `<thead>
                                    <tr>
                                        <th colspan="3">${resLeague.name}</th>
                                    </tr>
                                </thead>
                                <tbody class="match-list">
                                ${resHtmlBody}
                                </tbody>`
                }
            }

            const resHtmlTable = `<table>${resHtmlHead}</table>`
            favouritematch.innerHTML = resHtmlTable;
        } else {
            const resHtmlTable = `<div>Data Not Found</div>`
            favouritematch.innerHTML = resHtmlTable;
        }
    })

    getClubAll().then((favclub) => {
        const favouriteclubs = document.getElementById("favouriteclubs");
        let resHtml = "";
        if (favclub.length > 0) {
            resHtml += '<div class="row">'

            favclub.forEach(res => {
                resHtml += `
                    <div class="col s12 m12 mt-3">
                        <div class="card-panel">
                            <div class="row valign-wrapper">
                                <div class="col s3">
                                    <img src="${res.crestUrl}" alt="" class="responsive-img"> <!-- notice the "circle" class -->
                                </div>
                                <div class="col s9">
                                    <h5 class="black-text">
                                        ${res.name}
                                    </h5>
                                    <a class="waves-effect waves-light btn btn-floating blue darken-1 det-club"><i class="material-icons" data-id="${res.id}">info</i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            });
            
            resHtml += '</div>'

            favouriteclubs.innerHTML = resHtml
        } else {
            const resHtmlTable = `<div>Data Not Found</div>`
            favouriteclubs.innerHTML = resHtmlTable;
        }
    })
}

export {loadFavourite}
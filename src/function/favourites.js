// import Data
import league from "../data/league.js";

// import Function
import { getMatchAll } from "./database.js";

const loadFavourite = () => {
    const tabClass = document.querySelectorAll('.tabs');
    M.Tabs.init(tabClass);

    // document.querySelectorAll(".data-tabs").forEach(elm => {
    //     elm.addEventListener("click", event => {
    //         const date = event.target.getAttribute("data-date");
    //         getMatches(0, 'home-table', date, date)
    //     })
    // })
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
                            <a href="javascript:void(0)" class="fav-match"><i class="material-icons" data-id="${res.id}">star_outline</i></a>
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
        }
    })
}

export {loadFavourite}
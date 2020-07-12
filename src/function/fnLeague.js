// Import Data
import api from "../data/api.js";
import league from "../data/league.js";

// Import Function
import { dateDiff, dateFormat } from "./fnDateFormat.js";
import { saveMatch } from "./database.js";

const getMatches = (idLeague, idHtml, dateFrom, dateTo) => {    
    if (idLeague == 0) idLeague = '2021,2014,2002,2019,2015'

    const selectIdHtml = document.getElementById(idHtml)
    const urlApi = `${api.url}matches?competitions=${idLeague}&dateFrom=${dateFrom}&dateTo=${dateTo}`
    
    selectIdHtml.innerHTML = `<tr>
                                <td colspan="3">
                                    <div class="preloader-wrapper large active loader">
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
                                </td>
                            </tr>`

    if ('caches' in window) {
        caches.match(urlApi).then(response => {
            if (response) {
                response.json().then(result => {
                    let resHtmlHead = "";

                    if (result.count === 0) {
                        resHtmlHead += `<tr>
                        <td colspan="3" align="center">No Match</td>
                        </tr>`
                    } else if (result.count > 0) {
                        if (idHtml === 'explorefixtures') {
                            for (let i = 0; i < dateDiff(dateFrom,dateTo); i++) {
                                const dateFull    = dateFormat(3, i, dateFrom)
                                const dateDefault = dateFormat(1, i, dateFrom)

                                let resHtmlBody = ""
                                let countMatches = 0
                                result.matches.forEach(res => {
                                    const scoreHome = res.score.fullTime.homeTeam === null ? '' : res.score.fullTime.homeTeam
                                    const scoreAway = res.score.fullTime.awayTeam === null ? '' : res.score.fullTime.awayTeam
                                    const statusMatch = res.status === 'FINISHED' ? `${scoreHome} <br> ${scoreAway}` : res.status
                                    if (dateDefault === dateFormat(1, 0, res.utcDate)) {
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
                                                        <th colspan="3">${dateFull}</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="match-list">
                                                ${resHtmlBody}
                                                </tbody>`
                                }
                            }
                        } else {
                            for (let i = 0; i < league.length; i++) {
                                const resLeague = league[i];
                                let resHtmlBody = ""
                                let countMatches = 0
                                result.matches.forEach(res => {
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
                        }
                    } else {
                        resHtmlHead += `<tr>
                        <td colspan="3" align="center">No Match</td>
                        </tr>`
                    }

                    let resHtmlTable = resHtmlHead
                                
                    if (idHtml === 'explorefixtures') {
                        resHtmlTable = `<table>${resHtmlHead}</table>`
                    }

                    selectIdHtml.innerHTML = resHtmlTable

                    document.querySelectorAll(".fav-match").forEach(elm => {
                        elm.addEventListener("click", event => {
                            const idMatch = event.target.getAttribute("data-id");
                            const dataMatch = getMatcheByID(idMatch)
                            dataMatch.then(result => {
                                saveMatch(idMatch, result.match)
                            })
                        })
                    })
                })
            }
        })
    }

    fetch(urlApi, {
        method: 'GET',
        headers: {
            'X-Auth-Token': api.token
        }
    })
    .then(response => response.json())
    .then(result =>  {
        let resHtmlHead = "";

        if (result.count === 0) {
            resHtmlHead += `<tr>
            <td colspan="3" align="center">No Match</td>
            </tr>`
        } else if (result.count > 0) {
            if (idHtml === 'explorefixtures') {
                for (let i = 0; i < dateDiff(dateFrom,dateTo); i++) {
                    const dateFull    = dateFormat(3, i, dateFrom)
                    const dateDefault = dateFormat(1, i, dateFrom)

                    let resHtmlBody = ""
                    let countMatches = 0
                    result.matches.forEach(res => {
                        const scoreHome = res.score.fullTime.homeTeam === null ? '' : res.score.fullTime.homeTeam
                        const scoreAway = res.score.fullTime.awayTeam === null ? '' : res.score.fullTime.awayTeam
                        const statusMatch = res.status === 'FINISHED' ? `${scoreHome} <br> ${scoreAway}` : res.status
                        if (dateDefault === dateFormat(1, 0, res.utcDate)) {
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
                                            <th colspan="3">${dateFull}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="match-list">
                                    ${resHtmlBody}
                                    </tbody>`
                    }
                }
            } else {
                for (let i = 0; i < league.length; i++) {
                    const resLeague = league[i];
                    let resHtmlBody = ""
                    let countMatches = 0
                    result.matches.forEach(res => {
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
            }
        } else {
            resHtmlHead += `<tr>
            <td colspan="3" align="center">No Match</td>
            </tr>`
        }

        let resHtmlTable = resHtmlHead
                    
        if (idHtml === 'explorefixtures') {
            resHtmlTable = `<table>${resHtmlHead}</table>`
        }

        selectIdHtml.innerHTML = resHtmlTable

        document.querySelectorAll(".fav-match").forEach(elm => {
            elm.addEventListener("click", event => {
                const idMatch = event.target.getAttribute("data-id");
                const dataMatch = getMatcheByID(idMatch)
                dataMatch.then(result => {
                    saveMatch(idMatch, result.match)
                })
            })
        })
    })
}

const getClubs = (idLeague, idHtml, season) => {
    const selectIdHtml = document.getElementById(idHtml)
    const urlApi = `${api.url}competitions/${idLeague}/teams?season=${season}`
    if ('caches' in window) {
        caches.match(urlApi).then(response => {
            if (response) {
                response.json().then(result => {
                    let resHtml = ""
                    if (result.count === 0) {
                        resHtml = '<h5>Data Not Found</h5>'
                    } else {
                        resHtml += '<div class="row">'

                        result.teams.forEach(res => {
                            resHtml += `
                                <div class="col s4 m3 mt-3">
                                    <div class="card" style="height: 150px">
                                        <div class="card-content">
                                            <img class="responsive-img" src="${res.crestUrl}">
                                        </div>
                                    </div>
                                </div>
                            `
                        });
                        
                        resHtml += '</div>'
                    }

                    selectIdHtml.innerHTML = resHtml
                })
            }
        })
    }

    fetch(urlApi, {
        method: 'GET',
        headers: {
            'X-Auth-Token': api.token
        }
    })
    .then(response => response.json())
    .then(result =>  {
        let resHtml = ""
        if (result.count === 0) {
            resHtml = '<h5>Data Not Found</h5>'
        } else {
            resHtml += '<div class="row">'

            result.teams.forEach(res => {
                resHtml += `
                    <div class="col s4 m3 mt-3">
                        <div class="card" style="height: 150px">
                            <div class="card-content">
                                <img class="responsive-img" src="${res.crestUrl}">
                            </div>
                        </div>
                    </div>
                `
            });
            
            resHtml += '</div>'
        }

        selectIdHtml.innerHTML = resHtml
    })
}

const getStanding = (idLeague, idHtml) => {
    const selectIdHtml = document.getElementById(idHtml)
    const urlApi = `${api.url}competitions/${idLeague}/standings`

    if ('caches' in window) {
        caches.match(urlApi).then(response => {
            if (response) {
                response.json().then(result => {
                    let resHtml = ""
                    resHtml += `<table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>TEAM</th>
                                <th>P</th>
                                <th>GD</th>
                                <th>PTS</th>
                            </tr>
                            </thead>
                            <tbody>`
        
                    result.standings[0].table.forEach(res => {
                        resHtml += `
                            <tr>
                                <td>${res.position}</td>
                                <td>${res.team.name}</td>
                                <td>${res.playedGames}</td>
                                <td>${res.goalDifference}</td>
                                <td>${res.points}</td>
                            </tr>
                        `
                    });
                    
                    resHtml += '</tbody></table>'
        
                    selectIdHtml.innerHTML = resHtml
                })
            }
        })
    }

    fetch(urlApi, {
        method: 'GET',
        headers: {
            'X-Auth-Token': api.token
        }
    })
    .then(response => response.json())
    .then(result =>  {
        let resHtml = ""
            resHtml += `<table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>TEAM</th>
                        <th>P</th>
                        <th>GD</th>
                        <th>PTS</th>
                    </tr>
                    </thead>
                    <tbody>`

            result.standings[0].table.forEach(res => {
                resHtml += `
                    <tr>
                        <td>${res.position}</td>
                        <td>${res.team.name}</td>
                        <td>${res.playedGames}</td>
                        <td>${res.goalDifference}</td>
                        <td>${res.points}</td>
                    </tr>
                `
            });
            
            resHtml += '</tbody></table>'

        selectIdHtml.innerHTML = resHtml
    })
}

const getMatcheByID = (idMatch) => {
    const urlApi = `${api.url}matches/${idMatch}`

    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(urlApi).then(response => {
                if (response) {
                    response.json().then(data => {
                        resolve(data)
                    })
                }
            })
        }

        fetch(urlApi, {
            method: 'GET',
            headers: {
                'X-Auth-Token': api.token
            }
        }).then(response => {
            if (response) {
                response.json().then(data => {
                    resolve(data)
                })
            }
        })

    })
}

export {getMatches, getClubs, getStanding}
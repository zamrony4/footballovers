// import Function
import { getClubByID } from "./fnLeague.js";

const loadClub = (idClub) => {
    const dataClub = getClubByID(idClub);

    dataClub.then(result => {
        console.log(result);
        const idSelectHtml = document.getElementById('club-page')

        idSelectHtml.innerHTML = ''
    })
}

export {loadClub}
// Import Function
import { loadMatches } from "./home.js";
import { loadLeague, loadExploreLeague } from "./explore.js";
import { loadFavourite } from "./favourites.js";
import { loadClub } from "./club.js";

const loadPage = (page, id = 0) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            const content = document.querySelector("#body-content")

            if (this.status == 200) {
                content.innerHTML = xhr.responseText;
                if (page === 'home') {
                    loadMatches()
                } else if (page === 'explore') {
                    if (id === 0) {
                        loadLeague()
                    } else {
                        loadExploreLeague(id)
                    }
                } else if (page === 'favourites') {
                    loadFavourite()
                } else if (page === 'club') {
                    loadClub(id)
                }
            } else if (this.status == 404) {
                content.innerHTML = `<p>Halaman ${page} tidak ditemukan.</p>`;
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    }

    xhr.open("GET", "pages/" + page + ".html", true);
    xhr.send();
}

export {loadPage};
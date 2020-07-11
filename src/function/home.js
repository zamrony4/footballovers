// import Function
import { dateFormat } from "./fnDateFormat.js";
import { getMatches } from "./fnLeague.js";

const loadMatches = () => {
    const dateTwoAgo   = dateFormat(2, -2);
    const dateOneAgo   = dateFormat(2, -1);
    const dateNow      = dateFormat(2);
    const dateOneLater = dateFormat(2, 1);
    const dateTwoLater = dateFormat(2, 2);
    
    getMatches(0, 'home-table', dateFormat(1), dateFormat(1))

    const homeTabs = document.getElementById("home-tabs");
    const homeTabsHtml = `<li class="tab col s3"><a href="#test1" class="data-tabs" data-date="${dateFormat(1, -2)}">${dateTwoAgo}</a></li>
                    <li class="tab col s3"><a href="#test4" class="data-tabs" data-date="${dateFormat(1, -1)}">${dateOneAgo}</a></li>
                    <li class="tab col s3"><a class="active data-tabs" href="#test2" data-date="${dateFormat(1)}">${dateNow}</a></li>
                    <li class="tab col s3"><a href="#test4" class="data-tabs" data-date="${dateFormat(1, 1)}">${dateOneLater}</a></li>
                    <li class="tab col s3"><a href="#test4" class="data-tabs" data-date="${dateFormat(1, 2)}">${dateTwoLater}</a></li>
                    `
    homeTabs.innerHTML = homeTabsHtml

    const tabClass = document.querySelectorAll('.tabs');
    M.Tabs.init(tabClass);

    document.querySelectorAll(".data-tabs").forEach(elm => {
        elm.addEventListener("click", event => {
            const date = event.target.getAttribute("data-date");
            getMatches(0, 'home-table', date, date)
        })
    })
}

export {loadMatches}
// Import Data

// Import function
import { loadPage } from "./function/page.js";
import { loadNav } from "./function/nav.js";

// load Function
loadNav();
let page = window.location.hash.split('/')[1];
let id   = window.location.hash.split('/')[2];

if (page == undefined) page = "home";
if (id == undefined) id = 0;

loadPage(page, id);
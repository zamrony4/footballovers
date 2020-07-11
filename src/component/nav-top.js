class navTop extends HTMLElement {
    connectedCallback() {
        this.render();
        const sidenavElem = document.querySelectorAll(".sidenav");
        M.Sidenav.init(sidenavElem);
    }
    
    render() {
        let cardData = `<nav class="green accent-4">
                    <div class="nav-wrapper container">
                    <a href="#" class="brand-logo">FOOTBALL APPS</a>
                    <a href="#" class="sidenav-trigger" data-target="nav-mobile">☰</a>
                    
                    <ul class="mainnav right hide-on-med-and-down"></ul>
                    <ul class="sidenav" id="nav-mobile"></ul>
                    </div>
                </nav>`
        this.innerHTML = cardData
    }
}

customElements.define("nav-top", navTop);
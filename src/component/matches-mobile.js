class MatchesMobile extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    render() {
        const elementHtml = `<div>asdasd</div>`
        
        this.innerHTML = elementHtml
    }
}

customElements.define("matches-mobile", MatchesMobile)
console.debug("Hotkeys loaded")

//use console table to print all hotkeys and what they do
console.table([
    { "keys": "alt + d", "description": "delete current note" },
    { "keys": "alt + n", "description": "create new note" },
    { "keys": "alt + 0-9", "description": "open n`th note" },
])

document.onkeydown = async function (e) {
    if (e.altKey && e.key === "d") {
        clickBin()
        window.setTimeout(confirmDelete, 20)
        e.preventDefault()
    }
    if (e.altKey && e.key === "n") {
        clickNew()
        e.preventDefault()
    }

    if (e.altKey && e.key >= 0 && e.key <= 9) {
        const idx = parseInt(e.key)
        const notes = document.querySelectorAll("nav > div > div > a")
        console.debug("notes", notes)
        if (idx <= notes.length) {
            notes[idx - 1].click()
        }
        e.preventDefault()
    }
}

function findBin() {
    let html = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`
    const elements = document.querySelectorAll('nav div svg')
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].outerHTML === html) {
            return elements[i]
        }
    }
    return null
}

function clickBin() {
    const bin = findBin()
    if (bin) {
        bin.parentElement.click()
    }
}

function confirmDelete() {
    const bin = findBin()
    if (bin) {
        bin.nextSibling.nextSibling.firstChild.click()
    }
}

function clickNew() {
    document.querySelector("nav > a:first-child").click()
}
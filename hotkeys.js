console.debug("Hotkeys loaded")

console.table([
    { "keys": "alt + d", "description": "delete current chat" },
    { "keys": "alt + n", "description": "create new chat" },
    { "keys": "alt + 0", "description": "selects gpt-3 model" },
    { "keys": "alt + 1", "description": "selects first model in GPT-4 class" },
    { "keys": "alt + 2", "description": "selects second model in GPT-4 class" },
    { "keys": "alt + 3", "description": "selects third model in GPT-4 class" },
    { "keys": "alt + 4", "description": "selects fourth model in GPT-4 class" },
])

document.onkeydown = async function(e) {
    if (e.altKey && e.key === "d") {
        clickBin()
        window.setTimeout(confirmDelete, 20)
        e.preventDefault()
    }
    if (e.altKey && e.key === "n") {
        clickNew()
        e.preventDefault()
    }
    if (e.altKey && e.key === "0") {
        clickGpt3()
        e.preventDefault()
    }
    if (e.altKey && e.key === "1") {
        clickModel(1)
        e.preventDefault()
    }
    if (e.altKey && e.key === "2") {
        clickModel(2)
        e.preventDefault()
    }
    if (e.altKey && e.key === "3") {
        clickModel(3)
        e.preventDefault()
    }
    if (e.altKey && e.key === "4") {
        clickModel(4)
        e.preventDefault()
    }
    if ((e.altKey && e.key === "ArrowDown") || (e.altKey && e.key === "j")) {
        selectNextChat()
        e.preventDefault()
    }
    if ((e.altKey && e.key === "ArrowUp") || (e.altKey && e.key === "k")) {
        selectPreviousChat()
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
    document.querySelector("nav > div > a:first-child").click()
}

function clickGpt3() {
    document.querySelector(`ul > li:nth-child(1) > button`).click()
}

function mouseoverGpt4() {
    let event = new MouseEvent('mouseover', {
        'view': window,
        'bubbles': true,
    })
    document.querySelector(`ul > li:nth-child(2)`).dispatchEvent(event)
}

function clickModel(number) {
    mouseoverGpt4()
    window.setTimeout(() => {
        document.querySelector(`body > div[data-radix-popper-content-wrapper] > div > div > div:nth-child(2) > div:nth-child(${number})`).click()
    }, 10)
}

function selectNextChat() {
    let chats = document.querySelectorAll('nav div ol li a')
    let selectedIndex = undefined
    for (let i = 0; i < chats.length; i++) {
        if (chats[i].classList.contains('bg-gray-800')) {
            selectedIndex = i
            break
        }
    }

    if (selectedIndex === undefined) {
        chats[0].click()
    } else {
        if (selectedIndex < chats.length - 1) {
            chats[selectedIndex + 1].click()
        }
    }
}

function selectPreviousChat() {
    let chats = document.querySelectorAll('nav div ol li a')
    let selectedIndex = undefined
    for (let i = 0; i < chats.length; i++) {
        if (chats[i].classList.contains('bg-gray-800')) {
            selectedIndex = i
            break
        }
    }

    if (selectedIndex === undefined) {
        chats[chats.length - 1].click()
    } else {
        if (selectedIndex > 0) {
            chats[selectedIndex - 1].click()
        }
    }
}

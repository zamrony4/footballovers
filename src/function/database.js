const dbPromised = idb.open("footballovers", 1, upgradeDB => {
    const favmatchObjectStore = upgradeDB.createObjectStore("favmatch", {
        keyPath: "id"
    })
})

const saveMatch = (idMatch) => {
    M.toast({html: `I am a toast! ${idMatch}`})
}

export {saveMatch}
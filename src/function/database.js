const dbPromised = idb.open("footballovers11", 1, upgradeDB => {
    const favmatchObjectStore = upgradeDB.createObjectStore("favmatch", {
        keyPath: "id"
    })

    const favClubObjectStore = upgradeDB.createObjectStore("favclub", {
        keyPath: "id"
    })
})

const saveMatch = (idMatch, dataMatch) => {
    dbPromised
    .then(function(db) {
        const tx = db.transaction("favmatch", "readwrite");
        const store = tx.objectStore("favmatch");

        store.add(dataMatch);
        return tx.complete;
    })
    .then(function() {
        M.toast({html: `Match added to favourites`})
    });
}

const getMatchAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised
        .then(function(db) {
            const tx = db.transaction("favmatch", "readonly");
            const store = tx.objectStore("favmatch");
            return store.getAll();
        })
        .then(function(favmatch) {
            resolve(favmatch);
        });
    })
}

const saveClub = (idClub, dataClub) => {
    dbPromised
    .then(function(db) {
        const tx = db.transaction("favclub", "readwrite");
        const store = tx.objectStore("favclub");

        store.add(dataClub);
        return tx.complete;
    })
    .then(function() {
        M.toast({html: `Club added to favourites`})
    }).
    catch(function(error) {
        M.toast({html: `Club added error`})
        console.log(error)
    });
}

const getClubAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised
        .then(function(db) {
            const tx = db.transaction("favclub", "readonly");
            const store = tx.objectStore("favclub");
            return store.getAll();
        })
        .then(function(favclub) {
            resolve(favclub);
        });
    })
}

export {saveMatch, getMatchAll, saveClub, getClubAll}
class VillageHandler {
    
    static getVillages() {
        let villages = {};
        const villageRows = document.querySelectorAll('#sidebarBoxVillagelist a');
        for (const element of villageRows) {
            villages[new URL(element.href).searchParams.get('newdid')] = element.querySelector('.name').innerText;
        }
        return villages;
    }

}

export { VillageHandler };
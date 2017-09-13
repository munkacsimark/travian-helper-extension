class UiCleaner {

    static clearUi = () => {
        const selectorList = [
            '#sidebarBoxLinklist',
            'li.gold, button.gold',
        ];
        for (const item of selectorList) {
            const elements = document.querySelectorAll(item);
            for (const element of elements) {
                element.style.display = 'none';
            }
        }
    }

}

export default UiCleaner;

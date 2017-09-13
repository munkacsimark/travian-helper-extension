class AttackDetector {

    static isAttack = () => {
        const attackImageName = 'att1.gif';
        const movementImagesSelector = '#movements td a img';
        const movementImages = document.querySelectorAll(movementImagesSelector);
        for (let i = 0; i < movementImages.length; ++i) {
            const bgImageValue = getComputedStyle(movementImages[i])['background-image'];
            if (bgImageValue.indexOf(attackImageName) > -1) {
                return true;
            }
        }
        return false;
    }

}

export default AttackDetector;

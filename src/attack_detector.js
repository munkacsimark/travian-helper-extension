class AttackDetector {

    static isAttackAndTime = () => {
        const attackImageName = 'att1.gif';
        const movementRows = document.querySelectorAll('#movements tr');
        for (let i = 0; i < movementRows.length; ++i) {
            const imageTd = movementRows[i].querySelector('.typ');
            if (imageTd && getComputedStyle(imageTd.querySelector('a img'))['background-image'].indexOf(attackImageName) > -1) {
                return movementRows[i].querySelector('.dur_r .timer').getAttribute('value');
            }
        }
        return false;
    }

}

export default AttackDetector;

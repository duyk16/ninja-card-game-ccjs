cc.Class({
    extends: cc.Component,

    properties: {
        loseSound: {
            default: null,
            type: cc.AudioClip,
        },
    },

    onEnable() {
        if (window._tempData.sound) {
            cc.audioEngine.play(this.loseSound, false, 1);
        }
    },

    playAgain() {
        window._tempData = {
            level: 0,
            score: 0,
            playerName: 'Ninja',
        }
        this.game.saveGame()
        this.game.reloadRound()
    },
});

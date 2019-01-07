cc.Class({
    extends: cc.Component,

    properties: {
        loseSound: {
            default: null,
            type: cc.AudioClip,
        },
    },

    onEnable() {
        cc.audioEngine.play(this.loseSound, false, 1);
    },

    playAgain() {
        window.UserData.playerLevel = 0
        this.game.saveGame()
        this.game.reloadRound()
    },
});

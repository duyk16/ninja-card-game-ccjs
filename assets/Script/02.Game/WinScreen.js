cc.Class({
    extends: cc.Component,

    properties: {
        playerScore: {
            default: null,
            type: cc.Label
        },
        bestScore: {
            default: null,
            type: cc.Label
        },
        winSound: {
            default: null,
            type: cc.AudioClip,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bestScore.string = '1050'
    },
    onEnable() {
        cc.audioEngine.play(this.winSound, false, 1);
    },
    nextLevel() {
        window.UserData.playerLevel += 1;
        this.game.saveGame()
        cc.director.loadScene('02.Game');
    }
    // update (dt) {},
});

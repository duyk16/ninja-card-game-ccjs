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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bestScore.string = '1050'
    },
    nextLevel() {
        window.UserData.playerLevel += 1;
        this.game.saveGame()
        cc.director.loadScene('02.Game');
    }
    // update (dt) {},
});

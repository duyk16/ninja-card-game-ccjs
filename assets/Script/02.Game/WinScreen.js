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
        // this.node.scale = 0.9
        // setTimeout(() => {
        //     this.node.runAction(cc.scaleTo(0.1, 1))
        // }, 200)
    },
    playAgain() {
        this.game.reloadRound()
    },
    nextLevel() {
        cc.director.loadScene('02.Game');
    }
    // update (dt) {},
});

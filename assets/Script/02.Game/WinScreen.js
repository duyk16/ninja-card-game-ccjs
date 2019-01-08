cc.Class({
    extends: cc.Component,

    properties: {
        playerScore: {
            default: null,
            type: cc.Label
        },
        levelLabel: {
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
        this.levelLabel.string = `Level ${window._tempData.level + 1}`
    },
    onEnable() {
        cc.audioEngine.play(this.winSound, false, 1);
    },
    nextLevel() {
        window._tempData.level += 1;
        this.game.saveGame()
        cc.director.loadScene('02.Game');
    }
    // update (dt) {},
});

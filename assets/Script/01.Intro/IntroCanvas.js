cc.Class({
    extends: cc.Component,

    properties: {
        startButton: {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    getHighscore() {
        cc.director.loadScene('03.Highscore')
    },

    playGame() {
        cc.director.loadScene('02.Game')
    },

    changeSound() {
        window._tempData.sound = !window._tempData.sound
    },
});

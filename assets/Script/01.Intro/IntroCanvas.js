cc.Class({
    extends: cc.Component,

    properties: {
        startButton: {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    getHighscore() {
        cc.director.loadScene('03.Highscore')
    },

    playGame() {
        cc.director.loadScene('02.Game')
    }
    // update (dt) {},
});

cc.Class({
    extends: cc.Component,

    properties: {

    },

    playAgain() {
        cc.director.loadScene('02.Game');
    },
    // update (dt) {},
});

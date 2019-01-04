cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    startCount (time = 90) {
        this.time = time;
    },

    converTime(time) {
        time = Math.ceil(time)
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds < 10 && (seconds = '0' + seconds)
        return minutes + ':' + seconds
    },

    update (dt) {
        if (this.time) {
            this.time -= dt
            if (this.time >= 0) {
                this.getComponent(cc.Label).string = this.converTime(this.time)
            } else {
                this.getComponent(cc.Label).string = this.converTime(0)
                !this.game.winStatus && this.game.loseAction()
            }
        }

    },
});

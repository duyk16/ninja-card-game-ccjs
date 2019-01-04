cc.Class({
    extends: cc.Component,

    properties: {
    },

    startCount (time = 90) {
        this.totalTime = time
        this.time = time
    },

    update (dt) {
        if (this.time) {
            this.time -= dt
            this.getComponent(cc.ProgressBar)
                .progress = this.time / this.totalTime
        }
    },
});

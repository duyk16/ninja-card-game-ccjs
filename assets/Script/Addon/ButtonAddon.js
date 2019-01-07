cc.Class({
    extends: cc.Component,

    properties: {
        soundPress: {
            default: null,
            type: cc.AudioClip,
        },
    },

    onLoad() {
        this.addPressSound()
    },

    onDestroy() {
        cc.audioEngine.stopEffect(this.current);
    },

    addPressSound() {
        this.node.on('click', this.playPressSound, this)
    },

    playPressSound() {
        cc.audioEngine.play(this.soundPress, false, 1);
    }
});

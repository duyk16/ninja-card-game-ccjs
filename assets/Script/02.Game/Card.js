cc.Class({
    extends: cc.Component,

    properties: {
        frontCardImage: {
            default: [],
            type: [cc.SpriteFrame]
        },
        frontCard: {
            default: null,
            type: cc.Sprite
        },
        backCard: {
            default: null,
            type: cc.Sprite
        },
        lockRotate: false,
        data: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // Hide front card
        this.setFrontImage(1);
        this.frontCard.node.scaleX = 0
    },

    start () {
      
    },

    setFrontImage() {
        this.frontCard.spriteFrame = this.frontCardImage[this.data]
    },

    flipCard() {
        const timeDisplay = 800;
        const timeRotate = 100;
        // Check Lock status
        if (!this.lockRotate) {
            // Lock rotate
            this.lockRotate = true

            this.backCard.node.runAction(cc.scaleTo(timeRotate / 1000, 0, 1));
            setTimeout(() => {
                this.frontCard.node.runAction(cc.scaleTo(timeRotate / 1000, 1, 1))
                setTimeout(() => {
                    this.frontCard.node.runAction(cc.scaleTo(timeRotate / 1000, 0, 1))
                }, timeDisplay)
            }, timeRotate)
            setTimeout(() => {
                this.backCard.node.runAction(cc.scaleTo(timeRotate / 1000, 1, 1))
                // Unlock rotate
                this.lockRotate = false
            }, timeRotate * 2 + timeDisplay)
        }
    }
    // update (dt) {},
});

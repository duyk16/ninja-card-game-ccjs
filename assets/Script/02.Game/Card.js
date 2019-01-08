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
        flipSound: {
            default: null,
            type: cc.AudioClip,
        },
        collectSound: {
            default: null,
            type: cc.AudioClip
        },
        lockRotate: false,
        data: 0,
        position: null, // {x, y}
        sound: true,
        status: true,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // Hide front card
        this.frontCard.node.scaleX = 0

        // Set data and image for card
        this.frontCard.spriteFrame = this.frontCardImage[this.data]
    },

    flipCard() {
        // Check Lock status
        let currentCard = {}
        currentCard.data = this.data
        currentCard.position = {
            x: this.position.x, 
            y: this.position.y
        }
        
        this.status && this.main.checkCard(currentCard)        
    },

    upCardAction() {
        // Set speed
        const speedRotate = 150;
        this.backCard.node.runAction(cc.scaleTo(speedRotate / 1000, 0, 1));
        setTimeout(() => {
            this.frontCard.node.runAction(cc.scaleTo(speedRotate / 1000, 1, 1))
        }, speedRotate)

        // play sound
        this.sound && cc.audioEngine.play(this.flipSound, false, 1);
        
    },

    downCardAction() {
        // Set speed
        const speedRotate = 100;

        this.frontCard.node.runAction(cc.scaleTo(speedRotate / 1000, 0, 1));
        setTimeout(() => {
            this.backCard.node.runAction(cc.scaleTo(speedRotate / 1000, 1, 1))
            this.main.lockRotate = false
        }, speedRotate)

    },

    deleteCard() {
        this.node.getComponent(cc.Animation).play()
        this.node.runAction(cc.scaleTo(0.2, 1.1))
        this.node.runAction(cc.fadeOut(0.3))
        this.sound = false
        this.status = false
        // Play collect sound
        cc.audioEngine.play(this.collectSound, false, 0.2);        
    },
});

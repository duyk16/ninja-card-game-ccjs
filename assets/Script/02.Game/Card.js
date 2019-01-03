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
        data: 0,
        position: null, // {x, y}
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // Declare state 

        // Hide front card
        this.frontCard.node.scaleX = 0

        // Set data and image for card
        this.frontCard.spriteFrame = this.frontCardImage[this.data]
    },

    start () {
      
    },

    flipCard() {
        // Check Lock status
        let currentCard = {}
        currentCard.data = this.data
        currentCard.position = {
            x: this.position.x, 
            y: this.position.y
        }
        
        this.main.checkCard(currentCard)        
    },

    upCardAction() {
        // Set speed
        const speedRotate = 150;
        this.backCard.node.runAction(cc.scaleTo(speedRotate / 1000, 0, 1));
        setTimeout(() => {
            this.frontCard.node.runAction(cc.scaleTo(speedRotate / 1000, 1, 1))
        }, speedRotate)
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
    // update (dt) {},
});

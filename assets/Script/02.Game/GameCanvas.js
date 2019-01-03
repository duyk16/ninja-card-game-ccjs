cc.Class({
    extends: cc.Component,

    properties: {
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        score: 0,
        cardCollect: 0,

        main: {
            default: null,
            type: cc.Component
        },
        winScreen: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.info = {
            size: {x: 8, y: 1},
            diff: 1,
            point: 10,
            cardTotal() {
                return this.size.x * this.size.y
            }
        }
        this.winScreen.getComponent('WinScreen').enable = false
    },
    onEnable () {
        const {size, diff} = this.info
        const main = this.main.getComponent('Main')
        // add property game of main
        main.game = this
        // show score
        this.scoreDisplay.string = this.score
        // Create cards in main
        main.spawnCards(size.x, size.y, diff)
    },

    gainScore() {
        // Gain score
        this.score += this.info.point

        // Show score + animation
        this.scoreDisplay.string = this.score
        this.scoreDisplay.node.runAction(cc.scaleTo(0.2, 1.2).easing(cc.easeElasticOut(3.0)));
        setTimeout(() => {
            this.scoreDisplay.node.runAction(cc.scaleTo(0.2, 1))
        }, 200)

        // Count card collect
        this.cardCollect += 2
        // cc.log(this.winScreen.getComponent('WinScreen'))
        // Check win
        if (this.cardCollect >= this.info.cardTotal()) {
            this.winScreen.getComponent('WinScreen').playerScore.string = this.score
            this.winScreen.active = true
            this.winScreen.enable = true
        }
    }
    // update (dt) {},
});

cc.Class({
    extends: cc.Component,

    properties: {
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        main: {
            default: null,
            type: cc.Component
        },
        winScreen: {
            default: null,
            type: cc.Node
        },
        loseScreen: {
            default: null,
            type: cc.Node
        },
        timeLabel: {
            default: null,
            type: cc.Label
        },
        timeProgress: {
            default: null,
            type: cc.Node
        },
        reloadButton: {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.setState()
        this.gameConfig()
        this.mainLoad()
    },

    setState() {
        this.score = 0,
        this.cardCollect = 0,
        this.winStatus = false,

        this.main.getComponent('Main').game                 = this
        this.timeLabel.getComponent('TimeLabel').game       = this
        this.timeProgress.getComponent('ProgressBar').game  = this

        this.winScreen.active = false
        this.loseScreen.active = false
    },
    gameConfig () {
        this.size = {
            x: 2, 
            y: 1,
            cardTotal: () => this.size.x * this.size.y
        }
        this.diff = 2
        this.point = 10
        this.time = 5
    },
    mainLoad() {
        const {size, diff}  = this
        const main          = this.main.getComponent('Main')
        const timeLabel     = this.timeLabel.getComponent('TimeLabel')
        const timeProgress  = this.timeProgress.getComponent('ProgressBar')

        // show score
        this.scoreDisplay.string = this.score
        // Create cards in main
        main.spawnCards(size.x, size.y, diff)

        // SET time
        timeLabel.startCount(this.time)
        timeProgress.startCount(this.time)
    },

    gainScore() {
        // Gain score
        this.score += this.point
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
        if (this.cardCollect >= this.size.cardTotal()) {
            this.winAction()
        }
    },

    loseAction() {
        this.loseScreen.active = true
    },

    winAction() {
        this.winStatus = true
        setTimeout(() => { // wait destroy card animation
            this.winScreen.getComponent('WinScreen').playerScore.string = this.score
            this.winScreen.active = true
        }, 900)
        
    },

    reloadRound() {
        cc.director.loadScene('02.Game');
    }
    // update (dt) {},
});

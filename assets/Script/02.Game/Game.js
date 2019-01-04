cc.Class({
    extends: cc.Component,

    properties: {
        levelLabel: {
            default: null,
            type: cc.Label
        },
        scoreLabel: {
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
        },
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.setState()
        this.loadUserData()
        this.loadLevelConfig()
        this.mainLoad()
    },

    setState() {
        this.score = 0,
            this.cardCollect = 0,
            this.winStatus = false,

            this.main.getComponent('Main').game = this
        this.timeLabel.getComponent('TimeLabel').game = this
        this.timeProgress.getComponent('ProgressBar').game = this
        this.winScreen.getComponent('WinScreen').game = this
        this.loseScreen.getComponent('LoseScreen').game = this

        this.winScreen.active = false
        this.loseScreen.active = false
    },

    loadUserData() {
        let UserData = cc.sys.localStorage.getItem('userNinjaCard')
        if (!UserData) {
            this.setDataInit()
        }
        // wait data if init
        UserData = JSON.parse(cc.sys.localStorage.getItem('userNinjaCard'))
        if (UserData.playerLevel > GameConfig.levelMax) {
            UserData.playerLevel = 0
        }

        window.UserData = UserData
        // SET level
        this.level = UserData.playerLevel
    },

    loadLevelConfig(i = 0) {
        i = this.level
        this.size = {
            x: GameConfig.level[i].size.x,
            y: GameConfig.level[i].size.y,
            cardTotal: () => this.size.x * this.size.y
        },
            this.diff = GameConfig.level[i].diff
        this.point = GameConfig.level[i].point
        this.time = GameConfig.level[i].time
    },

    mainLoad() {
        const { size, diff } = this
        const main = this.main.getComponent('Main')
        const timeLabel = this.timeLabel.getComponent('TimeLabel')
        const timeProgress = this.timeProgress.getComponent('ProgressBar')

        // SHOW score
        this.scoreDisplay()
        // SHOW level
        this.levelDisplay()

        // SET size & diff
        main.spawnCards(size.x, size.y, diff)

        // SET time
        timeLabel.startCount(this.time)
        timeProgress.startCount(this.time)
    },

    gainScore() {
        // Gain score
        this.score += this.point
        // Update score
        this.scoreDisplay()
        // Count card collect
        this.cardCollect += 2
        // Check win
        if (this.cardCollect >= this.size.cardTotal()) {
            this.winAction()
        }
    },

    scoreDisplay() {
        this.scoreLabel.string = this.score
        this.scoreLabel.node.runAction(cc.scaleTo(0.2, 1.2).easing(cc.easeElasticOut(3.0)));
        setTimeout(() => {
            this.scoreLabel.node.runAction(cc.scaleTo(0.2, 1))
        }, 200)
    },

    levelDisplay() {
        this.levelLabel.string = 'Level ' + (this.level + 1)
    },

    loseAction() {
        this.loseScreen.active = true
    },

    winAction() {
        this.winStatus = true
        window.UserData.playerLevel += 1;
        this.saveGame()
        setTimeout(() => { // wait destroy card animation
            this.winScreen.getComponent('WinScreen').playerScore.string = this.score
            this.winScreen.active = true
        }, 900)

    },

    reloadRound() {
        cc.director.loadScene('02.Game');
    },

    setDataInit() {
        const userDataInit = window.UserDataInit
        const dbName = "userNinjaCard"
        cc.sys.localStorage.setItem(dbName, JSON.stringify(userDataInit));
        cc.log('Set data done')
    },

    saveGame() {
        const userData = window.UserData
        const dbName = "userNinjaCard"
        cc.sys.localStorage.setItem(dbName, JSON.stringify(userData));
    }
});

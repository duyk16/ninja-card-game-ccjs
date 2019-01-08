const userDB        = "userNinjaCard"

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
        scoreEndLabel: {
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
        newHighscoreScreen: {
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
        highscoreEditbox: {
            default: null,
            type: cc.EditBox,
        },
    },

    onLoad() {
        this.setState()
        this.loadUserData()
        this.loadLevelConfig()
        this.mainLoad()
    },

    setState() {
        this.score          = 0
        this.cardCollect    = 0
        this.level          = 0
        this.winStatus      = false
        
        this.main.getComponent('Main').game                 = this
        this.timeLabel.getComponent('TimeLabel').game       = this
        this.timeProgress.getComponent('ProgressBar').game  = this
        this.winScreen.getComponent('WinScreen').game       = this
        this.loseScreen.getComponent('LoseScreen').game     = this

        this.winScreen.active = false
        this.loseScreen.active = false
        this.newHighscoreScreen.active = false
    },

    loadUserData() {
        let UserData = cc.sys.localStorage.getItem(userDB)     
        !UserData && this.setDataInit();
        if (!window._tempData) {
            window._tempData = {
                level: 0,
                score: 0,
                playerName: 'Ninja',
            }
        }
        // wait data if init
        UserData = JSON.parse(cc.sys.localStorage.getItem(userDB))
        if (UserData.playerLevel > GameConfig.levelMax) {
            UserData.playerLevel = 0
        }

        window.UserData = UserData
        // SET tempory config
        this.level = window._tempData.level
        this.score = window._tempData.score
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
        if (this.level < 1) {
            // 2 cols x 2 rows
            this.main.node.width = 250
            this.main.node.height = 300
        }
        else if (this.level < 3) {
            // 4 cols x 2 rows
            this.main.node.width = 450
            this.main.node.height = 300
        }
        else if (this.level < 5) {
            // 8 cols x 3 rows
            this.main.node.width = 900
            this.main.node.height = 450
        } else {
            this.main.node.width = 980
            this.main.node.height = 520
        }
        
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
        this.levelLabel.string = 'Level ' + (window._tempData.level + 1)
    },

    loseAction() {
        this.loseScreen.active = true
        let userRank = this.getPlayerRank()
        if (userRank) {
            this.userRank = userRank
            this.scoreEndLabel.string = this.score
            this.newHighscoreScreen.active = true
        }
    },

    updateHighscore() {
        this.updateHighscore = true;
        if (this.updateHighscore) {
            // cc.log(this.highscoreEditbox.string)
            let userData = window.UserData
            let rankBoard = userData.rankBoard
            let userRank = this.userRank
            let userScore = this.score
            let userName = this.highscoreEditbox.string
            rankBoard.splice(userRank, 0, {
                name: userName,
                score: userScore
            })
            rankBoard.pop()
            this.saveGame()
            this.reloadIntro()
            this.updateHighscore = false
        }
    },

    winAction() {
        this.winStatus = true
        window._tempData.score = this.score
        this.saveGame()

        setTimeout(() => { // wait destroy card animation
            this.winScreen.getComponent('WinScreen').playerScore.string = this.score
            this.winScreen.active = true
        }, 900)
    },

    getPlayerRank() {
        let rankBoard = window.UserData.rankBoard;
        let userRank = null;
        let rank = 9;

        while (this.score > rankBoard[rank].score) {
            userRank = rank
            rank--
        }

        if (userRank) {
            return userRank
        } else return false
    },

    getHighscore() {
        cc.director.loadScene('03.Highscore')
    },

    reloadRound() {
        cc.director.loadScene('02.Game');
    },
    reloadIntro() {
        window._tempData = {
            level: 0,
            score: 0,
            playerName: 'Ninja',
        }
        cc.director.loadScene('01.Intro')
    },
    setDataInit() {
        const userDataInit = window.UserDataInit
        cc.sys.localStorage.setItem(userDB, JSON.stringify(userDataInit));
    },

    saveGame() {
        const userData = window.UserData
        cc.sys.localStorage.setItem(userDB, JSON.stringify(userData));
    }
});

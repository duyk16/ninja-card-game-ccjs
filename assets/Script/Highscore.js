const userDB        = "userNinjaCard"

cc.Class({
    extends: cc.Component,

    properties: {
        playerName: {
            default: null,
            type: cc.Label
        },
        playerScore: {
            default: null,
            type: cc.Label
        },
    },
    onLoad() {
        let userData = cc.sys.localStorage.getItem(userDB)
        !userData && this.setDataInit()

        userData = JSON.parse(cc.sys.localStorage.getItem(userDB))
        let name = ''
        let score = ''
        name = userData.rankBoard.reduce((string, item, index) => {
            return `${string}${index + 1}. ${item.name}\n`
        },'')
        this.playerName.string = name

        score = userData.rankBoard.reduce((string, item, index) => {
            return `${string}${item.score}\n`
        },'')
        this.playerScore.string = score
    },
    playAgain() {
        cc.director.loadScene('02.Game')
    },
    setDataInit() {
        const userDataInit = window.UserDataInit
        cc.sys.localStorage.setItem(userDB, JSON.stringify(userDataInit));
    },
    reloadIntro() {
        window._tempData = {
            level: 0,
            score: 0,
            playerName: 'Ninja',
        }
        
        cc.director.loadScene('01.Intro')
    },
});

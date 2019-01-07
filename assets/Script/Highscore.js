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
        const userData = JSON.parse(cc.sys.localStorage.getItem(userDB))
        let name = ''
        let score = ''
        !userData && this.setDataInit()
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
});

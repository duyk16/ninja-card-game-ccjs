window.GameConfig = {
    levelMax: 9,
    level: [
        {
            index: 1,
            size: { x: 2, y: 2 },
            diff: 2,
            point: 10,
            time: 10
        },
        {
            index: 2,
            size: { x: 8, y: 1 },
            diff: 2,
            point: 15,
            time: 30
        },
        {
            index: 3,
            size: { x: 8, y: 1 },
            diff: 3,
            point: 20,
            time: 40
        },
        {
            index: 4,
            size: { x: 9, y: 2 },
            diff: 3,
            point: 20,
            time: 50
        },
        {
            index: 5,
            size: { x: 9, y: 2 },
            diff: 5,
            point: 25,
            time: 60
        },
        {
            index: 6,
            size: { x: 9, y: 4 },
            diff: 7,
            point: 25,
            time: 70
        },
        {
            index: 7,
            size: { x: 9, y: 4 },
            diff: 10,
            point: 30,
            time: 80
        },
        {
            index: 8,
            size: { x: 9, y: 4 },
            diff: 11,
            point: 35,
            time: 90
        },
        {
            index: 9,
            size: { x: 9, y: 4 },
            diff: 12,
            point: 40,
            time: 95
        },
        {
            index: 10,
            size: { x: 9, y: 4 },
            diff: 13,
            point: 45,
            time: 100
        },
    ],
}

window.UserDataInit = {
    playerLevel: 0,
    playerHighscore: 0,
    playerRank: null,
    rankBoard: [
        { name: "Latasha Rosario", score: 1000 },
        { name: "Turner Kane", score: 900 },
        { name: "Rae Kane", score: 800 },
        { name: "Ninja Bot", score: 700 },
        { name: "Ninja Bot", score: 600 },
        { name: "Ninja Bot", score: 500 },
        { name: "Ninja Bot", score: 400 },
        { name: "Ninja Bot", score: 300 },
        { name: "Ninja Bot", score: 200 },
        { name: "Ninja Bot", score: 100 },
    ],
    levelHighscore: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100,]
}
window.UserData = {}
// cc.log(cc.sys.localStorage.getItem('userNinjaCard'))
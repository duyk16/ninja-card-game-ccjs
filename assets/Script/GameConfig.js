window.GameConfig = {
    levelMax: 18,
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
            size: { x: 4, y: 2 },
            diff: 3,
            point: 15,
            time: 30
        },
        {
            index: 3,
            size: { x: 4, y: 2 },
            diff: 4,
            point: 20,
            time: 40
        },
        {
            index: 4,
            size: { x: 8, y: 3 },
            diff: 5,
            point: 20,
            time: 50
        },
        {
            index: 5,
            size: { x: 8, y: 3 },
            diff: 6,
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
            diff: 8,
            point: 25,
            time: 70
        },
        {
            index: 8,
            size: { x: 9, y: 4 },
            diff: 9,
            point: 25,
            time: 70
        },
        {
            index: 10,
            size: { x: 9, y: 4 },
            diff: 10,
            point: 30,
            time: 80
        },
        {
            index: 11,
            size: { x: 9, y: 4 },
            diff: 11,
            point: 35,
            time: 90
        },
        {
            index: 12,
            size: { x: 9, y: 4 },
            diff: 12,
            point: 40,
            time: 90
        },
        {
            index: 13,
            size: { x: 9, y: 4 },
            diff: 13,
            point: 40,
            time: 90
        },
        {
            index: 14,
            size: { x: 9, y: 4 },
            diff: 14,
            point: 40,
            time: 90
        },
        {
            index: 15,
            size: { x: 9, y: 4 },
            diff: 15,
            point: 40,
            time: 90
        },
        {
            index: 16,
            size: { x: 9, y: 4 },
            diff: 16,
            point: 45,
            time: 90
        },
        {
            index: 17,
            size: { x: 9, y: 4 },
            diff: 17,
            point: 45,
            time: 90
        },
        {
            index: 18,
            size: { x: 9, y: 4 },
            diff: 18,
            point: 45,
            time: 90
        },
    ],
}

window.UserDataInit = {
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
}

if (!window._tempData) {
    window._tempData = {
        level: 0,
        score: 0,
        playerName: 'Ninja',
        sound: true,
    }
}
// cc.log(cc.sys.localStorage.getItem('userNinjaCard'))
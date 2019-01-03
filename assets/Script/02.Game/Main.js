cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.spawnCards()
    },

    start () {

    },

    spawnCards(width = 9, height = 4) {
        // Create Matrix X x Y
        this.cards = new Array(width)
        
        // Create an array with width*height number
        var orderData = this.randomCards(width, height)
        cc.log(orderData)

        for(let i = 0; i < width; i++) {
            this.cards[i] = new Array(height);
        }
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                // add to node
                this.cards[i][j]= cc.instantiate(this.cardPrefab)
                this.cards[i][j].getComponent('Card').data = orderData[width*j + i]

                this.node.addChild(this.cards[i][j])
            }
        }
    },

    randomCards(w = 9, h = 4) {
        var orderData = [];
        var count = w * h / 2;

        for (let i = 0; i < count; i++) {
            // create random number in [0 - 17]
            let num = Math.floor(count * Math.random())

            // push to array
            orderData.push(num)
        }

        // duplicata array
        orderData.push(...orderData)

        // shuffle array
        orderData.sort(() => .5 - Math.random())
        return orderData
    },

    getPosition() {
        const base = {x: -300, y: 140}
        const stepY = 130
        const stepX = 105
        const width = 9
        const height = 4
        let array = []
    
        for (let i = 0; i < height; i++) {
            array.push([])
            for (let j = 0; j < width; j++) {
                let x = base.x + stepX*j;
                let y = base.y - stepY*i;
                array[i].push({x, y})
            }
        }

        return 
    }
    // update (dt) {},
});

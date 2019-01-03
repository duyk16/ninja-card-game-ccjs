cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },
        lockCard: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // Declare state
        this.firstCard = {
            data: null,
            position: {x: null, y: null}
        }
        this.secondCard = {
            data: null,
            position: {x: null, y: null}
        }
        // Start initial method
        // this.spawnCards()
    },

    spawnCards(width = 9, height = 4, diff = 18) {
        // Create Matrix X x Y
        this.cards = new Array(width)
        
        // Create an array with width*height number
        var orderData = this.randomCards(width, height, diff)

        // Random order Sprite Frame
        this.cardPrefab.data.getComponent('Card').frontCardImage.sort(() => {
            return .5 - Math.random()
        })

        for(let i = 0; i < width; i++) {
            this.cards[i] = new Array(height);
        }
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                // create card node
                this.cards[i][j]= cc.instantiate(this.cardPrefab)
                // set card data
                this.cards[i][j].getComponent('Card').data = orderData[width*i + j]
                // set card position
                this.cards[i][j].getComponent('Card').position = {x: j, y: i}
                // add card node to main node
                this.node.addChild(this.cards[i][j])
                this.cards[i][j].getComponent('Card').main = this
            }
        }
    },

    checkCard(currentCard) {
        let {firstCard} = this
        let {x, y} = currentCard.position
        let {data} = currentCard
        // Check first card is up?
        if (firstCard.position.x == null && firstCard.position.y == null) {
            firstCard.position = {x, y}
            firstCard.data = data
            this.cards[y][x].getComponent('Card').upCardAction()
        }
        // Check if first card is clicked again
        else if (firstCard.position.x == x && firstCard.position.y == y) {
            return
        }
        else if (!this.lockCard) {
            this.lockCard = !this.lockCard
            this.cards[y][x].getComponent('Card').upCardAction()
            if (data === firstCard.data) {
                // Gain Score and destroy
                this.game.gainScore()
                setTimeout(() => {
                    // Destroy couple matched card
                    this.destroyCard(x, y)
                    this.destroyCard(firstCard.position.x, firstCard.position.y)
                    firstCard.data = null
                    firstCard.position.x = null
                    firstCard.position.y = null
                    this.lockCard = !this.lockCard
                }, 500)       
            } else {
                // Down this card
                setTimeout(() => {
                    this.downCardAction(x, y)
                    this.downCardAction(firstCard.position.x, firstCard.position.y)
                    firstCard.data = null
                    firstCard.position.x = null
                    firstCard.position.y = null
                    this.lockCard = !this.lockCard
                } , 500)
            }
        }
    },

    destroyCard(x, y) {
        this.cards[y][x].getComponent('Card').deleteCard()
    },

    downCardAction(x, y) {
        this.cards[y][x].getComponent('Card').downCardAction()
    },

    randomCards(w, h, diff) {
        var orderData = [];
        var numberOfType = diff

        for (let i = 0; i < w * h / 2; i++) {
            // create random number in [0 - 17]
            let num = Math.floor(numberOfType * Math.random())

            // push to array
            orderData.push(num)
        }

        // duplicata array
        orderData.push(...orderData)

        // shuffle array
        orderData.sort(() => .5 - Math.random())
        return orderData
    },
    // update (dt) {},
});

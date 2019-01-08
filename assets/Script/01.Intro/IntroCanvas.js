cc.Class({
    extends: cc.Component,

    properties: {
        startButton: {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        function first(a, callback){
            // Simulate a code delay
            setTimeout( function(){
              console.log(a);
              callback()
            }, 500 );
          }
          
        function second(){
            console.log(2);
          }
          
        first(1, second)
    },

    getHighscore() {
        cc.director.loadScene('03.Highscore')
    },

    playGame() {
        cc.director.loadScene('02.Game')
    },
    // update (dt) {},
});

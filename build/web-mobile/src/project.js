window.__require=function t(e,n,i){function o(s,c){if(!n[s]){if(!e[s]){var r=s.split("/");if(r=r[r.length-1],!e[r]){var l="function"==typeof __require&&__require;if(!c&&l)return l(r,!0);if(a)return a(r,!0);throw new Error("Cannot find module '"+s+"'")}}var d=n[s]={exports:{}};e[s][0].call(d.exports,function(t){return o(e[s][1][t]||t)},d,d.exports,t,e,n,i)}return n[s].exports}for(var a="function"==typeof __require&&__require,s=0;s<i.length;s++)o(i[s]);return o}({Button:[function(t,e,n){"use strict";cc._RF.push(e,"94da4ftddNFnZ6GS0yWtwua","Button"),cc.Class({extends:cc.Component,properties:{},start:function(){},test:function(){cc.log("Click")}}),cc._RF.pop()},{}],Card:[function(t,e,n){"use strict";cc._RF.push(e,"9548fx+brZLWLhgfuSIc9nW","Card"),cc.Class({extends:cc.Component,properties:{frontCardImage:{default:[],type:[cc.SpriteFrame]},frontCard:{default:null,type:cc.Sprite},backCard:{default:null,type:cc.Sprite},lockRotate:!1,data:0,position:null},onLoad:function(){this.frontCard.node.scaleX=0,this.frontCard.spriteFrame=this.frontCardImage[this.data]},start:function(){},flipCard:function(){var t={};t.data=this.data,t.position={x:this.position.x,y:this.position.y},this.main.checkCard(t)},upCardAction:function(){var t=this;this.backCard.node.runAction(cc.scaleTo(.15,0,1)),setTimeout(function(){t.frontCard.node.runAction(cc.scaleTo(.15,1,1))},150)},downCardAction:function(){var t=this;this.frontCard.node.runAction(cc.scaleTo(.1,0,1)),setTimeout(function(){t.backCard.node.runAction(cc.scaleTo(.1,1,1)),t.main.lockRotate=!1},100)},deleteCard:function(){this.node.getComponent(cc.Animation).play(),this.node.runAction(cc.scaleTo(.2,1.1)),this.node.runAction(cc.fadeOut(.3))}}),cc._RF.pop()},{}],GameConfig:[function(t,e,n){"use strict";cc._RF.push(e,"8e6c6cNC/hD7YCo4rwYuFlu","GameConfig"),window.GameConfig={levelMax:9,level:[{index:1,size:{x:2,y:2},diff:2,point:10,time:10},{index:2,size:{x:8,y:1},diff:2,point:15,time:30},{index:3,size:{x:8,y:1},diff:3,point:20,time:40},{index:4,size:{x:9,y:2},diff:3,point:20,time:50},{index:5,size:{x:9,y:2},diff:5,point:25,time:60},{index:6,size:{x:9,y:4},diff:7,point:25,time:70},{index:7,size:{x:9,y:4},diff:10,point:30,time:80},{index:8,size:{x:9,y:4},diff:11,point:35,time:90},{index:9,size:{x:9,y:4},diff:12,point:40,time:95},{index:10,size:{x:9,y:4},diff:13,point:45,time:100}]},window.UserDataInit={playerLevel:0,playerHighscore:0,rankBoard:[{name:"Ninja Bot",score:1e3},{name:"Ninja Bot",score:900},{name:"Ninja Bot",score:800},{name:"Ninja Bot",score:700},{name:"Ninja Bot",score:600},{name:"Ninja Bot",score:500},{name:"Ninja Bot",score:400},{name:"Ninja Bot",score:300},{name:"Ninja Bot",score:200},{name:"Ninja Bot",score:100}],levelHighscore:[0,0,0,0,0,0]},window.UserData={},cc._RF.pop()},{}],GameController:[function(t,e,n){"use strict";cc._RF.push(e,"bd083kld+5OEYzBEWSVcA/g","GameController"),cc.Class({extends:cc.Component,properties:{},start:function(){}}),cc._RF.pop()},{}],Game:[function(t,e,n){"use strict";cc._RF.push(e,"9b9f34ZxqdBGKC3OJIiYcgv","Game"),cc.Class({extends:cc.Component,properties:{levelLabel:{default:null,type:cc.Label},scoreLabel:{default:null,type:cc.Label},main:{default:null,type:cc.Component},winScreen:{default:null,type:cc.Node},loseScreen:{default:null,type:cc.Node},timeLabel:{default:null,type:cc.Label},timeProgress:{default:null,type:cc.Node},reloadButton:{default:null,type:cc.Button}},onLoad:function(){this.setState(),this.loadUserData(),this.loadLevelConfig(),this.mainLoad()},setState:function(){this.score=0,this.cardCollect=0,this.winStatus=!1,this.main.getComponent("Main").game=this,this.timeLabel.getComponent("TimeLabel").game=this,this.timeProgress.getComponent("ProgressBar").game=this,this.winScreen.getComponent("WinScreen").game=this,this.loseScreen.getComponent("LoseScreen").game=this,this.winScreen.active=!1,this.loseScreen.active=!1},loadUserData:function(){var t=cc.sys.localStorage.getItem("userNinjaCard");t||this.setDataInit(),(t=JSON.parse(cc.sys.localStorage.getItem("userNinjaCard"))).playerLevel>GameConfig.levelMax&&(t.playerLevel=0),window.UserData=t,this.level=t.playerLevel},loadLevelConfig:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];e=this.level,this.size={x:GameConfig.level[e].size.x,y:GameConfig.level[e].size.y,cardTotal:function(){return t.size.x*t.size.y}},this.diff=GameConfig.level[e].diff,this.point=GameConfig.level[e].point,this.time=GameConfig.level[e].time},mainLoad:function(){var t=this.size,e=this.diff,n=this.main.getComponent("Main"),i=this.timeLabel.getComponent("TimeLabel"),o=this.timeProgress.getComponent("ProgressBar");this.scoreDisplay(),this.levelDisplay(),n.spawnCards(t.x,t.y,e),i.startCount(this.time),o.startCount(this.time)},gainScore:function(){this.score+=this.point,this.scoreDisplay(),this.cardCollect+=2,this.cardCollect>=this.size.cardTotal()&&this.winAction()},scoreDisplay:function(){var t=this;this.scoreLabel.string=this.score,this.scoreLabel.node.runAction(cc.scaleTo(.2,1.2).easing(cc.easeElasticOut(3))),setTimeout(function(){t.scoreLabel.node.runAction(cc.scaleTo(.2,1))},200)},levelDisplay:function(){this.levelLabel.string="Level "+(this.level+1)},loseAction:function(){this.loseScreen.active=!0},winAction:function(){var t=this;this.winStatus=!0,window.UserData.playerLevel+=1,this.saveGame(),setTimeout(function(){t.winScreen.getComponent("WinScreen").playerScore.string=t.score,t.winScreen.active=!0},900)},reloadRound:function(){cc.director.loadScene("02.Game")},setDataInit:function(){var t=window.UserDataInit;cc.sys.localStorage.setItem("userNinjaCard",JSON.stringify(t)),cc.log("Set data done")},saveGame:function(){var t=window.UserData;cc.sys.localStorage.setItem("userNinjaCard",JSON.stringify(t))}}),cc._RF.pop()},{}],IntroCanvas:[function(t,e,n){"use strict";cc._RF.push(e,"59e20Oa5RtFSL30F0Cf/SIu","IntroCanvas"),cc.Class({extends:cc.Component,properties:{startButton:{default:null,type:cc.Button}},start:function(){},playGame:function(){cc.director.loadScene("02.Game")}}),cc._RF.pop()},{}],LoseScreen:[function(t,e,n){"use strict";cc._RF.push(e,"9f1620D9hNA9Y3CrLvY2PJa","LoseScreen"),cc.Class({extends:cc.Component,properties:{},playAgain:function(){this.game.reloadRound()}}),cc._RF.pop()},{}],Main:[function(t,e,n){"use strict";cc._RF.push(e,"a5baf6O5O1Bi52IXkWX7Wco","Main"),cc.Class({extends:cc.Component,properties:{cardPrefab:{default:null,type:cc.Prefab},lockCard:!1},onLoad:function(){this.firstCard={data:null,position:{x:null,y:null}},this.secondCard={data:null,position:{x:null,y:null}}},spawnCards:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:9,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:18;this.cards=new Array(t);var i=this.randomCards(t,e,n);this.cardPrefab.data.getComponent("Card").frontCardImage.sort(function(){return.5-Math.random()});for(var o=0;o<t;o++)this.cards[o]=new Array(e);for(var a=0;a<e;a++)for(var s=0;s<t;s++)this.cards[a][s]=cc.instantiate(this.cardPrefab),this.cards[a][s].getComponent("Card").data=i[t*a+s],this.cards[a][s].getComponent("Card").position={x:s,y:a},this.node.addChild(this.cards[a][s]),this.cards[a][s].getComponent("Card").main=this},checkCard:function(t){var e=this,n=this.firstCard,i=t.position,o=i.x,a=i.y,s=t.data;if(null==n.position.x&&null==n.position.y)n.position={x:o,y:a},n.data=s,this.cards[a][o].getComponent("Card").upCardAction();else{if(n.position.x==o&&n.position.y==a)return;this.lockCard||(this.lockCard=!this.lockCard,this.cards[a][o].getComponent("Card").upCardAction(),s===n.data?(this.game.gainScore(),setTimeout(function(){e.destroyCard(o,a),e.destroyCard(n.position.x,n.position.y),n.data=null,n.position.x=null,n.position.y=null,e.lockCard=!e.lockCard},500)):setTimeout(function(){e.downCardAction(o,a),e.downCardAction(n.position.x,n.position.y),n.data=null,n.position.x=null,n.position.y=null,e.lockCard=!e.lockCard},500))}},destroyCard:function(t,e){this.cards[e][t].getComponent("Card").deleteCard()},downCardAction:function(t,e){this.cards[e][t].getComponent("Card").downCardAction()},randomCards:function(t,e,n){for(var i=[],o=n,a=0;a<t*e/2;a++){var s=Math.floor(o*Math.random());i.push(s)}return i.push.apply(i,i),i.sort(function(){return.5-Math.random()}),i}}),cc._RF.pop()},{}],ProgressBar:[function(t,e,n){"use strict";cc._RF.push(e,"6527cT5pi9Dx4Zh/kdx6ciu","ProgressBar"),cc.Class({extends:cc.Component,properties:{},startCount:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:90;this.totalTime=t,this.time=t},update:function(t){this.time&&(this.time-=t,this.getComponent(cc.ProgressBar).progress=this.time/this.totalTime)}}),cc._RF.pop()},{}],TimeLabel:[function(t,e,n){"use strict";cc._RF.push(e,"388eav57KhIQ71DPP4h97ka","TimeLabel"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},startCount:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:90;this.time=t},converTime:function(t){t=Math.ceil(t);var e=Math.floor(t/60),n=t%60;return n<10&&(n="0"+n),e+":"+n},update:function(t){this.time&&(this.time-=t,this.time>=0?this.getComponent(cc.Label).string=this.converTime(this.time):(this.getComponent(cc.Label).string=this.converTime(0),!this.game.winStatus&&this.game.loseAction()))}}),cc._RF.pop()},{}],WinScreen:[function(t,e,n){"use strict";cc._RF.push(e,"32ee19aLVNHfJrtd8yrU1y8","WinScreen"),cc.Class({extends:cc.Component,properties:{playerScore:{default:null,type:cc.Label},bestScore:{default:null,type:cc.Label}},onLoad:function(){this.bestScore.string="1050"},playAgain:function(){this.game.reloadRound()},nextLevel:function(){cc.director.loadScene("02.Game")}}),cc._RF.pop()},{}]},{},["IntroCanvas","Button","Card","ProgressBar","TimeLabel","Game","LoseScreen","Main","WinScreen","GameConfig","GameController"]);
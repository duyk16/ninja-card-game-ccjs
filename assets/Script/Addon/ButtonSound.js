cc.Class({
    extends: cc.Component,

    properties: {
        btnSprite: {
            default: [],
            type: [cc.SpriteFrame],
        },
    },
    onLoad() {
        if (window._tempData.sound) {
            this.getComponent(cc.Sprite).spriteFrame = this.btnSprite[0]
        } else {
            this.getComponent(cc.Sprite).spriteFrame = this.btnSprite[1]
        }
    },
    changeIcon() {
        if (window._tempData.sound) {
            this.getComponent(cc.Sprite).spriteFrame = this.btnSprite[0]
        } else {
            this.getComponent(cc.Sprite).spriteFrame = this.btnSprite[1]
        }
    },
});

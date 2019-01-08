export default cc.Class({
    extends: cc.Component,

    properties: {
        inputBox: {
            default: null,
            type: cc.Node,
        },
    },
    onLoad() {
        cc.log(this.inputBox.getComponent(cc.EditBox))
    },
});

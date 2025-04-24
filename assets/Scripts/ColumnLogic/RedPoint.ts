const {ccclass, property} = cc._decorator;

@ccclass
export default class redpoint extends cc.Component {

    @property(cc.Node)
    parentwithscale: cc.Node = null;

    @property(cc.Node)
    childnode: cc.Node = null;

    public compensateparentScale() {
        // �������� ������� scale ��������
        const parentscale = this.parentwithscale.scale;

        // ������������� scale ��������� �������� � �������� �������� scale ��������
        this.childnode.scalex = 1 / parentscale;
        this.childnode.scaley = 1 / parentscale;
        this.childnode.scalez = 1 / parentscale;
    }

}
import Lottery from './lottery';

var lottery = new Lottery({
    //默认为false（可用），如果没有抽奖机会可设置为false,则开始按钮不可点击
    disable: false,

    onstart: function () {
        //转盘开始可从服务端获取数据，这里用setTimeout模拟
        getPrizeCode().then((code) => {
            console.log(code);
            //调用stop方法停止转盘
            lottery.stop(code);
        })
    },
    //转盘动画结束
    onstop: function () {
        //假设抽奖机会用完禁用抽奖功能
        //lottery.disable = true;
        console.log('end');
    }
});

function getPrizeCode() {

    var time = Math.floor(Math.random() * 4) * 1000;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var rnd = Math.floor(Math.random() * 7);
            resolve(rnd);
        }, time);

    })
}
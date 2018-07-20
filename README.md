### 

# JS九宫格抽奖组件

## 使用

### HTML
``` html
    <table cellpadding="0" cellspacing="0">
            <tbody>
                <tr>
                    <td class="prize-item" data-index="0">0</td>
                    <td class="prize-item" data-index="1">1</td>
                    <td class="prize-item" data-index="2">2</td>
                </tr>
                <tr>
                    <td class="prize-item" data-index="7"> 7</td>
                    <td>
                        <a href="javascript:;" class="startLottery">
                            start
                        </a>
                    </td>
                    <td class="prize-item" data-index="3">3</td>
                </tr>
                <tr>
                    <td class="prize-item" data-index="6">6</td>
                    <td class="prize-item" data-index="5">5</td>
                    <td class="prize-item" data-index="4">4</td>
                </tr>
            </tbody>
        </table>
```
### JS

``` javascript
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

```
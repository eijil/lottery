import $ from 'jQuery';

const SIZE = 8 ; //8个格子

class Lottery {
    constructor(options = {}) {

        this.disable = options.disable || false; //是否可用
        this.speed = 350;
        this.active = 'active';
        this.now = 0;
        this._stop = SIZE * 100;
        this.lap = (options.lap || 5) * SIZE; //转盘最少转5圈后停止
        this.prizes = [];
        this.$prizes = $('.prize-item').each((index, item) => {
            var i = $(item).data("index");
            this.prizes[i] = $(item);
        });
  
        this.btnStart = $('.startLottery');
        this.onstart = options.onstart || null;
        this.onstop = options.onstop || null;
        this.init();

    }
    init() {

        if (this.disable) {
            this.btnStart.addClass('disable');
        }
        this.btnStart.on('click', () => {
            if (!this.disable) {
                this.start();
            }
        });
    }

    start() {
        this.btnStart.addClass('disable');
        this.disable = true;
        this.run();
        this.onstart && this.onstart();
    }
    run() {
        setTimeout(() => {
            this.rotate();
        }, this.speed);
    }
    rotate() {

        this.$prizes.removeClass(this.active);
        this.prizes[this.now % SIZE].addClass(this.active);
        this.now ++;

        //开始加速
        if (this.now <= 5) {
            this.speed -= 50;
        }
        //结束减速
        if (this._stop - this.now < 14) {
            this.speed += (14 - (this._stop - this.now)) * 5;
        }

        if (this._stop - this.now > 0) {
            this.run();
        } else {
            this.end();
        }
    }
    end() {
        this.disable = false;
        this.onstop && this.onstop();
        this.reset();

    }
    /** */
    stop(num) {
        console.log('now',this.now);
        var least = this.now < this.lap ? this.lap : this.now; //最少要转的圈数
        this._stop = num + 1 + least + parseInt(Math.random() * 3) * SIZE;
        console.log('stop', this._stop);
    }
    reset() {
        this.now = 0;
        this.speed = 350;
        this._stop = SIZE * 100;
        if(this.disable){
            this.btnStart.addClass('disable');
        }else{
            this.btnStart.removeClass('disable');
        }
        
    }
}
export default Lottery;
(function (doc, win) {
    var docEl = doc.documentElement, //html
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize', //浜嬩欢鍚嶇О
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) {
                docEl.style.fontSize = '100px';
            }
            else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    //doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
})(document, window);

let $ = function (sel) {
    return document.querySelector(sel);
}
//商品兑换
class goodsExchange {
    constructor() {
        //验证提示
        this.total = $("#goodsExchange #total");
        //提交
        this.submitBtn = $("#goodsExchange .con .submit");
        //兑换码
        this.cdkey = $("#goodsExchange .con ul li .cdkey");
        //收件人
        this.receiver = $("#goodsExchange .con ul li .receiver");
        //电话
        this.phone = $("#goodsExchange .con ul li .phone");
        //收获地址
        this.address = $("#goodsExchange .con ul li #address");
        //详细地址
        this.detailedAddress = $("#goodsExchange .con ul li .detailedAddress");
    }
    init() {
        if (this.submitBtn) {
            //地址选择
            this.addressSelection();
            this.bindEvent();
        }
    }
    addressSelection() {
        var area1 = new LArea();
        area1.init({
            'trigger': '#address', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
            'valueTo': '#value1', //选择完毕后id属性输出到该位置
            'keys': {
                id: 'id',
                name: 'name'
            }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
            'type': 1, //数据源类型
            'data': LAreaData //数据源
        });
    }
    bindEvent() {
        //弹框操作
        this.submitBtn.addEventListener("click", this.present.bind(this), false);
        this.address.addEventListener("input", this.addressSelect, false);
    }
    //地址改变
    addressSelect() {
        if (this.value == "请选择 >") {
            return;
        }
        this.classList.remove("iptRight");
    }
    //提交
    present() {
        let total = this.total;
        if (this.cdkey.value.trim() == "") {
            total.innerHTML = "请输入兑换码!"
            total.classList.remove("hide");
            setTimeout(() => {
                total.classList.add("hide");
            }, 800)
            return;
        }
        if (this.receiver.value.trim() == "") {
            total.innerHTML = "请输入收件人姓名!"
            total.classList.remove("hide");
            setTimeout(() => {
                total.classList.add("hide");
            }, 800)
            return;
        }
        if (this.phone.value.trim() == "") {
            total.innerHTML = "请输入手机号!"
            total.classList.remove("hide");
            setTimeout(() => {
                total.classList.add("hide");
            }, 800)
            return;
        }

        if (!(/^1[3456789]\d{9}$/.test(this.phone.value.trim()))) {
            total.innerHTML = "手机号码不正确!"
            total.classList.remove("hide");
            setTimeout(() => {
                total.classList.add("hide");
            }, 800)
            return;
        }

        if (this.address.value == "请选择 >") {
            total.innerHTML = "请选择收货地址!"
            total.classList.remove("hide");
            setTimeout(() => {
                total.classList.add("hide");
            }, 800)
            return;
        }

        if (this.detailedAddress.value.trim() == "") {
            total.innerHTML = "请输入详细地址!"
            total.classList.remove("hide");
            setTimeout(() => {
                total.classList.add("hide");
            }, 800)
            return;
        }

        total.innerHTML = "提交成功!"
        total.classList.remove("hide");
        setTimeout(() => {
            total.classList.add("hide");
            window.location.href = "goodsList.html"
        }, 800)
    }
}

window.onload = function () {
    //商品兑换
    new goodsExchange().init();
}
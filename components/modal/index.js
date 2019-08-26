
// components/modal/index.js
Component({

    /**
     * 组件的属性列表
     */
    properties: {
        
        layout: {
            type: String,
            value: 'top'
        },
        header: {
            type: Boolean,
            value: true
        },
        footer: {
            type: Boolean,
            value: true
        },
        title: {
            type: String,
            value: ''
        },

        isCancelShow: {
            type: Boolean,
            value: true
        },

        cancelText: {
            type: String,
            value: '取消'
        },

        confirmText: {
            type: String,
            value: '确定'
        },

        backdrop: {
            type: Boolean,
            value: true
        },

        animated: {
            type: Boolean,
            value: true
        },

        //动画时间(默认300)
        animationOption: {
            type: Object,
            value: {
                duration: 300
            }
        },


    },

    options: {
        styleIsolation: 'apply-shared'
    },

    /**
     * 组件的初始数据
     */
    data: {
        isShow: false,
        animation: ''
    },


    ready: function() {
        this.animation = wx.createAnimation({
            duration: this.data.animationOption.duration,
            timingFunction: "linear",
            delay: 0
        });
    },
    pageLifetimes: {
        show: function() {

        },
        hide: function() {
            // 页面被隐藏
            this.hideModal()

        },
        resize: function(size) {
            // 页面尺寸变化
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //modal隐藏
        hideModal: function(e) {
            if (e) {
                let type = e.currentTarget.dataset.type;
                if (type == 'mask' && !this.data.backdrop) {
                    return;
                }
            }
            if (this.data.isShow) this._toggleModal();
        },

        //modal显示
        showModal: function() {
            if (!this.data.isShow) {
                this._toggleModal();
            }
        },

        //切换modal的显示还是隐藏
        _toggleModal: function() {
            if (!this.data.animated) {
                this.setData({
                    isShow: !this.data.isShow
                })
            } else {
                let isShow = !this.data.isShow;
                this._executeAnimation(isShow);
            }


        },

        //根据需求执行动画
        _executeAnimation: function(isShow) {

            let animation = this.animation;
            if (isShow) {
              switch (this.data.layout) {
                case 'top' :
                  animation.translateY(-200).step();
                  break;
                  case 'center':
                  animation.translateY('-50%').step();
                    break;
                    case 'bottom':
                      animation.translateY(200).step();
                      break;
              }
                this.setData({
                    animationData: animation.export(),
                    isShow: true
                })

                setTimeout(function() {
                  switch (this.data.layout) {
                    case 'top':
                      animation.translateY(0).step();
                      break;
                    case 'center':
                      animation.translateY(0).step();
                      break;
                    case 'bottom':
                      animation.translateY(0).step();
                      break;
                  }
                   
                    this.setData({
                        animationData: animation.export()
                    })
                }.bind(this), 50)
            } else {
              switch (this.data.layout) {
                case 'top':
                  animation.translateY(-200).step();
                  break;
                case 'center':
                  animation.translateY('-50%').step();
                  break;
                case 'bottom':
                  animation.translateY(200).step();
                  break;
              }
                this.setData({
                    animationData: animation.export()
                })

                setTimeout(function() {
                    this.setData({
                        isShow: isShow
                    })
                }.bind(this), this.data.animationOption.duration)

            }


        },
        //取消事件 向外部page 发送事件通知
        _cancelModal: function() {
            this.hideModal();
            this.triggerEvent("cancel");
        },

        //确认事件
        _confirmModal: function() {
            this.triggerEvent("confirm");
        },
        preventTouchMove() {}

    }
})
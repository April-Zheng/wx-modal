// pages/demo/index.js

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        layouts: ['top', 'center', 'bottom'],
        layout: 'top'
    },

    showModal(e) {
        let layout = e.currentTarget.dataset.layout
        this.setData({
            layout
        })
        this.modal.showModal()
    },
    confirmRefuse() {},

    getRefuseReason() {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.modal = this.selectComponent("#modal")
    },
    onShow() {},



})
//index.js
//获取应用实例
// const app = getApp()

Page({

  topMotto:function(){
    // wx.navigateTo({
    //   url: '../article/article',
    // })
    // wx.redirectTo({
    //   url: '../article/article',
    // })
    wx.switchTab({
      url: '../article/article',
    })
  }
})

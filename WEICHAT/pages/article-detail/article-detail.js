
var { articles } = require('../../data/db.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var articleId = options.articleId;
    this.data.articleId = articleId;
    var article = articles[articleId];
    
    this.setData(article);
    console.log(article)
    //console.log('eee',this.data.articleId)
    //设置收藏状态
    var articleCollection = wx.setStorageSync('article_collection')
    var currentCollected = false;
    if (articleCollection){
      currentCollected = articleCollection[articleId]
    }else{
      var data={};
      data[articleId] = false;
      wx.setStorageSync('article_collection', data)
    }
    this.setData({
      currentCollected: currentCollected
    })
    //music
    var BackgroundAudioManager = wx.getBackgroundAudioManager()
    var _this = this;
    BackgroundAudioManager.onPlay(function(){
      _this.setData({
        isPlayingMusic: true
      })
    })
    BackgroundAudioManager.onPause(function(){
      _this.setData({
        isPlayingMusic: false
      })
    })
  },
  /*处理收藏*/
  tapCollection:function(){
    //console.log('sss', this.data)
    var articleCollection = wx.getStorageSync('article_collection');
    var currentCollected = articleCollection[this.data.articleId];
    //console.log('www',currentCollected)
    //
    articleCollection[this.data.articleId] = !currentCollected;
    wx.setStorageSync('article_collection', articleCollection);
    //改变图片
    this.setData({
      currentCollected: !currentCollected
    })
    //
    wx.showToast({
      title: currentCollected ? '取消收藏成功' :'收藏成功',
    })
  },
  tapShare:function(){
    console.log('ddss')
    var itemList = ['分享到微信','分享到QQ','分享到空间']
    wx.showActionSheet({
      itemList: itemList,
      success:function(res){
        wx.showToast({
          title: itemList + '成功'
        })
      }
    })
  },
  tapMusic:function(){
    var BackgroundAudioManager = wx.getBackgroundAudioManager()

    //
    var isPlayingMusic = !!this.data.isPlayingMusic;//
    if (isPlayingMusic){
      BackgroundAudioManager.pause()
      this.setData({
        isPlayingMusic:false
      })
    }else{
      BackgroundAudioManager.src = 'http://oxoxtpvtn.bkt.clouddn.com/%E9%87%91%E5%BF%97%E6%96%87%20-%20%E4%B8%BA%E7%88%B1%E7%97%B4%E7%8B%82.mp3';
      BackgroundAudioManager.title = '为爱痴狂';
      BackgroundAudioManager.coverImgUrl = 'http://oxoxtpvtn.bkt.clouddn.com/%E9%82%93%E7%B4%AB%E6%A3%8B%E5%96%9C%E6%AC%A2%E4%BD%A0.jpg';
      // BackgroundAudioManager.src = this.data.music.src;
      // BackgroundAudioManager.title = this.data.music.title;
      // BackgroundAudioManager.coverImgUrl = this.data.music.coverImgUrl;
      //BackgroundAudioManager.play();
      this.setData({
        isPlayingMusic: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
// pages/movie/movie.js
var { coverStarsToArray } = require('../../util/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.getData('http://t.yushu.im/v2/movie/in_theaters?start=0&count=3',
    function(data){
      //console.log(data)
      _this.setData({
        comingSoon:data,
        comingSoonTag:"正在热映",
        comingSoonTagType:'comingSoon'
      })
    });
    this.getData('http://t.yushu.im/v2/movie/coming_soon?start=0&count=3',
      function (data) {
        //console.log(data)
        _this.setData({
          willComingSoon: data,
          willComingTag: "即将上映",
          willComingTagType:'willComing'
        })
      })
    this.getData('http://t.yushu.im/v2/movie/top250?start=0&count=3',
      function (data) {
        //console.log(data)
        _this.setData({
          top250Data: data,
          top250DataTag: "豆瓣Top250",
          top250DataTagType:'top250Data'
        })
      })
  },
  getData:function(url,success){
    var _this = this;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        success(_this.formatData(res.data))
      }
    })
  },
  formatData:function(data){
    var arr = [];
    for(var i =0;i<data.subjects.length;i++){     
      arr.push({
        coverImg : data.subjects[i].images.large,
        title : data.subjects[i].title,
        stars: coverStarsToArray(data.subjects[i].rating.stars),
        score : data.subjects[i].rating.average
      })
    }
    return arr;
  },
  tapMore:function(event){
    var tag = event.currentTarget.dataset.tagType;
    wx.navigateTo({
      url: 'movie-more/movie-more?tagType' + tagType,
    })
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

//
function coverStarsToArray(stars){
  var arr = [];
  var num = stars.toString().substring(0,1);
  for(var i = 1;i<=5;i++){
    if(i<=num){
      arr.push(1)
    }else{
      arr.push(0)
    }
  }
  return arr;
}
function formatData(data) {
  var arr = [];
  for (var i = 0; i < data.subjects.length; i++) {
    arr.push({
      coverImg: data.subjects[i].images.large,
      title: data.subjects[i].title,
      stars: coverStarsToArray(data.subjects[i].rating.stars),
      score: data.subjects[i].rating.average
    })
  }
  return arr;
}
function tapMore(event) {
  var tag = event.currentTarget.dataset.tagType;
  wx.navigateTo({
    url: 'movie-more/movie-more?tagType' + tagType,
  })
}
module.exports = {
  coverStarsToArray: coverStarsToArray,

}



var _util = require('util');
var _shipping = require('service/shipping');
var _cities = require('util/cities');
var modalTpl = require('./modal.tpl');
var _modal = {
	show:function(){
		this.$box = $('.modal-box');
		this.loadModal();
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		//关闭弹窗
		this.$box.find('.close').on('click',function(){
			_this.hide();
		});

		//省份城市联动
		this.$box.find('.provinces-select').on('change',function(){
			_this.loadCities($(this).val());
		})
	},
	loadModal:function(){
		var html = _util.render(modalTpl);
		this.$box.html(html);
		this.loadProvinces();
	},
	loadProvinces:function(){
		var provinces = _cities.getProvinces();
		//console.log(provinces);
		var provincesSelectOptions = this.getSelectOptions(provinces);
		this.$box.find('.provinces-select').html(provincesSelectOptions);
	},
	loadCities:function(provincesName){
		var cities = _cities.getCities(provincesName);
	 	var citiesSelectOptions = this.getSelectOptions(cities);
		this.$box.find('.cities-select').html(citiesSelectOptions);
	},
	getSelectOptions:function(arr){
		let html = `<option value="">请选择</option>`;
		for(var i = 0;i<arr.length;i++){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>'
		}
		return html;
	},
	hide:function(){
		this.$box.empty();//调用enpty方法关闭弹窗
	}
}
module.exports = _modal; 
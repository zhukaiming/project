
var _util = require('util');
var _shipping = require('service/shipping');
var _cities = require('util/cities');
var modalTpl = require('./modal.tpl');

var formErr = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)		
	},
	hide:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)		
	}
}
//
var _modal = {
	show:function(options){
		this.$box = $('.modal-box');
		this.options = options;
		this.loadModal();
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		//关闭弹窗
		this.$box.find('.close').on('click',function(){
			_this.hide();
		});
		this.$box.find('.modal-container').on('click',function(e){
			e.stopPropagation();
		});
		//
		//省份城市联动
		this.$box.find('.provinces-select').on('change',function(){
			_this.loadCities($(this).val());
		});
		//处理提交事件
		this.$box.find('#form-sub-btn').on('click',function(){
			_this.submit();
			//console.log('sss')
		});
		this.$box.find('input').on('keyup',function(e){
			if(e.keyCode == 13){
				_this.submit();
			}
		})
	},
	loadModal:function(){
		var html = _util.render(modalTpl,{
			data:this.options.data || {},
			isEdit:!!this.options.data
		});
		this.$box.html(html);
		this.loadProvinces();
	},
	loadProvinces:function(){
		var provinces = _cities.getProvinces();
		var provincesSelectOptions = this.getSelectOptions(provinces);
		var $provincesSelect = this.$box.find('.provinces-select');
		this.$box.find('.provinces-select').html(provincesSelectOptions);

		//省份回填
		if(this.options.data && this.options.data.province){
			$provincesSelect.val(this.options.data.province);
			this.loadCities(this.options.data.province)
		}
	},
	loadCities:function(provincesName){
		var cities = _cities.getCities(provincesName);
	 	var citiesSelectOptions = this.getSelectOptions(cities);
	 	var $citiesSelect = this.$box.find('.cities-select')
		$citiesSelect.html(citiesSelectOptions);

		//城市回填
		if(this.options.data && this.options.data.city){
			$citiesSelect.val(this.options.data.city);
			// this.loadCities(this.options.data.city)
		}
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
	},
	submit:function(){
		var _this = this;
		//1获取数据
		var formDate = {
			name:$.trim($('[name="name"]').val()),
			province:$.trim($('[name="province"]').val()),
			city:$.trim($('[name="city"]').val()),
			address:$.trim($('[name="address"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			zip:$.trim($('[name="zip"]').val()),
		}
		//console.log(data)
		//2验证数据
		var validateResult = this.validate(formDate)
		//3提交
		if(validateResult.status){//验证成功
			formErr.hide();	
			//发送登录请求
			//编辑
			if(this.options.data){
				formDate.shippingId = this.options.data._id;
				_shipping.editShipping(formDate,function(shippings){
					_util.showSuccessMessage('编辑地址成功');
					_this.hide();
					_this.options.success(shippings);
				},function(msg){
					formErr.show(msg)
				})
			}
			//新增
			else{
				_shipping.addShipping(formDate,function(shippings){
					_util.showSuccessMessage('添加地址成功');
					_this.hide();
					_this.options.success(shippings);
				},function(msg){
					formErr.show(msg)
				})	
			}
		}
		//验证失败
		else{
			formErr.show(validateResult.msg);
		}
	},
	validate:function(formDate){
		var result = {
			status:0,
			msg:''
		}
		//验证用户名不能为空
		if(!_util.validate(formDate.name,'require')){
			result.msg = '收件人姓名不能为空';
			return result;
		}
		if(!_util.validate(formDate.province,'require')){
			result.msg = '省份不能为空';
			return result;
		}
		if(!_util.validate(formDate.city,'require')){
			result.msg = '城市不能为空';
			return result;
		}
		if(!_util.validate(formDate.address,'require')){
			result.msg = '详细地址不能为空';
			return result;
		}
		if(!_util.validate(formDate.phone,'require')){
			result.msg = '手机号不能为空';
			return result;
		}
		if(!_util.validate(formDate.phone,'phone')){
			result.msg = '手机格式错误';
			return result;
		}
		//
		result.status = true;
		return result;
	}
}
module.exports = _modal; 
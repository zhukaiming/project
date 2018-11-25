
<div class="modal close">
	<div class="modal-container">
		<div class="modal-header">
			{{#isEdit}}
				<h3 class="modal-title">编辑地址</h3>
			{{/isEdit}}
			{{^isEdit}}
				<h3 class="modal-title">新增地址</h3>
			{{/isEdit}}
			<i class="fa fa-close close"></i>
		</div>
		<div class="modal-body">
			<div class="form">
				<div class="form-box">
					<div class="error-item">
						<i class="fa fa-user-circle" aria-hidden="true"></i>
						<p class="error-msg">err</p>
					</div>
					<div class="form-item">
						<lable class="form-lable">
							<i class="fa fa-user-circle" aria-hidden="true"></i>
						</lable>
						<input type="text" class="form-content" name="name" placeholder="请输入收货人姓名" value="{{data.name}}">
					</div>
					<div class="form-item city-item">
						<lable class="form-lable">
							<i class="fa fa-building" aria-hidden="true"></i>
						</lable>
						<select name="province" class="provinces-select">
							<option value="">请选择</option>
						</select>
						<select name="city" class="cities-select">
							<option value="">请选择</option>
						</select>
					</div>
					<div class="form-item">
						<lable class="form-lable">
							<i class="fa fa-map-marker" aria-hidden="true"></i>
						</lable>
						<input type="text" class="form-content" name="address" placeholder="请输入详细地址" value="{{data.address}}">
					</div>
					<div class="form-item">
						<lable class="form-lable">
							<i class="fa fa-phone" aria-hidden="true"></i>
						</lable>
						<input type="text" class="form-content" name="phone" placeholder="请输入手机号" value="{{data.phone}}">
					</div>
					<div class="form-item">
						<lable class="form-lable">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</lable>
						<input type="text" class="form-content" name="zip" placeholder="请输入邮编" value="{{data.zip}}">
					</div>
					<div class="btn-item">
						<a href="javascript:;" class="btn btn-submit" id="form-sub-btn">提交</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

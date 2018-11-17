
<div class="panel">
	<h2 class="panel-header">送货地址</h2>
	<div class="panel-body">
		{{#shippings}}
		<div class="panel-item active">
			<h3 class="shipping-title">{{procince}} {{city}} {{name}}</h3>
			<p class="shipping-detail">
				{{province}} {{city}} {{address}} {{phone}}
			</p>
			<div class="shipping-footer">
				<span class="shipping-edit link">编辑</span>
				<span class="shipping-delete link">删除</span>
			</div>
		</div>
		{{/shippings}}
		<div class="shipping-add">
			<i class="fa fa-plus panel-add-icon" aria-hidden="true"></i>
			<p class="shipping-add-text">添加地址</p>
		</div>
	</div>
</div>
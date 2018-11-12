{{#notEmpty}}
<ul class="product-title clearfix">
	<li class="product-select">
		{{#allChecked}}
			<input type="checkbox" class="select-all" checked>
		{{/allChecked}}
		{{^allChecked}}
			<input type="checkbox" class="select-all">
		{{/allChecked}}
		<span>全选</span>
	</li>
	<li class="product-info">商品</li>
	<li class="product-price">单价</li>
	<li class="product-count">数量</li>
	<li class="product-totalPrice">小计</li>
	<li class="product-edit">操作</li>
</ul>
{{#cartList}}
<ul class="product-item" data-product-id = "{{product._id}}">
	<li class="product-select">
		{{#checked}}
		<input type="checkbox" class="select-one" checked />
		{{/checked}}
		{{^checked}}
		<input type="checkbox" class="select-one" />
		{{/checked}}
	</li>
	<li class="product-info">
		<a href="./detail.html?productId={{product._id}}" class="link" target="_blank">
			<img src="{{product.image}}" alt="">
			<span>{{product.name}}</span>
		</a>
	</li>
	<li class="product-price">￥{{product.price}}</li>
	<li class="product-count">
		<span class="btn-count minus">-</span>
		<input type="text" data-stock = "{{product.stock}}" class="count-input" value="{{count}}">
		<span class="btn-count plus">+</span>
	</li>
	<li class="product-totalPrice">{{totalPrice}}</li>
	<li class="product-edit">
		<span class="delete-one link">
			<i class="fa fa-trash-o"></i>删除
		</span>
	</li>
</ul>
{{/cartList}}
<ul class="product-footer">
	<li class="product-select">
		{{#allChecked}}
		<input type="checkbox" class="select-all" checked />
		{{/allChecked}}
		{{^allChecked}}
		<input type="checkbox" class="select-all"  />
		{{/allChecked}}	
		<span>全选</span>
	</li>
	<li class="product-edit">
		<span class="delete-selected">
			<i class="fa fa-trash-o"></i>删除选中
		</span>
	</li>
	<li class="product-submit">
		<span class="price-text">总价</span>
		<span class="price-price">{{totalCartPrice}}</span>
		<a href="javascript:;" class="btn-submit">结算</a>
	</li>
</ul>
{{/notEmpty}}
{{^notEmpty}}
	<p class="empty-message">购物车空空如也</p>
	<a href="/" class="btn">去购物</a>
{{/notEmpty}}
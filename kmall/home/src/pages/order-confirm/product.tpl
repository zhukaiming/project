
{{#notEmpty}}
<div class="panel">
	<h2 class="panel-header">商品清单</h2>
	<div class="panel-body">
		<ul class="product-title clearfix">
			<li class="product-info">商品</li>
			<li class="product-price">单价</li>
			<li class="product-count">数量</li>
			<li class="product-totalPrice">小计</li>
		</ul>
		{{#cartList}}
		<ul class="product-item" data-product-id = "{{product._id}}">
			<li class="product-info">
				<a href="./detail.html?productId={{product._id}}" class="link" target="_blank">
					<img src="{{product.image}}" alt="">
					<span>{{product.name}}</span>
				</a>
			</li>
			<li class="product-price">￥{{product.price}}</li>
			<li class="product-count">
				<input type="text" data-stock = "{{product.stock}}" class="count-input" value="{{count}}">
			</li>
			<li class="product-totalPrice">￥{{totalPrice}}</li>
		</ul>
		{{/cartList}}
		<ul class="product-footer">
			<li class="product-submit">
				<span class="price-text">总价:</span>
				<span class="price-price">￥{{totalCartPrice}}</span>
				<a href="javascript:;" class="btn-submit">支付</a>
			</li>
		</ul>
	</div>
</div>
{{/notEmpty}}
{{^notEmpty}}
	<p class="empty-message">购物车中没有选择商品</p>
	<a href="./cart.html" class=" btn gocart-btn">去购物选择</a>
{{/notEmpty}}
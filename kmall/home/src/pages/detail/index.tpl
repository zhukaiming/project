

<div class="product-intro clearfix">
	<div class="detail-img">
		<div class="detail-main-img">
			<img src="{{mainImg}}" alt="">
		</div>
		<ul class="detail-small-img-list clearfix">
			{{#images}}
			<li class="detail-small-img-list-item">
				<img src="{{.}}" alt="">
			</li>
			{{/images}}
		</ul>
	</div>
	<div class="product-info">
		<h2 class="product-name">{{name}}</h2>
		<p class="product-description">{{description}}</p>
		<div class="product-info-item product-price">
			<span class="lable">价格</span>
			<span class="info">￥{{price}}</span>
		</div>
		<div class="product-info-item">
			<span class="lable">库存</span>
			<span class="info">{{stock}}</span>
		</div>
		<div class="product-info-item product-count">
			<span class="lable">数量</span>
			<input type="text" value = "1" class="count-input" readonly>
			<span class="count-btn plus">+</span>
			<span class="count-btn minus">-</span>
		</div>
		<div class="add-cart">
			<a href="javascript:;" class="btn add-cart-btn">添加购物车</a>
		</div>
	</div>
</div>
<div class="product-detail">
	<div class="tab">
		<ul class="tab-list clearfix">
			<li class="tab-list-item active">商品详情</li>
			<li class="tab-list-item">用户评论</li>
		</ul>
		<div class="tab-content">
			{{detail}}
		</div>
	</div>
</div>


<ul class="clearfix">
	{{#list}}
		<li class="product-item">
			<a href="./detail.html?productId={{_id}}">
				<img class="product-img" src="{{images}}" alt="{{images}}">
				<p class="product-price">￥{{price}}</p>
				<p class="product-name">{{name}}</p>
			</a>
		</li>
	{{/list}}
</ul>
{{^list}}
	<p class="emp-message">你要找的东西去火星了</p>
{{/list}}
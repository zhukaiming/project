<!-- //模板 -->
{{#list}}
	{{#isActive}}
		<li class="side-item active">
	{{/isActive}}
	{{^isActive}}
		<li class="side-item">
	{{/isActive}}
		<a href="{{href}}" class="link">{{desc}}</a>
		</li>
{{/list}}
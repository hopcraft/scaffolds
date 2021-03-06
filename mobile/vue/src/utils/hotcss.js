/**
 * ===================================
 * 此文件功能用于做屏幕适配，代码已经内联
 * 到 html 文件，此处仅仅作为备份参考
 * ===================================
 */
 
(function( window , document ){
	var ScreenAdapter = {};

	(function() {
			var viewportEl = document.querySelector('meta[name="viewport"]')
			var screenAdapterEl = document.querySelector('meta[name="ScreenAdapter"]')
			var dpr = window.devicePixelRatio || 1
			var maxWidth = 0 // 响应式布局的最大宽度，0 => 无最大宽度, egg. 540 640...
			var designWidth = 0

			dpr = dpr >= 3 ? 3 : ( dpr >=2 ? 2 : 1 )

			if (screenAdapterEl) {
				var screenAdapterCon = screenAdapterEl.getAttribute('content');
				if (screenAdapterCon) {
					var initialDprMatch = screenAdapterCon.match(/initial\-dpr=([\d\.]+)/);
					if (initialDprMatch) {
						dpr = parseFloat(initialDprMatch[1])
					}
					var maxWidthMatch = screenAdapterCon.match(/max\-width=([\d\.]+)/)
					if (maxWidthMatch) {
						maxWidth = parseFloat(maxWidthMatch[1])
					}
					var designWidthMatch = screenAdapterCon.match(/design\-width=([\d\.]+)/)
					if (designWidthMatch) {
						designWidth = parseFloat(designWidthMatch[1])
					}
				}
			}

			document.documentElement.setAttribute('data-dpr', dpr)
			ScreenAdapter.dpr = dpr

			document.documentElement.setAttribute('max-width', maxWidth)
			ScreenAdapter.maxWidth = maxWidth

			if (designWidth) {
				document.documentElement.setAttribute('design-width', designWidth)
			}
			ScreenAdapter.designWidth = designWidth

			var scale = 1 / dpr
			var content = 'width=device-width, initial-scale=' + scale
				+ ', minimum-scale=' + scale
				+ ', maximum-scale=' + scale
				+ ', user-scalable=no'

			if (viewportEl) {
				viewportEl.setAttribute('content', content)
			} else {
				viewportEl = document.createElement('meta')
				viewportEl.setAttribute('name', 'viewport')
				viewportEl.setAttribute('content', content)
				document.head.appendChild(viewportEl)
			}

		})();

	ScreenAdapter.px2rem = function(px, designWidth){
		if (!designWidth) {
			designWidth = parseInt(ScreenAdapter.designWidth , 10)
		}

		return parseInt(px,10)*320/designWidth/20
	}

	ScreenAdapter.rem2px = function(rem, designWidth){
		if (!designWidth) {
			designWidth = parseInt(ScreenAdapter.designWidth , 10)
		}
		return rem*20*designWidth/320
	}

	ScreenAdapter.mresize = function() {
		var innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth

		if (ScreenAdapter.maxWidth
			&& (innerWidth/ScreenAdapter.dpr > ScreenAdapter.maxWidth)) {
			innerWidth = ScreenAdapter.maxWidth*ScreenAdapter.dpr;
		}

		if (!innerWidth) {
			return false
		}

		document.documentElement.style.fontSize = ( innerWidth*20/320 ) + 'px'
		ScreenAdapter.callback && ScreenAdapter.callback()
	}

	ScreenAdapter.mresize()

	window.addEventListener( 'resize' , function(){
		clearTimeout( ScreenAdapter.tid )
		ScreenAdapter.tid = setTimeout( ScreenAdapter.mresize , 33 )
	} , false )

	window.addEventListener( 'load' , ScreenAdapter.mresize , false )

	setTimeout(function(){
		ScreenAdapter.mresize();
	}, 50)

	window.ScreenAdapter = ScreenAdapter
})( window , document )

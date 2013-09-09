var gmap=function(){
	var _self=this;
	
	_self.map=null;
	
	_self.geocoder = new google.maps.Geocoder();//实例话抵制解析器对象;
	
	_self.markers=new Array();
	
	_self.infowins=new Array();
	
	_self.currentInfo=null;
	
	//init map
	_self.init=function(mapid,latlng,func) {//
			var mapDiv=document.getElementById(mapid);//获取map框对象
			var latlng=new google.maps.LatLng(latlng.lat,latlng.lng);//实例化一个经纬度对象
			//地图对象属性,设置地图
			var mapopts={
				backgroundColor: null,//用作地图 div 的背景颜色。当用户进行平移时，如果尚未载入图块，则显示此颜色。仅在启动地图时，才能设置此选项。  string
				center: latlng,//初始的地图中心。必填。									object
				disableDefaultUI: false,//启用/停用所有默认的用户界面。该属性可以单独进行重写。		boolean
				disableDoubleClickZoom: false,//启用/停用在双击时缩放并居中。默认情况下处于启用状态。 boolean
				draggable: true,//如果为 False，则禁止拖动地图。默认情况下启用拖动。		boolean
				draggableCursor: false,//要在可拖动对象上显示的光标的名称或网址。			string
				draggingCursor: false,//要在拖动对象时显示的光标的名称或网址。			string
				keyboardShortcuts: false,//如果为 False，则禁止通过键盘控制地图。默认情况下启用键盘快捷键。	boolean
				noClear: false,//如果为 true，则不会清除地图 div 的内容。				boolean
				mapTypeControl: false,//地图类型控件的初始启用/停用状态。				boolean
				navigationControl: false,//导航控件的初始启用/停用状态。				boolean
				scaleControl: false,//缩放控件的初始启用/停用状态。						boolean
				streetViewControl: false,//街景视图街景小人控件的初始启用/停用状态。		boolean
				zoom: 11,//初始的地图缩放级别。必填。									int
				//MapTypeId常量:ROADMAP-用于显示默认的道路地图视图;SATELLITE-用于显示 Google 地球卫星图像;HYBRID-用于同时显示普通视图和卫星视图;TERRAIN-用于根据地形信息显示实际地图。
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			
			_self.map=new google.maps.Map(mapDiv,mapopts);//实例化googlemap对象
			func && google.maps.event.addListenerOnce(_self.map, 'idle', function(){func(_self.map);});//运行一次后将自己删除
			func && _self.addevt(_self.map,'dragend',function(){func(_self.map);});//添加拖动停止监听对象
			func && _self.addevt(_self.map,'zoom_changed',function(){func(_self.map);});//添加缩放事件监听对象
	}
	
	//check latlng is in _self.map
	_self.isInMap=function(mapObj,lat,lng){
			//map.getBounds().contains(latLng:LatLng)	boolean	如果此范围包含指定的纬度/经度，则传回 true。
			var latlng=new google.maps.LatLng(lat,lng);
			return mapObj.getBounds().contains(latlng)?latlng:false;
	}
	
	//add google map marker in _self.map
	_self.addmkrs=function(latlng,custom,index){
			var mkrObj=custom.obj;
			//设置map上面的marker标记
			var markeropts={
				  position: latlng, //标记的位置
				  map: _self.map,	//标记的对象
				  title: custom.title?custom.title:null	//标记的提示title
			  }
			//如果有自定义标记图形
			if(custom.image){
				markeropts.icon=new google.maps.MarkerImage(custom.image,new google.maps.Size(20,34),new google.maps.Point(0,0),new google.maps.Point(0,34));
				markeropts.shadow=new google.maps.MarkerImage(custom.shadow,new google.maps.Size(38,22),new google.maps.Point(0,0),new google.maps.Point(0,22));
				markeropts.sharp=custom.shape;
			}
			//实例化一个标记googlemap对象
			var marker=new google.maps.Marker(markeropts);
			_self.markers[index]=marker;//入棧
	}
	
	_self.createwin=function(mkrObj,index){
		//組織提示床內容
		var winStr=newinfo(mkrObj);
		//content	string|Node	要在信息窗口中显示的内容。该内容可以是 HTML 元素、纯文本字符串或包含 HTML 的字符串。信息窗口将会根据相应内容调整大小。要设置内容的具体大小，请将内容设置为相应大小的 HTML 元素。
		//disableAutoPan	boolean	停用在打开时自动平移的功能。默认情况下，信息窗口会在打开后平移地图，以便让自己完全显示出来。
		//maxWidth	number	信息窗口的最大宽度（不考虑内容的宽度）。仅在已调用 open 函数前设置了该值时，才考虑使用这个值。在更改内容时，如果要更改最大宽度，请调用 close 函数、setOptions 函数，然后调用 open 函数。
		//pixelOffset	Size	信息窗口的箭头距离信息窗口在地图上所锚定地理坐标点的偏移量（以像素为单位）。如果信息窗口是通过锚点打开的，则从锚点范围的顶部中心开始计算 pixelOffset。
		//position	LatLng	用于显示此信息窗口的 LatLng。如果信息窗口是通过锚点打开的，则使用锚点的位置。
		//zIndex	number	所有信息窗口按 zIndex 值的大小顺序在地图上显示，zIndex 值较大的信息窗口显示在值较小的信息窗口之前。默认情况下，信息窗口是按纬度显示的，纬度较低的信息窗口显示在纬度较高的信息窗口前。信息窗口始终在标记前面显示。
		var infowinopt={
			content: winStr
		}
		var infowindow=new google.maps.InfoWindow(infowinopt);//创建信息窗口对象
		google.maps.event.addListener(_self.markers[index],'click',function(){
				_self.currentInfo && _self.currentInfo.close();
				infowindow.open(_self.map,_self.markers[index]);//啟動marker提示窗
				_self.currentInfo=infowindow;
			});
		_self.infowins[index]=infowindow;//入棧
	}
		
	_self.clrmkrs=function(){
			if(_self.markers.length>0)
			{
				for(i in _self.markers)
				{//设标记的对象为空
					_self.markers[i].setMap(null);
				}
				_self.markers.length=0;
			}
	}
	
	_self.parseAddress=function(addr,func){
			//geocoder = new google.maps.Geocoder();
			var request={
				address: addr,	//string	地址。可选。
				bounds:null,	//LatLngBounds	要在其中进行搜索的 LatLngBounds。可选。
				language:null,	//string	用于显示结果的首选语言。可选。
				location:null,	//LatLng	要搜索的 LatLng。可选。
				region:null		//string	要在其中进行搜索的国家/地区代码的顶级域名。可选。
				}
			_self.geocoder.geocode(request, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						func({lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()});
					} else if(status == google.maps.GeocoderStatus.ZERO_RESULTS){
						func && func();
						alert('Address not found! Please enter more detailed information');
					} else {
						alert("Google map connect failed! Please try again later");
					}
			});
	}
	
	_self.searchAddress=function(addr,func){
			//geocoder = new google.maps.Geocoder();
			var request={
				address: addr,	//string	地址。可选。
				bounds:null,	//LatLngBounds	要在其中进行搜索的 LatLngBounds。可选。
				language:null,	//string	用于显示结果的首选语言。可选。
				location:null,	//LatLng	要搜索的 LatLng。可选。
				region:null		//string	要在其中进行搜索的国家/地区代码的顶级域名。可选。
				}
			_self.geocoder.geocode(request, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						_self.map.setCenter(results[0].geometry.location);
						_self.map.setZoom(11);
						func && func({lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()});
					} else if(status == google.maps.GeocoderStatus.ZERO_RESULTS){
						func && func();
						alert('Address not found! Please enter more detailed information');
					} else {
						alert("Google map connect failed! Please try again later");
					}
			});
	}
	
	_self.getLatLng=function(address,func){
		var method=func?func:_self.setLatlng;
		_self.parseAddress(address,method);
	}
	
	_self.setLatlng=function(lat,lng){
		_self.latlng={lat:lat,lng:lng}
	}
	
	/*
	google.maps.event
	bounds_changed	None			当可视区域范围更改时会触发此事件。
	center_changed	None			当地图中心属性更改时会触发此事件。
	click			MouseEvent		当用户点击地图（但不是点击标记或信息窗口）时会触发此事件。
	dblclick		MouseEvent		当用户双击地图时会触发此事件。请注意，触发此事件前还会触发点击事件。
	drag			None			当用户拖动地图时会反复触发此事件。
	dragend			None			当用户停止拖动地图时会触发此事件。
	dragstart		None			当用户开始拖动地图时会触发此事件。
	idle			None			如果地图在平移或缩放之后变为闲置状态，则会触发此事件。
	maptypeid_changed	None		当 mapTypeId 属性更改时会触发此事件。
	mousemove		MouseEvent		只要用户的鼠标在地图容器上移动，就会触发此事件。
	mouseout		MouseEvent		当用户的鼠标从地图容器上退出时会触发此事件。
	mouseover		MouseEvent		当用户的鼠标进入地图容器时会触发此事件。
	projection_changed	None		当投影更改时会触发此事件。
	resize			None			当 div 更改大小时，开发人员应在地图上触发此事件：google.maps.event.trigger(map, 'resize') 。
	rightclick		MouseEvent		在地图容器中触发 DOM contextmenu 事件时会触发此事件。
	tilesloaded		None			可见图块载入完成后会触发此事件。
	zoom_changed	None			当地图缩放属性更改时会触发此事件。
	*/
	_self.addevt=function(obj,events,func){
		//监听google map事件
		google.maps.event.addListener(obj, events, func);
	}
}
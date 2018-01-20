/*
* @Author: Administrator
* @Date:   2018-01-19 11:18:51
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-20 15:31:37
*/
var weather;
var city;
//请求太原天气情况
$.ajax({url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
		dataType:"jsonp",
		type:"get",
		success:function(obj){
			weather=obj.data.weather;
			//console.log(weather);
		}
})
//请求城市
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		city=obj.data;
		//console.log(city);
	}
})


//渲染数据
function updata(){

	//screen数据
	var cityName=document.getElementsByClassName("header")[0];
	cityName.innerHTML=weather.city_name;
	var currentTemperature=document.getElementsByClassName("wendu")[0];
	currentTemperature.innerHTML=weather.current_temperature+"°";
	var current_condition=document.getElementsByClassName("tianqi")[0];
	current_condition.innerHTML=weather.current_condition;

	//今天最高温和最低温(span用id指定)
	var dat_high_temperature=document.getElementById("dat_high_temperature");
	dat_high_temperature.innerHTML=weather.dat_high_temperature;
	var dat_low_temperature=document.getElementById("dat_low_temperature");
	dat_low_temperature.innerHTML=weather.dat_low_temperature;

	//修改天气状况
	var dat_condition=document.getElementById("dat_condition");
	dat_condition.innerHTML=weather.dat_condition;
	var tomorrow_condition=document.getElementById("tomorrow_condition");
	tomorrow_condition.innerHTML=weather.tomorrow_condition;

    //修改天气图片
	var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
	//添加图片方式
	dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`;
	var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
	tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`;
	//修改明天最高温和最低温
	var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
	tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
	var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
	tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;

	//修改实时天气信息
	for(var i in weather.hourly_forecast){
		//创建父元素div
		var now=document.createElement("div");
		//给父元素div加样式
		now.className="now";
		//获取now的父元素
		var nowp=document.getElementById("now");
		//把now插入到父元素中
		nowp.appendChild(now);
		//console.log(weather)
		
		var now_time=document.createElement("h2");
		now_time.className="now_time";
		now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
		now.appendChild(now_time);

		var now_icon=document.createElement("div");
		now_icon.className="now_icon";
		now_icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`;
		now.appendChild(now_icon);

		var now_temperature=document.createElement("h3");
		now_temperature.className="now_temperature";
		now_temperature.innerHTML=weather.hourly_forecast[i].temperature+"°";
		now.appendChild(now_temperature);

		// var quality_level=document.createElement("h3");
		// quality_level.className="h3";
		// quality_level.innerHTML=weather.hourly_forecast[i].quality_level;
		// var box=document.getElementById("box");
		// box.appendChild(quality_level);
	}

	for(var i in weather.forecast_list){

		//创建recent并且添加到wrap中

		var recent=document.createElement("div");
		recent.className="recent";
		var nowq=document.getElementById("recent");
		nowq.appendChild(recent);

		var recent_time=document.createElement("div");
		recent_time.className="recent_time";
		recent.appendChild(recent_time);
		var month=document.createElement("span");
		month.className="month";
		month.innerHTML=weather.forecast_list[i].date.substring(5,7)+"/";
		recent_time.appendChild(month);
		var day=document.createElement("span");
		day.className="day";
		day.innerHTML=weather.forecast_list[i].date.substring(8);
		recent_time.appendChild(day);


		var recent_wea=document.createElement("h2");
		recent_wea.className="recent_wea";
		recent_wea.innerHTML=weather.forecast_list[i].condition;
		recent.appendChild(recent_wea);

		var recent_pic=document.createElement("div");
		recent_pic.className="recent_pic";
		recent_pic.style=`background-image:url(img/${weather.forecast_list[i].weather_icon_id}.png);`;
		recent.appendChild(recent_pic);

		var recent_high=document.createElement("h3");
		recent_high.className="recent_high";
		recent_high.innerHTML=weather.forecast_list[i].high_temperature+"°";
		recent.appendChild(recent_high);

		var recent_low=document.createElement("h4");
		recent_low.className="recent_low";
		recent_low.innerHTML=weather.forecast_list[i].low_temperature+"°";
		recent.appendChild(recent_low);

		var recent_wind=document.createElement("h5");
		recent_wind.className="recent_wind";
		recent_wind.innerHTML=weather.forecast_list[i].wind_direction;
		recent.appendChild(recent_wind);

		var recent_level=document.createElement("h6");
		recent_level.className="recent_level";
		recent_level.innerHTML=weather.forecast_list[i].wind_level+"级";
		recent.appendChild(recent_level);
	}

	var header=document.getElementsByClassName("header")[0];
    var city_box=document.getElementsByClassName("city_box")[0];
    header.onclick=function(){
    	$(".text").val("");
    	$(".button").html("取消");
    	city_box.style="display: block";
    }

    //渲染城市
    for(var k in city){
    	// console.log(k);
    	var title=document.createElement("h1");
    	title.className="title";
    	title.innerHTML=k;
    	var cityp=document.getElementById("city");
    	cityp.appendChild(title);

    	var con=document.createElement("div");
    	con.className="con";
    	//二级城市
    	for(var y in city[k]){
    		//console.log(y);
    		var erji=document.createElement("div");
    		erji.className="son";
    		erji.innerHTML=y;
    		con.appendChild(erji);
    	}
    	cityp.appendChild(con);
    }

}

//查找各城市天气信息
function AJAX(str){
	$.ajax({url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
		dataType:"jsonp",
		type:"get",
		success:function(obj){
			weather=obj.data.weather;
			updata();
			//jquery
			$(".city_box").css({"display": "none"});
			
		}
})
}

//当页面加载完成执行的代码
window.onload=function(){
	updata();
	//jquery
	$(".son").on("click",function(){
		var cityh=this.innerHTML;
		AJAX(cityh);
	})

	//当input获取焦点，button变确认
	//focus获取焦点    html设置或改变元素内容
	$(".text").on("focus",function(){
		$(".button").html("确认");
	})

	var button=document.getElementsByClassName("button")[0];
	button.onclick=function(){
		var btn=this.innerHTML;
		if(btn=="取消"){
			 var city_box1=document.getElementsByClassName("city_box")[0];
			 city_box1.style="display: none";
			 console.log(1);
		}
		else{
			var str=document.getElementsByClassName("text")[0].value;
			//console.log(str);
			for(var i in city){
				if(i==str){
					AJAX(str);
					//
					return;
				}
				else{
					for(var j in city[i]){
						if(str==j){
							AJAX(str);
							return;
						}
					}
				}
			}
			alert("没有该城市气象信息");
		}
	}
}
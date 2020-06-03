var dataContainer = document.getElementById("data-info");
var btn = document.getElementById("btn");
var showNum = document.getElementById("showNum");
var page = document.getElementById("pageNum");
var backward = document.getElementById("backward");
var forward = document.getElementById("forward");
//生成每頁顯示數量選項
var obj = document.getElementById("showNum");
for(i = 1; i <= 20; i++) obj.add(new Option(i, i));
obj.value = 10;
var n = 1;

btn.addEventListener("click", f);

function f(){
	var myRequest = new XMLHttpRequest();
	myRequest.open('GET', 'https://johnmeow.github.io/I3B30/data.json');
	myRequest.onload = function(){
		var theData = JSON.parse(myRequest.responseText);
		//console.log(theData[0]);
		if(n == 1)
		{
			//生成可選頁數
			page.options.length = 0;
			for(i = 1; i <= Math.ceil(theData.length/obj.value); i++) page.add(new Option(i, i));
			page.value = 1;
			n = 0;
		}
		renderHTML(theData);
	};
	myRequest.send();
}

function renderHTML(data){
	dataContainer.innerHTML= "";
	var htmlString = "";
	var sum = (page.value - 1) * showNum.value;
	for(i = 0; i + sum < data.length && i < showNum.value; i++)
	{
		htmlString += "<p>" + data[i + sum].site_id + " 人口：" + data[i + sum].people_total + " 人，面積： " + data[i + sum].area + "km²，人口密度： " + data[i + sum].population_density + " 人/km²。</p><br>"
	}
	dataContainer.insertAdjacentHTML('beforeend', htmlString);
}

page.addEventListener("change", f);
backward.addEventListener("click", f2);
forward.addEventListener("click", f3);
obj.addEventListener("change", f4);

function f2(){
	if(page.value > 1)
		page.value--;
	f();
}

function f3(){
	if(page.value < page.length)
	page.value++;
	f();
}

function f4(){
	n = 1;
	f();
}

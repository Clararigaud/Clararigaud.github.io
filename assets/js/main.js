function createHeader(){
	var l1 = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
	var l2 = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
	l1.setAttribute("id", "left-line");
	l2.setAttribute("id", "right-line");
	l1.setAttributeNS(null, "style", "stroke:white;stroke-width:4; -webkit-stroke:white;-webkit-stroke-width:4");
	l2.setAttributeNS(null, "style", "stroke:white;stroke-width:4");
	var res = updateHeader(l1, l2);
	document.getElementById("cuteline").appendChild(res[0]);
	document.getElementById("cuteline").appendChild(res[1]);
}

function updateHeader(l1, l2, event=undefined){
	var rect = document.getElementById("title").getBoundingClientRect();
	var titlerect = {
		w: parseInt(rect.width),
		h: parseInt(rect.height),
		l: parseInt(rect.left),
		t: parseInt(rect.top + window.pageYOffset)
	}

	var y0 = titlerect.t+titlerect.h/2;
	var l2p = { x1:titlerect.l+titlerect.w+10, x2:window.innerWidth, y: y0}

	var l1p = [[0,y0], [titlerect.l-10,y0]];
	var l2p = [[titlerect.l+titlerect.w+10,y0], [window.innerWidth,y0]];
	
	if(event){
		var s = 20;
		if(event.type=="mouseenter"){
		}
		else if(event.type=="mouseleave"){}

		else if(event.type=="mousemove"){
				// var f = function(x) {
				// 	if(x<=0.5000){
				// 		return 2.0*x;
				// 	}else{
				// 		return 1.0-2*(x-0.5);
				// 	}
				// }
				var f = function(x) {
					return 1-Math.pow(2*(x-0.5),2)
				}

				var compute = function(min_l, max_l){
					var ret = []
					for(var i=0.0; i<max_l-min_l; i+=1.0){
						var x = i/(max_l-min_l)
						var y = f(x);
						ret.push([i+min_l,y0+(y*(event.clientY+window.pageYOffset-y0))])
					}
					return ret;
					//return [Math.max(l1p[0][0],event.clientX), event.clientY+window.pageYOffset-10]
				}
			if(l1p[0][0] < event.clientX && event.clientX < l1p[l1p.length-1][0]){

				l1p = [
					l1p[0],
					[Math.max(0,event.clientX-s),y0],
					compute(Math.max(0,event.clientX-s),Math.min(event.clientX+s,l1p[l1p.length-1][0])),
					[Math.min(event.clientX+s,l1p[l1p.length-1][0]),y0],
					l1p[l1p.length-1]
					]
			
			}
			else if(l2p[0][0] < event.clientX && event.clientX < l2p[l2p.length-1][0]){
				l2p = [
					l2p[0],
					[Math.max(event.clientX-s,l2p[0][0]),y0],
					compute(Math.max(l2p[0][0],event.clientX-s),Math.min(event.clientX+s,l2p[l2p.length-1][0])),
					//[event.clientX,event.clientY+window.pageYOffset-10],
					[Math.min(l2p[l2p.length-1][0], event.clientX+s),y0],
					l2p[l2p.length-1]]
			}
		}
		}
		var t1 = [];
		var t2 = [];
		l1p.forEach((pts)=> t1.push(pts.join(",")));
		l2p.forEach((pts)=> t2.push(pts.join(",")));
		t1 = t1.join(" "); t2 = t2.join(" ");

		l1.setAttributeNS(null, "points", t1);
		l2.setAttributeNS(null, "points", t2);
		return [l1,l2];
	}





		// waiting for stuff to be readyyy
	// const fontloaded = new Promise((resolve, reject) => {
	// 	document.fonts.onloadingdone = () => {resolve()}; // nnot safari friendly
	// });
	const docloaded = new Promise((resolve, reject) => {
		window.addEventListener("DOMContentLoaded", (event) => {resolve()});
	});
	const cssloaded = new Promise((resolve, reject) => {
		window.addEventListener("load", (event) => {resolve()});
	});
	Promise.all([docloaded, cssloaded]).then((values) => {
		console.log("all loaded");
		createHeader();
		document.getElementById("header").addEventListener("mouseenter", (event) => {
			updateHeader(document.getElementById('left-line'), document.getElementById('right-line'),event)
		})
		document.getElementById("header").addEventListener("mousemove", (event) => {
			updateHeader(document.getElementById('left-line'), document.getElementById('right-line'), event)
		})
		document.getElementById("header").addEventListener("mouseleave", (event) => {
			updateHeader(document.getElementById('left-line'), document.getElementById('right-line'), event)
		})
	});

		//update stuff sometimes
	window.addEventListener("resize", () => { 
		updateHeader(document.getElementById('left-line'), document.getElementById('right-line'))
	});

		// window.addEventListener("scroll", () => { 
		// 	updateHeader(document.getElementById('left-line'), document.getElementById('right-line'))
		// });

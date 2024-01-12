function createHeader(){
	const l1 = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
	const l2 = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
	l1.setAttribute("id", "left-line");
	l2.setAttribute("id", "right-line");
	//l1.setAttributeNS(null, "style", "stroke:white;stroke-width:4; -webkit-stroke:white;-webkit-stroke-width:4");
	//l2.setAttributeNS(null, "style", "stroke:white;stroke-width:4");
	let res = updateHeader(l1, l2);
	document.getElementById("cuteline").appendChild(res[0]);
	document.getElementById("cuteline").appendChild(res[1]);
	updateHeader(document.getElementById('left-line'), document.getElementById('right-line'))
}

let linear = function(x) {
	if(x<=0.5000){
		return 2.0*x;
	}else{
		return 1.0-2*(x-0.5);
	}
}

let square = function(x) {
	return 1-Math.pow(2*(x-0.5),2)
}

let gauss = function(x){
	return Math.exp(-Math.pow(4*(x-0.5),2))
}

function updateHeader(l1, l2, event=undefined){
	const rect = document.getElementById("title").getBoundingClientRect();
	const titlerect = {
		w: parseInt(rect.width),
		h: parseInt(rect.height),
		l: parseInt(rect.left),
		t: parseInt(rect.top + window.pageYOffset)
	}

	const y0 = titlerect.t+titlerect.h/2;
	//const l2p = { x1:titlerect.l+titlerect.w+10, x2:window.innerWidth, y: y0}

	let l1p = [[0,y0], [titlerect.l-10,y0]];
	let l2p = [[titlerect.l+titlerect.w+10,y0], [window.innerWidth,y0]];
	
	if(event){
		if(event.type=="mouseenter"){
		}
		else if(event.type=="mouseleave"){}

		else if(event.type=="mousemove"){
				const s = 20;
				const deltaY = event.clientY-y0+window.pageYOffset
				//console.log(deltaY)
				const f = gauss;
				let lim = document.getElementById("header").getBoundingClientRect().height;
				if(event.target.nodeName == "A"){
					// lim =  event.target.offsetParent.offsetTop;
					lim =  event.target.getBoundingClientRect().top + window.pageYOffset;
					//console.log(event)
				}
				//console.log(event)
				let compute = function(min_l, max_l){
					let ret = []
					for(let i=0.0; i<max_l-min_l; i+=1.0){
						const x = i/(max_l-min_l)
						const y = f(x);
						//console.log(y)
						let yo = y0 + y*(deltaY);
						yo = Math.max(Math.min(yo, lim),15);
						ret.push([i+min_l,yo])
					}
					return ret;
				}

			if(l1p[0][0] < event.clientX && event.clientX < l1p[l1p.length-1][0]){
				l1p = [
					l1p[0],
					[Math.max(0,event.clientX-s),y0],
					compute(Math.max(0,event.clientX-s+1),Math.min(event.clientX+s-1,l1p[l1p.length-1][0])),
					[Math.min(event.clientX+s,l1p[l1p.length-1][0]),y0],
					l1p[l1p.length-1]
					]
			}
			else if(l2p[0][0] < event.clientX && event.clientX < l2p[l2p.length-1][0]){
				l2p = [
					l2p[0],
					[Math.max(event.clientX-s,l2p[0][0]),y0],
					compute(Math.max(l2p[0][0],event.clientX-s+1),Math.min(event.clientX+s-1,l2p[l2p.length-1][0])),
					[Math.min(l2p[l2p.length-1][0], event.clientX+s),y0],
					l2p[l2p.length-1]]
			}
		}
	}
	let t1 = [];
	let t2 = [];
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
	//console.log("all loaded");
	createHeader();
	// document.getElementsByTagName("body")[0].setAttribute("style","display:block;");
	document.getElementById("header").addEventListener("mouseenter", (event) => {
		updateHeader(document.getElementById('left-line'), document.getElementById('right-line'),event)
	})
	document.getElementById("header").addEventListener("mousemove", (event) => {
		updateHeader(document.getElementById('left-line'), document.getElementById('right-line'), event)
	})
	document.getElementById("header").addEventListener("mouseleave", (event) => {
		updateHeader(document.getElementById('left-line'), document.getElementById('right-line'), event)
	})
			document.querySelectorAll(".activity-post-content").forEach((e) => e.setAttribute("style", "opacity:0%; height: 0px;"));
		document.querySelectorAll(".activity-content-toggle").forEach((f) => f.addEventListener("click", function(e){
			var id = e.target.getAttribute("id");
			document.getElementById("activity-post-content-"+id).classList.toggle('cont');
			if(document.getElementById("activity-post-content-"+id).classList.contains("cont")){
				e.target.textContent = "Close X";
			}else{
				e.target.textContent = "Read the story again>";
			}
		}))
});

//update stuff sometimes
window.addEventListener("resize", () => { 
	updateHeader(document.getElementById('left-line'), document.getElementById('right-line'))
});

// window.addEventListener("scroll", () => { 
// 	updateHeader(document.getElementById('left-line'), document.getElementById('right-line'))
// });

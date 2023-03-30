const pts = []
const form2 = []
const form3 = []
const time = 0
let deg;
 let startdeg ;
function setup() { 
  console.log("COUCOU")
  createCanvas(400, 400);
  pts.push(createVector(50, 100))
  pts.push(createVector(150, 300))
  pts.push(createVector(300, 200))
  pts.push(createVector(140, 400))
  pts.push(createVector(200, 300))
  pts.push(createVector(200, 70))

  
  form2.push(createVector(15, 15))
  form2.push(createVector(40, 100))
  form2.push(createVector(300, 300))
  form2.push(createVector(200, 350))
  form2.push(createVector(10, 300))
  
  let c = createVector(250, 100)
   let r = 100
  for(let a = 0; a < 360; a += 20){
    let radian = a/360*2*PI
    let p = p5.Vector.add(c, p5.Vector.mult(createVector(cos(radian),sin(radian)),r))  
    form3.push(p)
  }
  startdeg = 0
  deg = startdeg;
} 

function draw() { 
  background(255);

  noStroke()
      beginShape()
    pts.forEach(pt => vertex(pt.x, pt.y))
    endShape(CLOSE)
   noFill()
  beginShape()
    form2.forEach(pt => vertex(pt.x, pt.y))
    endShape(CLOSE)
    beginShape()
    form3.forEach(pt => vertex(pt.x, pt.y))
    endShape(CLOSE)
  //makeBaro(5, 20, color(129, 206, 15))
  deg = deg+0.05
  if(deg > 359){
    deg = startdeg
  }
  makeBaro(1, 5, color(0, 0, 0), pts, deg, 0) // offset x, y // angle
makeBaro(3, 15, color(30, 30, 30), form2, deg-45, 0)
  makeBaro(1, 7, color(130, 130, 130), form3, 20-deg*0.05, deg)
  makeBaro(2, 7, color(255, 255, 255), form3, -30, deg*1.1)
}

function makeBaro(size, espace, col, shapePts, a, offset){
 let minMax = minMaxPoly(shapePts)
 let step = espace;
  let o = a/180.0*PI;
  let dir_o = createVector(cos(o), sin(o));
  let mr = mydist(minMax[0], minMax[1]);
  let center =  p5.Vector.div(p5.Vector.add(minMax[0], minMax[1]),2)
  
  for(let i = offset%step-mr/2; i < mr/2+offset%step; i+=step){
    let p = p5.Vector.add(center, createVector(cos(o+PI/2)*i,sin(o+PI/2) *i))
    strokeWeight(3)
    stroke(color(255,0,0))
    point(p.x, p.y)
    
    let intes =[]
     for (let k = 0,  j = shapePts.length - 1; k < shapePts.length; j = k++) {

        let inte = intersect_point(
         p5.Vector.add(dir_o, p),
        p5.Vector.add(p5.Vector.mult(dir_o, 100),p), 
        shapePts[k], 
        shapePts[j])
    if(inte){
      let inter = []
      inter.push(inte)

      let test = 1

      if(pointInPoly(shapePts, p5.Vector.add(dir_o, inte))){
         
         stroke(color(0, 0, 255))
        inter.push(1)
          strokeWeight(3)
          point(test*dir_o.x+inte.x, test*dir_o.y+inte.y)
        intes.push(inter);
      }
      else if(pointInPoly(shapePts, p5.Vector.add(p5.Vector.mult(dir_o,-1), inte))){
        stroke(color(0, 255, 0))
          inter.push(-1)
          strokeWeight(3)
          point(-1*dir_o.x+inte.x, -1*dir_o.y+inte.y)
        intes.push(inter);
      }
    } 
  }
    for(let k=0; k<intes.length-1; k++){
      let bestCandidate;
      let bestDist= width+height;
      let bestCandidate_i = 0;
      const intek = intes[k][0]
      let dirk = intes[k][1]
      intes[k].push(true)
      for(let l = 0; l<intes.length; l++){
        let cand = intes[l][0]
        let dirc = intes[l][1]
         if(dirk != dirc && !intes[l][2] && pointOnLine(p5.Vector.add(p5.Vector.mult(dir_o, dirk), intek), cand, intek)){
             if(mydist(cand,intek)<bestDist){
               bestDist = mydist(cand,intek)
               bestCandidate = cand
               bestCandidate_i = l
             }
          }
      } 
      if(bestCandidate){
        strokeCap(SQUARE);
        strokeWeight(size) 
        stroke(col) 
        intes[bestCandidate_i].push(true)
        line(intes[k][0].x, intes[k][0].y, bestCandidate.x, bestCandidate.y)
        noStroke()
      }
    }
  }
 }

function pointInPoly(verts, pt) {
  let c = false;
  for (let i = 0, j = verts.length - 1; i < verts.length; j = i++) {
    if (((verts[i].y > pt.y) != (verts[j].y > pt.y)) && (pt.x < (verts[j].x - verts[i].x) * (pt.y - verts[i].y) / (verts[j].y - verts[i].y) + verts[i].x)) c = !c;
  }
  return c;
}

function minMaxPoly(verts){
  let min_ = createVector(verts[0].x, verts[0].y)
  let max_ = createVector(verts[0].x, verts[0].y)
    for (let k = 0; k < verts.length; k++) {
      if(verts[k].x<min_.x) min_.x = verts[k].x
      if(verts[k].x>max_.x) max_.x = verts[k].x
      if(verts[k].y<min_.y) min_.y = verts[k].y
      if(verts[k].y>max_.y) max_.y = verts[k].y 
    }
  return [min_, max_]
} 

function intersect_point(point1, point2, point3, point4) {
   let ua = ((point4.x - point3.x) * (point1.y - point3.y) - 
             (point4.y - point3.y) * (point1.x - point3.x)) /
            ((point4.y - point3.y) * (point2.x - point1.x) - 
             (point4.x - point3.x) * (point2.y - point1.y));
  let res = createVector(point1.x + ua * (point2.x - point1.x), point1.y + ua * (point2.y - point1.y))
  
  if(pointOnLine(res, point3, point4)){
    return res
  }
  return 
} 

function mydist(p1, p2){
  return p5.Vector.dist(p1, p2)
}

function mynormalize(v){
  return p5.Vector.normalize(v);
}

function mysub(p1, p2){
  return p5.Vector.sub(p1,p2)
}
function pointOnLine(p, l1, l2){ 
  let pl1 = mynormalize(mysub(p,l1))
  let l2l1 =mynormalize(mysub(l2,l1))
  let l1l2 = mynormalize(mysub(l1,l2))
  let pl2 = mynormalize(mysub(p,l2))
  return round(1000*pl1.x)/1000 == round(1000*l2l1.x)/1000 && round(1000*pl1.y)/1000 == round(1000*l2l1.y)/1000 && round(1000*pl2.x)/1000 == round(1000*l1l2.x)/1000 && round(1000*pl2.y)/1000 == round(1000*l1l2.y)/1000
}
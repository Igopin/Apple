/* Rotate mesh primitives */


/* Cardiod apple geometry */ 
function CardAppleVertices(rad, num_vert_seg, num_horz_seg)
{
  var start, end, fx, fy, fz;

  start = 0;
  end = Math.PI;

  fx = function(t){return (2 * rad * Math.sin(t) - rad * Math.sin(2 * t));};
  fy = function(t){return (2 * rad * Math.cos(t) - rad * Math.cos(2 * t));};
  fz = function(t){return 0;};

  return RotateGeometryVertices(start, end, fx, fy, fz, num_vert_seg, num_horz_seg);
}

/* Cardioid apple mesh */
function AppleI(rad, num_vert_seg, num_horz_seg, material)
{
  var apple_geometry = SimpleIndex(CardAppleVertices(rad, num_vert_seg, num_horz_seg));
  return MeshRotateGeometry(apple_geometry);
}

function EllipseAppleVertices(A, B, angle, x_offset, num_vert_seg, num_horz_seg)
{
  var start, end, fx, fy, fz;
 
  PI = Math.PI;
  a = A * Math.cos(angle);
  b = B * Math.sin(angle)
  c = -x_offset;

  start = Math.asin(a / Math.sqrt(a*a + b*b)) - Math.asin(c / Math.sqrt(a*a + b*b));
  end = PI + Math.asin(c / Math.sqrt(a*a + b*b)) + Math.asin(a / Math.sqrt(a*a + b*b));

  fx = function(t){return (A * Math.cos(t) * Math.cos(angle) +
                           B * Math.sin(t) * Math.sin(angle) + x_offset);};
  fy = function(t){return (B * Math.sin(t) * Math.cos(angle) -
                           A * Math.cos(t) * Math.sin(angle));};
  fz = function(t){return 0;};

  return RotateGeometryVertices(start, end, fx, fy, fz, num_vert_seg, num_horz_seg);
}

function AppleII(A, B, angle, x_offset, num_vert_seg, num_horz_seg, material)
{
  var apple_geometry = SimpleIndex(EllipseAppleVertices(A, B, angle, x_offset, num_vert_seg, num_horz_seg));
  return MeshRotateGeometry(apple_geometry, material);
}


function Branch(a, lenght, max_rad, num_vert_seg, num_horz_seg, material)
{
  var branch_geometry = SimpleIndex(BranchGeom( a, lenght, max_rad, num_vert_seg, num_horz_seg ), material);
  return MeshRotateGeometry(branch_geometry, material);
}

function BranchGeom( a, lenght, max_rad, num_vert_seg, num_horz_seg )
{
  var branch_geometry = new THREE.Geometry(), 
      x, y, z, sx, sy,
      PI = Math.PI,
      vert_step, horz_step, rad_step,
      num_of_vertex = 0,
      radius = 0,
      start, end;

  
  start = 0;
  end = lenght;
  
  rad_step = max_rad / num_vert_seg;
  vert_step = lenght / num_vert_seg;
  horz_step =  2 * PI / num_horz_seg;

  /* First vertix (nord pole) */  
  x = 0;
  y = 0;
  z = 0;
  
  branch_geometry.vertices.push(new THREE.Vector3(x, y, z));
  num_of_vertex++;
  
  /* Create apple vertices */
  for (var t = start + vert_step; t < end; t += vert_step)
  {
    
    x += rad_step;
    y = a * Math.sqrt(t);
    z = 0;
    for (var u = (num_horz_seg > 97)  ? horz_step : 0; u < 2 * PI; u += horz_step)
    {
      sx = x * Math.cos(u) + z * Math.sin(u) + t;
      sz = z * Math.cos(u) - x * Math.sin(u);
      
      num_of_vertex++;
      branch_geometry.vertices.push(new THREE.Vector3(sx, y, sz));      
    }
  }

  /* Last vertix (nord pole) */  
  x = (x + t) / 2;
  y = a * Math.sqrt(t - vert_step);
  z = 0; 

  branch_geometry.vertices.push(new THREE.Vector3(x, y, z));
  num_of_vertex++;

  //alert("Number of vertices:" + num_of_vertex);
  return {geometry: branch_geometry, num_vert_seg_: num_vert_seg, num_horz_seg_: num_horz_seg};
}

function Leaf()
{
  var x = 0, y = 0;
  var heartShape = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths

  heartShape.moveTo(x, y); 
  heartShape.bezierCurveTo(x + 1, y + 2, x + 3, y + 3, x + 3, y + 5);
  heartShape.bezierCurveTo(x + 3, y + 6, x + 1.5, y + 8.5, x, y + 9);
  heartShape.bezierCurveTo(x - 1, y + 7, x - 3, y + 6, x - 3, y + 4);
  heartShape.bezierCurveTo(x - 3, y + 3, x - 1.5, y + 0.5, x, y);  //heartShape.lineTo( x + 5, y + 5);
  
  var geometry = new THREE.ExtrudeGeometry( heartShape, {amount:0, bevelSize: 0} );
  
  geometry.computeVertexNormals();
  return geometry;
}
/* Rotate mesh primitives */
function AppleI(rad, num_vert_seg, num_horz_seg, material)
{
  var start, end, fx, fy, fz;

  start = 0;
  end = Math.PI;

  fx = function(t){return (2 * rad * Math.sin(t) - rad * Math.sin(2 * t));};
  fy = function(t){return (2 * rad * Math.cos(t) - rad * Math.cos(2 * t));};
  fz = function(t){return 0;};

  return IndexRotateGeometry(RotateGeometry(start, end, fx, fy, fz, num_vert_seg, num_horz_seg), material);
}

function AppleII(A, B, angle, x_offset, num_vert_seg, num_horz_seg, material)
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

  return IndexRotateGeometry(RotateGeometry(start, end, fx, fy, fz, num_vert_seg, num_horz_seg), material);
}

function Branch(a, lenght, max_rad, num_vert_seg, num_horz_seg, material)
{
  return IndexRotateGeometry(BranchGeom( a, lenght, max_rad, num_vert_seg, num_horz_seg ), material);
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

    for (var u = horz_step; u < 2 * PI; u += horz_step)
    {
      sx = x * Math.cos(u) + z * Math.sin(u) + t;
      sz = z * Math.cos(u) - x * Math.sin(u);
      
      num_of_vertex++;
      branch_geometry.vertices.push(new THREE.Vector3(sx, y, sz));      
    }
  }

  /* Last vertix (nord pole) */  
  x = x / 2;
  y = a * Math.sqrt(t - vert_step);
  z = 0; 

  branch_geometry.vertices.push(new THREE.Vector3(x, y, z));
  num_of_vertex++;

  alert("Number of vertices:" + num_of_vertex);
  return {geometry: branch_geometry, num_vert_seg_: num_vert_seg, num_horz_seg_: num_horz_seg};
}

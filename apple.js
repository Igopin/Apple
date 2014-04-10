/*********************************************************************************************
 *                                         GEOMETRY
 *********************************************************************************************/

function AppleGeomI(rad, num_vert_seg, num_horz_seg)
{
  var x, y, z, sx, sy,
      apple_geometry = new THREE.Geometry(),
      PI = Math.PI,
      vert_step = PI / num_vert_seg, 
      horz_step = 2 * PI / num_horz_seg, num_of_vertex = 0;

  /* First vertix (nord pole) */  
  x = 2 * rad * Math.sin(0) - rad * Math.sin(0);
  y = 2 * rad * Math.cos(0) - rad * Math.cos(0);
  z = 0;
  
  apple_geometry.vertices.push(new THREE.Vector3(x, y, z));
  
  num_of_vertex++;
  
  /* Create apple vertices */
  for (var t = vert_step; t < PI; t += vert_step)
  {
    x = 2 * rad * Math.sin(t) - rad * Math.sin(2 * t);
    y = 2 * rad * Math.cos(t) - rad * Math.cos(2 * t);
    z = 0;

    for (var u = 0; u < 2 * PI; u += horz_step)
    {
      sz = z * Math.cos(u) + x * Math.sin(u);
      sx = x * Math.cos(u) - z * Math.sin(u);
      
      num_of_vertex++;
      
      apple_geometry.vertices.push(new THREE.Vector3(sx, y, sz));      
    }
  }
  /* Last vertix (nord pole) */  
  x = 2 * rad * Math.sin(PI) - rad * Math.sin(2 * PI);
  y = 2 * rad * Math.cos(PI) - rad * Math.cos(2 * PI);
  z = 0;
  apple_geometry.vertices.push(new THREE.Vector3(x, y, z));
  num_of_vertex++;

  alert("Number of vertices:" + num_of_vertex);
  return {geometry: apple_geometry, num_vert_seg_: num_vert_seg, num_horz_seg_: num_horz_seg};
}


function AppleGeomII(A, B, angle, x_offset, num_vert_seg, num_horz_seg )
{
  var x, y, z, sx, sy,
      apple_geometry = new THREE.Geometry(),
      PI = Math.PI,
      vert_step, horz_step,
      num_of_vertex = 0,
      start, end;

  var a, b, c, t1, t2;

  a = A * Math.cos(angle);
  b = B * Math.sin(angle)
  c = -x_offset;

  start = Math.asin(a / Math.sqrt(a*a + b*b)) - Math.asin(c / Math.sqrt(a*a + b*b));
  end = PI - Math.asin(c / Math.sqrt(a*a + b*b)) - Math.asin(a / Math.sqrt(a*a + b*b));
  
  end = 2 * PI - end;
  vert_step = (end - start) / num_vert_seg;
  horz_step =  2 * PI / num_horz_seg;

  /* First vertix (nord pole) */  
  x = A * Math.cos(start) * Math.cos(angle) + B * Math.sin(start) * Math.sin(angle) + x_offset;
  y = B * Math.sin(start) * Math.cos(angle) - A * Math.cos(start) * Math.sin(angle);
  z = 0;
  
  apple_geometry.vertices.push(new THREE.Vector3(x, y, z));
  
  num_of_vertex++;
  
  /* Create apple vertices */
  for (var t = start + vert_step; t < end; t += vert_step)
  {
    
    u = A * Math.cos(t);
    v = B * Math.sin(t);

    x = u * Math.cos(angle) + v * Math.sin(angle) + x_offset;
    y = v * Math.cos(angle) - u * Math.sin(angle);
    z = 0;

    for (var u = 0; u < 2 * PI; u += horz_step)
    {
      sz = z * Math.cos(u) + x * Math.sin(u);
      sx = x * Math.cos(u) - z * Math.sin(u);
      
      num_of_vertex++;
      
      apple_geometry.vertices.push(new THREE.Vector3(sx, y, sz));      
    }
  }

  /* Last vertix (nord pole) */  
  x = A * Math.cos(end) * Math.cos(angle) + B * Math.sin(end) * Math.sin(angle) + x_offset;
  y = B * Math.sin(end) * Math.cos(angle) - A * Math.cos(end) * Math.sin(angle);
  z = 0; 

  apple_geometry.vertices.push(new THREE.Vector3(x, y, z));
  num_of_vertex++;

  alert("Number of vertices:" + num_of_vertex);
  return {geometry: apple_geometry, num_vert_seg_: num_vert_seg, num_horz_seg_: num_horz_seg};
}

/*********************************************************************************************
 *                                         INDEXING
 *********************************************************************************************/

function IndexAppleGeom( apple_params, material )
{
  var
    apple_geometry = apple_params.geometry,
    num_vert_seg = apple_params.num_vert_seg_,
    num_horz_seg = apple_params.num_horz_seg_,
    apple_material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: 1}),
    num_of_index = 0;


  /* Pole indexing (nord) */  
  for (i = 1; i < num_horz_seg - 1; i++)
    apple_geometry.faces.push(new THREE.Face3(0, i, i + 1)), num_of_index++;
  apple_geometry.faces.push(new THREE.Face3(0, num_horz_seg - 1, 1));
  

  num_of_index++;

  /* Indexing vertices */
  for (i = 0; i < num_vert_seg - 2; i++)
  {
    for (j = 1; j < num_horz_seg; j++)
    {
      num_of_index++;

      apple_geometry.faces.push(new THREE.Face3(i * num_horz_seg + j,
                                                i * num_horz_seg + (j + 1), 
                                                (i + 1) * num_horz_seg + (j + 1)));

      apple_geometry.faces.push(new THREE.Face3(i * num_horz_seg + j,
                                                (i + 1) * num_horz_seg + (j + 1), 
                                                (i + 1) * num_horz_seg + j));
    }

    num_of_index++;
    apple_geometry.faces.push(new THREE.Face3((i + 1) * num_horz_seg,
                                              i * num_horz_seg + 1, 
                                              (i + 1) * num_horz_seg + 1));

    apple_geometry.faces.push(new THREE.Face3((i + 1) * num_horz_seg, 
                                              (i + 1) * num_horz_seg + 1,
                                               (i + 2) * num_horz_seg));
  }


  /* Pole indexing (south) */  
  for (i = 1; i < num_horz_seg; i++)
    apple_geometry.faces.push(new THREE.Face3((num_vert_seg - 2) * num_horz_seg + i, 
                                              (num_vert_seg - 2) * num_horz_seg + i + 1, 
                                              (num_vert_seg - 1) * num_horz_seg + 1)), num_of_index++;
  apple_geometry.faces.push(new THREE.Face3((num_vert_seg - 1) * num_horz_seg + 1, 
                                            (num_vert_seg - 1) * num_horz_seg, 
                                            (num_vert_seg - 2) * num_horz_seg + 1)), num_of_index++;

  alert("Number of triangles:" + num_of_index);
  var apple = new THREE.Mesh(apple_geometry, apple_material);
  return apple;
}
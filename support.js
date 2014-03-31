function DrawAxe(vec, col, scene)
{
  var axe = new THREE.Geometry();
  var axe_mat = new THREE.LineBasicMaterial({color: col});

  axe.vertices.push(new THREE.Vector3(0, 0, 0));
  axe.vertices.push(new THREE.Vector3(vec.x, vec.y, vec.z));

  line = new THREE.Line(axe, axe_mat); 
  scene.add(line);       
};

function degInRad( deg )
{
  return deg * Math.PI / 180;
};

function Apple(scene, pos, num_vert_seg, num_horz_seg, rad, col)
{
  var x, y, z, sx, sy,
      apple_geometry = new THREE.Geometry(),
      apple_material = new THREE.MeshBasicMaterial({color: col, wireframe: true}),
      PI = Math.PI,
      vert_step = PI / num_vert_seg, 
      horz_step = 2 * PI / num_horz_seg;
  
  var num_of_vertex = 0;

  /* First vertix (nord pole) */  
  x = pos.x;
  y = pos.y + 2 * rad * Math.sin(0) - rad * Math.sin(0);
  z = pos.z + 2 * rad * Math.cos(0) - rad * Math.cos(0);
  
  apple_geometry.vertices.push(new THREE.Vector3(x, y, z));

  /* Create apple vertices */
  for (var t = vert_step; t < PI; t += vert_step)
  {
    x = 1 * pos.x;
    y = 1 * ( pos.y + 2 * rad * Math.sin(t) - rad * Math.sin(2 * t) );
    z = 1 * ( pos.z + 2 * rad * Math.cos(t) - rad * Math.cos(2 * t) );

    for (var u = 0; u < 2 * PI; u += horz_step)
    {
      sx = x * Math.cos(u) + y * Math.sin(u);
      sy = y * Math.cos(u) - x * Math.sin(u);
      
      apple_geometry.vertices.push(new THREE.Vector3(sx, sy, z));      
      num_of_vertex++;
    }
  }
  /* Last vertix (nord pole) */  
  x = pos.x;
  y = pos.y + 2 * rad * Math.sin(PI) - rad * Math.sin(2 * PI);
  z = pos.z + 2 * rad * Math.cos(PI) - rad * Math.cos(2 * PI);
  apple_geometry.vertices.push(new THREE.Vector3(x, y, z));


  alert("Num of vertices I:" + (num_of_vertex+2));
  num_of_vertex = 0;

  /* Pole indexing (nord)*/  
  for (i = 1; i < num_horz_seg - 1; i++)
    apple_geometry.faces.push(new THREE.Face3(0, i, i + 1)), num_of_vertex++;
  apple_geometry.faces.push(new THREE.Face3(0, num_horz_seg - 1, 1));
  

  num_of_vertex++;

  /* Indexing vertices */
  for (i = 0; i < num_vert_seg - 2; i++)
  {
    for (j = 1; j < num_horz_seg; j++)
    {
      num_of_vertex++;
      apple_geometry.faces.push(new THREE.Face3(i * num_horz_seg + j,
                                               (i + 1) * num_horz_seg + j,
                                               (i + 1) * num_horz_seg + (j + 1)));

      apple_geometry.faces.push(new THREE.Face3(i * num_horz_seg + j,
                                                i * num_horz_seg + (j + 1), 
                                                (i + 1) * num_horz_seg + (j + 1)));
    }

    apple_geometry.faces.push(new THREE.Face3(i * num_horz_seg + num_horz_seg,
                                             (i + 1) * num_horz_seg + num_horz_seg,
                                             (i + 1) * num_horz_seg + 1));

    apple_geometry.faces.push(new THREE.Face3(i * num_horz_seg + num_horz_seg,
                                              i * num_horz_seg + 1, 
                                              (i + 1) * num_horz_seg + 1));

  }


  /* Pole indexing (south) */  
  for (i = 1; i < num_horz_seg - 1; i++)
    apple_geometry.faces.push(new THREE.Face3((num_vert_seg - 2) * num_horz_seg + i, 
                                              (num_vert_seg - 2) * num_horz_seg + i + 1, 
                                              (num_vert_seg - 2) * num_horz_seg  + num_horz_seg + 1)), num_of_vertex++;
  apple_geometry.faces.push(new THREE.Face3((num_vert_seg - 2) * num_horz_seg + 1, 
                                            (num_vert_seg - 2) * num_horz_seg + num_horz_seg, 
                                            (num_vert_seg - 2) * num_horz_seg  + num_horz_seg + 1)), num_of_vertex++;

  alert("Num of vertices II:" + num_of_vertex);

  var apple = new THREE.Mesh(apple_geometry, apple_material);
  return apple;
  //scene.add(apple);       
};
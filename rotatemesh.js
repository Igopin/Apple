/*********************************************************************************************
 *                                         GEOMETRY
 *********************************************************************************************/

function RotateGeometry(start, end, fx, fy, fz, num_vert_seg, num_horz_seg )
{
  var x, y, z, sx, sy, PI = Math.PI,
      rotate_geometry = new THREE.Geometry(),
      vert_step, horz_step, num_of_vertex = 0;


  /* First vertix (nord pole) */  
  x = fx(start);
  y = fy(start);
  z = fz(start);
  
  rotate_geometry.vertices.push(new THREE.Vector3(x, y, z));
  
  num_of_vertex++;
  
  vert_step = Math.abs(end - start) / num_vert_seg; 
  horz_step = 2 * PI / num_horz_seg;
  
  /* Create apple vertices */
  for (var t = start + vert_step; t < end; t += vert_step)
  {
    x = fx(t);
    y = fy(t);
    z = fz(t);

    for (var u = horz_step; u < 2 * PI; u += horz_step)
    {
      sz = z * Math.cos(u) + x * Math.sin(u);
      sx = x * Math.cos(u) - z * Math.sin(u);
      
      num_of_vertex++;
      
      rotate_geometry.vertices.push(new THREE.Vector3(sx, y, sz));      
    }
  }

  /* Last vertix (nord pole) */  
  x = fx(end);
  y = fy(end);
  z = fz(end);

  rotate_geometry.vertices.push(new THREE.Vector3(x, y, z));
  num_of_vertex++;

  alert("Number of vertices:" + num_of_vertex);
  return {geometry: rotate_geometry, num_vert_seg_: num_vert_seg, num_horz_seg_: num_horz_seg};  
}

/*********************************************************************************************
 *                                         INDEXING
 *********************************************************************************************/

function GetNormals( triangle )
{
  var normals = new Array(3), right, left;

  for (var i = 0; i < 3; i++)
    normals[i] = new THREE.Vector3(0, 0, 0);

  /* First normal */
  right = triangle[2].clone();
  right.sub(triangle[0]);
 
  left = triangle[1].clone();
  left.sub(triangle[0]);
 
  normals[0].crossVectors(left, right);
  normals[0].normalize();
   
  /* Second normal */
  right = triangle[0].clone();
  right.sub(triangle[1]);

  left = triangle[2].clone();
  left.sub(triangle[1]);

  normals[1].crossVectors(left, right);
  normals[1].normalize();
  
  /* Thrid normal */
  right = triangle[1].clone();
  right.sub(triangle[2]);

  left = triangle[0].clone();
  left.sub(triangle[2]);

  normals[2].crossVectors(left, right);
  normals[2].normalize();
  
  return normals;
}

function CreateTriangle( geometry, x, y, z )
{
  
  var triangle = new Array(3);

  triangle[0] = geometry.vertices[x];
  triangle[1] = geometry.vertices[y];
  triangle[2] = geometry.vertices[z];    
      
  normals = GetNormals(triangle);      
  geometry.faces.push(new THREE.Face3(x, y, z, normals)); 
}

function IndexRotateGeometry( apple_params, material )
{
  var
    apple_geometry = apple_params.geometry,
    num_vert_seg = apple_params.num_vert_seg_,
    num_horz_seg = apple_params.num_horz_seg_,
    apple_material = material,
    num_of_index = 0;


  for (i = 1; i < num_horz_seg; i++)
    CreateTriangle(apple_geometry, i, 0, i + 1), num_of_index++;
  CreateTriangle(apple_geometry, num_horz_seg, 0, 1);
  
  num_of_index++;

  var triangle = new Array(3), 
      normals, 
      x, y, z;


  /* Indexing vertices */
  for (i = 0; i < num_vert_seg - 2; i++)
  {
    for (j = 1; j < num_horz_seg; j++)
    {
      num_of_index++;

      /* New triangle vertices (each vertices is THREE.Vector3) */      
      CreateTriangle(apple_geometry,  i * num_horz_seg + j,
                                      i * num_horz_seg + (j + 1), 
                                     (i + 1) * num_horz_seg + (j + 1));
      

      CreateTriangle(apple_geometry,  i * num_horz_seg + j,
                                     (i + 1) * num_horz_seg + (j + 1), 
                                     (i + 1) * num_horz_seg + j);
    }

    num_of_index++;
   
    CreateTriangle(apple_geometry, (i + 1) * num_horz_seg,
                                    i * num_horz_seg + 1, 
                                   (i + 1) * num_horz_seg + 1);
    
    CreateTriangle(apple_geometry, (i + 1) * num_horz_seg,
                                   (i + 1) * num_horz_seg + 1, 
                                   (i + 2) * num_horz_seg);

  }
 
  /* Pole indexing (south) */  
  for (i = 1; i < num_horz_seg; i++)
    CreateTriangle(apple_geometry, (num_vert_seg - 2) * num_horz_seg + i, 
                                   (num_vert_seg - 2) * num_horz_seg + i + 1, 
                                   (num_vert_seg - 1) * num_horz_seg + 1), num_of_index++;
  CreateTriangle(apple_geometry, (num_vert_seg - 1) * num_horz_seg + 1, 
                                 (num_vert_seg - 1) * num_horz_seg, 
                                 (num_vert_seg - 2) * num_horz_seg + 1), num_of_index++;

  alert("Number of triangles:" + num_of_index);
  var apple = new THREE.Mesh(apple_geometry, apple_material);

  return apple;
}

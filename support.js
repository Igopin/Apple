function DrawAxe(vec, col, scene)
{
  var axe = new THREE.Geometry();
  var axe_mat = new THREE.LineBasicMaterial({color: col});

  axe.vertices.push(new THREE.Vector3(0, 0, 0));
  axe.vertices.push(new THREE.Vector3(vec.x, vec.y, vec.z));

  line = new THREE.Line(axe, axe_mat); 
  scene.add(line);       
};

function degInRad(deg)
{
  return deg * Math.PI / 180;
};

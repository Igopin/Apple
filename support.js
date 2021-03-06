function getChar(event) 
{
  if (event.which == null)
  {
    if (event.keyCode < 32)
      return null;
    return String.fromCharCode(event.keyCode);
  }
 
  if (event.which != 0 && event.charCode != 0) 
  { // not IE
    if (event.which < 32)
      return null; 
    return String.fromCharCode(event.which);
  }
  return null; 
}

function DrawAxe(vec, col, scene)
{
  var axe = new THREE.Geometry();
  var axe_mat = new THREE.LineBasicMaterial({color: col});

  axe.vertices.push(new THREE.Vector3(0, 0, 0));
  axe.vertices.push(new THREE.Vector3(vec.x, vec.y, vec.z));

  line = new THREE.Line(axe, axe_mat); 
  scene.add(line);       
}

function degInRad( deg )
{
  return deg * Math.PI / 180;
}

function VecOut( vec )
{
  var s = "(" + vec.x + ", " + vec.y + ", " + vec.z + ")";
  return s;
}

function FaceOut( vec )
{
  var s = "(" + vec.a + ", " + vec.b + ", " + vec.c + ")";
  return s;
}

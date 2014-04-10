function getChar(event)
{
  if (event.which == null) {  // IE
    if (event.keyCode < 32)
      return null; // special symbol
    return String.fromCharCode(event.keyCode)
  }
 
  if (event.which!=0 && event.charCode!=0) { // not IE
    if (event.which < 32)
      return null; // special symbol
    return String.fromCharCode(event.which); // another
  }
  return null; // special symbol
}

function DrawAxe(vec, col, scene)
{
  var axe = new THREE.Geometry();
  var axe_mat = new THREE.LineBasicMaterial({color: col});

  axe.vertices.push(new THREE.Vector3(0, 0, 0));
  axe.vertices.push(new THREE.Vector3(vec.x, vec.y, vec.z));

  line = new THREE.Line(axe, axe_mat); 
  scene.add(line);       
};
function
 degInRad( deg )
{
  return deg * Math.PI / 180;
};
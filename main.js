function main ()
{
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.setClearColor(0x000000);
    
  app = IndexAppleGeom(AppleGeomII({x:0, y:0, z:0}, 30, 20, 30), 0);
  app.position.z += 100;
  appp = IndexAppleGeom(AppleGeomI({x:0, y:0, z:0}, 30, 20, 30), 0);
  appp.position.z -= 100;
  scene.add(app);
  scene.add(appp);

  var floorgeo = new THREE.CubeGeometry(600,600,5);
  floormesh = new THREE.Mesh(floorgeo, new THREE.MeshBasicMaterial({color: 0x000000, opacity:0.9}));
  floormesh.position.y = -200;
  floormesh.rotation.x = 90 * Math.PI / 180;
  scene.add(floormesh);

  var light = new THREE.DirectionalLight(0xffffff);
  light.castShadow = true;
  light.position.set( 0, 0, 0 );
  scene.add(light);
    
  camera.position.y = 150*0;
  camera.position.x = 300;
  //camera.rotation.z = degInRad(120);

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var rotation = 0;
  function render() 
  {
    app.rotation.y += 0.01;
    appp.rotation.y += 0.01;
    //app.rotation.x += 0.01;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };

  render();
}
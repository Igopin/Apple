function main ()
{
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.setClearColor(0x000000);
    
  //app = IndexAppleGeom(AppleGeomI(20, 30, 20), 0);
  app = IndexAppleGeom(AppleGeomII(22, 30, -Math.PI / 12, -12, 30, 20), 0);
  scene.add(app);
  //scene.add(app2);
  
  

  var floorgeo = new THREE.CubeGeometry(600,600,5);
  floormesh = new THREE.Mesh(floorgeo, new THREE.MeshBasicMaterial({color: 0x000000, opacity:0.9 }));
  floormesh.position.y = -200;
  floormesh.rotation.x = 90 * Math.PI / 180;
  scene.add(floormesh);

  /* 
  var light = new THREE.DirectionalLight(0xffffff);
  light.castShadow = true;
  light.position.set( 0, 0, 0 );
  scene.add(light); 
  */
  camera.position.y = 50;
  camera.position.x = 90;

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var rotation = 0;
  function render() 
  {
    app.rotation.y += 0.01;
    app.rotation.z += 0.01;
    //app2.rotation.y += 0.01;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };

  render();
}
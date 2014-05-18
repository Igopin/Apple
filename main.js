function main ()
{
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
  var controls = new THREE.TrackballControls( camera );
  var 
    cb = document.getElementById("checkbox"),
    light_up_b = document.getElementById("light_up"),
    light_down_b = document.getElementById("light_down");
  var state, old_state;

  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  renderer.setClearColor(0x000000);
  renderer.shadowMapEnabled = true;  


  /* LIGHT */  
  var light = new THREE.SpotLight();
  light.castShadow = true;
  light.position.set(10, 250, 0);
  scene.add(light); 

  
  /* PRIMITIVES */
  app = AppleII(22, 30, -Math.PI / 12, -12, 100, 100, new THREE.MeshPhongMaterial({color:0x00ff00}));
  app.castShadow = true;
  app.receiveShadow = true;
  scene.add(app);
 

  app2 = Branch(25, 2, 2, 100, 100, new THREE.MeshPhongMaterial({color: 0x964b00}));
  app2.castShadow = true;
  app2.receiveShadow = true;
  scene.add(app2);
  
  var floorgeo = new THREE.PlaneGeometry(400, 400, 100, 100);
  floormesh = new THREE.Mesh(floorgeo, new THREE.MeshPhongMaterial({color: 0xcd00cd}));
  floormesh.position.y = -50;
  floormesh.rotation.x -= degInRad(90);
  floormesh.receiveShadow = true;
  floormesh.castShadow = true;
  //scene.add(floormesh);

  DrawAxe({x: 1000, y: 0, z: 0}, 0x00ff00, scene);
  DrawAxe({x: 0, y: 1000, z: 0}, 0xff0000, scene);
  DrawAxe({x: 0, y: 0, z: 1000}, 0x0000ff, scene);



  /* CAMERA */
  camera.position.y = 20;
  camera.position.x = 120;

  camera.lookAt(new THREE.Vector3(0, 0, 0));
 
  cb.checked = true; 
  state = 1, old_state = 0;

  light_up_b.onclick = function(){ light.intensity+= 0.1; };
  light_down_b.onclick = function(){ light.intensity-=0.1; };

  pos = 0;
  function render() 
  {
    light.position.x += 30 * Math.sin(pos += 0.1);
    app.rotation.x += 0.01;
    app.rotation.z += 0.01;
    app2.rotation.x += 0.01;
    app2.rotation.z += 0.01;

    state = cb.checked;
    if (state != old_state)
    {
      if (state)
      {
        app.material.wireframe = true;
        app2.material.wireframe = true;
        floormesh.material.wireframe = true;
      }
      else
      {      
        app.material.wireframe = false;
        app2.material.wireframe = false;
        floormesh.material.wireframe = false;
      }
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
    old_state = state;
    controls.update();
  };
  
  render();
}
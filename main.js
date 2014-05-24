function main ()
{
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
  var controls = new THREE.TrackballControls( camera );
  var
    div = document.getElementById("set"), 
    cb1 = document.getElementById("checkbox1"),
    cb2 = document.getElementById("checkbox2"),
    cb3 = document.getElementById("checkbox3"),
    cb4 = document.getElementById("checkbox4"),
    cb5 = document.getElementById("checkbox4"),
    op_up_b = document.getElementById("op_up"),
    op_down_b = document.getElementById("op_down"),
    light_up_b = document.getElementById("light_up"),
    light_down_b = document.getElementById("light_down");
 var state, old_state;
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  renderer.setClearColor(0x555555);
  renderer.shadowMapEnabled = true;  


  /* LIGHT */  
  var light = new THREE.DirectionalLight();
  light.castShadow = true;
  light.position.set(10, 250, 0);
  scene.add(light); 

/***************************** SHIIIIIIIIIIIIIIIT ***************/
  var axisHelper = new THREE.AxisHelper( 1000 ); 
  scene.add( axisHelper );
  
/****************************************************************/  
  

  /* PRIMITIVES */
  var app = AppleII(22, 30, -Math.PI / 12, -12, 8, 8,
    new THREE.MeshPhongMaterial({ambient: 0x00ff00, color:0x00ff00, 
      specular: 0x111111, shininess: 50, shading: THREE.SmoothShading}));
  app.castShadow = true;
  app.receiveShadow = true;
  //scene.add(app);
  // app.perPixel = true; 
  // app.material.side = THREE.DoubleSide;

  //var sup_geom = new THREE.Geometry(); 
  // for (i = 0; i <= 8; i++)
  //   for (j = 1; j <= 15 ; j++)
  //   sup_geom.faces[i * j] = app.geometry.faces[i ].clone();


  
  var me = TrueApple(32, 32, 8, 8);
  multiMObj = THREE.SceneUtils.createMultiMaterialObject(me, [
        new THREE.MeshPhongMaterial({ambient: 0x00ff00, color:0x00ff00, specular: 0x111111, shininess: 50, shading: THREE.SmoothShading}),
        new THREE.MeshBasicMaterial({color:0x000000, wireframe: true})]);

  scene.add(multiMObj);

  var app2 = Branch(25, 2, 2, 100, 100, new THREE.MeshPhongMaterial({color: 0x964b00}));
  //app2.castShadow = true;
  //app2.receiveShadow = true;
  scene.add(app2);
  app2.material.perPixel = true;

  /* CAMERA */
  camera.position.y = 20;
  camera.position.x = 120;

  camera.lookAt(new THREE.Vector3(0, 0, 0));
 
  cb1.checked = true; 
  cb2.checked = true; 
  cb3.checked = true; 
  cb4.checked = true; 
  state = 1, old_state = 0;

  light_up_b.onclick = function(){ light.intensity+= 0.1; };
  light_down_b.onclick = function(){ light.intensity-=0.1; };
  op_up_b.onclick = function(){ if (div.style.opacity < 1)div.style.opacity-=(-0.1); };
  op_down_b.onclick = function(){ div.style.opacity-=0.1; };

  pos = 0;
  function render() 
  {
    light.position.x += 30 * Math.sin(pos += 0.1);
    
    if (cb2.checked)
    {
      app.rotation.x += 0.01;
      app2.rotation.x += 0.01;
    }

    if (cb3.checked)
    { 
      app.rotation.y += 0.01;
      app2.rotation.y += 0.01;
    }

    if (cb4.checked)
    {
      app.rotation.z += 0.01;
      app2.rotation.z += 0.01;
    }

    state = cb1.checked;
    if (state != old_state)
    {
      if (state)
      {
        app.material.wireframe = true;
        app2.material.wireframe = true;
      }
      else
      {      
        app.material.wireframe = false;
        app2.material.wireframe = false;
      }
    }
    old_state = state;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
  };
  
  render();
}

// function Controls(cb)
// {
  
//   if (c_state != c_old_state)
//   {
//     if (c_state)
//     {
//       app.material.wireframe = true;
//       app2.material.wireframe = true;
//     }
//     else
//     {      
//       app.material.wireframe = false;
//       app2.material.wireframe = false;
//     }
//   }
//   old_state = state;
// };
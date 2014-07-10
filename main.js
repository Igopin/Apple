function main ()
{
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
  var controls = new THREE.TrackballControls( camera );
  var
    div = document.getElementById("set"), 
    subdiv = document.getElementById("subset"), 
    cb1 = document.getElementById("checkbox1"),
    cb2 = document.getElementById("checkbox2"),
    cb3 = document.getElementById("checkbox3"),
    cb4 = document.getElementById("checkbox4"),
    cb5 = document.getElementById("checkbox5"),
    button = document.getElementById("show_hide"),
    light_up_b = document.getElementById("light_up"),
    light_down_b = document.getElementById("light_down");
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  //renderer.setClearColor(0x555555);
  renderer.setClearColor(0xffffff);
  renderer.shadowMapEnabled = true;  

  cb1.checked = false; 
  cb2.checked = false; 
  cb3.checked = false; 
  cb4.checked = false;
  cb5.checked = true; 
  button.checked = true;
  
  var is_axis = true, axis = new THREE.AxisHelper( 1000 ); 
  scene.add(axis);

  cb5.onclick = function()
  {
    if (is_axis)
      scene.remove(axis), is_axis = false;
    else
      scene.add(axis), is_axis = true;
  };

  subdiv.style.visibility = "hidden";
  button.onclick = function() 
  {
    if (subdiv.style.visibility == "hidden")
      subdiv.style.visibility = "visible";
    else
      subdiv.style.visibility = "hidden";
  };
 
  light_up_b.onclick = function(){ light.intensity+= 0.1; };
  light_down_b.onclick = function(){ light.intensity-=0.1; };

  
  /* LIGHT */  
  var light = new THREE.DirectionalLight(0xffffff);
//  light.castShadow = true;
  light.position.set(100, 150, 0).normalize();
  scene.add(light); 


  /* CONSTS */
  var  NHZ_1 = 200,
       NHZ_2 = 30,
       LEAF_SIZE = 2.5,
       BRANCH_LENGHT = 2,
       BRANCH_WIDTH = 2,
       SPECULAR = 0x111111,
       LEAF_COLOR = 0x00ff00,
       BRANCH_COLOR = 0x964b00;

  /* PRIMITIVES */
  var leaf_geom = Leaf();

  // var leaf = THREE.SceneUtils.createMultiMaterialObject(leaf_geom, [
  //       new THREE.MeshPhongMaterial({ambient: 0x00ff00, color:0x00ff00, specular: 0x120000, shininess: 50, shading: THREE.SmoothShading}),
  //       new THREE.MeshBasicMaterial({color:0x000000, wireframe: true})]);

  var leaf_material = new THREE.MeshPhongMaterial({ambient: 0x00ff00, color: LEAF_COLOR, 
                                         specular: SPECULAR, shininess: 50, shading: THREE.SmoothShading})
  var leaf = new THREE.Mesh(leaf_geom, leaf_material); 

  leaf.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/2));
  leaf.rotation.x = Math.PI/4;
  leaf.scale.set(LEAF_SIZE, LEAF_SIZE, 0.05);
  leaf.rotation.x += Math.PI/8;
  leaf.rotation.z -= 0.05;
  leaf.position.y = 34;
  leaf.position.x -= 1.8;
  leaf.position.z += 1.4;


  var branch = Branch(25, BRANCH_LENGHT, BRANCH_WIDTH, 100, 100, 
    new THREE.MeshPhongMaterial({color: BRANCH_COLOR, specular: SPECULAR, shininess: 50, shading: THREE.SmoothShading}));

  var full_apple_geom = IndexRotateGeometryVertices(EllipseAppleVertices(22, 30, -Math.PI / 12, -12, NHZ_1, NHZ_1), BIG_UP),
      wireframe_apple_geom = IndexRotateGeometryVertices(EllipseAppleVertices(22, 30, -Math.PI / 12, -12, NHZ_2, NHZ_2), SMALL_DOWN);
      part_apple_geom = IndexRotateGeometryVertices(EllipseAppleVertices(22, 30, -Math.PI / 12, -12, NHZ_1, NHZ_1), SMALL_DOWN);
      
  var full_apple_material = new THREE.MeshPhongMaterial({ambient: 0x00ff00, color:0x00ff00, 
                                                         specular: SPECULAR, shininess: 50, shading: THREE.SmoothShading})
  
  var wireframe_apple_material = new THREE.MeshPhongMaterial({ambient: 0x00ff00, color:0x00ff00, wireframe: true,
                                                              specular: SPECULAR, shininess: 50, shading: THREE.SmoothShading})

  var part_apple_material = new THREE.MeshPhongMaterial({ambient: 0x00ff00, color:0x00ff00, transparent: true,
                                                         specular: SPECULAR, shininess: 50, shading: THREE.SmoothShading});

  var full_apple = new THREE.Mesh(full_apple_geom, full_apple_material),
      wireframe_apple = new THREE.Mesh(wireframe_apple_geom, wireframe_apple_material),
      part_apple = new THREE.Mesh(part_apple_geom, part_apple_material);


  var start_scale = 100;
  
  var reduce_matrix = new THREE.Matrix4().makeScale(1/start_scale, 1/start_scale, 1/start_scale);
  
  /* To start scale */
  full_apple.geometry.applyMatrix(reduce_matrix);
  wireframe_apple.geometry.applyMatrix(reduce_matrix);
  part_apple.geometry.applyMatrix(reduce_matrix);
  branch.geometry.applyMatrix(reduce_matrix);
  leaf.geometry.applyMatrix(reduce_matrix);

  full_apple.geometry.verticesNeedUpdate = true;
  wireframe_apple.geometry.verticesNeedUpdate = true;
  part_apple.geometry.verticesNeedUpdate = true;
  branch.geometry.verticesNeedUpdate = true;

  full_apple.castShadow =  true;
  full_apple.material.side = THREE.DoubleSide;
  full_apple.material.perPixel = true;
 
  wireframe_apple.receiveShadow = true;
  wireframe_apple.castShadow = true;
 
  part_apple.receiveShadow = true;
  part_apple.castShadow = true;
  part_apple.material.opacity = 1.0;
  

 /******************* КОСТЫЛЬ ******************/
  if (NHZ_1 > 97)
  {
    full_apple.rotation.y += 2 * Math.PI / NHZ_1;
    part_apple.rotation.y += 2 * Math.PI / NHZ_1;
  }
 /******************************  ****************/


  scene.add(full_apple);
  scene.add(wireframe_apple);
  scene.add(part_apple);
  scene.add(branch);
  scene.add(leaf);


  /* CAMERA */
  camera.position.y = 40;
  camera.position.x = 120;

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var time = 0,
      show_step = 0.02, is_show_anim = true
      transp_step = 0.005, is_transp_anim = false,
      leaf_step = 0.02, is_leaf_anim = false,
      show_rotate_step = (2 * Math.PI) / (1 / show_step),
      transp_rotate_step = (Math.PI) / (1 / transp_step),
      opasity_step = transp_step;
  

  num_of_frames = 1  / show_step;
  scale = Math.pow(start_scale, (1 / num_of_frames));
  var increase_matrix = new THREE.Matrix4().makeScale(scale, scale, scale);

  num_of_frames = 1 / transp_step;
  scale = Math.pow(start_scale, (1 / num_of_frames));
  var increase_matrix_b = new THREE.Matrix4().makeScale(scale, scale, scale);

  num_of_frames = 1 / leaf_step;
  scale = Math.pow(start_scale, (1 / num_of_frames));
  var increase_matrix_l = new THREE.Matrix4().makeScale(scale, scale, scale);
  
  var rot_matr_x = new THREE.Matrix4().makeRotationX(transp_rotate_step),
      rot_matr_y = new THREE.Matrix4().makeRotationY(transp_rotate_step),
      rot_matr_z = new THREE.Matrix4().makeRotationZ(-transp_rotate_step);

  state = 1, old_state = 0;
  pos = 0;
  
  alert("Applied Math Department");

  var state, old_state;

  function frame() 
  {   
    if (is_show_anim)
    {
      if (time < 1)
      {
        full_apple.geometry.applyMatrix(increase_matrix);
        wireframe_apple.geometry.applyMatrix(increase_matrix);
        part_apple.geometry.applyMatrix(increase_matrix);

        full_apple.geometry.verticesNeedUpdate = true;
        wireframe_apple.geometry.verticesNeedUpdate = true;
        part_apple.geometry.verticesNeedUpdate = true;

        full_apple.rotation.y += show_rotate_step;
        wireframe_apple.rotation.y += show_rotate_step;
        branch.rotation.y += show_rotate_step;
        part_apple.rotation.y += show_rotate_step;     
        time += show_step;
        //light.position.x += 30 * Math.sin(pos += 0.1);
      }
      else
        time = 0, is_show_anim = false, is_transp_anim = true;
    }

    if (is_transp_anim)
    {
      if (time < 1)
      {
        full_apple.rotation.y += transp_rotate_step;
        wireframe_apple.rotation.y += transp_rotate_step;
        branch.rotation.y += transp_rotate_step;
        part_apple.rotation.y += transp_rotate_step;          
        part_apple.material.opacity -= opasity_step;

        branch.geometry.applyMatrix(increase_matrix_b); 
        branch.geometry.verticesNeedUpdate = true;

        //light.position.x += 30 * Math.sin(pos += 0.1);
        time += transp_step;
      }
      else
      {
        time = 0, is_transp_anim = false, is_leaf_anim = true;
        scene.remove(part_apple);
        part_apple.geometry.dispose();
        part_apple.material.dispose();
      }
    }

    if (is_leaf_anim)
    {
      if(time < 1)
      {
        leaf.geometry.applyMatrix(increase_matrix_l);
        leaf.geometry.verticesNeedUpdate = true;
        time += leaf_step;
      }
      else
      {
        time = 0, is_leaf_anim = false, 
        subdiv.style.visibility = "visible";
      }
    }

    if (!(is_show_anim || is_transp_anim || is_leaf_anim))
    {
      if (cb2.checked)
      {
        full_apple.rotation.x +=transp_rotate_step;
        wireframe_apple.rotation.x += transp_rotate_step;
        branch.rotation.x += transp_rotate_step;
        part_apple.rotation.x += transp_rotate_step;    
        leaf.applyMatrix(rot_matr_x);
      }

      if (cb3.checked)
      { 
        full_apple.rotation.y += transp_rotate_step;
        wireframe_apple.rotation.y += transp_rotate_step;
        branch.rotation.y += transp_rotate_step;
        part_apple.rotation.y += transp_rotate_step;    
        leaf.applyMatrix(rot_matr_y);
      }

      if (cb4.checked)
      {
        full_apple.rotation.z += transp_rotate_step;
        wireframe_apple.rotation.z += transp_rotate_step;
        branch.rotation.z += transp_rotate_step;
        part_apple.rotation.z += transp_rotate_step;    
        leaf.applyMatrix(rot_matr_z);
      }

      state = cb1.checked;
      if (state != old_state)
      {
        if (state)
        {
          leaf.material.wireframe = true;
          branch.material.wireframe = true;
          full_apple.material.wireframe = true;
        }
        else
        {    
          leaf.material.wireframe = false;
          branch.material.wireframe = false;
          full_apple.material.wireframe = false;
        }
      }
      old_state = state;
    }    
  }
  
  function anim_loop() 
  {
    
    frame();
    requestAnimationFrame(anim_loop);
    renderer.render(scene, camera);
    controls.update();
 };

  anim_loop();

};

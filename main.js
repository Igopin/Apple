function main ()
{
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
   
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //DrawAxe({x:1000, y:0, z:0}, 0xff0000, scene);
    //DrawAxe({x:0, y:1000, z:0}, 0x00ff00, scene);
    //DrawAxe({x:0, y:0, z:1000}, 0x0000ff, scene);
    app = Apple(scene, {x:0, y:0, z:0}, 20, 20, 1, 0x00ff00);
    scene.add(app);
     
    camera.position.z = 5;
    camera.position.x = 5;
    camera.position.y = 5;
    camera.rotation.z = degInRad(120);

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var rotation = 0;
    function render() 
    {
      app.rotation.y += 0.01;
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();
}
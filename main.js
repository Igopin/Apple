function main ()
{
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
   
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var g = new THREE.Geometry();
    var spgeom = new THREE.SphereGeometry(1, 10, 10 );

    g.vertices.push(new THREE.Vector3(1, 1, 1));
    g.vertices.push(new THREE.Vector3(1, 1, 2));
    g.vertices.push(new THREE.Vector3(2, 1, 2));
    g.vertices.push(new THREE.Vector3(1, 2, 2));
                               
    g.faces.push(new THREE.Face3(0, 1, 2));
    g.faces.push(new THREE.Face3(0, 3, 2));
    g.faces.push(new THREE.Face3(0, 1, 3));
    
    var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    
    var p = new THREE.Mesh(g, material);
    var sp = new THREE.Mesh(spgeom, material);

    DrawAxe({x:1000, y:0, z:0}, 0xff0000, scene);
    DrawAxe({x:0, y:1000, z:0}, 0x00ff00, scene);
    DrawAxe({x:0, y:0, z:1000}, 0x0000ff, scene);
    scene.add(p);
    scene.add(sp);

    camera.position.z = 5;
    camera.position.x = 5;
    camera.position.y = 5;
    camera.rotation.z = degInRad(90);

    sp.position.x = 0.5;
    sp.position.y = 2;
    sp.position.z = -0.5;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var rotation = 0;
    var render = function () 
    {
      requestAnimationFrame(render);
      p.rotation.z += 0.01
      sp.rotation.y += 0.01
      renderer.render(scene, camera);
    };

    render();
}
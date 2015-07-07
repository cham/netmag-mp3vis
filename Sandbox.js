'use strict';
function Sandbox(){
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({alpha: true});
    this.renderer.shadowMapEnabled = true;

    var aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(40, aspect, 1, 1000);
    this.camera.position.set(-20, 70, -80);

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 90, 50);
    light.castShadow = true;
    light.shadowDarkness = 0.6;
    this.scene.add(light);

    this.cameraTicks = 0;
    this.resize();
}

Sandbox.prototype.resize = function resize(){
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
};

Sandbox.prototype.render = function render(){
    this.renderer.render(this.scene, this.camera);
};

Sandbox.prototype.add = function add(threeObject){
    this.scene.add(threeObject);
};

Sandbox.prototype.getEl = function(){
    return this.renderer.domElement;
};

Sandbox.prototype.rotateCamera = function rotateCamera(){
    var cameraDistance = 100;
    var camDelta = this.cameraTicks * 0.01;

    this.camera.position.x = Math.sin(camDelta) * cameraDistance;
    this.camera.position.z = Math.cos(camDelta) * cameraDistance;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.cameraTicks++;
};

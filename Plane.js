'use strict';
function Plane(options){
    this.width = options.width;
    this.length = options.length;
    this.geometry = this.buildGeometry();

    this.mesh = THREE.SceneUtils.createMultiMaterialObject(
        this.geometry,
        [
            new THREE.MeshLambertMaterial({
                color: 0x3399ff,
                side: THREE.DoubleSide
            }),
            new THREE.MeshBasicMaterial({
                color: 0xccffff,
                wireframe: true
            })
        ]
    );

    this.mesh.children.forEach(function(child){
        child.castShadow = true;
        child.receiveShadow = true;
    });
}

Plane.prototype.buildGeometry = function buildGeometry(){
    var geometry = new THREE.Geometry();

    for(var i = 0; i < this.length; i++){
        for(var j = 0; j < this.width; j++){
            geometry.vertices.push(new THREE.Vector3(i, 0, -j));
        }
    }

    this.addFaces(geometry);

    geometry.computeFaceNormals();

    return geometry;
};

Plane.prototype.addFaces = function addFaces(geometry){
    var offset;
    var w = this.width;
    var l = this.length;
    for(var i = 0; i < l - 1; i++){
        for(var j = 0; j < w - 1; j++){
            offset = i * w;
            geometry.faces.push(new THREE.Face3(offset + j, offset + j + 1, offset + w + j + 1));
            geometry.faces.push(new THREE.Face3(offset + w + j + 1, offset + w + j, offset + j));
        }
    }
};

Plane.prototype.setFirstRow = function setFirstRow(frequencyBuffer){
    for(var i = 0; i < this.width; i++){
        this.geometry.vertices[i].y = frequencyBuffer[i] / 10;
    }
    this.geometry.verticesNeedUpdate = true;
};

Plane.prototype.smear = function smear(){
    var index;
    for(var i = this.length - 1; i > 0; i--){
        for(var j = 0; j < this.width; j++){
            index = (this.width * i) + j;
            this.geometry.vertices[index].y = this.geometry.vertices[index - this.width].y;
        }
    }
    this.geometry.verticesNeedUpdate = true;
};

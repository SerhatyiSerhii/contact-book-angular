import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

@Component({
    selector: 'three-component',
    templateUrl: './threeJS.component.html',
    styleUrls: ['./threeJS.component.scss']
})
export class CreateThreeJS implements OnInit {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);

    hlight = new THREE.AmbientLight(0x404040, 100);
    directionalLight = new THREE.DirectionalLight(0xFFFFFF, 3);
    light = new THREE.PointLight(0xc4c4c4, 1);
    light2 = new THREE.PointLight(0xc4c4c4, 1);
    light3 = new THREE.PointLight(0xc4c4c4, 1);
    light4 = new THREE.PointLight(0xc4c4c4, 1);


    @ViewChild('myCanvas') myCanvas: ElementRef;

    renderer = new THREE.WebGLRenderer();

    controls = new OrbitControls(this.camera, this.renderer.domElement);

    loader = new GLTFLoader();
    constructor() { }

    public animate = () => {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    }

    ngAfterViewInit() {
        this.controls.target.set(0, 0, 0);
        this.controls.update();

        this.directionalLight.position.set(0, 1, 0);
        this.directionalLight.castShadow = true;

        this.light.position.set(0, 300, 500);
        this.light2.position.set(500, 100, 0);
        this.light3.position.set(0, 100, -500);
        this.light4.position.set(-500, 300, 0);

        this.loader.load('../../../assets/gltfModel/scene.gltf', (gltf) => {
            const phone = gltf.scene.children[0];
            phone.scale.set(0.5, 0.5, 0.5);
            phone.position.set(-35, 0, -28);

            this.scene.add(gltf.scene);
            this.renderer.render(this.scene, this.camera);
            this.animate();
        });

        this.scene.background = new THREE.Color(0xdddddd);
        this.renderer.setSize(400, 250);

        this.myCanvas.nativeElement.appendChild(this.renderer.domElement);

        this.scene.add(this.hlight);
        this.scene.add(this.directionalLight);
        this.scene.add(this.light);
        this.scene.add(this.light2);
        this.scene.add(this.light3);
        this.scene.add(this.light4);

        this.camera.position.z = 8;
        this.camera.position.x = 8;
        this.camera.position.y = 0;
        this.camera.rotation.y = 45/180*Math.PI;
    }

    ngOnInit() { }
}

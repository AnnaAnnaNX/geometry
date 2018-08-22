import React, { Component } from 'react';
import * as THREE from 'three';
class ThreeScene extends Component{
  constructor(props) {
    super(props);
    this.state = {

      width: 1,
      height: 2,
      long: 3,
      points: this.props.points
    };
  }

  componentWillReceiveProps({points}) {console.log('new props ThreeScene');
    this.setState({...this.state,points})
  }

  draw = () => {
    //clear scene
    while(this.scene.children.length > 0){ 
        this.scene.remove(this.scene.children[0]); 
    }

    let geometry = new THREE.Geometry();
    // let material = new THREE.MeshNormalMaterial()
    let material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });

    let vertices = [0,1,2,3,4,5,6,7].map(i=>new THREE.Vector3(...this.props.points[i]))
    let holes = []
    let triangles, mesh;

        geometry.vertices = vertices;

    triangles = THREE.ShapeUtils.triangulateShape ( vertices, holes );
    console.log('triangles', triangles);

    // for( var i = 0; i < triangles.length; i++ ){
    //     geometry.faces.push( new THREE.Face3( triangles[i][0], triangles[i][1], triangles[i][2] ));
    // }

    geometry.faces.push(new THREE.Face3(0,1,2));//[0] - сторона 0 (front)
    geometry.faces.push(new THREE.Face3(0,2,3));//[1] - сторона 0 (front)
    geometry.faces.push(new THREE.Face3(1,5,6));//[2] - сторона 1 (right) 
    geometry.faces.push(new THREE.Face3(1,6,2));//[3] - сторона 1 (right)
    geometry.faces.push(new THREE.Face3(3,2,6));//[2] - сторона 2 (top) 
    geometry.faces.push(new THREE.Face3(3,6,7));//[3] - сторона 2 (top)
    geometry.faces.push(new THREE.Face3(0,4,7));//[2] - сторона 3 (left) 
    geometry.faces.push(new THREE.Face3(0,7,3));//[3] - сторона 3 (left)
    geometry.faces.push(new THREE.Face3(0,1,5));//[2] - сторона 4 (bottom) 
    geometry.faces.push(new THREE.Face3(0,5,4));//[3] - сторона 4 (bottom)
    geometry.faces.push(new THREE.Face3(4,5,6));//[2] - сторона 5 (back) 
    geometry.faces.push(new THREE.Face3(4,6,7));//[3] - сторона 5 (back)

    console.log('geometry.faces', geometry.faces)

    this.mesh = new THREE.Mesh( geometry, material );
    
    console.log('this.mesh', this.mesh)

    this.scene.add(this.mesh)

// this.start()
this.renderScene()
  }

  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 4
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    // //ADD CUBE
    // const geometry = new THREE.BoxGeometry(this.state.width, this.state.height, this.state.long)
    // const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
    // this.cube = new THREE.Mesh(geometry, material)
    

    // console.log('this.cube.position',this.cube.position)//!position
    // console.log('this.cube',this.cube)//!matrix
    // console.log('this.cube.toJSON()',this.cube.toJSON())//!matrix

    // this.scene.add(this.cube)

console.log('this.props.points', this.props.points);

    //ADD SHAPE FROM POINTS
    // let vertices = [0,1,2,3,4,5,6,7].map(i=>new THREE.Vector3(...this.props.points[i]))
    // let holes = []
    // let triangles, mesh;
    // let geometry = new THREE.Geometry();
    // // let material = new THREE.MeshNormalMaterial()
    // let material = new THREE.MeshBasicMaterial({
    //     color: 0xff0000,
    //     wireframe: true
    // });


    // geometry.vertices = vertices;

    // triangles = THREE.ShapeUtils.triangulateShape ( vertices, holes );
    // console.log('triangles', triangles);

    // // for( var i = 0; i < triangles.length; i++ ){
    // //     geometry.faces.push( new THREE.Face3( triangles[i][0], triangles[i][1], triangles[i][2] ));
    // // }

    // geometry.faces.push(new THREE.Face3(0,1,2));//[0] - сторона 0 (front)
    // geometry.faces.push(new THREE.Face3(0,2,3));//[1] - сторона 0 (front)
    // geometry.faces.push(new THREE.Face3(1,5,6));//[2] - сторона 1 (right) 
    // geometry.faces.push(new THREE.Face3(1,6,2));//[3] - сторона 1 (right)
    // geometry.faces.push(new THREE.Face3(3,2,6));//[2] - сторона 2 (top) 
    // geometry.faces.push(new THREE.Face3(3,6,7));//[3] - сторона 2 (top)
    // geometry.faces.push(new THREE.Face3(0,4,7));//[2] - сторона 3 (left) 
    // geometry.faces.push(new THREE.Face3(0,7,3));//[3] - сторона 3 (left)
    // geometry.faces.push(new THREE.Face3(0,1,5));//[2] - сторона 4 (bottom) 
    // geometry.faces.push(new THREE.Face3(0,5,4));//[3] - сторона 4 (bottom)
    // geometry.faces.push(new THREE.Face3(4,5,6));//[2] - сторона 5 (back) 
    // geometry.faces.push(new THREE.Face3(4,6,7));//[3] - сторона 5 (back)

    // console.log('geometry.faces', geometry.faces)

    // this.mesh = new THREE.Mesh( geometry, material );
    
    // console.log('this.mesh', this.mesh)

    // this.scene.add(this.mesh)

// this.start()
this.renderScene()
  }
componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
stop = () => {
    cancelAnimationFrame(this.frameId)
  }
animate = () => {
   this.cube.rotation.x += 0.01
   this.cube.rotation.y += 0.01
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}
render(){console.log('new render ThreeScene');
  if (this.props.points) {console.log('вызов draw');this.draw();}
    return(
      <div>
        <div
          style={{ width: '400px', height: '400px' }}
          ref={(mount) => { this.mount = mount }}
        />
        <button onClick={
          ()=>{
            this.setState({width: this.state.width+1});
            this.setState({height: this.state.height+1});
            this.setState({long: this.state.long+1});
            console.log('this.state.width ', this.state.width);
            // this.cube.position.x = -1

            //write vertices
            this.mesh.geometry.vertices.map((a)=>{
              console.log(a.x);
              console.log(a.y);
              console.log(a.z);
            })
            this.mesh.rotation.x += 0.5;
            this.mesh.rotation.y += 0.5;
            this.mesh.rotation.z += 0.5;

            console.log('this.cube.geometry.vertices ', this.mesh.geometry.vertices)
            console.log('findNearPoint ', this.findNearPoint(this.mesh.geometry.vertices))

            this.renderScene()
            console.log('this.cube.geometry.vertices1 ', this.mesh.geometry.vertices)
          }
        }>111</button>
      </div>
    )
  }

  findNearPoint = (points) => {
    //find a point with a max coordinate z
    let max = 0
    if (!points) return null
    points.map(( a, i) => {
      if (points[max].z < a.z){
        max = i
      }
    })
    return max
  }

}
export default ThreeScene
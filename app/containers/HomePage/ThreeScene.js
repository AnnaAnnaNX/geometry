import React, { Component } from 'react';
import * as THREE from 'three';
class ThreeScene extends Component{
  constructor(props) {
    super(props);
    this.state = {
      width: 1,
      height: 2,
      long: 3
    };
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
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(this.state.width, this.state.height, this.state.long)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
    this.cube = new THREE.Mesh(geometry, material)
    

    console.log('this.cube.position',this.cube.position)//!position
    console.log('this.cube',this.cube)//!matrix
    console.log('this.cube.toJSON()',this.cube.toJSON())//!matrix


    this.scene.add(this.cube)
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
render(){
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
            this.cube.position.x = -4
            this.renderScene()
          }
        }>111</button>
      </div>
    )
  }
}
export default ThreeScene

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';

export default class SVGScene extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
   constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps({points, selectedFaces}) {console.log('new props SVGScene');
    this.setState({...this.state,points})
    this.setState({...this.state,selectedFaces})
  }

  componentDidMount() {
    
  }

  getPointsOfFace = (NFace) => {
    switch( NFace){
      case 0 : return [0, 1, 2, 3];break;//front
      case 1 : return [1, 5, 6, 2];break;//right
      case 2 : return [0, 1, 5, 4];break;//top
      case 3 : return [0, 4, 7, 3];break;//left
      case 4 : return [3, 2, 6, 7];break;//bottom
      case 5 : return [4, 5, 6, 7];break;//back
    }
  }

  render() {
    const koef = 100;
    const { points } = this.props;
    let shapes = [];
    console.log('SVG porints ', this.props.points);
    console.log('SVG selectedFaces ', this.props.selectedFaces);

    if (this.props.selectedFaces && this.props.points){
      this.props.selectedFaces.map( i => {
        shapes.push(this.getPointsOfFace(i))
      })
    }
    console.log('SVG shapes ', shapes)
    console.log('SVG shapes.length ', shapes.length)

    return (
      <div>
        <svg width="400" height="400">
        {console.log('shapes',shapes)}
        {console.log('shapes.length',shapes.length)}
          {
            shapes.length>0 && shapes.map(Npoints => {
              Npoints && console.log('SVG text', `${Npoints[0]},${Npoints[0]} 
                                ${Npoints[1]},${Npoints[1]}
                                ${Npoints[2]},${Npoints[2]}
                                ${Npoints[3]},${Npoints[3]}`);

              return (
              <polygon points={`${points[Npoints[0]][0]*koef},${points[Npoints[0]][1]*koef} 
                                ${points[Npoints[1]][0]*koef},${points[Npoints[1]][1]*koef}
                                ${points[Npoints[2]][0]*koef},${points[Npoints[2]][1]*koef}
                                ${points[Npoints[3]][0]*koef},${points[Npoints[3]][1]*koef}`}
              key={ Npoints.join('') }
              style={{fill:'rgb(0,0,255)',strokeWidth:1,stroke:'rgb(0,0,0)'}} 
            />
                )
            }
            )
          }
        </svg>
      </div>
    );
  }
}
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import ThreeScene from './ThreeScene';
import SVGScene from './SVGScene';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
   constructor(props) {
    super(props);
    this.state = {
      // x: null,
      // y: null,
      // z: null,
      // w: null,
      // h: null,
      // d: null,
      x: 0,
      y: 0,
      z: 0,
      w: 1,
      h: 1,
      d: 1,
      points: undefined 
      // [
      //   [0, 0, 0],
      //   [1, 0, 0],
      //   [1, 1, 0],
      //   [0, 1, 0],
      //   [0, 0, 1],
      //   [1, 0, 1],
      //   [1, 1, 1],
      //   [0, 1, 1],
      // ]
      ,
      selectedFaces: [],




      width: 1,
      height: 2,
      long: 3
    };
  } 

  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  handleChange = name => event => {console.log(111);
    this.setState({
      [name]: event.target.value,
    });
  };

 handleChangeCheckbox = name => event => {
    if (!this.state.selectedFaces.includes(name))
      this.setState({ selectedFaces: [...this.state.selectedFaces, name] })
    else{
        this.setState({ selectedFaces: this.state.selectedFaces.filter( i => i != name ) });
    }

  };

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

function setup() {
  createCanvas(710, 400, WEBGL);
}

function draw() {
  background(100);
  
  noStroke();
  fill(50);
  push();
  box(100,10,100);
  pop();
}

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>

        <div>
            <h3>Cube properties</h3>
            <span>
              Position:{' '}
              <TextField style={{width: '20px'}}
                  id="x"
                  label="x"
                  value={this.state.x}
                  onChange={this.handleChange('x')}
              />
              <TextField style={{width: '20px'}}
                  id="y"
                  label="y"
                  value={this.state.y}
                  onChange={this.handleChange('y')}
              />
              <TextField style={{width: '20px'}}
                  id="z"
                  label="z"
                  value={this.state.z}
                  onChange={this.handleChange('z')}
              />
            </span>

            <span>
              Cube's parameters:{' '}
              <TextField style={{width: '20px'}}
                  id="w"
                  label="w"
                  value={this.state.w}
                  onChange={this.handleChange('w')}
              />
              <TextField style={{width: '20px'}}
                  id="h"
                  label="h"
                  value={this.state.h}
                  onChange={this.handleChange('h')}
              />
              <TextField style={{width: '20px'}}
                  id="d"
                  label="d"
                  value={this.state.d}
                  onChange={this.handleChange('d')}
              />
            </span>

            <p>
              Select faces:
                <div style={{display: 'flex'}}>
                 <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={this.state.selectedFaces.includes(0)} onChange={this.handleChangeCheckbox(0)} />
                    }
                    label="0 - front"//front
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={this.state.selectedFaces.includes(1)} onChange={this.handleChangeCheckbox(1)} />
                    }
                    label="1 - right"//torightp
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={this.state.selectedFaces.includes(2)} onChange={this.handleChangeCheckbox(2)} />
                    }
                    label="2 - top"//top
                  />
                </FormGroup>

                 <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={this.state.selectedFaces.includes(3)} onChange={this.handleChangeCheckbox(3)} />
                    }
                    label="3 - left"//front
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={this.state.selectedFaces.includes(4)} onChange={this.handleChangeCheckbox(4)} />
                    }
                    label="4 - bottom"//top
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={this.state.selectedFaces.includes(5)} onChange={this.handleChangeCheckbox(5)} />
                    }
                    label="5 - back"//top
                  />
                </FormGroup>
              </div>
            </p>
            <Button variant="contained" color="primary"
              onClick={()=>{
                console.log('x', this.state.x);

                const x = this.state.x,
                 y = this.state.y,
                 z = this.state.z,
                 w = this.state.w,
                 h = this.state.h,
                 d = this.state.d;

                const points = [
                  [x, y, z],
                  [x+w, y, z],
                  [x+w, y+h, z],
                  [x, y+h, z],
                  [x, y, z+d],
                  [x+w, y, z+d],
                  [x+w, y+h, z+d],
                  [x, y+h, z+d],
                ];

                this.setState({points: points});

              }}
            >Add cube</Button>
        </div>


        <div style={{width: '55%', float: 'left', border: '1px solid red'}}>
          <ThreeScene points = {this.state.points}></ThreeScene>
        </div>
        <div style={{width: '40%', float: 'left', border: '1px solid red'}}>
          <SVGScene points = {this.state.points} selectedFaces={this.state.selectedFaces}></SVGScene>
        </div>
        <div className="home-page">

        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

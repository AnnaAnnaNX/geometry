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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
   constructor(props) {
    super(props);
    this.state = {
      x: null,
      y: null,
      z: null,
      w: null,
      h: null,
      d: null,
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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
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
            <h3>Cube properties:</h3>
            <p>
            Position{' '}
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
            </p>

            <p>
            Cube's parameters{' '}
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

        <ThreeScene points = {this.state.points}></ThreeScene>
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

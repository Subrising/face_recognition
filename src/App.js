import React, {Component} from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageInput from './components/imageinput/ImageInput';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const app = new Clarifai.App({
  apiKey: 'c98aca35c9b14555b67b187360ae51f2'
});

const pOptions = {
  "fps_limit": 28,
  "particles": {
    "number": {
      "value": 200,
      "density": {
        "enable": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 30,
      "opacity": 0.4
    },
    "move": {
      "speed": 1
    },
    "opacity": {
      "anim": {
        "enable": true,
        "opacity_min": 0.05,
        "speed": 2,
        "sync": false
      },
      "value": 0.4
    }
  },
  "polygon": {
    "enable": true,
    "scale": 0.5,
    "type": "inline",
    "move": {
      "radius": 10
    },
    "path": "/face-recognition.svg",
    "inline": {
      "arrangement": "equidistant"
    },
    "draw": {
      "enable": true,
      "stroke": {
        "color": "rgba(255, 255, 255, .2)"
      }
    }
  },
  "retina_detect": false,
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      }
    },
    "modes": {
      "bubble": {
        "size": 6,
        "distance": 40
      }
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      faceBox: {},
      route: 'signin',
      signedIn: false
    }
  }

  calcFaceLoc = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const imgWidth = Number(image.width);
    const imgHeight = Number(image.height);
    return {
      leftCol: face.left_col * imgWidth,
      topRow: face.topRow * imgHeight,
      rightCol: imgWidth - (face.right_col * imgWidth),
      bottomRow: imgHeight - (face.bottom_row * imgHeight)
    }
  }

  displayBoundyBox = (faceBox) => {
    console.log(faceBox)
    this.setState({ faceBox })
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ input: event.target.value })
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.displayBoundyBox(this.calcFaceLoc(response)))
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({signedIn: false})
    } else if (route === 'home') {
      this.setState({signedIn: true})
    }
    this.setState({ route: route })
  }

  render() {
    const { signedIn, imageUrl, faceBox, route } = this.state
    return (
      <div className="App">
        <Particles
          className='particles'
          params={pOptions}
        />
        <Navigation
          onRouteChange={ this.onRouteChange }
          signedIn={signedIn}
        />
        { route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageInput
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition
              box={faceBox}
              imageUrl={imageUrl}
            />
          </div>
          : (route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />)
        }
      </div>
    );
  }
}

export default App;

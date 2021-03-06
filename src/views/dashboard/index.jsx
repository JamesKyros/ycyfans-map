import 'maptalks/dist/maptalks.css';
import './hexagon.scss';
import * as React from 'react';
import { HexagonLayer } from 'deck.gl';
import * as maptalks from 'maptalks';
import DeckGLLayer from '../../plugin/deck-layer';

// const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv';
const DATA_JSONURL = '../../../public/data/heatmap-datajson.json';

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2,
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

const elevationScale = { min: 1, max: 50 };

class Hexagon extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};

    this.container = null;
    this.map = null;
    this.deckLayer = null;

    this.state = {
      elevationScale: elevationScale.min,
    };

    this.startAnimationTimer = null;
    this.intervalTimer = null;

    this._startAnimate = this._startAnimate.bind(this);
    this._animateHeight = this._animateHeight.bind(this);
  }

  componentDidMount() {
    this.map = new maptalks.Map(this.container, {
      center: [-1.4157267858730052, 52.232395363869415],
      zoom: 7,
      pitch: 40.5,
      bearing: -27.396674584323023,
      centerCross: true,
      baseLayer: new maptalks.TileLayer('tile', {
        urlTemplate: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c', 'd'],
      }),
    });

    require('d3-request').json(DATA_JSONURL, (error, response) => {
      if (!error) {
        const data = response.map(d => [Number(d.lng), Number(d.lat)]);
        this._animate(data);
        console.log(data); // eslint-disable-line
      }
    });
  }

  componentWillUnmount() {
    // this.map.remove()
    if (this.deckLayer) {
      this.deckLayer.remove();
    }
  }

  setRef = (x = null) => {
    this.container = x;
  };

  _animate(data) {
    this.setState({
      data,
    });
    this._stopAnimate();
    // wait 1.5 secs to start animation so that all data are loaded
    this.startAnimationTimer = window.setTimeout(this._startAnimate, 1500);
  }

  _startAnimate() {
    this.intervalTimer = window.setInterval(this._animateHeight, 20);
  }

  _stopAnimate() {
    window.clearTimeout(this.startAnimationTimer);
    window.clearTimeout(this.intervalTimer);
  }

  _animateHeight() {
    // eslint-disable-next-line
    if (elevationScale.max === this.state.elevationScale) {
      this._stopAnimate();
    } else {
      this.setState({
        // eslint-disable-next-line
        elevationScale: this.state.elevationScale + 1,
      });
    }
  }

  _renderLayers() {
    const {
      data, radius = 1000, upperPercentile = 100, coverage = 1,
    } = this.state;
    if (data) {
      // eslint-disable-next-line
      const { onHover } = this.props;
      const props = {
        layers: [
          new HexagonLayer({
            id: 'heatmap',
            colorRange,
            coverage,
            data,
            elevationRange: [0, 3000],
            // eslint-disable-next-line
            elevationScale: this.state.elevationScale,
            extruded: true,
            getPosition: d => d,
            lightSettings: LIGHT_SETTINGS,
            onHover,
            opacity: 1,
            pickable: Boolean(onHover),
            radius,
            upperPercentile,
          }),
        ],
      };
      if (!this.inited) {
        this.inited = true;
        this.deckLayer = new DeckGLLayer('deck', props, {
          animation: true,
          renderer: 'webgl',
        });
        this.map.addLayer(this.deckLayer);
      } else if (this.deckLayer) {
        this.deckLayer.setProps(props);
      }
    }
  }

  render() {
    this._renderLayers();
    return (<div ref={this.setRef} className="map-content" />);
  }
}

export default Hexagon;

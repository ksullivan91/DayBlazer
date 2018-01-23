import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
class ResultMap extends Component {
  componentDidUpdate = () => {
    // console.log(this.props.data);
    mapboxgl.accessToken = 'pk.eyJ1IjoibnVyZ2VyYnVyZ2VyIiwiYSI6ImNqY21teGM0ZTEwZTAyd3J3ZGZuY2p2dzYifQ.KuK_Hrox3L3h6qs7oXBKCQ';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v9',
      center: [this.props.data.location.lng, this.props.data.location.lat],
      zoom: 10
    });
    map.on('load', () => {
      const data = this.props.data.activities.map(activity => {
        return {
          "type": "Feature",
          "properties": {
              "description": `<h2>${activity.brewery ? activity.brewery.name : activity.name}</h2><p>${activity.brewery && activity.brewery.description ? activity.brewery.description.length > 1 && activity.brewery.description.slice(0, 240) : activity.summary && activity.summary.slice(0, 240)}</p>`,
              "icon": activity.brewery ? 'beer' : this.determineIcon(activity)
          },
          "geometry": {
              "type": "Point",
              "coordinates": [activity.longitude, activity.latitude]
          }
        }
      });
      map.addLayer({
        "id": "places",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": data
            }
        },
        "layout": {
            "icon-image": "{icon}-15",
            "icon-allow-overlap": true
        }
      });
      console.log(map.getCenter());
      map.on('dragend', () => {
        console.log(map.getCenter());
      });

    });
    map.on('click', 'places', function (e) {
      new mapboxgl.Popup()
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML(e.features[0].properties.description)
        .addTo(map);
    });
  }
  // componentDidMount = () => {
  //   mapboxgl.accessToken = 'pk.eyJ1IjoibnVyZ2VyYnVyZ2VyIiwiYSI6ImNqY21teGM0ZTEwZTAyd3J3ZGZuY2p2dzYifQ.KuK_Hrox3L3h6qs7oXBKCQ';
  //   const map = new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/outdoors-v9',
  //     center: [11.255, 43.77],
  //     zoom: 12
  //   });
  // }
  determineIcon = (i) => {
    let text;
    switch(i.type) {
      case 'Trail':
        text = 'campsite';
        break;
      case 'Featured Ride':
        text = 'bicycle';
        break;
      default:
        text = 'marker';
    }
    return text;
  }
  componentWillReceiveProps = () => {
    console.log(this.props);
  }
  render() {
    return (
      <div id="map">
      </div>
    )
  }
}

export default ResultMap;
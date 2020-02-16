/*
 * @Author: Joshua Asare
 * @Date: 2020-02-14 15:42:50
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-16 19:42:12
 */

import React, { Component } from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps';
import { MainContent } from '.';
import './css/locationSelection.css';

type Props = {
  data: Array
};

type State = {};

// eslint-disable-next-line no-undef
const google = window.google;

class MultiLocation extends Component<Props, State> {
  state: {
    zoomToMarkers: () => {}
  };

  componentDidMount() {
    this.initPageData();
  }

  zoomToMarkers = map => {
    const bounds = new google.maps.LatLngBounds();
    map.props.children.forEach(child => {
      if (child.type === Marker) {
        bounds.extend(
          new google.maps.LatLng(
            child.props.position.lat,
            child.props.position.lng
          )
        );
      }
    });
    map.fitBounds(bounds);
  };

  initPageData() {
    this.setState({});
  }

  renderToolbar() {}

  renderContent() {
    return (
      <GoogleMap
        key={new Date().getTime()}
        defaultZoom={15}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        ref={map => map && this.zoomToMarkers(map)}
      >
        {this.props.data.map(item => {
          return (
            <Marker
              position={{
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lng)
              }}
              title={item.title}
              visible
            />
          );
        })}
      </GoogleMap>
    );
  }

  render() {
    return (
      <MainContent toolbar={this.renderToolbar()}>
        {this.renderContent()}
      </MainContent>
    );
  }
}

export default withScriptjs(withGoogleMap(MultiLocation));

/*
 * @Author: Joshua Asare
 * @Date: 2020-02-14 15:42:50
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-17 09:27:46
 */

import React, { Component } from 'react';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps';
import { MainContent } from '.';
import './css/locationSelection.css';

type Props = {
  data: Array,
  showCluster: boolean
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
    map.props.children.props.children.forEach(child => {
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

  zoomToMarkersWithoutClusters = map => {
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

  initPageData() {}

  renderToolbar() {}

  renderContent() {
    if (this.props.showCluster) {
      return (
        <GoogleMap
          key={new Date().getTime()}
          defaultZoom={15}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
          ref={map => map && this.zoomToMarkers(map)}
        >
          <MarkerClusterer
            // onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
          >
            {this.props.data.map((item, index) => {
              const key = `marker-${index}`;
              return (
                <Marker
                  key={key}
                  position={{
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lng)
                  }}
                  title={item.title}
                  visible
                />
              );
            })}
          </MarkerClusterer>
        </GoogleMap>
      );
    }

    return (
      <GoogleMap
        key={new Date().getTime()}
        defaultZoom={15}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        ref={map => map && this.zoomToMarkersWithoutClusters(map)}
      >
        {this.props.data.map((item, index) => {
          const key = `marker-${index}`;
          return (
            <Marker
              key={key}
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

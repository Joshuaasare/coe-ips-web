/*
 * @Author: Joshua Asare
 * @Date: 2020-02-14 15:26:31
 * @Last Modified by: Joshua Asare
 * @Last Modified time: 2020-02-16 23:31:28
 */
import React, { useState, useEffect } from 'react';
import {
  MultiLocation,
  CenterPage,
  Loader,
  CircularButton
} from '../../_shared/components';
import { constants } from '../../_shared/constants';

type Props = {
  data: Array
};

// eslint-disable-next-line no-undef

const CompanyMapView = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showCluster, setShowCluster] = useState(false);

  useEffect(() => {
    initPageData();
  }, [props.data]);

  function initPageData() {
    setLoading(true);
    const coords = props.data.map(item => {
      return {
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lng),
        title: item.name
      };
    });
    setData(coords);
    setLoading(false);
  }

  const toggleCluster = () => {
    setShowCluster(!showCluster);
  };

  function renderIcons() {
    return (
      <div className="distribution__icons">
        <CircularButton
          size={4}
          iconName="loop2"
          backgroundColor="#fff"
          iconColor="maroon"
          shadowed
          containerClassName="u-margin-bottom-standard"
          onClick={() => initPageData()}
        />

        <CircularButton
          size={4}
          iconName="podcast"
          backgroundColor={showCluster ? 'maroon' : '#fff'}
          iconColor={showCluster ? '#fff' : 'maroon'}
          shadowed
          onClick={toggleCluster}
        />
      </div>
    );
  }

  function renderContent() {
    if (loading) {
      return (
        <CenterPage>
          <Loader active inverted coverEverything content="Please wait..." />
        </CenterPage>
      );
    }
    return (
      <MultiLocation
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${constants.maps.API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div style={{ height: '500px', position: 'relative' }} />
        }
        data={data}
        showCluster={showCluster}
      />
    );
  }

  return (
    <div className="distribution__map">
      {renderIcons()}
      {renderContent()}
    </div>
  );
};

export default CompanyMapView;

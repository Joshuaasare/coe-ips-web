/**
 * @Author: Joshua Asare <joshuaasare>
 * @Date:   2019-09-02 09:45:19
 * @Last modified by:   joshuaasare
 * @Last modified time: 2019-09-02 13:38:50
 */
import React from 'react';
import './css/CustomRheostat.css';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';

const CustomRheostat = (props) => {
  const {
    max, min, values, headerText, onChange, onValuesUpdated,
  } = props;
  return (
    <div className="custom-rheostat">
      <div className="custom-rheostat__header">
        <span>{headerText}</span>
      </div>

      <div className="custom-rheostat__container">
        <Rheostat
          max={max}
          min={min}
          values={values}
          onChange={onChange}
          onValuesUpdated={onValuesUpdated}
        />
      </div>

      <div className="custom-rheostat__values-container">
        <div className="custom-rheostat__input-container">
          <div className="custom-rheostat__value">
            <span className="custom-rheostat__currency">GHC</span>
            <span className="custom-rheostat__price">
              {values[0].toFixed(2)}
            </span>
          </div>
        </div>

        <div className="custom-rheostat__input-container">
          <div className="custom-rheostat__value">
            <span className="custom-rheostat__currency">GHC</span>
            <span className="custom-rheostat__price">
              {values[1] >= max ? `${values[1]} + ` : values[1].toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomRheostat.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  values: PropTypes.arrayOf(PropTypes.number),
  headerText: PropTypes.string,
  onChange: PropTypes.func,
  onValuesUpdated: PropTypes.func,
};

CustomRheostat.defaultProps = {
  max: 1000,
  min: 1,
  values: [1, 1000],
  headerText: 'Select price range',
  onChange: () => {},
  onValuesUpdated: () => {},
};

export default CustomRheostat;

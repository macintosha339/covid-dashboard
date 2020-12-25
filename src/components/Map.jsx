import React, { useRef, useLayoutEffect } from 'react';
import * as am4maps from '@amcharts/amcharts4/maps';
import * as am4core from '@amcharts/amcharts4/core';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import FullScreenBtn from './FullScreenBtn';
import '../styles/mapContent.scss';

function Map(props) {
  const map = useRef(props);

  useLayoutEffect(() => {
    const x = am4core.create('mapContent', am4maps.MapChart);



    const mapData = [];
    props.countries.forEach((country) => {
      mapData.push({
        id: country.CountryCode,
        name: `${country.Country}\nTotal confirmed`,
        value: country.TotalConfirmed,
      });
    });

    x.geodata = am4geodata_worldLow;

    x.projection = new am4maps.projections.Miller();

    x.background.fill = 'rgb(20,30,50)';
    x.background.fillOpacity = 1;

    const polygonSeries = x.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ['AQ'];
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeWidth = 0.5;
    polygonSeries.calculateVisualCenter = true;

    const imageSeries = x.series.push(new am4maps.MapImageSeries());
    imageSeries.data = mapData;
    imageSeries.dataFields.value = 'value';

    const imageTemplate = imageSeries.mapImages.template;
    imageTemplate.nonScaling = true;

    const circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.7;
    circle.fill = 'rgba(255,0,0,0.6)';
    circle.tooltipText = '{name}: [bold]{value}[/]';

    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = 'rgb(60,60,60)';
    polygonTemplate.fillOpacity = 1;
    polygonTemplate.stroke = 'black';
    polygonTemplate.strokeOpacity = 0.15;
    polygonTemplate.setStateOnChildren = true;
    polygonTemplate.tooltipPosition = 'fixed';
    const polygonHoverState = polygonTemplate.states.create('hover');
    polygonHoverState.transitionDuration = 0;
    polygonHoverState.properties.fill = 'rgb(40,40,40)';

    imageSeries.heatRules.push({
      target: circle,
      property: 'radius',
      min: 4,
      max: 30,
      dataField: 'value',
    });

    imageTemplate.adapter.add('latitude', (latitude, target) => {
      const polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
      if (polygon) {
        return polygon.visualLatitude;
      }
      return latitude;
    });

    imageTemplate.adapter.add('longitude', (longitude, target) => {
      const polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
      if (polygon) {
        return polygon.visualLongitude;
      }
      return longitude;
    });

    map.current = x;

    return () => {
      x.dispose();
    };
  }, []);

  return (
    <div className="map main_component">
      <div className="mapContent"></div>
      <FullScreenBtn />
    </div>
  );
}

export default Map;

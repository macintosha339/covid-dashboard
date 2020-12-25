import React, { useRef, useLayoutEffect } from 'react';
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import FullScreenBtn from './FullScreenBtn';

const Chart = (props) => {
  const chart = useRef(null);
  useLayoutEffect(() => {
    let x = am4core.create("chart", am4charts.XYChart);
    x.paddingLeft = 0;


    let data = [];
    let visits = 10;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
      data.push({ date: new Date(2019, 0, i), value: visits });
    }

    x.data = data;

    x.zoomOutButton.icon.disabled = true;
    let zoomImage = x.zoomOutButton.createChild(am4core.Image);
    zoomImage.href = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDk2IDk2IiBoZWlnaHQ9Ijk2cHgiIGlkPSJ6b29tX291dCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgOTYgOTYiIHdpZHRoPSI5NnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNOTAuODI5LDg1LjE3MUw2OC4xMjEsNjIuNDY0QzczLjA0Nyw1Ni4zMDcsNzYsNDguNSw3Niw0MEM3NiwyMC4xMTgsNTkuODgyLDQsNDAsNEMyMC4xMTgsNCw0LDIwLjExOCw0LDQwczE2LjExOCwzNiwzNiwzNiAgYzguNSwwLDE2LjMwNi0yLjk1MywyMi40NjQtNy44NzlsMjIuNzA4LDIyLjcwOGMxLjU2MiwxLjU2Miw0LjA5NSwxLjU2Miw1LjY1NywwQzkyLjM5MSw4OS4yNjcsOTIuMzkxLDg2LjczMyw5MC44MjksODUuMTcxeiAgIE00MCw2OGMtMTUuNDY0LDAtMjgtMTIuNTM2LTI4LTI4czEyLjUzNi0yOCwyOC0yOGMxNS40NjQsMCwyOCwxMi41MzYsMjgsMjhTNTUuNDY0LDY4LDQwLDY4eiIvPjxwYXRoIGQ9Ik01Niw0MGMwLDIuMjA5LTEuNzkxLDQtNCw0SDI4Yy0yLjIwOSwwLTQtMS43OTEtNC00bDAsMGMwLTIuMjA5LDEuNzkxLTQsNC00aDI0QzU0LjIwOSwzNiw1NiwzNy43OTEsNTYsNDBMNTYsNDB6Ii8+PC9zdmc+";
    zoomImage.width = 12;
    zoomImage.height = 12;
    zoomImage.interactionsEnabled = false;

    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.tooltip.label.fontSize = '12px';
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.grid.template.stroke = am4core.color("rgb(180,180,180)");

    //axes labels
    dateAxis.renderer.labels.template.fontSize = '12px';
    dateAxis.renderer.labels.template.fill = am4core.color("rgb(180,180,180)");

    dateAxis.renderer.minGridDistance = 20;
    dateAxis.renderer.labels.template.rotation = -45;
    dateAxis.renderer.labels.template.paddingTop = '0px';
    dateAxis.renderer.labels.template.verticalCenter = "left";
    dateAxis.renderer.labels.template.horizontalCenter = "right";

    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    //axes labels
    valueAxis.renderer.labels.template.fontSize = '12px';
    valueAxis.renderer.labels.template.fill = am4core.color("rgb(180,180,180)");

    valueAxis.renderer.minGridDistance = 20;
    valueAxis.renderer.minWidth = 35;
    valueAxis.renderer.grid.template.stroke = am4core.color("rgb(150,150,150)");

    let series = x.series.push(new am4charts.LineSeries());
    series.fill = am4core.color("red");
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.stroke = am4core.color("red");
    series.strokeWidth = 2;
    series.tensionX = 0.7;
    series.tooltipText = "{valueY.value}";

    // Drop-shaped tooltips
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = 'black';
    series.tooltip.background.cornerRadius = 80;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";
    series.tooltip.label.fontSize = '12px';
    series.tooltip.animationDuration = 200;

    x.cursor = new am4charts.XYCursor();
    x.cursor.lineY.disabled = true;
    x.cursor.lineX.stroke = am4core.color("white");
    x.cursor.lineX.strokeOpacity = 0.6;

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    scrollbarX.animationDuration = 1000;

    x.scrollbarX = new am4core.Scrollbar();
    x.scrollbarX.background.fill = am4core.color("rgb(60,60,60)");
    x.scrollbarX.thumb.background.fill = am4core.color("rgb(60,60,60)");
    x.scrollbarX.thumb.background.states.getKey('hover').properties.fill = am4core.color("rgb(60,60,60)");
    x.scrollbarX.thumb.background.states.getKey('down').properties.fill = am4core.color("rgb(60,60,60)");
    x.scrollbarX.thumb.background.strokeOpacity = 0;
    x.scrollbarX.minHeight = 10;

    function customizeGrip(grip) {
      // Remove default grip image
      grip.icon.disabled = true;
      // Disable background
      grip.background.disabled = true;
      // Add rotated rectangle as bi-di arrow
      let img = grip.createChild(am4core.Circle);
      img.width = 15;
      img.height = 15;
      img.fill = am4core.color("rgb(70,70,70)");
      img.align = "center";
      img.valign = "middle";
    }
    customizeGrip(x.scrollbarX.startGrip);
    customizeGrip(x.scrollbarX.endGrip);

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, []);

  // When the paddingLeft prop changes it will update the chart
  useLayoutEffect(() => {
    chart.current.data = props.data;
  }, [props.data]);

  let newData = () => {
    let data = [];
    let visits = 10;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
      data.push({ date: new Date(2019, 0, i), value: visits });
    }

    chart.current.data = data;
  };
  return (
    <div className="chart main_component" onClick={newData}>
      <FullScreenBtn />
    </div>
  );
};

export default Chart;

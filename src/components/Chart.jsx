import React, { useEffect, useState } from 'react';
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import FullScreenBtn from './FullScreenBtn';

const Chart = () => {
  const [chart, setChart] = useState('');
  useEffect (() => {
    let chart = am4core.create("chart", am4charts.XYChart);

    // chart.paddingRight = 20;
    chart.paddingLeft = 0;

    let data = [];
    let visits = 10;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2019, 0, i), value: visits });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.tooltip.label.fontSize = '12px';
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.grid.template.stroke = am4core.color("rgb(180,180,180)");

    //axes labels
    dateAxis.renderer.labels.template.fontSize = '12px';
    dateAxis.renderer.labels.template.fill = am4core.color("rgb(180,180,180)");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    //axes labels
    valueAxis.renderer.labels.template.fontSize = '12px';
    valueAxis.renderer.labels.template.fill = am4core.color("rgb(180,180,180)");

    valueAxis.renderer.minWidth = 35;
    valueAxis.renderer.grid.template.stroke = am4core.color("rgb(150,150,150)");

    let series = chart.series.push(new am4charts.LineSeries());
    series.fill = am4core.color("rgb(0,0,0)");
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.stroke = am4core.color("red");
    series.strokeWidth = 2;
    series.tensionX = 0.7;
    series.tooltipText = "{valueY.value}";

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 80;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";
    series.tooltip.label.fontSize = '12px';
    series.tooltip.animationDuration = 200;

    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    scrollbarX.animationDuration = 1000;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.background.fill = am4core.color("rgb(60,60,60)");
    chart.scrollbarX.thumb.background.fill = am4core.color("rgb(60,60,60)");
    chart.scrollbarX.thumb.background.states.getKey('hover').properties.fill = am4core.color("rgb(60,60,60)");
    chart.scrollbarX.thumb.background.states.getKey('down').properties.fill = am4core.color("rgb(60,60,60)");
    chart.scrollbarX.thumb.background.strokeOpacity = 0;
    chart.scrollbarX.minHeight = 10;

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
    customizeGrip(chart.scrollbarX.startGrip);
    customizeGrip(chart.scrollbarX.endGrip);

    setChart(chart);
  }, []);
  return (
    <div className="chart main_component">
      <FullScreenBtn />
    </div>
  );
};

export default Chart;

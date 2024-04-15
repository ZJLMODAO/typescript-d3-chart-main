//import { useMemo, memo } from "react";
import * as d3 from "d3";
import { tip as d3Tip } from "d3-v6-tip";
import { useD3 } from "../../useD3";

type DrawPointChartProps = {
  inWidth: number;
  inHeight: number;
  inData: any;
};

interface DataPoint {
  date: Date;
  value: number;
}

function DrawPointChart({ inWidth, inHeight, inData }: DrawPointChartProps) {
  const renderChart = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
  ) => {
    const pointChartwidth = inWidth;
    const pointChartHeight = inHeight;

    svg
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("viewBox", "0 0 " + pointChartwidth + " " + pointChartHeight);
    svg.text("");
    var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

    var sourceData = inData.map((d: any) => ({
      date: new Date(parseDate(d.time)!),
      value: +d.value,
    }));
    const pointMargin = {
      top: pointChartHeight * 0.07,
      right: pointChartwidth * 0.007,
      bottom: pointChartHeight * 0.0415,
      left: pointChartwidth * 0.03,
    };
    const innerPointWidth =
      pointChartwidth - pointMargin.left - pointMargin.right;
    const innerPointHeight =
      pointChartHeight - pointMargin.top - pointMargin.bottom;
    console.log(pointChartwidth, pointChartHeight);

    const PointmainGroup = svg
      .append("g")
      .attr("id", "PointmainGroup")
      .attr("transform", `translate(${pointMargin.left}, ${pointMargin.top})`);

    const PointTip: any = d3Tip().attr("class", "d3-tip");
    svg.call(PointTip);
    const xPointScale = d3
      .scaleTime()
      .domain(
        d3.extent(sourceData, (d: DataPoint) => d.date) as unknown as [
          Date,
          Date
        ]
      )
      .range([0, innerPointWidth])
      .nice();

    let maxValue = d3.max(
      sourceData.map((d: DataPoint): number => d.value)
    ) as unknown as number;

    const yPointScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([innerPointHeight, 0])
      .nice();

    PointmainGroup.selectAll(".scatter")
      .data(sourceData)
      .join("path")
      .attr("class", "scatter")
      .attr(
        "d",
        (d: any) => `M${xPointScale(d.date)}, ${yPointScale(d.value)}h0`
      )
      .attr("stroke", "black")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 10)
      .on("mouseover", function (event, d: any) {
        PointTip.html(d.value.toFixed(3));
        PointTip.show(event, d);
      })
      .on("mouseout", function (event, d) {
        PointTip.hide(event, d);
      });

    const formatTime = d3.timeFormat("%m-%d %H:%M");

    const xPointAxis = d3
      .axisBottom(xPointScale)
      .tickSize(-innerPointHeight)
      .tickFormat((d) => formatTime(d as Date));

    PointmainGroup.append("g")
      .attr("id", "xPointmainGroup")
      .call(xPointAxis)
      .attr("transform", `translate(${0}, ${innerPointHeight})`);

    const yPointAxis = d3.axisLeft(yPointScale).tickSize(-innerPointWidth);
    PointmainGroup.append("g").attr("id", "yPointmainGroup").call(yPointAxis);
  };

  const ref = useD3({
    renderChartFn: renderChart,
  });

  return ref;
}

export default DrawPointChart;

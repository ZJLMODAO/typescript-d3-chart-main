import * as d3 from "d3";
import { tip as d3Tip } from "d3-v6-tip";
import { useD3 } from "../../useD3";

type DrawFocusChartProps = {
  inWidth: number;
  inHeight: number;
  inData: any;
  inSouceDivId: string;
};

interface DataPoint {
  date: Date;
  value: number;
}

function DrawFocusChart({
  inWidth,
  inHeight,
  inData,
  inSouceDivId,
}: DrawFocusChartProps) {
  const renderChart = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>
  ) => {
    const svgWidth = inWidth;
    const svgHeight = inHeight;
    console.log(inData);
    var clipName = "clip";
    if (inSouceDivId === "popup-content") {
      clipName = "clip-clone";
    }
    console.log(clipName);
    svg
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("viewBox", "0 0 " + svgWidth + " " + svgHeight);
    svg.text("");
    var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

    var data = inData.map((d: any) => ({
      date: new Date(parseDate(d.time)!),
      value: +d.value,
    }));
    var margin = {
        top: svgHeight * 0.02,
        right: svgWidth * 0.007,
        bottom: svgHeight * 0.2,
        left: svgWidth * 0.03,
      },
      margin2 = {
        top: svgHeight * 0.86,
        right: svgWidth * 0.007,
        bottom: svgHeight * 0.04,
        left: svgWidth * 0.03,
      },
      width = svgWidth - margin.left - margin.right,
      height = svgHeight - margin.top - margin.bottom,
      height2 = svgHeight - margin2.top - margin2.bottom;
    console.log(width, height, height2);

    var x = d3.scaleTime().range([0, width]),
      x2 = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().range([height, 0]),
      y2 = d3.scaleLinear().range([height2, 0]);

    var xAxis: d3.Axis<Date | number | { valueOf(): number }> =
        d3.axisBottom(x),
      xAxis2: d3.Axis<Date | number | { valueOf(): number }> =
        d3.axisBottom(x2),
      yAxis = d3.axisLeft(y);

    var brush = d3
      .brushX()
      .extent([
        [0, 0],
        [width, height2],
      ])
      .on("brush", brushed);

    var area = d3
      .area<DataPoint>()
      .curve(d3.curveCardinal.tension(0.5))
      .x(function (d) {
        return x(d.date);
      })
      .y0(height)
      .y1(function (d) {
        return y(d.value);
      });
    var area2 = d3
      .area<DataPoint>()
      .curve(d3.curveCardinal.tension(0.5))
      .x(function (d) {
        return x2(d.date);
      })
      .y0(height2)
      .y1(function (d) {
        return y2(d.value);
      });

    svg.select<SVGPathElement>(".area").attr("d", area(data));

    var focus = svg
      .append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var context = svg
      .append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    const tip: any = d3Tip().attr("class", "d3-tip");

    function brushed(event: any) {
      const s = event.selection || x2.range();
      if (event.selection) {
        x.domain(s.map(x2.invert, x2));
        focus.select(".area").attr("d", area(data));

        const xAxisSelection: d3.Selection<SVGGElement, any, any, any> =
          focus.select(".x.axis");
        xAxisSelection.call(xAxis);

        focus.selectAll(".dot").remove();
        addScatter();
      }
    }

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", clipName)
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    svg.call(tip);
    x.domain(
      d3.extent(data, (d: DataPoint) => d.date) as unknown as [Date, Date]
    );

    let maxValue = d3.max(
      data.map((d: DataPoint): number => d.value)
    ) as unknown as number;

    y.domain([0, (1.2 * maxValue) as number]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    focus.append("path").datum(data).attr("class", "area").attr("d", area);

    focus
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    focus.append("g").attr("class", "y axis").call(yAxis);

    context.append("path").datum(data).attr("class", "area").attr("d", area2);

    context
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

    context
      .append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("y", 0)
      .attr("height", height2);

    function addScatter() {
      focus
        .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d: any) {
          return x(d.date);
        })
        .attr("cy", function (d: any) {
          return y(d.value);
        })
        .on("mouseover", function (event, d: any) {
          tip.html(d.value.toFixed(3));
          tip.show(event, d);
        })
        .on("mouseout", function (event, d) {
          tip.hide(event, d);
        });
    }

    addScatter();
  };

  const ref = useD3({
    renderChartFn: renderChart,
  });

  // return (
  //   <>
  //     <svg ref={ref}></svg>
  //   </>
  // );
  return ref;
}

export default DrawFocusChart;

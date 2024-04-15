import React from "react";
import DrawFocusChart from "./chart/DrawFocusChart/DrawFocusChart";
import DrawPointChart from "./chart/DrawPointChart/DrawPointChart";
import axios from "axios";
import "./GetGridItem.scss";
import ReactLoading from "react-loading";

interface PointList {
  pointKey: String;
  name: String;
}

type Props = {
  svgName: string;
};

interface MyState {
  chartComponent: any;
  pointList: PointList[];
  data: any[];
}

type GridInfo = {
  date_from: string;
  date_to: string;
  sPoint: string;
  sourceDivId: string;
  lineChartWidth: number;
  lineChartHeight: number;
};

export function parseInputTime(inTime: string) {
  var outTime =
    inTime.replaceAll("T", "").replaceAll(":", "").replaceAll("-", "") + "00";
  return outTime;
}

function extractGridInfo(button: HTMLElement): GridInfo {
  const parentNode = button.parentNode as HTMLElement;
  const inputDateFrom = parentNode.querySelector(
    "input[name=date_from]"
  ) as HTMLInputElement;
  const inputDateTo = parentNode.querySelector(
    "input[name=date_to]"
  ) as HTMLInputElement;
  const selectElement = parentNode.querySelector("select") as HTMLSelectElement;
  const LparentNode = parentNode.parentNode as HTMLElement;
  const LLparentNode = LparentNode.parentNode as HTMLElement;

  const gridInfo: GridInfo = {
    date_from: parseInputTime(inputDateFrom.value),
    date_to: parseInputTime(inputDateTo.value),
    sPoint: selectElement.value,
    sourceDivId: LLparentNode.id,
    lineChartWidth: parentNode.clientWidth,
    lineChartHeight: LparentNode.clientHeight - parentNode.clientHeight,
  };

  return gridInfo;
}

class GetGridItem extends React.Component<Props, MyState> {
  componentDidMount() {
    const chartComponent = <div></div>;
    this.setState({ chartComponent: chartComponent });
    axios
      .request({
        url: "https://tranehk-ds.exa.dev/api/datapoint/list?site=MPP",
      })
      .then((response) => {
        this.setState({ pointList: response.data.points });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleSelectClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const { svgName } = this.props;
      console.log("click");
      const button = event.target as HTMLElement;
      const gridInfo = extractGridInfo(button);
      console.log(
        gridInfo.sourceDivId,
        gridInfo.lineChartWidth,
        gridInfo.lineChartHeight,
        gridInfo.date_from,
        gridInfo.date_to,
        gridInfo.sPoint
      );
      if (svgName === "focus") {
        var sVrl = "";
        if (gridInfo.date_from === "00" || gridInfo.date_to === "00") {
          alert("请输入完整的查询时间");
          return;
        } else {
          sVrl =
            "https://tranehk-ds.exa.dev/api/datapoint/query?site=MPP&from=" +
            gridInfo.date_from +
            "&to=" +
            gridInfo.date_to +
            "&pointkey=" +
            gridInfo.sPoint;
        }
        const response = await axios.request({ url: sVrl });
        this.setState({ data: response.data.values }, () => {
          const DrawchartComponent = (
            <DrawFocusChart
              inWidth={gridInfo.lineChartWidth}
              inHeight={gridInfo.lineChartHeight}
              inData={this.state.data}
              inSouceDivId={gridInfo.sourceDivId}
            />
          );

          // 更新状态对象并重新渲染视图
          this.setState({ chartComponent: DrawchartComponent });
        });
      } else if (svgName === "PointChart") {
        if (gridInfo.date_from === "00" || gridInfo.date_to === "00") {
          alert("请输入完整的查询时间");
          return;
        } else {
          sVrl =
            "https://tranehk-ds.exa.dev/api/datapoint/query?site=MPP&from=" +
            gridInfo.date_from +
            "&to=" +
            gridInfo.date_to +
            "&pointkey=" +
            gridInfo.sPoint;
        }
        const response = await axios.request({ url: sVrl });
        this.setState({ data: response.data.values }, () => {
          const DrawchartComponent = (
            <DrawPointChart
              inWidth={gridInfo.lineChartWidth}
              inHeight={gridInfo.lineChartHeight}
              inData={this.state.data}
            />
          );

          // 更新状态对象并重新渲染视图
          this.setState({ chartComponent: DrawchartComponent });
        });
      }
    } catch (err) {
      console.log("get data fail");
    }
  };

  render() {
    const { svgName } = this.props;
    const { chartComponent }: { chartComponent: any } = this.state || {};
    const { pointList }: { pointList: PointList[] } = this.state || {};
    if (!pointList) {
      return (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#ffffff" />
        </div>
      );
    }
    return (
      <>
        <div className={svgName + "Condition"}>
          <select className="PointList" id={svgName + "PointList"}>
            {pointList.map((points) => (
              <option value={String(points.pointKey)} key={String(points.name)}>
                {points.name}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            name="date_from"
            id={svgName + "DateFrom"}
          />
          <input type="datetime-local" name="date_to" id={svgName + "DateTo"} />
          <button className="btn-select" onClick={this.handleSelectClick}>
            查询
          </button>
        </div>
        {chartComponent ? chartComponent : <div></div>}
      </>
    );
  }
}

export default GetGridItem;

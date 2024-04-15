import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import ReactLoading from "react-loading";

type Props = {
  renderChartFn: (
    selection: d3.Selection<SVGSVGElement, unknown, null, undefined>
  ) => void;
  isLoading?: boolean;
};

export const useD3: React.FC<Props> = ({
  renderChartFn,
  isLoading = false,
}) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current) {
      renderChartFn(d3.select(ref.current));
    }
  }, [renderChartFn]);

  return (
    <>
      {isLoading && (
        <div>
          <ReactLoading type="spin" color="#ffffff" />
        </div>
      )}
      <svg ref={ref} />
    </>
  );
};

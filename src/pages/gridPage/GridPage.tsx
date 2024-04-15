import React, { useState } from "react";
import "./GridPage.scss";
import GetGridItem from "../../components/GetGridItem";

type HandleGridItemProps = {
  svgName: string;
  onPopupItemClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    svgName: string
  ) => void;
};

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  gridItem: () => JSX.Element;
};

function HandleGridItem({ svgName, onPopupItemClick }: HandleGridItemProps) {
  const HandleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPopupItemClick(event, svgName);
  };
  return (
    <div className="grid_item" key={svgName} id={svgName}>
      <button id="btn-popup" onClick={HandleButtonClick}>
        放大
      </button>
      <GetGridItem svgName={svgName} />
    </div>
  );
}

function Popup({ isOpen, onClose, gridItem }: PopupProps) {
  const handleClose = () => {
    onClose();
  };
  const isOpenStyle = isOpen ? { display: "flex" } : { display: "none" };
  return (
    <div className="popup" style={isOpenStyle}>
      <div id="btn-close" onClick={handleClose}>
        &#10005;
      </div>
      <div id="popup-content">{gridItem()}</div>
    </div>
  );
}

function GridPage() {
  const [openPopup, setOpenPopup] = useState<{
    svgName: string;
    gridItem: () => JSX.Element;
  } | null>(null);

  const handlePopupItemClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    svgName: string
  ) => {
    setOpenPopup({
      svgName,
      gridItem: () => {
        return (
          <div className="grid_item" id={svgName}>
            <GetGridItem svgName={svgName} />
          </div>
        );
      },
    });
  };

  const handlePopupClose = () => {
    setOpenPopup(null);
  };

  return (
    <>
      <div className="title"></div>
      <div className="container" id="container">
        <HandleGridItem
          svgName="focus"
          onPopupItemClick={handlePopupItemClick}
        />
        <HandleGridItem
          svgName="PointChart"
          onPopupItemClick={handlePopupItemClick}
        />
        <HandleGridItem
          svgName="focus3"
          onPopupItemClick={handlePopupItemClick}
        />
        <HandleGridItem
          svgName="focus4"
          onPopupItemClick={handlePopupItemClick}
        />
      </div>
      {openPopup && (
        <Popup
          isOpen={true}
          onClose={handlePopupClose}
          gridItem={openPopup.gridItem}
        />
      )}
    </>
  );
}

export default GridPage;

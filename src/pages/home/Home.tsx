import React, { useState } from "react";
import "./Home.scss";
//import * as MuiStyle from "./HomeMuiStyle";
import Subcontent from "./SubContent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

type OptionTool = {
  value: string;
  label: string;
  image: string;
};

type OptionTimes = {
  value: string;
  index: number;
};

const Home: React.FC = () => {
  const options: OptionTool[] = [
    { value: "1", label: "WCC-01", image: "image1.jpg" },
    { value: "2", label: "WCC-02", image: "image2.jpg" },
    { value: "3", label: "ACC-01", image: "image3.jpg" },
    { value: "3", label: "ACC-02", image: "image3.jpg" },
  ];
  const OptionTimeList: OptionTimes[] = [
    { value: "Last 7 days", index: 0 },
    { value: "Last 15 days", index: 2 },
    { value: "Last 30 days", index: 3 },
  ];

  const [selectedOption, setSelectedOption] = useState<OptionTool | null>(null);

  const [menuVisible, setMenuVisible] = useState(false);

  const handleOptionSelect = (option: OptionTool) => {
    setSelectedOption(option);
    setMenuVisible(false);
  };

  return (
    <Box className="Home-container" sx={{ flexGrow: 1 }}>
      <Grid className="title" xs={12} md={12} sx={{ height: "3vh" }}>
        {/* <MuiStyle.MuiTitle>
          {" "} */}
        {selectedOption && <p>Dashboard_{selectedOption.label}</p>}
        {/* </MuiStyle.MuiTitle> */}
      </Grid>
      <Grid
        className="content"
        container
        direction="row"
        xs={12}
        md={12}
        sx={{ height: "50vh" }}
      >
        <Grid
          xs={6}
          md={0.5}
          className="buttons"
          onMouseLeave={() => setMenuVisible(false)}
        >
          <Grid
            className={`buttons-Graphic${menuVisible ? "-hovered" : ""}`}
            sx={{ height: "3vh" }}
            onMouseEnter={() => setMenuVisible(true)}
          >
            Graphic
          </Grid>
          {menuVisible && (
            <div className="dropdown-menu">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleOptionSelect(option)}
                  className="dropdown-option"
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </Grid>
        <Grid className="buttons" xs={6} md={0.5}>
          <Grid className="buttons-Graphic" sx={{ height: "3vh" }}>
            Status
          </Grid>
        </Grid>
        <Grid className="image-div" xs={12} md={11}>
          <Grid className="image-title" sx={{ height: "3vh" }}></Grid>
          {selectedOption && (
            <div className="image">
              <img src={selectedOption.image} alt={selectedOption.label} />
            </div>
          )}
        </Grid>
      </Grid>
      <Grid className="subcontent" xs={12} md={12} sx={{ height: "30vh" }}>
        <Grid
          className="subcontent-title"
          xs={12}
          container
          direction="row"
          sx={{ height: "10%" }}
        >
          <div>Rolling History Record</div>
          <select id="load-time">
            {OptionTimeList.map((OptionTime) => (
              <option value={OptionTime.value} key={OptionTime.index}>
                {OptionTime.value}
              </option>
            ))}
          </select>
        </Grid>
        <Subcontent />
      </Grid>
      <div></div>
    </Box>
  );
};

export default Home;

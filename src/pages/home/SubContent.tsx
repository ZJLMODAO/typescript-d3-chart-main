import "./SubContent.scss";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Grid } from "@mui/material";
//import { SubContentStyles } from "./HomeMuiStyle";

type SubTitleItem = {
  titleName: string;
};

function HandleSubcontentClick() {}

function HandleGetItem({ titleName }: SubTitleItem) {
  // const classes = SubContentStyles();
  return (
    <Grid
      item
      className="subcontent-item"
      container
      direction="column"
      xs={12}
      sm={6}
      md={3}
    >
      <Grid className="subcontent-item-title" sx={{ height: "10%" }}>
        {titleName}
      </Grid>
      <Grid className="subcontent-item-body" sx={{ height: "90%" }}>
        <Grid
          sx={{ height: "13vh" }}
          className="subcontent-item-body-divList"
          onClick={() => HandleSubcontentClick}
          container
          direction="row"
        >
          <Grid item container className="subcontent-item-body-icon" xs={3}>
            <NotificationsActiveIcon sx={{ height: "100%", width: "50%" }} />
          </Grid>
          <Grid item container className="subcontent-item-main" xs={9}>
            aaa
          </Grid>
        </Grid>
        <Grid
          sx={{ height: "13vh" }}
          className="subcontent-item-body-divList"
          onClick={() => HandleSubcontentClick}
          container
          direction="row"
        >
          <Grid item container className="subcontent-item-body-icon" xs={3}>
            <NotificationsActiveIcon sx={{ height: "100%", width: "50%" }} />
          </Grid>
          <Grid item container className="subcontent-item-main" xs={9}>
            aaa
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function Subcontent() {
  return (
    <Grid
      className="subcontent-body"
      container
      columnSpacing={{ xs: 0.3, sm: 0.6, md: 1 }}
      xs={12}
      sx={{ height: "90%" }}
    >
      <HandleGetItem titleName="Comperssor" />
      <HandleGetItem titleName="Evaporator" />
      <HandleGetItem titleName="Condenser" />
      <HandleGetItem titleName="Chiller Fault" />
    </Grid>
  );
}

export default Subcontent;

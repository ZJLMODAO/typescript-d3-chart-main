import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export const MuiItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f1f1f1",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export const MuiTitle = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f1f1f1",
  color: theme.palette.text.secondary,
}));

export const MuiButton = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f1f1f1",
  color: theme.palette.text.secondary,
}));

export const SubContentStyles = makeStyles(() => ({
  subcontentTitle: {
    backgroundColor: "#5b5858",
    color: "#f1f1f1",
    textAlign: "center",
  },
  subcontentBody: {
    overflowY: "auto",
    backgroundColor: "#f1f1f1",
  },
  subcontentBodyDivList: {
    border: "1px solid rgb(166, 165, 165)",
  },
  subcontentBodyItemMain: {
    justifyContent: "center",
    alignItems: "center",
  },
  subcontentItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: "50%",
    height: "50%",
  },
}));

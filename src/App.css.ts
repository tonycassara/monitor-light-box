import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100vw",
  height: "100vh",
  padding: 0,
  margin: 0,
});

export const transparentButton = style({
  border: "2px solid black !important",
  background: "transparent !important",
  color: "black !important",
  width: "110px !important",
});

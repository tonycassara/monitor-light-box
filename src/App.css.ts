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
  width: "110px !important",
});

export const transparentButtonSelected = style({
  border: "2px solid black !important",
  background: "black !important",
  width: "110px !important",
});

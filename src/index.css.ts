import { vars } from "./theme";
import { style } from "@vanilla-extract/css";

export const demo = style({
  fontSize: vars.fontSizes.xl,
  backgroundColor: vars.colors.red[5],
  color: vars.colors.white,
});

"use client";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { forwardRef } from "react";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};
type Props = {};

const Canvas = forwardRef<ReactSketchCanvasRef, Props>(
  function CanvasWrapper(props, ref) {
    return (
      <ReactSketchCanvas
        ref={ref}
        style={styles}
        width="100%"
        height="100%"
        strokeWidth={4}
        strokeColor="white"
        canvasColor="dark"
      />
    );
  },
);
export default Canvas;

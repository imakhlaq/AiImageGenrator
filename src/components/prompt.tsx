"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Canvas from "@/components/canvas/canvas";
import { useRef } from "react";
import { ReactSketchCanvasRef } from "react-sketch-canvas";

type Props = {};

function sendPrompt({ prompt, image }: { prompt: string; image: string }) {
  return axios.post("http://localhost:3000/api/promt", { prompt, image });
}

type Inputs = {
  prompt: string;
};
const Prompt = ({}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { data, mutate, isError, error, isPending } = useMutation({
    mutationKey: ["prompt"],
    mutationFn: sendPrompt,
  });

  const ref = useRef<ReactSketchCanvasRef>(null);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    if (!ref.current) return;

    const image = await ref.current.exportImage("jpeg");

    mutate({ prompt: formData.prompt, image });
    console.log({ image, data });
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("prompt", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.prompt && <span>This field is required</span>}

      <input type="submit" />
      <Canvas ref={ref} />
    </form>
  );
};

export default Prompt;

"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Canvas from "@/components/canvas/canvas";
import { useRef } from "react";
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Data = {
  output: string[];
};

async function sendPrompt({
  prompt,
  image,
}: {
  prompt: string;
  image: string;
}) {
  const { data } = await axios.post<Data>("http://localhost:3000/api/prompt", {
    prompt,
    image,
  });
  console.log({ data });
  return data;
}

type Inputs = {
  prompt: string;
};
const Prompt = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { data, mutate, isError, error, isPending, isPaused } = useMutation({
    mutationKey: ["prompt"],
    mutationFn: sendPrompt,
  });

  const ref = useRef<ReactSketchCanvasRef>(null);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    if (!ref.current) return;

    const image = await ref.current.exportImage("jpeg");

    mutate({ prompt: formData.prompt, image });
    console.log({ image, data: data?.output[1] });
  };

  return (
    <>
      <div className={cn("flex flex-col gap-9")}>
        {/*  "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn("p-5 w-full md:w-1/2 xl:w-1/3 mx-auto mt-40 space-y-5")}
        >
          {/* include validation with required or other standard HTML validation rules */}
          <Input
            placeholder={"Prompt"}
            {...register("prompt", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.prompt && <span>This field is required</span>}

          <Button type="submit" className={cn("px-2 py-1 w-full")}>
            Submit
          </Button>
        </form>
      </div>

      <div className={cn("h-[45rem] xl:h-[60rem] px-7 p-5")}>
        <Canvas ref={ref} />
      </div>

      {data ? (
        <div className={cn("")}>
          <Image src={data.output[1]} alt={"Ai generated image"} />
        </div>
      ) : null}
    </>
  );
};

export default Prompt;

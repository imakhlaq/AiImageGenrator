import { NextResponse } from "next/server";
import { replicate } from "../../../../replicateConfig";
import { db } from "../../../../config/db";
import { generatedImages, prompt } from "../../../../models/schema";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const output = (await replicate.run(
      "jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
      {
        input: {
          eta: 0,
          image: data.image,
          scale: 9,
          prompt: data.prompt,
          a_prompt: "best quality, extremely detailed",
          n_prompt:
            "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
          ddim_steps: 20,
          num_samples: "1",
          image_resolution: "512",
        },
      },
    )) as string[];

    const id = await db
      .insert(prompt)
      .values({ prompt: data.prompt, imageURl: output[0] })
      .returning({ id: prompt.id });

    console.log({ id });

    const originalImgId = await db
      .insert(generatedImages)
      .values({ imageURl: output[1], promptId: id[0].id });
    console.log({ originalImgId });

    return NextResponse.json({ output });
  } catch (err) {
    // @ts-ignore
    return NextResponse.json({ message: err?.message }, { status: 504 });
  }
}

import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  data: Collection[];
};

const AllImages = ({ data }: Props) => {
  console.log({ data: data[0] });
  return (
    <div className={cn("grid grid-cols-2 mt-20 gap-5 p-6 pl-16")}>
      {data.map((prompt) => (
        <>
          <h1
            className={cn(
              "text-amber-50 col-span-3 text-xl uppercase bg-gradient-to-r from-cyan-700 to-cyan-900 px-2 rounded shadow-accent",
            )}
          >
            {prompt.prompts.prompt}
          </h1>

          <Image
            src={prompt.prompts.imageURl}
            alt={"User drawn Image"}
            width={200}
            height={200}
          />
          <Image
            src={prompt.generated_images_url.imageURl}
            alt={"Ai generated Image"}
            height={300}
            width={200}
          />
        </>
      ))}
    </div>
  );
};

export default AllImages;

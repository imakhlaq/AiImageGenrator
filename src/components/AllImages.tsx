import Image from "next/image";

type Props = {
  data: Collection[];
};

const AllImages = ({ data }: Props) => {
  return data.map((prompt) => (
    <div key={prompt.prompts.id}>
      <h1>{prompt.prompts.prompts}</h1>
      <Image
        src={prompt.prompts.imageURl}
        alt={"User drawn Image"}
        width="200"
        height="300"
      />
      <Image
        src={prompt.generated_images_url.imageURl}
        alt={"Ai generated Image"}
        width="200"
        height="300"
      />
    </div>
  ));
};

export default AllImages;

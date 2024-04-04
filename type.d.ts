type Collection = {
  prompts: Prompts;
  generated_images_url: GeneratedImageURl;
};
type Prompts = {
  id: string;
  prompt: string;
  imageURl: string;
};
type GeneratedImageURl = {
  id: string;
  imageURl: string;
  promptId: string;
};

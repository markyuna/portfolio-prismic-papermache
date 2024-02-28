import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Avatar from "../Biography/Avatar";
import Bounded from "@/components/Bounded";
/**
 * Props for `ImageTrasform`.
 */
export type ImageTrasformProps =
  SliceComponentProps<Content.ImageTrasformSlice>;

/**
 * Component for "ImageTrasform" Slices.
 */
const ImageTrasform = ({ slice }: ImageTrasformProps): JSX.Element => {
  return (
    <Bounded
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
    className="flex"
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">

      <Avatar
        image={slice.primary.original_image}
        className="max-w-sm mr-4"
        />
      <Avatar
        image={slice.primary.transformed_image}
        className="max-w-sm ml-4"
        />
      </div>
    </Bounded>
  
  );
};

export default ImageTrasform;

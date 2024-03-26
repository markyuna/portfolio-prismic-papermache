import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
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
      <div className="grid gap-x-4 gap-y-6 md:grid-cols-[2fr,1fr]">
        <PrismicNextImage
          field={slice.primary.original_image}
          imgixParams={{ w: 100 }}
          className="not-prose w-full rounded-md md:my-12 lg:my-5 max-w-sm ml-0"
        />
      </div>
    </Bounded>
  
  );
};

export default ImageTrasform;

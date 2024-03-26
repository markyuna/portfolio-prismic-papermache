import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock = ({ slice }: ImageBlockProps): JSX.Element => {
  return (
    <Bounded>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
        <PrismicNextImage
          field={slice.primary.image}
          imgixParams={{ w: 300 }}
          className="not-prose w-full h-full rounded-md"
        />     
        <PrismicNextImage
          field={slice.primary.image2}
          imgixParams={{ w: 300 }}
          className="not-prose w-full h-full rounded-md"
        />  
        <PrismicNextImage
          field={slice.primary.image3}
          imgixParams={{ w: 300 }}
          className="not-prose w-full h-full rounded-md"
        /> 
        <PrismicNextImage
          field={slice.primary.image4}
          imgixParams={{ w: 300 }}
          className="not-prose w-full h-full rounded-md"
        /> 
      </div>
    </Bounded>
  );
};

export default ImageBlock;

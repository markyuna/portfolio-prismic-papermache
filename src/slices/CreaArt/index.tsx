import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import Button from "@/components/Button";


/**
 * Props for `CreaArt`.
 */
export type CreaArtProps = SliceComponentProps<Content.CreaArtSlice>;

/**
 * Component for "CreaArt" Slices.
 */
const CreaArt = ({ slice }: CreaArtProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        <Heading as="h1" size="md" className="col-start-1">
          {slice.primary.heading}
        </Heading>
        
        <Button 
          linkField={slice.primary.button_link}
          label={slice.primary.button_text}
        />
      </div>
    </Bounded>
  );
};

export default CreaArt;

import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Avatar from "./Avatar";

/**
 * Props for `Card`.
 */
export type CardProps = SliceComponentProps<Content.CardSlice>;

/**
 * Component for "Card" Slices.
 */
const Card = ({ slice }: CardProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="rounded-2xl border-2 border-slate-800 bg-indigo-600 bg-gradient-to-r from-blue-500 px-4 py-5 md:px-8 md:py-20">
        <div className="grid gap-x-4 gap-y-4 md:grid-cols-[2fr,1fr]">
          <Heading as="h2" size="md" className="col-start-1">
            {slice.primary.header}
          </Heading>
          <div className="prose prose-xl prose-slate prose-invert col-start-1">
            <PrismicRichText field={slice.primary.description} />
            <Button
              linkField={slice.primary.button_link}
              label={slice.primary.button_text}
            />
          </div>

          <Avatar
            image={slice.primary.image}
            className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
          />
        </div>
      </div>
    </Bounded>
  );
};

export default Card;

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
      <PrismicRichText field={slice.primary.text} />
      <div className="text-center">
        <h3>Informations sur la commande :</h3>
        <h4>markpapermache@gmail.com</h4>
      </div>
    </div>
  );
};

export default TextBlock;

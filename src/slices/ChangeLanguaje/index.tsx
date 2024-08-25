import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ChangeLanguaje`.
 */
export type ChangeLanguajeProps =
  SliceComponentProps<Content.ChangeLanguajeSlice>;

/**
 * Component for "ChangeLanguaje" Slices.
 */
const ChangeLanguaje = ({ slice }: ChangeLanguajeProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for change_languaje (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ChangeLanguaje;

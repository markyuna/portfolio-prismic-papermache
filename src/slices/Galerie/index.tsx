import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * Props for `Galerie`.
 */
export type GalerieProps = SliceComponentProps<Content.GalerieSlice>;

/**
 * Component for "Galerie" Slices.
 */
const Galerie = ({ slice }: GalerieProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col items-center p-4"
    >
      <div className="py-10 md:px-6 md:py-14 lg:px-16">
        <span className="block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-center text-2xl font-bold uppercase tracking-wide text-transparent md:col-span-3 md:mb-6 md:text-3xl">
          {slice.primary.tag_line}
        </span>
        <Heading as="h3" size="sm" className="text-center">
          {slice.primary.heading}
        </Heading>
        <div className="mt-4 md:col-span-4">
          <div className="mt-4">
            {slice.primary.image.map((item) => (
              <div
                key={String(item)} // Use a unique identifier from the item as the key
                className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4"
              >
                <PrismicNextImage
                  field={item.img1}
                  imgixParams={{ w: 400, h: 400 }}
                  className="mb-4 h-auto w-full transform rounded-md object-cover transition-transform duration-300 hover:scale-105"
                />
                <PrismicNextImage
                  field={item.img2}
                  imgixParams={{ w: 400, h: 400 }}
                  className="mb-4 h-auto w-full transform rounded-md object-cover transition-transform duration-300 hover:scale-105"
                />
                <PrismicNextImage
                  field={item.img3}
                  imgixParams={{ w: 400, h: 400 }}
                  className="mb-4 h-auto w-full transform rounded-md object-cover transition-transform duration-300 hover:scale-105"
                />
                <PrismicNextImage
                  field={item.img4}
                  imgixParams={{ w: 400, h: 400 }}
                  className="mb-4 h-auto w-full transform rounded-md object-cover transition-transform duration-300 hover:scale-105"
                />
                <PrismicNextImage
                  field={item.img5}
                  imgixParams={{ w: 400, h: 400 }}
                  className="mb-4 h-auto w-full transform rounded-md object-cover transition-transform duration-300 hover:scale-105"
                />
                <PrismicNextImage
                  field={item.img6}
                  imgixParams={{ w: 400, h: 400 }}
                  className="mb-4 h-auto w-full transform rounded-md object-cover transition-transform duration-300 hover:scale-105"
                />
                <PrismicNextImage
                  field={item.img7}
                  imgixParams={{ w: 400, h: 400 }}
                  className="mb-4 h-auto w-full transform rounded-md object-cover transition-transform duration-300 hover:scale-105"
                />
                <PrismicNextImage
                  field={item.img8}
                  imgixParams={{ w: 400, h: 400 }}
                  className="mb-4 h-auto w-full transform rounded-md object-cover transition-transform duration-300 hover:scale-105"
                />
                <PrismicNextImage
                  field={item.img9}
                  imgixParams={{ w: 400, h: 400 }}
                  className="mb-4 h-auto w-full transform rounded-md object-cover transition-transform duration-300 hover:scale-105"
                />
                <PrismicNextImage
                  field={item.img10}
                  imgixParams={{ w: 400, h: 400 }}
                  className="mb-4 h-auto w-full transform rounded-md object-cover transition-transform duration-300 hover:scale-105"
                />
                <PrismicNextImage
                  field={item.img11}
                  imgixParams={{ w: 400, h: 400 }}
                  className="mb-4 h-auto w-full transform rounded-md object-cover transition-transform duration-300 hover:scale-105"
                />
                <PrismicNextImage
                  field={item.img12}
                  imgixParams={{ w: 400, h: 400 }}
                  className="mb-4 h-auto w-full transform rounded-md object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 w-full text-center md:col-span-3">
          <PrismicNextLink field={slice.primary.button_link}>
            <button className="duration-400 rounded-md bg-yellow-500 px-4 py-2 font-bold text-white transition hover:bg-yellow-600">
              {slice.primary.button_text}
            </button>
          </PrismicNextLink>
        </div>
      </div>
    </section>
  );
};

export default Galerie;

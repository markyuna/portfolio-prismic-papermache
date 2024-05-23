import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Dalle3Image from "@/components/Dalle3Image";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h3" size="md">
        {slice.primary.heading}
      </Heading>
      {slice.items.map((item, index) => (
        <div key={index} className="mt-5 md:mt-16">
          <Heading as="h2" size="sm">
            {item.title}
          </Heading>

          <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
            <span className="text-3xl font-extralight"></span>{" "}
            <span>{item.institution}</span>
          </div>
          <div className="prose prose-lg prose-invert mt-4 w-full">
            <PrismicRichText field={item.description} />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              <PrismicNextImage
                field={slice.primary.img1}
                imgixParams={{ w: 150, h: 150 }} // Ajusta el tamaño de la imagen
                className="not-prose h-auto w-full max-w-xs rounded-md"
              />
              <PrismicNextImage
                field={slice.primary.img2}
                imgixParams={{ w: 150, h: 150 }} // Ajusta el tamaño de la imagen
                className="not-prose h-auto w-full max-w-xs rounded-md"
              />
              <PrismicNextImage
                field={slice.primary.img3}
                imgixParams={{ w: 150, h: 150 }} // Ajusta el tamaño de la imagen
                className="not-prose h-auto w-full max-w-xs rounded-md"
              />
              <PrismicNextImage
                field={slice.primary.img4}
                imgixParams={{ w: 150, h: 150 }} // Ajusta el tamaño de la imagen
                className="not-prose h-auto w-full max-w-xs rounded-md"
              />
              <PrismicNextImage
                field={slice.primary.img5}
                imgixParams={{ w: 150, h: 150 }} // Ajusta el tamaño de la imagen
                className="not-prose h-auto w-full max-w-xs rounded-md"
              />
              <PrismicNextImage
                field={slice.primary.img6}
                imgixParams={{ w: 150, h: 150 }} // Ajusta el tamaño de la imagen
                className="not-prose h-auto w-full max-w-xs rounded-md"
              />
            </div>

            <Dalle3Image />
          </div>
        </div>
      ))}
    </Bounded>
  );
};

export default Experience;

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

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
      <Heading as="h2" size="lg">
        {slice.primary.heading}
      </Heading>
      {slice.items.map((item, index) => (
        <div key={index} className="ml-6 mt-8 max-w-prose md:ml-12 md:mt-16">
          <Heading as="h3" size="sm">
            {item.title}
          </Heading>

          <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400"> 
            <span className="text-3xl font-extralight">/</span>{" "}
            <span>{item.institution}</span>
          </div>
          <div className="prose prose-lg prose-invert mt-4">
            <PrismicRichText field={item.description} />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5"> 
              <PrismicNextImage 
                field={slice.primary.img1} 
                imgixParams={{ w: 300 }}
                className="not-prose w-full h-full rounded-md"
              />
              <PrismicNextImage 
                field={slice.primary.img2} 
                imgixParams={{ w: 300 }}
                className="not-prose w-full h-full rounded-md"
              />
              <PrismicNextImage 
                field={slice.primary.img3} 
                imgixParams={{ w: 300 }}
                className="not-prose w-full h-full rounded-md"
              />
              <PrismicNextImage 
                field={slice.primary.img4} 
                imgixParams={{ w: 300 }}
                className="not-prose w-full h-full rounded-md"
              />
              <PrismicNextImage 
                field={slice.primary.img5} 
                imgixParams={{ w: 300 }}
                className="not-prose w-full h-full rounded-md"
              />
            </div>
          </div>
        </div>
      ))}
    </Bounded>
  );
};

export default Experience;
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Button from "@/components/Button";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm = ({ slice }: ContactFormProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex justify-center bg-gray-500 bg-opacity-50 py-10 lg:py-16"
    >
      <Bounded as="div" className="flex flex-col items-center">
        <Heading size="xl" className="mb-2 text-center" as="h2">
          {slice.primary.title}
        </Heading>

        <PrismicNextImage
          className="mb-4 h-16 w-16"
          field={slice.primary.icon}
        />

        <form className="w-full max-w-lg">
          <div className="mb-4">
            <label className="mb-2 block text-slate-300 " htmlFor="name">
              Votre nom (obligatoire)
            </label>
            <input
              className="w-full rounded border-gray-300 px-4 py-2 leading-tight focus:border-blue-500 focus:bg-white focus:outline-none"
              id="name"
              type="text"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-slate-300" htmlFor="email">
              Votre adresse de messagerie (obligatoire)
            </label>
            <input
              className="w-full rounded border-gray-300 px-4 py-2 leading-tight focus:border-blue-500 focus:bg-white focus:outline-none"
              id="email"
              type="email"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-slate-300" htmlFor="message">
              Votre message
            </label>
            <textarea
              className="w-full rounded border-gray-300 px-4 py-2 leading-tight focus:border-blue-500 focus:bg-white focus:outline-none"
              id="message"
              placeholder="Your Message"
              rows={4}
            />
          </div>
          <Button
            linkField={slice.primary.button_link}
            label={slice.primary.button_text}
            className="w-full"
          />
        </form>
      </Bounded>
    </section>
  );
};

export default ContactForm;

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import Button from "@/components/Button";

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
      className="relative flex justify-center py-20 lg:py-16"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${slice.primary.icon.url})` }}
      ></div>
      <div className="relative z-10 w-full max-w-6xl">
        <Heading size="md" className="mb-2 text-center" as="h1">
          {slice.primary.title}
        </Heading>
        <Bounded as="div" className="flex flex-col items-center lg:flex-row">
          <div className="lg:mr-8 lg:w-1/2">
            <form className="w-full max-w-lg">
              <div className="mb-4">
                <label className="mb-2 block text-slate-300" htmlFor="name">
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
          </div>
        </Bounded>
      </div>
    </section>
  );
};

export default ContactForm;

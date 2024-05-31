"use client";

import React, { useRef, useState } from "react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import SubmitBtn from "../../components/submit-btn";
import toast from "react-hot-toast";
import { sendEmail } from "../../actions/sendEmail";

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm = ({ slice }: ContactFormProps): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const { error } = await sendEmail(formData);
    setIsSubmitting(false);

    if (error) {
      toast.error(error);
      return;
    }
    toast.success("E-mail envoyé avec succès!");
    if (formRef.current) {
      formRef.current.reset();
    }
  };

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
            <form
              ref={formRef}
              className="mt-10 flex w-full max-w-lg flex-col dark:text-black"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="mb-2 block text-slate-300" htmlFor="name">
                  Votre nom (obligatoire)
                </label>
                <input
                  className="borderBlack my-3 h-14 w-full rounded-lg p-4 transition-all dark:bg-white dark:bg-opacity-80 dark:outline-none dark:focus:bg-opacity-100"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-slate-300" htmlFor="email">
                  Votre adresse de messagerie (obligatoire)
                </label>
                <input
                  className="borderBlack my-3 h-14 w-full rounded-lg p-4 transition-all dark:bg-white dark:bg-opacity-80 dark:outline-none dark:focus:bg-opacity-100"
                  name="senderEmail"
                  type="email"
                  required
                  maxLength={500}
                  placeholder="Your email"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-slate-300" htmlFor="message">
                  Votre message
                </label>
                <textarea
                  className="borderBlack my-3 h-52 w-full rounded-lg p-4 transition-all dark:bg-white dark:bg-opacity-80 dark:outline-none dark:focus:bg-opacity-100"
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={4}
                  maxLength={5000}
                />
              </div>
              <SubmitBtn isSubmitting={isSubmitting} />
            </form>
          </div>
        </Bounded>
      </div>
    </section>
  );
};

export default ContactForm;

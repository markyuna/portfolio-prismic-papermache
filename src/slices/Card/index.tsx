"use client";

import React, { useState } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
            className="cursor-pointer row-start-1 max-w-sm md:col-start-2 md:row-end-3"
            onClick={openModal} // Añade el evento onClick para abrir el modal
          />
        </div>
      </div>

      {/* Modal para mostrar la imagen ampliada */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
          role="button" // Add role attribute
          tabIndex={0} // Add tabIndex attribute
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              closeModal();
            }
          }}
        >
          <div
            className="relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={slice.primary.image?.url ?? ""}
              alt={slice.primary.image.alt ?? "Avatar Image"}
              className="max-h-[90vh] max-w-[90vw] rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-6 text-white text-4xl transition-transform duration-300 hover:scale-110"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </Bounded>
  );
};

export default Card;

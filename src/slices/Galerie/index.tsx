"use client";

import React, { useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

/**
 * Props for `Galerie`.
 */
export type GalerieProps = SliceComponentProps<Content.GalerieSlice>;

/**
 * Component for "Galerie" Slices.
 */
const Galerie = ({ slice }: GalerieProps): JSX.Element => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = slice.primary.image
    .flatMap((item) => [
      item.img1,
      item.img2,
      item.img3,
      item.img4,
      item.img5,
      item.img6,
      item.img7,
      item.img8,
      item.img9,
      item.img10,
      item.img11,
      item.img12,
    ])
    .filter((img) => img?.url);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    setIsModalOpen(false);
  };

  const handleNextImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex !== null && prevIndex < images.length - 1
          ? prevIndex + 1
          : 0
      );
    }
  };

  const handlePreviousImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex !== null && prevIndex > 0
          ? prevIndex - 1
          : images.length - 1
      );
    }
  };

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
        <Heading as="h2" size="sm" className="text-center">
          {slice.primary.heading}
        </Heading>
        <div className="mt-4 md:col-span-4">
          <div className="mt-4 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {images.map((img, index) => (
              <PrismicNextImage
                key={img?.url} // Use a unique identifier from the image data as the key
                field={img}
                imgixParams={{ w: 400, h: 400 }}
                className="mb-4 h-auto w-full transform rounded-md object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                alt=""
                onClick={() => openModal(index)}
              />
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

      {isModalOpen && selectedImageIndex !== null && (
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
            <button
              onClick={handlePreviousImage}
              className="absolute left-4 flex h-16 w-16 items-center justify-center rounded-full bg-transparent text-white text-3xl transition-transform duration-100 hover:scale-110"
            >
              <GrLinkPrevious />
            </button>
              <img
                src={images[selectedImageIndex]?.url ?? ""}
                alt="Expanded view"
                className="max-h-[90vh] max-w-[90vw] rounded-lg"
              />
            <button
              onClick={handleNextImage}
              className="absolute right-4 flex h-16 w-16 items-center justify-center rounded-full bg-transparent text-white text-3xl transition-transform duration-100 hover:scale-110"
            >
              <GrLinkNext />
            </button>
            <button
              onClick={closeModal}
              className="absolute top-4 right-6 text-white text-4xl transition-transform duration-300 hover:scale-110"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Galerie;

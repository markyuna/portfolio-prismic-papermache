// src/slices/Experience/index.tsx
"use client";

import React, { useState } from "react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Dalle3Image from "@/components/Dalle3Image";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = [
    slice.primary.img1,
    slice.primary.img2,
    slice.primary.img3,
    slice.primary.img4,
    slice.primary.img5,
    slice.primary.img6,
  ].filter((img) => img?.url);

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
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h3" size="md">
        {slice.primary.heading}
      </Heading>
      {slice.items.map((item, index) => (
        <div key={item.id} className="mt-5 md:mt-16">
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
              {images.map((img, imgIndex) => (
                <PrismicNextImage
                  key={imgIndex}
                  field={img}
                  imgixParams={{ w: 150, h: 150 }}
                  className="not-prose h-auto w-full max-w-xs rounded-md cursor-pointer transform transition-transform duration-300 hover:scale-105"
                  alt=""
                  onClick={() => openModal(imgIndex)}
                />
              ))}
            </div>
            <Dalle3Image />
          </div>
        </div>
      ))}
      {isModalOpen && selectedImageIndex !== null && (
        <button
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
        onClick={closeModal}
        tabIndex={0}
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
            className="absolute left-4 flex h-16 w-16 items-center justify-center rounded-full bg-transparent text-white text-3xl transition-transform transform hover:scale-110"
            aria-label="Previous Image"
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
            className="absolute right-4 flex h-16 w-16 items-center justify-center rounded-full bg-transparent text-white text-3xl transition-transform transform hover:scale-110"
            aria-label="Next Image"
          >
            <GrLinkNext />
          </button>
          <button
            onClick={closeModal}
            className="absolute top-4 right-6 text-white text-4xl transition-transform transform hover:scale-110"
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>
      </button>
      
      )}
    </Bounded>
  );
};

export default Experience;

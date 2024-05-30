"use client";
import React, { useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    setActiveSlide((prevActiveSlide) =>
      prevActiveSlide === 2 ? prevActiveSlide : prevActiveSlide + 1,
    );
  };

  const handlePrevious = () => {
    setActiveSlide((prevActiveSlide) =>
      prevActiveSlide === 0 ? prevActiveSlide : prevActiveSlide - 1,
    );
  };

  const renderDescription = () => {
    switch (activeSlide) {
      case 0:
        return <PrismicRichText field={slice.primary.description_one} />;
      case 1:
        return <PrismicRichText field={slice.primary.descriptiontwo} />;
      case 2:
        return <PrismicRichText field={slice.primary.descriptionthree} />;
      default:
        return null;
    }
  };

  const renderImages = () => {
    switch (activeSlide) {
      case 0:
        return (
          <PrismicNextImage
            className="rounded-2xl border-4 border-red-500"
            field={slice.primary.image_one}
          />
        );
      case 1:
        return (
          <PrismicNextImage
            className="rounded-2xl border-4 border-red-500"
            field={slice.primary.image_two}
          />
        );
      case 2:
        return (
          <PrismicNextImage
            className="rounded-2xl border-4 border-red-500"
            field={slice.primary.image_three}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="p-5"
    >
      <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
        <div className="mb-6 md:mb-0 md:w-1/2">
          <div className="prose prose-xl prose-slate prose-invert mt-20">
            {renderDescription()}
          </div>
        </div>
        <div className="relative flex items-center justify-center md:w-1/2">
          <div className="h-auto w-80">{renderImages()}</div>
          <div className="absolute bottom-0 left-0 z-30 flex w-40 translate-y-20 transform justify-between">
            <button
              onClick={handlePrevious}
              disabled={activeSlide === 0}
              className={`flex h-16 w-16 items-center justify-center rounded-full border-2 bg-transparent transition duration-300 ease-in-out ${
                activeSlide === 0
                  ? "cursor-not-allowed border-transparent"
                  : "border-transparent hover:border-red-500"
              }`}
            >
              <GrLinkPrevious
                className={`${
                  activeSlide === 0 ? "text-gray-500" : "text-red-500"
                }`}
              />
            </button>
            <button
              onClick={handleNext}
              disabled={activeSlide === 2}
              className={`flex h-16 w-16 items-center justify-center rounded-full border-2 bg-transparent transition duration-300 ease-in-out ${
                activeSlide === 2
                  ? "cursor-not-allowed border-transparent"
                  : "border-transparent hover:border-red-500"
              }`}
            >
              <GrLinkNext
                className={`${
                  activeSlide === 2 ? "text-gray-500" : "text-red-500"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;

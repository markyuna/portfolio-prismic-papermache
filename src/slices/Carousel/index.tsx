"use client";
import React, { useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { motion } from "framer-motion";

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState("next");

  const handleNext = () => {
    setTransitionDirection("next");
    setActiveSlide((prevActiveSlide) =>
      prevActiveSlide === 2 ? prevActiveSlide : prevActiveSlide + 1,
    );
  };

  const handlePrevious = () => {
    setTransitionDirection("previous");
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
    const imageFields = [
      slice.primary.image_one,
      slice.primary.image_two,
      slice.primary.image_three,
    ];

    return imageFields.map((imageField, index) => (
      <motion.div
        key={imageField.id}
        className="absolute flex h-96 w-96 flex-col justify-center"
        animate={{
          opacity: activeSlide === index ? 1 : 0,
          x: activeSlide === index ? "0px" : `${(index - activeSlide) * 96}px`,
          scale: activeSlide === index ? 1 : 0.8,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <PrismicNextImage
          className="... rounded-2xl border-8 border-indigo-600/[.55]"
          field={imageField}
        />
      </motion.div>
    ));
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      x: transitionDirection === "next" ? 100 : -100,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  // Definiendo el efecto de texto escalonado
  const textContainerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="p-2"
    >
      <motion.div
        className="flex flex-col items-center md:flex-row md:items-start md:justify-between"
        key={activeSlide}
        variants={textContainerVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="md:mb-0 md:w-1/2">
          <motion.div
            variants={textVariants}
            className="prose prose-xl prose-slate prose-invert mt-10"
          >
            {renderDescription()}
          </motion.div>
          <div className="bottom-4 flex w-full justify-around p-5 md:px-4">
            <button
              onClick={handlePrevious}
              disabled={activeSlide === 0}
              className={`flex h-16 w-16 items-center justify-center rounded-full border-2 bg-transparent transition duration-300 ease-in-out ${
                activeSlide === 0
                  ? "cursor-not-allowed border-transparent"
                  : "border-transparent hover:border-indigo-600"
              }`}
            >
              <GrLinkPrevious
                className={`${
                  activeSlide === 0 ? "text-gray-500" : "text-indigo-600"
                }`}
              />
            </button>
            <button
              onClick={handleNext}
              disabled={activeSlide === 2}
              className={`flex h-16 w-16 items-center justify-center rounded-full border-2 bg-transparent transition duration-300 ease-in-out ${
                activeSlide === 2
                  ? "cursor-not-allowed border-transparent"
                  : "border-transparent hover:border-indigo-600"
              }`}
            >
              <GrLinkNext
                className={`${
                  activeSlide === 2 ? "text-gray-500" : "text-indigo-600"
                }`}
              />
            </button>
          </div>
        </div>
        <div className="relative flex h-96 flex-col items-center justify-center md:w-1/2">
          <div className="relative flex h-full w-full items-center justify-center">
            {renderImages()}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Carousel;

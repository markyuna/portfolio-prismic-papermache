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

  // definig stagger text effect
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
      className="p-5"
    >
      <motion.div
        className="flex flex-col items-center md:flex-row md:items-start md:justify-between"
        key={activeSlide}
        variants={textContainerVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-6 md:mb-0 md:w-1/2">
          <motion.div
            variants={textVariants}
            className="prose prose-xl prose-slate prose-invert mt-20"
          >
            {renderDescription()}
          </motion.div>
        </div>
        <div className="relative flex items-center justify-center md:w-1/2">
          <motion.div
            className="h-auto w-80"
            animate={{
              opacity:
                activeSlide === 0 ? 1 : activeSlide === 1 ? 0 : 0,
              x:
                activeSlide === 0 ? "0px" : activeSlide === 1 ? "96px" : "96px",
              scale: activeSlide === 0 ? 1 : activeSlide === 1 ? 1.2 : 1.2,
            }}
            transition={{
              duration: 0.5,
              delay: 0,
              ease: "easeInOut",
            }}
          >
            {renderImages()}
          </motion.div>
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
      </motion.div>
    </section>
  );
};

export default Carousel;

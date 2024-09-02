"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function Avatar({
  image,
  className,
  onClick, // Agregamos el prop onClick
}: {
  image: ImageField;
  className?: string;
  onClick?: () => void; // Agregamos el prop onClick
}) {
  const component = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        {
          opacity: 0,
          scale: 1.4,
        },
        {
          scale: 1,
          opacity: 1,
          duration: prefersReducedMotion ? 0 : 1.3,
          ease: "power3.inOut",
        },
      );

      window.onmousemove = (e) => {
        if (!component.current) return; // no component, no animation!
        const componentRect = (
          component.current as HTMLElement
        ).getBoundingClientRect();
        const componentCenterX = componentRect.left + componentRect.width / 2;

        const componentPercent = {
          x: (e.clientX - componentCenterX) / componentRect.width / 2,
        };

        const distFromCenterX = 1 - Math.abs(componentPercent.x);

        gsap
          .timeline({
            defaults: { duration: 0.5, overwrite: "auto", ease: "power3.out" },
          })
          .to(
            ".avatar",
            {
              rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
              duration: 0.5,
            },
            0,
          )
          .to(
            ".highlight",
            {
              opacity: distFromCenterX - 0.7,
              x: -10 + 20 * componentPercent.x,
              duration: 0.5,
            },
            0,
          );
      };
    }, component);
    return () => ctx.revert(); // cleanup!
  }, [prefersReducedMotion]);

  return (
    <div // Cambiamos de <button> a <div>
      ref={component}
      className={clsx("relative", className, "cursor-pointer")}
      onClick={onClick} // Usamos el evento onClick
      style={{ perspective: "300px", perspectiveOrigin: "100% 100%" }}
      role="button" // Añadimos role="button" para mantener accesibilidad
      tabIndex={0} // Hacemos que el div sea accesible mediante el teclado
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick && onClick(); // Disparamos el evento onClick si se presiona Enter o Espacio
        }
      }}
    >
      <div
        className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0"
      >
        <PrismicNextImage
          field={image}
          className="avatar-image w-full object-fill"
          imgixParams={{ q: 90 }}
          alt=""
        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
      </div>
    </div>
  );
}

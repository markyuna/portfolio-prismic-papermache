import { PrismicNextLink } from "@prismicio/next";
import React from "react";
import { MdArrowOutward } from "react-icons/md";
import clsx from "clsx";
import { KeyTextField, LinkField } from "@prismicio/client";

type ButtonProps = {
  linkField: LinkField;
  label: KeyTextField;
  showIcon?: boolean;
  className?: string;
};

export default function Button({
  linkField,
  label,
  showIcon = true,
  className,
}: ButtonProps) {
  const labelText = label ?? ""; // Asegura que label siempre sea una cadena de texto

  return (
    <PrismicNextLink
      field={linkField}
      className={clsx(
        "transparent group relative flex w-fit items-center justify-center overflow-hidden rounded-full border-2 border-slate-900 px-4 py-2 font-bold transition-transform ease-out hover:scale-105",
        className,
      )}
    >
      <span
        className={clsx(
          "absolute inset-0 z-0 h-full translate-y-9 bg-blue-600 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
        )}
      />
      <span className="relative flex items-center justify-center gap-2">
        <span dangerouslySetInnerHTML={{ __html: labelText }} />
        {showIcon && (
          <MdArrowOutward className="inline-block" data-testid="button-icon" />
        )}
      </span>
    </PrismicNextLink>
  );
}

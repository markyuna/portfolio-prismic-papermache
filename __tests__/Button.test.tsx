// Button.test.tsx
import '@testing-library/jest-dom/extend-expect';

import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "../src/components/Button";
import { KeyTextField, LinkField } from "@prismicio/client";

describe("Button component", () => {
  test("renders button with correct label", () => {
    const label = "Open menu";
    // const linkField = {
    //   // Aquí puedes definir la estructura de un objeto `LinkField` para simular tus datos de prueba
    // };
    render(<Button linkField={linkField} label={label} />);

    const buttonElement = screen.getByText(label);
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders button with icon when showIcon is true", () => {
    const label = KeyTextField;
    const linkField = {
      // Aquí puedes definir la estructura de un objeto `LinkField` para simular tus datos de prueba
    };
    render(<Button linkField={linkField} label={label} showIcon={true} />);

    const iconElement = screen.getByTestId("icon"); // Asegúrate de agregar un data-testid al icono en tu componente Button
    expect(iconElement).toBeInTheDocument();
  });

  test("does not render button with icon when showIcon is false", () => {
    const label = "Click me";
    const linkField = {
      // Aquí puedes definir la estructura de un objeto `LinkField` para simular tus datos de prueba
    };
    render(<Button linkField={linkField} label={label} showIcon={false} />);

    const iconElement = screen.queryByTestId("icon"); // Utiliza queryByTestId para verificar que el icono no esté presente
    expect(iconElement).not.toBeInTheDocument();
  });
});

import React from "react";
import { render } from "@testing-library/react";
import Button from "../src/components/Button";
import { LinkField, KeyTextField } from "@prismicio/client";

describe("Button component", () => {
  const linkField = {
    link_type: "Web",
    url: "https://example.com",
  };
  const label = "Example Button";

  test("renders button with label and icon by default", () => {
    const { getByText, getByTestId } = render(
      <Button
        linkField={linkField as LinkField}
        label={label as KeyTextField}
      />,
    );
    const button = getByText(label);
    const icon = getByTestId("button-icon");

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  test("renders button without icon when showIcon is false", () => {
    const { queryByTestId } = render(
      <Button
        linkField={linkField as LinkField}
        label={label as KeyTextField}
        showIcon={false}
      />,
    );
    const icon = queryByTestId("button-icon");

    expect(icon).toBeNull();
  });

  test("applies custom class name to button", () => {
    const customClassName = "custom-button";
    const { container } = render(
      <Button
        linkField={linkField as LinkField}
        label={label as KeyTextField}
        className={customClassName}
      />,
    );
    const button = container.firstChild;

    expect(button).toHaveClass(customClassName);
  });

  // Add more tests as needed
});

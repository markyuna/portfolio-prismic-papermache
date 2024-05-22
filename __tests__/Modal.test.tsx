import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Modal } from "../src/components/Modal";

describe("Modal component", () => {
  test("renders nothing when isOpen is false", () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>,
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders modal content when isOpen is true", () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>,
    );
    expect(getByText("Modal Content")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    const { getByLabelText } = render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>,
    );
    const closeButton = getByLabelText("Close Modal");
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });
});

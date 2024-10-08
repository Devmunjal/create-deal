import React, { useEffect, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      e.target instanceof HTMLElement &&
      !e.target.closest(".modal") &&
      !e.target.closest(".modal-overlay")
    ) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        showModal ? "block" : "hidden"
      } `}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleClickOutside(event)
      }
    >
      <div
        className="modal-overlay fixed inset-0 bg-black bg-opacity-50"
        role="presentation"
        onClick={onClose}
      />
      <div
        className={`modal bg-white rounded-xl max-w-lg z-50 ${className}`}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <h2 id="modal-title" className="text-lg font-bold">
            Modal title
          </h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div id="modal-description" className="px-4 py-2">
          {children}
        </div>
      </div>
    </div>
  );
}

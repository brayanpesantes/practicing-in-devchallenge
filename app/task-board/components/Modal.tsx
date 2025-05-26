import { useTaskContext } from "@/context/TasksContext";
import cn from "@/utils/cn";
import TaskForm from "./TaskForm";
import { useEffect, useRef } from "react";

export default function Modal() {
  const { modalIsOpen, closeModal } = useTaskContext();
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key === "Tab" && modalIsOpen && modalContentRef.current) {
        const focusableElements =
          modalContentRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    if (modalIsOpen && modalContentRef.current) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus the modal container or the first focusable element
      const focusableElements =
        modalContentRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        modalContentRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalIsOpen, closeModal]);

  return (
    <div
      className={cn([
        "bg-[#00000033] absolute inset-0 transition-all duration-500 ease-in-out",
        {
          "translate-x-full opacity-0": !modalIsOpen,
        },
        {
          "translate-x-0 opacity-100": modalIsOpen,
        },
      ])}
      onClick={closeModal} // Overlay click closes modal
    >
      <div
        ref={modalContentRef}
        className="w-full h-full relative p-6 " // This div is visually just a_padding wrapper. The actual dialog is TaskForm's root.
        // However, per instructions, applying ARIA roles here.
        // Ideally, TaskForm's root div should get these attributes.
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title" // Title will be set in TaskForm later
        tabIndex={-1} // Make it focusable for programmatic focus
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing modal
      >
        <TaskForm />
      </div>
    </div>
  );
}

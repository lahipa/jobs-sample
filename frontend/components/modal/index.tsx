import { useRef, useEffect, HTMLAttributes } from "react";
import cx from "classnames";

interface ModalProps {
  children: JSX.Element | JSX.Element[];
  open: boolean;
  size: "sm" | "md" | "lg" | "xl";
  onClose?: () => void;
}

export default function Modal(props: ModalProps) {
  const { children, open, size, onClose } = props;

  const modalref = useRef<HTMLDivElement>(null);

  const backdropclass = cx(
    "flex items-center justify-center backdrop-filter backdrop-blur-sm",
    "fixed w-screen h-screen left-0 top-0 bottom-0 right-0 z-50",
  );

  const containerclass = cx(
    "w-full relative bg-white rounded-md shadow-lg",
    "flex flex-col",
    {
      "max-w-screen-sm": size === "sm",
      "max-w-screen-md": size === "md",
      "max-w-screen-lg": size === "lg",
      "max-w-screen-xl": size === "xl",
    },
  );

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (modalref.current && !modalref.current.contains(e.target)) {
        onClose && onClose();
      }
    };

    if (open) {
      document.addEventListener("mouseup", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.body.style.overflow = "visible";
    };
  }, [modalref, open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className={backdropclass}>
      <div
        ref={modalref}
        className={containerclass}
        style={{
          maxHeight: "calc(100% - 200px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

Modal.defaultProps = {
  onClose: undefined,
};

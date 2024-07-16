import React from "react";
import "./modal.css";
import CIcon from "@coreui/icons-react";
import { cilX } from "@coreui/icons";

export const Modal = ({
  children,
  isOpen,
  openModal,
  closeModal,
  size,
  title = "titulo del modal",
}) => {
  const handlePropagation = (e) => {
    e.stopPropagation();
  };
  
  isOpen
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <div
      className={`container-modal ${isOpen && "show-modal"}`}
      onClick={closeModal}
    >
      <div className={`modal-content ${size}`} onClick={handlePropagation}>
        <div className="modal-header">
          <h4>{title}</h4>
          <CIcon icon={cilX} onClick={closeModal} />
        </div>
        {children}
      </div>
    </div>
  );
};

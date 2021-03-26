import React from 'react';
import './Modal.css';
import { useTranslation } from 'react-i18next'

const Modal = ({ handleCloseModal, show, children }) => {
  const { t } = useTranslation();
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName} onClick={handleCloseModal} >
      <section className="modal-main">
        {children}
        <div className="close-modal-row">
          <button className="close-modal__btn" type="button" onClick={handleCloseModal}>
            {t('Close')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from "react-datepicker";
import { getFormattedDate, getDayDifference } from '../../utills'
import "react-datepicker/dist/react-datepicker.css";
import './CampaignTable.css';

const Modal = React.lazy(() => import('../Modal/Modal'));

function CampaignTable({ campaignData, tabs, rescheduleDate }) {
  const [startDate, setStartDate] = useState(new Date())
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false)
  const [datePickerRow, setDatePickerRow] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState(null)
  const { t } = useTranslation();
  
  const handleChange = (date) => {
    setStartDate(date)
    rescheduleDate(date, datePickerRow)
    openDatePicker(null)
  }

  const openDatePicker = (id) => {
    setDatePickerIsOpen(!datePickerIsOpen)
    setDatePickerRow(id)
  };

  const hanldeShowModal = (item) => {
    setShowModal(true);
    setModalData(item);
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className="CampaignTable-cont">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Modal
          show={showModal}
          handleCloseModal={handleCloseModal}
        >
          {
            modalData && Object.keys(modalData).length > 0 ?
              <div className="price-modal-cont">
                <div className="price-modal-cont__img-section">
                  <img height="137px" alt="my game" src={modalData.image_url} />
                  <div className="price-modal-cont__game-desc">
                    <p className="game-title">{modalData.name}</p>
                    <p className="game-region">{modalData.region}</p>
                  </div>
                </div>
                <div className="price-modal-cont__price-section">
                  <h2 className="pricing-title">{t('Pricing')}</h2>
                  <div className="price-week-month-row">
                    <p className="week-month">1 {t('Week')} - 1 {t('Month')}</p>
                    <p className="price">$ 100.00</p>
                  </div>
                  <div className="price-week-month-row">
                    <p className="week-month">6 {t('Months')}</p>
                    <p className="price">$ 500.00</p>
                  </div>
                  <div className="price-week-month-row">
                    <p className="week-month">1 {t('Year')}</p>
                    <p className="price">$ 900.00</p>
                  </div>
                </div>
              </div>
              : null
          }
        </Modal>
      </React.Suspense>
      <table>
        <thead>
          <tr>
            <th scope="col">{t('Date')}</th>
            <th scope="col">{t('Campaign')}</th>
            <th scope="col">{t('View')}</th>
            <th scope="col">{t('Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {
            campaignData && campaignData.length > 0 ? campaignData.map(item => (
              <tr key={item.id}>
                <td data-label={t('Date')}>
                  {getFormattedDate(item.createdOn)}
                  {
                    tabs !== 1 &&
                    <p className="count-days">
                      {getDayDifference(item.createdOn)} {tabs === 0 ? t('days ago') : tabs === 2 ? t('days ahead') : ''}
                    </p>
                  }
                </td>
                <td data-label={t('Campaign')}>
                  <div className="campaign-cont">
                    <img alt="campaign img" src={item.image_url} />
                    <div className="campaign-cont__info">
                      <p>{item.name}</p>
                      <p className="campaign-cont__info-region">{item.region}</p>
                    </div>
                  </div>
                </td>
                <td data-label={t('View')}>
                  <button className="viewPricing" onClick={() => hanldeShowModal(item)}>
                    <img alt="campaign img" height="24px" src="./Price.png" />
                    <span>{t('View Pricing')}</span>
                  </button>
                </td>
                <td data-label={t('Actions')}>
                  <div className="actionCont">
                    <button className="viewPricing">
                      <img alt="campaign img" height="24px" src="./file.png" />
                      <span>{t('CSV')}</span>
                    </button>
                    <button className="viewPricing">
                      <img alt="campaign img" height="24px" src="./statistics-report.png" />
                      <span>{t('Report')}</span>
                    </button>
                    <button onClick={() => openDatePicker(item.id)} className="viewPricing">
                      <img alt="campaign img" height="24px" src="./calendar.png" />
                      <span>{t('Schedule Again')}</span>
                    </button>
                    {
                      datePickerIsOpen && item.id === datePickerRow &&
                      <DatePicker
                        selected={startDate}
                        onChange={handleChange}
                        inline
                      />
                    }
                  </div>
                </td>
              </tr>
            ))
              : <tr>
                <td></td>
                <td></td>
                <td>
                  <div style={{ marginTop: '1rem' }}>
                    No Data Found
                </div>
                </td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default CampaignTable;

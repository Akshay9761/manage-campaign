import React, { useEffect, useState } from "react";
import "./App.css";
import { withTranslation } from "react-i18next";
import Header from "./components/Header/Header";
import CampaignTable from "./components/CampaignTable/CampaignTable";
import campaignJSONData from './campaignData.json';
import { uuid } from 'uuidv4';
import { sameDate } from './utills';

function App({ t }) {
  
  const [tabs, setTabs] = useState(0);
  const handleTabs = (value) => {
    setTabs(value);
  };

  const [campaignData, setCampaignData] = useState([]);

  useEffect(() => {
    if (campaignJSONData && campaignJSONData.data && campaignJSONData.data.length) {
      let campData = campaignJSONData.data.map(camData => {
        return { ...camData, id: uuid(), }
      })
      setCampaignData(campData)
    }
    return () => {
    }
  }, [])

  /**
 * Function that reschedule campaign date
 * @author   Akshay
 * @param    {Date} date
 * @param    {id} string
 */
  const rescheduleDate = (date, id) => {
    let rescheCampData = campaignData.map((campData) => {
      if (campData.id === id) {
        return { ...campData, createdOn: new Date(date).getTime() }
      }
      return campData;
    })
    setCampaignData(rescheCampData)
  }

  /**
 * Returns the memized value for campaign data
 */
  const memoizedCampaignData = React.useMemo(
    () =>
      campaignData && campaignData.length && campaignData.filter((campData) => {
        let d2 = new Date()
        var dateTwo = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
        if (tabs === 0) {
          let d1 = new Date(campData.createdOn)
          var dateOne = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
          return dateOne > dateTwo && campData
        } else if (tabs === 1) {
          return sameDate(new Date(campData.createdOn), new Date());
        } else {
          let d1 = new Date(campData.createdOn)
          let dateOne = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
          return dateOne < dateTwo && campData
        }
      }),
    [tabs, campaignData]
  );

  return (
    <div className="App">
      <Header />
      <div className="manage-campaign-cont">
        <h2 className="manage-campaign">{t("Manage Campaigns")}</h2>
        <div className="manage-campaign-cont__tabs">
          <button
            onClick={() => handleTabs(0)}
            className={tabs === 0 ? "active" : undefined}
          >
            {t("Upcoming Campaigns")}
          </button>
          <button
            onClick={() => handleTabs(1)}
            className={tabs === 1 ? "active" : undefined}
          >
            {t("Live Campaigns")}
          </button>
          <button
            onClick={() => handleTabs(2)}
            className={tabs === 2 ? "active" : undefined}
          >
            {t("Past Campaigns")}
          </button>
        </div>
        {/* campaign table */}
        <CampaignTable campaignData={memoizedCampaignData} tabs={tabs} rescheduleDate={rescheduleDate} />
      </div>
    </div>
  );
}

export default withTranslation()(App);

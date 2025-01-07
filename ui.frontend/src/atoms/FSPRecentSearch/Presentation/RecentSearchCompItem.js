import React, { useState, useEffect } from "react";
import People_outline from "assets/resources/images/People_outline.svg";
import calendar from "assets/resources/images/calendar.svg";
import cancel_recent from "assets/resources/images/cancel_recent.svg";
import aemdata from "../Data/SampleData";

export const RecentSearchCompItem = ({}) => {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const storedItems =
      JSON.parse(localStorage.getItem("recentSearchData")) || [];
    setData(storedItems.slice(0, aemdata.recentSearchDesktopCount));
    setIsVisible(storedItems.length > 0);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short" };
    return date.toLocaleDateString("en-GB", options);
  };

  const handleRemoveItem = (id) => {
    const updatedItems = data.filter((item, index) => index !== id);
    setData(updatedItems);
    localStorage.setItem("recentSearchData", JSON.stringify(updatedItems));
  };
  const handleRemoveAllItem = () => {
    localStorage.removeItem("recentSearchData");
    setData([]);
    setIsVisible(false);
    window.location.reload();
  };

  return (
    <>
      {aemdata.enableRecentSearch === true ? (
        <div class="ey-recent-search">
          {isVisible && (
            <div>
              <span>{aemdata.recentSearchLabel}</span>
              <span>
                <button
                  style={{ float: "right" }}
                  onClick={() => handleRemoveAllItem()}
                >
                  Clear All
                </button>
              </span>
            </div>
          )}
          <div class="ey-row">
            {data.map((item, index) => (
              <>
                <div class="ey-column">
                  <div class="ey-card__raised--bg-white ey-padding--none">
                    <div class="ey-padding--8">
                      <div class="ey-row">
                        <div class="ey-column-xs-3">
                          <div
                            class="ey-background-image ey-border-radius-8"
                            style={{
                              height: "80px",
                              backgroundImage: `url("https://www.shannun.com/content/dam/eag/shannun/shannuncom/Global/destinations/deals/${item.formData.destination.IATA}.jpg")`,
                            }}
                          ></div>
                        </div>
                        <div class="ey-column-xs-8">
                          <div class="ey-font__text--small">
                            {item.CityName} -{" "}
                            {
                              item.formData.destination.destinationCity.split(
                                ","
                              )[0]
                            }
                          </div>
                          <div class="ey-font__text--xsmall">
                            <img
                              class="ey-thumbnail__icon ey-margin__right--4 w-16"
                              src={calendar}
                            />
                            {formatDate(item.formData.calendar.departDate)} -
                            {formatDate(item.formData.calendar.returnDate)}
                          </div>
                          <div class="ey-font__text--xsmall">
                            <img
                              class="ey-thumbnail__icon ey-margin__right--4 w-16"
                              src={People_outline}
                            />
                            {item.formData.guest.ADT +
                              item.formData.guest.B15 +
                              item.formData.guest.CHD +
                              item.formData.guest.INF +
                              item.formData.guest.INS +
                              item.formData.guest.OFW}{" "}
                            Passengers • {item.formData.selectedClass.label}{" "}
                            class
                          </div>
                          <div class="ey-font__text--xxsmall ey-margin__top--4">
                            Starting from {aemdata.currency} {aemdata.price}
                          </div>
                        </div>
                        <div class="ey-column-xs-1 ey-text-end">
                          <a onClick={() => handleRemoveItem(index)}>
                            <img src={cancel_recent} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

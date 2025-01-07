import React, { Component, Fragment } from "react";
import MobiscrollWrapper from "./MobiscrollWrapper";

class CalendarContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCalendar: false,
            startDate: null,
            endDate: null,
            date: null
        };
        this.staticProps = {
            "departInputLabelId": "depart_date_field_r3e9admwm",
            "returnInputLabelId": "return_date_field_4l29no9l4",
            "singleDateSelection": false,
            "aemdata": {
                "useMobiscroll": true,
                "roundTripDurationMax": 10,
                "roundTripDurationMin": 3,
                "displayMaxDaysOfFlightPricing": "180",
                "calendarPricingEligibleFlows": "revenue",
                "oneWayCheckboxLabel": "One-way",
                "addReturnPlaceholder": "Add Return",
                "monthsCountMobile": "1",
                "enableTopOndsFeature": false,
                "payWithMilesLabel": "Pay with miles",
                "topOndsConfigList": [
                    "AAL",
                    "AAQ",
                    "ABA",
                    "LHR",
                    "JFK",
                    "AUH",
                    "CCU"
                ],
                "enableOndFilter": true,
                "displayMonthBox": false,
                "resetButtonLabel": "Reset",
                "fromLabel": "from {currency}",
                "priceLabel": "{tripType} price",
                "pricingUnavailableLabel": "na",
                "disclaimerText": "Fares are inclusive of taxes and surcharges.",
                "showDisclaimer": true,
                "pleaseSelectPlaceholder": "Please select",
                "startDayOfWeek": "1",
                "calendarPricingOndConfig": [
                    {
                        "roundtripduration": "4",
                        "origin": "BLR",
                        "enablecalendarpricing": "TRUE",
                        "destination": "AUH"
                    },
                    {
                        "roundtripduration": "30",
                        "origin": "BLR",
                        "enablecalendarpricing": "TRUE",
                        "destination": "JFK"
                    },
                    {
                        "roundtripduration": "2",
                        "origin": "PNQ",
                        "enablecalendarpricing": "FALSE",
                        "destination": "BOM"
                    },
                    {
                        "roundtripduration": "11",
                        "origin": "JNB",
                        "enablecalendarpricing": "TRUE",
                        "destination": "AUH"
                    },
                    {
                        "roundtripduration": "7",
                        "origin": "COK",
                        "enablecalendarpricing": "TRUE",
                        "destination": "AUH"
                    },
                    {
                        "roundtripduration": "7",
                        "origin": "AUH",
                        "enablecalendarpricing": "TRUE",
                        "destination": "LHR"
                    },
                    {
                        "roundtripduration": "7",
                        "origin": "CMB",
                        "enablecalendarpricing": "TRUE",
                        "destination": "AUH"
                    },
                    {
                        "roundtripduration": "7",
                        "origin": "AUH",
                        "enablecalendarpricing": "TRUE",
                        "destination": "MEL"
                    }
                ],
                "configurableDate": {
                    "roundTrip": {
                        "isConfigurableDateEnabled": false,
                        "unconfiguredDateErrorMsg": ""
                    },
                    "multiCity": {},
                    "oneWay": {
                        "isConfigurableDateEnabled": false,
                        "unconfiguredDateErrorMsg": ""
                    }
                },
                "monthsCountDesktop": "3",
                "blackOutDaysOfWeek": {},
                "invalidReturnDateError": "Please enter date in the correct format",
                "monthsLabel": [
                    {
                        "value": "Jan",
                        "key": "1"
                    },
                    {
                        "value": "Feb",
                        "key": "2"
                    },
                    {
                        "value": "Mar",
                        "key": "3"
                    },
                    {
                        "value": "Apr",
                        "key": "4"
                    },
                    {
                        "value": "May",
                        "key": "5"
                    },
                    {
                        "value": "Jun",
                        "key": "6"
                    },
                    {
                        "value": "Jul",
                        "key": "7"
                    },
                    {
                        "value": "Aug",
                        "key": "8"
                    },
                    {
                        "value": "Sep",
                        "key": "9"
                    },
                    {
                        "value": "Oct",
                        "key": "10"
                    },
                    {
                        "value": "Nov",
                        "key": "11"
                    },
                    {
                        "value": "Dec",
                        "key": "12"
                    }
                ],
                "invalidDepartDateError": "Please enter date in the correct format",
                "departOutofRangeError": "Enter date within range",
                "isSimplifiedCalendar": false,
                "departureLabel": "Outbound",
                "blackOut": {
                    "roundTrip": {
                        "inboundDateRange": [
                            {
                                "endDate": "22/06/2024",
                                "startDate": "11/06/2024"
                            }
                        ],
                        "blackoutDateErrorMsg": "The date you've selected is unavailable",
                        "ptcdependensOnCountryCode": null,
                        "outboundSingleDates": [],
                        "outboundDateRange": [
                            {
                                "endDate": "20/05/2024",
                                "startDate": "10/05/2024"
                            }
                        ],
                        "inboundSingleDates": [],
                        "isBlackOutEnabled": true
                    },
                    "multiCity": {
                        "segment_5": {},
                        "segment_4": {},
                        "blackoutDateErrorMsg": "The date you've selected is unavailable",
                        "segment_1": {},
                        "isBlackOutEnabled": true,
                        "segment_0": {},
                        "segment_3": {},
                        "segment_2": {}
                    },
                    "stopOver": {},
                    "oneWay": {
                        "blackoutDateErrorMsg": "The date you've selected is unavailable",
                        "ptcdependensOnCountryCode": null,
                        "outboundSingleDates": [],
                        "outboundDateRange": [],
                        "isBlackOutEnabled": true
                    }
                },
                "activeDays": "330",
                "returnLabel": "Return",
                "departblankfielderror": "Please enter your departure date.",
                "returnblankfielderror": "Please enter your return date.",
                "isDefaultDateEnabled": "true",
                "returnOutofRangeError": "Enter date within range",
                "dateFormatter": "DD MMM YYYY",
                "weeksLabel": [
                    {
                        "value": "Sun",
                        "key": "0"
                    },
                    {
                        "value": "Mon",
                        "key": "1"
                    },
                    {
                        "value": "Tue",
                        "key": "2"
                    },
                    {
                        "value": "Wed",
                        "key": "3"
                    },
                    {
                        "value": "Thu",
                        "key": "4"
                    },
                    {
                        "value": "Fri",
                        "key": "5"
                    },
                    {
                        "value": "Sat",
                        "key": "6"
                    }
                ],
                "enableCalendarPricing": true,
                "roundTripDefaultDuration": "10",
                "noOfMonths": 3,
                "roundTripInfoText": "Showing prices in {currency} for",
                "passangerLabelInfoText": "for 1 passenger",
                "noOfDaysLabel": "{noOfDay} days trip",
                "noOfDayLabel": "{noOfDay} day trip",
                "roundTripInfoTextAfterDateSelection": "Showing return prices in {currency} for trips departing on {date}",
                "noPriceAvailableMsg": "Price is not available for trips departing on {date}",
                "doneButtonText": "Book",
                "confirmButtonText": "Confirm",
                "lowestPriceColor": "low-price",
                "highestPriceColor": "high-price",
                "roundtripDurationConfig": [
                    {
                        "origin": "BLR",
                        "destination": "AUH",
                        "roundtripduration": "4"
                    },
                    {
                        "origin": "BLR",
                        "destination": "JFK",
                        "roundtripduration": "30"
                    },
                    {
                        "origin": "AUH",
                        "destination": "LHR",
                        "roundtripduration": "7"
                    },
                    {
                        "origin": "PNQ",
                        "destination": "BOM",
                        "roundtripduration": "2"
                    },
                    {
                        "origin": "AUH",
                        "destination": "BEY",
                        "roundtripduration": "26"
                    },
                    {
                        "origin": "CCU",
                        "destination": "LCG",
                        "roundtripduration": "26"
                    }
                ]
            },
            "controlId": "roundTripCalendar",
            "errorClass": "no-error",
            "returnDateError": "no-error",
            "errorData": {
                "origin": {
                    "controlId": "origin-error",
                    "error": false,
                    "errorMsg": " Please choose where you're flying from."
                },
                "destination": {
                    "controlId": "destintaion-error",
                    "error": false,
                    "errorMsg": "Please choose where you're flying to?"
                },
                "departDate": {
                    "controlId": "depart-date-error",
                    "error": false,
                    "errorMsg": "Please enter your departure date."
                },
                "returnDate": {
                    "controlId": "return-date-error",
                    "error": false,
                    "errorMsg": "Please enter your return date."
                },
                "guest": {
                    "controlId": "guest-error",
                    "error": false,
                    "errorMsg": "You need to select minimum 1 or maximum two guests only"
                },
                "promoCode": {
                    "controlId": "promoRoundTrip",
                    "error": false,
                    "errorMsg": "Promo code should be of minimum 5 characters"
                }
            },
            "numberOfMonths": "3",
            "displayFormat": "DD MMM YYYY",
            "orientation": "horizontal",
            "readOnly": false,
            "startDateId": "roundTripCalendarDepartDate",
            "endDateId": "roundTripCalendarReturnDate",
            "startDatePlaceholderText": "DD MMM YYYY",
            "endDatePlaceholderText": "DD MMM YYYY",            
            "focusedInput": null,
            "minimumNights": 0,
            "screenReaderInputMessage": "Accept alphanumeric in DD MMM YYYY format. Spaces will be added automatically",
            "keepFocusOnInput": true,
            "isRTL": false,
            "mandateData": {
                "mandateSign": "*",
                "isFsPanelMandateEnabled": "",
                "mandateDescription": "Fields are mandatory"
            },
            "calendarPriceDetails": {
                "currency": "INR",
                "roundTripDuration": "4",
                "monthLowestPriceRange": [
                    {
                        "monthName": "Sep",
                        "monthNumber": "09",
                        "dateYear": "2024",
                        "price": "INR 17,144",
                        "date": "2024-09-19"
                    },
                    {
                        "monthName": "Oct",
                        "monthNumber": "10",
                        "dateYear": "2024",
                        "price": "INR 15,391",
                        "date": "2024-10-08"
                    },
                    {
                        "monthName": "Nov",
                        "monthNumber": "11",
                        "dateYear": "2024",
                        "price": "INR 15,391",
                        "date": "2024-11-02"
                    },
                    {
                        "monthName": "Dec",
                        "monthNumber": "12",
                        "dateYear": "2024",
                        "price": "INR 17,140",
                        "date": "2024-12-19"
                    },
                    {
                        "monthName": "Jan",
                        "monthNumber": "01",
                        "dateYear": "2025",
                        "price": "INR 17,254",
                        "date": "2025-01-23"
                    },
                    {
                        "monthName": "Feb",
                        "monthNumber": "02",
                        "dateYear": "2025",
                        "price": "INR 17,254",
                        "date": "2025-02-01"
                    },
                    {
                        "monthName": "Mar",
                        "monthNumber": "03",
                        "dateYear": "2025",
                        "price": "INR 17,259",
                        "date": "2025-03-06"
                    }
                ],
                "monthWisePriceArr": [
                    {
                        "day": "19",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "17,144",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "20",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "17,144",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "24",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "17,144",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "26",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "17,144",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "27",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "17,144",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "23",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "17,585",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "25",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "17,585",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "30",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "17,585",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "21",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "18,667",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "22",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "20,630",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "29",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "22,210",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "28",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "22,499",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "17",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "34,742",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "18",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "35,183",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "12",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "40,097",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "13",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "46,607",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "16",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "52,041",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "14",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "52,067",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "11",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "56,619",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "15",
                        "monthName": "Sep",
                        "year": "2024",
                        "price": "64,032",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": true
                    },
                    {
                        "day": "08",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "15,391",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "10",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "15,391",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "11",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "15,391",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "15",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "15,391",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "17",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "15,391",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "18",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "15,391",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "22",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "15,391",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "24",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "15,391",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "19",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "16,267",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "09",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "16,708",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "16",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "16,708",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "29",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "16,708",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "21",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "17,585",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "23",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "17,585",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "01",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "17,790",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "14",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "19,108",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "20",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "19,108",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "03",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "19,963",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "12",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "22,961",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "13",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "24,463",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "02",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "25,654",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "04",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "26,794",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "06",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "28,295",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "31",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "32,243",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "27",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "32,684",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "30",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "32,684",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "26",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "33,120",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "07",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "33,561",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "25",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "33,561",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "28",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "33,561",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "05",
                        "monthName": "Oct",
                        "year": "2024",
                        "price": "50,776",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": true
                    },
                    {
                        "day": "02",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "15,391",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "26",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "15,391",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "28",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "19,370",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "30",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "20,247",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "15",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "22,063",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "17",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "22,063",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "27",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "22,063",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "24",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "27,791",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "12",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "32,243",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "14",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "32,243",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "16",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "32,243",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "19",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "32,243",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "21",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "32,243",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "23",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "32,243",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "01",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "32,684",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "11",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "32,684",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "13",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "32,684",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "18",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "32,684",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "20",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "32,684",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "22",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "32,684",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "25",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "32,684",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "29",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "32,684",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "05",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "33,120",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "07",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "33,120",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "09",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "33,120",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "03",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "33,561",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": true
                    },
                    {
                        "day": "04",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "33,561",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": true
                    },
                    {
                        "day": "06",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "33,561",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": true
                    },
                    {
                        "day": "08",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "33,561",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": true
                    },
                    {
                        "day": "10",
                        "monthName": "Nov",
                        "year": "2024",
                        "price": "33,561",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": true
                    },
                    {
                        "day": "19",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "17,140",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "18",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "19,104",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "03",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "20,243",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "05",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "22,495",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "07",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "22,495",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "10",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "22,495",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "12",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "22,495",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "14",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "22,495",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "17",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "22,495",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "24",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "22,716",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "13",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "22,936",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "16",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "22,936",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "20",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "24,679",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "26",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "25,087",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "28",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "25,087",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "23",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "26,937",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "27",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "27,051",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "29",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "27,051",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "22",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "30,764",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "01",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "33,557",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "02",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "33,557",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "04",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "33,557",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "09",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "33,557",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "11",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "33,557",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "06",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "35,079",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "08",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "35,079",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "15",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "35,079",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "25",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "36,606",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "21",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "36,938",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "31",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "37,052",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "30",
                        "monthName": "Dec",
                        "year": "2024",
                        "price": "37,493",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": true
                    },
                    {
                        "day": "23",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "17,254",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "25",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "17,254",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "28",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "17,254",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "30",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "17,254",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "27",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "17,695",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "29",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "17,695",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "24",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "19,218",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "14",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "20,357",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "16",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "20,357",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "18",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "20,357",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "21",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "20,357",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "31",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "20,798",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "15",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "20,798",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "20",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "20,798",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "22",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "20,798",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "26",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "22,320",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "13",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "23,050",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "07",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "23,806",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "09",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "23,806",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "11",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "23,806",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "17",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "23,895",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "08",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "24,247",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "19",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "24,573",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "12",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "25,764",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "10",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "27,345",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "06",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "35,109",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "02",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "37,052",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "04",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "37,052",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "01",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "37,493",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "03",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "39,015",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": true
                    },
                    {
                        "day": "05",
                        "monthName": "Jan",
                        "year": "2025",
                        "price": "39,015",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": true
                    },
                    {
                        "day": "01",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,254",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "04",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,254",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "06",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,254",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "08",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,254",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "11",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,254",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "13",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,254",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "15",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,254",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "18",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,259",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "20",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,259",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "03",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,695",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "05",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,695",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "10",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,695",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "12",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,695",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "17",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,695",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "19",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,700",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "24",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,700",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "26",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "17,700",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "22",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "18,782",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "25",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "18,782",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "27",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "18,782",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "09",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "19,218",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "07",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "20,798",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "16",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "20,798",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "23",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "20,803",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "02",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "22,320",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "14",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "23,050",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "21",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "23,055",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": true
                    },
                    {
                        "day": "28",
                        "monthName": "Feb",
                        "year": "2025",
                        "price": "23,055",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": true
                    },
                    {
                        "day": "06",
                        "monthName": "Mar",
                        "year": "2025",
                        "price": "17,259",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "08",
                        "monthName": "Mar",
                        "year": "2025",
                        "price": "17,259",
                        "lowestPriceFlag": true,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "03",
                        "monthName": "Mar",
                        "year": "2025",
                        "price": "17,700",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "05",
                        "monthName": "Mar",
                        "year": "2025",
                        "price": "17,700",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "01",
                        "monthName": "Mar",
                        "year": "2025",
                        "price": "18,782",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "04",
                        "monthName": "Mar",
                        "year": "2025",
                        "price": "18,782",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "09",
                        "monthName": "Mar",
                        "year": "2025",
                        "price": "20,803",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "07",
                        "monthName": "Mar",
                        "year": "2025",
                        "price": "23,055",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": false
                    },
                    {
                        "day": "02",
                        "monthName": "Mar",
                        "year": "2025",
                        "price": "26,158",
                        "lowestPriceFlag": false,
                        "highestPriceFlag": true
                    }
                ],
                "tripType": "round-trip"
            },
            "enableCalendarPricing": true,
            "roundTripDuration": null,
            "startCalendarMonthYear": {
                "month": 8,
                "year": 2024
            },
            "isV2Component": true,
            "weekTexts": [
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            "isMobile": false,
            "isOneWayChecked": false,
            "instanceSearchErrorData": {},
            "tripTypes": {
                "oneWay": false,
                "roundTrip": true,
                "multiWay": false
            },
            isMultiCity: true,
            "redemptionSearchSlider": false,
            "minDate": null,
            "maxDate": null,
            "isEligibleForStopOver": false,
            "hideKeyboardShortcutsPanel": true
        }
    }

    onDatesChange = (dates, event = null) => {
        const { startDate, endDate } = dates;
        this.setState({ startDate, endDate, date: startDate });
    }

    handleCalendarReset = () => {
        this.setState({ startDate: null, endDate: null, date: null });
    }


    render() {
        const { showCalendar, startDate, endDate, date } = this.state;
        const calendarProps = {
            ...this.staticProps,
            isOpen: showCalendar,
            startDate,
            endDate,
            date,
            showCalendar: (show) => this.setState({showCalendar: show}),
        }
        return (
            <Fragment>
                <button onClick={() => this.setState({showCalendar: true})}>Select Dates</button>
                { showCalendar && 
                    <MobiscrollWrapper 
                        {...calendarProps} 
                        onDatesChange={this.onDatesChange}
                        handleCalendarReset={this.handleCalendarReset}
                        /> }
            </Fragment>
        
        )
    }
}

export default CalendarContainer;
import React, { Fragment, Component } from 'react';
// import { isArabicSiteEdition } from "shared/utils/Utility/Utility";
import { Datepicker, Popup } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.react.min.css';
// import { getAEMBooleanValue } from 'shared/utils/Utility/AemPropUtils';
import moment from 'moment'

class MobiscrollWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectType: 'range',
            start: null,
            end: null,
            labels: [],
            startDate: null,
            selectedDate: [null, null],
            onewayDate: null,
            startDateFocused: false,
            endDateFocused: false,
            isOpen: false,
            rangeCalendar: null,
            activeDateInput: props.inlineMode ? 'start' : 'start',
            rtDepartureDate: props.startDate ? moment(props.startDate).toString() : null,
            rtReturnDate: null,
            ondTripDuration: props.roundTripDuration || 0,
            roundTripDuration: null,
            totalRoundTripPrice: null,
            blockedDateArr : [],
            highlightedInput: '',
            lastPricingDate: null,
            firstPricingDate: null,
            tripDurationForNavigation: null
        };
        this.dateFormat = 'MM-DD-YYYY';
        this.defaultLocale = 'en';
        this.isRTL = false;
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { enableCalendarPricing, calendarPriceDetails, endDate, startDate } = this.props;
        const { monthWisePriceArr = [] } = calendarPriceDetails || {};
        const propsRoudTripDuration = calendarPriceDetails ? calendarPriceDetails.roundTripDuration : null;
        let monthWisePriceArrPrev = [];
        if (prevProps.calendarPriceDetails) {
            monthWisePriceArrPrev = prevProps.calendarPriceDetails.monthWisePriceArr;
        }
        if (calendarPriceDetails && calendarPriceDetails.monthWisePriceArr && (prevProps.calendarPriceDetails !== calendarPriceDetails || prevProps.endDate != endDate)) {
            this.setState({
                roundTripDuration: propsRoudTripDuration
            });
            this.updateLabels();
        }
        if(endDate && startDate && (prevProps.endDate != endDate || prevProps.startDate != startDate)) {
            this.setState({ tripDurationForNavigation: moment(endDate, this.dateFormat).diff(startDate.format(this.dateFormat), 'days')});
        } 
    }


    startRef = (event) => {
        this.setState({ start: event });
    }
    endRef = (event) => {
        this.setState({ end: event });
    }
    rangeCalendarRef = (event) => {
        if (event)
            this.setState({ rangeCalendar: event });
    }
    
    getLocalisedContent = () => {
        const { aemdata } = this.props;
        const content = {
            dayNamesMin: this.props.weekTexts,
            monthNames: aemdata.monthsLabel.map(x => x.value),
            monthNamesShort: aemdata.monthsLabel.map(x => x.value),
            firstDay: aemdata.startDayOfWeek ? parseInt(aemdata.startDayOfWeek) : 1,
            rtl: this.isRTL,
            rangeStartLabel: aemdata.departureLabel,
            rangeStartHelp: aemdata.pleaseSelectPlaceholder,
            rangeEndLabel: aemdata.returnLabel,
            rangeEndHelp: aemdata.pleaseSelectPlaceholder
        };
        return content;
    }

    getAEMBooleanValue = (aemValue) => {
        if(aemValue && typeof aemValue === 'boolean'){
            return aemValue;
        }
        const aemValueUpdated = (aemValue && typeof aemValue === 'string' && aemValue.toLowerCase()) || "";
        if(!aemValueUpdated){
            return false;
        }
        switch(aemValueUpdated){
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default: 
                return false;
        }
    }
    customDayContent = (day, labels) => {
        const { calendarPriceDetails, enableCalendarPricing, redemptionSearchSlider = false, aemdata = {}, endDate, startDate, tripTypes } = this.props;
        const { calendarPricingEligibleFlows = '', blackOut  } = aemdata;
        const isFlowEligibleForCalendarPricing = calendarPricingEligibleFlows === 'both' ? true : (calendarPricingEligibleFlows === 'revenue' && !redemptionSearchSlider) ? true : (calendarPricingEligibleFlows === 'redemption' && redemptionSearchSlider) ? true : false;
        const date = day.date;
        let isBlockedRange = false;
        let dayData = labels.find(x => moment(x.date).format(this.dateFormat) == moment(date).format(this.dateFormat));
        const dateStyle = {
            color: ''
        };
        const priceStyle = {
            fontSize: "9px",
            color: dayData ? dayData.textColor : ''
        };

        // this logic is set for black out dates
        if(blackOut && this.getAEMBooleanValue(blackOut.roundTrip.isBlackOutEnabled) && this.state.blockedDateArr.length > 0 && this.state.rtDepartureDate && !this.state.rtReturnDate) {
            const obBlocked = this.getBlackoutDates('start', false)[0];
            const blockDate = this.state.blockedDateArr[0];
            isBlockedRange = (moment(this.state.rtDepartureDate).isAfter(obBlocked.end) && moment(date).isBetween(obBlocked.start, obBlocked.end, undefined, '[]') || (moment(date).isBetween(blockDate.start, blockDate.end, undefined, '[]'))) && tripTypes.roundTrip;
        } else if(blackOut && this.getAEMBooleanValue(blackOut.roundTrip.isBlackOutEnabled) && this.state.blockedDateArr.length >0){
            const blockDate = this.state.blockedDateArr[0];
            isBlockedRange =  moment(date).isBetween(blockDate.start, blockDate.end, undefined, '[]') && tripTypes.roundTrip;
        }
console.log('enableCalendarPricing',enableCalendarPricing,isFlowEligibleForCalendarPricing);

        if (enableCalendarPricing && isFlowEligibleForCalendarPricing) {
            if (calendarPriceDetails && Object.keys(calendarPriceDetails).length !== 0) {
                if(isBlockedRange) {
                    return <Fragment>
                        <div className="blocked">{this.formatDate('D', date)}</div>
                    </Fragment>
                }
                else if(!isBlockedRange && moment(date).isBetween(this.state.firstPricingDate, this.state.lastPricingDate, undefined, '[]') ){
                    return <Fragment>
                    <div style={dateStyle}>{this.formatDate('D', date)}</div>
                    {
                        dayData ? <p style={priceStyle}>{dayData.text}</p> : (((endDate && startDate) || moment(date).isSame(this.state.firstPricingDate)) ? <p style={priceStyle}></p> : <span className="prices">{aemdata.pricingUnavailableLabel}</span>)
                    }
                </Fragment>
                } else {
                    return <Fragment>
                    <div style={dateStyle}>{this.formatDate('D', date)}</div>
                    <p style={priceStyle}>&nbsp;</p>
                </Fragment>
                }
               
            } else {
                if(isBlockedRange) {
                    return <Fragment>
                        <div className="blocked">{this.formatDate('D', date)}</div>
                    </Fragment>
                }
                else if (moment(date).isSameOrAfter(moment()) && (!isBlockedRange)) {
                    const str = `${this.formatDate('D', date)}` + '<br />' + `<span className="prices ghost"><span className="shadow-loader">000</span></span>`;
                    return (
                        <Fragment>
                            <div style={dateStyle}>{this.formatDate('D', date)}</div>
                            <div className='blur-text '>--</div>
                        </Fragment>

                    )
                } else {
                    return <Fragment>
                        <div style={dateStyle}>{this.formatDate('D', date)}</div>
                    </Fragment>
                }
            }
        } else {
            if(isBlockedRange) {
                return <div className="blocked">{this.formatDate('D', date)}</div>
        } else {
            return <div style={dateStyle}>{this.formatDate('D', date)}</div>
        }
    }
    }

    formatDate = (format, date) => {
        return moment(date).format(format);
    }

    onFocusDate = (data) => {
        this.setState({ [data]: true, isOpen: true, activeDateInput: 'start', highlightedInput: 'start' });
    }

    onFocusDateEnd = (data) => {
        setTimeout(() => {
            if(this.state.rangeCalendar)
                this.state.rangeCalendar.navigate(this.props.endDate);
        }, 100);
        
        this.setState({ [data]: true, isOpen: true, activeDateInput: (this.state.rtDepartureDate || this.props.startDate) ? 'end' : 'start', highlightedInput: (this.state.rtDepartureDate || this.props.startDate) ? 'end' : 'start' });
    }

    onBlurDate = (data) => {
        this.setState({ [data]: false });
    }

    dateChangeOneway = (event) => {
        if (moment(event.value).format(this.dateFormat) != moment(this.props.startDate).format(this.dateFormat)) {
            this.props.onDateChange(moment(event.value), event.inst);
            this.setState({ isOpen: false });
            this.setPrice(event.value);
        }
    }
    dateChangeOnewayCellClick = (event) => {
        if (moment(event.date).format(this.dateFormat) != moment(this.props.startDate).format(this.dateFormat)) {
            this.props.onDatesChange({startDate: moment(event.date), endDate: null}, event.inst);
            this.setState({ isOpen: this.props.enableCalendarPricing ? true : false, highlightedInput: this.props.enableCalendarPricing ? 'start' : '' }); // if pricing is enabled, pop closed is disabled post date selection
            this.setPrice(event.date);
        }
    }
    dataChangeMulticity = (event) => {
        if (!this.props.date) {
            this.props.onDateChange(moment(event.value), event.inst);
            this.setState({ isOpen: false });
        } else if (this.props.date && moment(this.props.date).format(this.dateFormat) != moment(event.value).format(this.dateFormat)) {
            this.props.onDateChange(moment(event.value), event.inst);
            this.setState({ isOpen: false });
        }
    }
    dataChangeMulticityCellClick = (event) => {
        if (!this.props.date) {
            this.props.onDatesChange({startDate: moment(event.date)}, event.inst);
            this.setState({ isOpen: false, highlightedInput: '' });
        } else if (this.props.date && moment(this.props.date).format(this.dateFormat) != moment(event.date).format(this.dateFormat)) {
            this.props.onDatesChange({startDate: moment(event.date)}, event.inst);
            this.setState({ isOpen: false, highlightedInput: '' });
        }
    }

    dateChangeReturnMobileBlackout = (event) => {
        const { startDate, endDate, enableCalendarPricing } = this.props;
        if (event.value && event.value.filter(x => x).length == 2 && (moment(event.value[0]).format(this.dateFormat) != moment(startDate).format(this.dateFormat) || moment(event.value[1]).format(this.dateFormat) != moment(endDate).format(this.dateFormat))) {
            const { rtDepartureDate, rtReturnDate } = this.state;
            const blockedDates = this.getBlackoutDates('end', false);            
            if(this.isBlockedDates(blockedDates, event.value[1])) {
                let startDay = moment(event.value[0]).locale(this.defaultLocale).format(this.dateFormat);
                this.state.rangeCalendar.setVal([startDay]);                
            } else {
                if (rtDepartureDate && rtReturnDate && (moment(event.value[0]).format(this.dateFormat) != moment(rtDepartureDate).format(this.dateFormat))) {
                    this.props.onDatesChange({ startDate: moment(event.value[0]), endDate: null });
                    this.setState({ isOpen: enableCalendarPricing ? true : false, rtDepartureDate: event.value[0], rtReturnDate: null, highlightedInput: enableCalendarPricing ? 'end' : '' }); // if pricing is enabled, pop closed is disabled post date selection
                    this.getBlackoutDates('end')
                    this.state.rangeCalendar.setActiveDate('end')
                } else if(rtDepartureDate && rtReturnDate && (moment(event.value[1]).format(this.dateFormat) != moment(rtReturnDate).format(this.dateFormat))) {
                    this.props.onDatesChange({ startDate: moment(event.value[1]), endDate: null });
                    this.setState({ isOpen: enableCalendarPricing ? true : false, rtDepartureDate: event.value[1], rtReturnDate: null, highlightedInput: enableCalendarPricing ? 'end' : '' }); // if pricing is enabled, pop closed is disabled post date selection
                    this.getBlackoutDates('end')
                    this.state.rangeCalendar.setActiveDate('end')
                } else {
                    this.props.onDatesChange({ startDate: moment(event.value[0]), endDate: moment(event.value[1]) });
                    this.setState({ isOpen: enableCalendarPricing ? true : false, rtDepartureDate: event.value[0], rtReturnDate: event.value[1], highlightedInput: enableCalendarPricing ? this.state.highlightedInput : '' }); // if pricing is enabled, pop closed is disabled post date selection
                    this.setPrice(event.value[1]);
                    this.getBlackoutDates('start')
                }
            }            
        }
        else if (event.value && event.value.filter(x => x).length == 1) {
            if (this.state.activeDateInput == 'start') {
                if (!this.state.rtDepartureDate || (this.state.rtDepartureDate && moment(this.state.rtDepartureDate).format(this.dateFormat) != moment(event.value[0] || event.value[1]).format(this.dateFormat))) {
                    const blockedDates = this.getBlackoutDates('start', false);
                    if(this.isBlockedDates(blockedDates, event.value[0])) {
                        this.state.rangeCalendar.setVal('');
                        this.state.rangeCalendar.setActiveDate('start');
                    } else {
                        this.setState({ rtDepartureDate: event.value[0] || event.value[1], totalRoundTripPrice: '', highlightedInput: 'end', rtReturnDate: null });
                        this.props.onDatesChange({ startDate: moment(event.value[0] || event.value[1]), endDate: null });
                        this.state.rangeCalendar.setActiveDate('end')
                        this.getBlackoutDates('end')
                    }                    
                }
            } else {
                let selectedDate = moment(event.value.filter(x => x)[0], this.dateFormat);
                if (selectedDate.isBefore(this.state.rtDepartureDate, this.dateFormat)) {
                    const blockedDates = this.getBlackoutDates('start', false);
                    if(this.isBlockedDates(blockedDates, event.value[0])) {
                        this.state.rangeCalendar.setVal('');
                        this.state.rangeCalendar.setActiveDate('start');
                    } else {
                        this.props.onDatesChange({ startDate: moment(event.value[0]), endDate: null });
                        this.setState({ rtDepartureDate: event.value[0], totalRoundTripPrice: '', highlightedInput: 'end', rtReturnDate: null });
                        this.state.rangeCalendar.setActiveDate('end')
                        this.getBlackoutDates('end')
                    }                    
                } else {
                    const blockedDates = this.getBlackoutDates('end', false);
                    if(this.isBlockedDates(blockedDates, event.value[0])) {
                        this.state.rangeCalendar.setVal('');
                        this.state.rangeCalendar.setActiveDate('end')
                    } else {
                        this.props.onDatesChange({ startDate: moment(this.state.rtDepartureDate), endDate: moment(event.value[0]) });
                        this.setState({ isOpen: enableCalendarPricing ? true : false, highlightedInput: enableCalendarPricing ? 'start' : '' });
                        this.setPrice(event.value[0]);
                        this.getBlackoutDates('start')
                    }                    
                }
            }
        }
    }

    dateChangeReturnBlackout = (event) => {
        const { startDate, endDate, enableCalendarPricing } = this.props;
        //Both dates selected
        if (event.value && event.value.filter(x => x).length == 2 && (moment(event.value[0]).format(this.dateFormat) != moment(startDate).format(this.dateFormat) || moment(event.value[1]).format(this.dateFormat) != moment(endDate).format(this.dateFormat))) {
            const blockedDates = this.getBlackoutDates('end', false);            
            if(this.isBlockedDates(blockedDates, event.value[1])) {
                let startDay = moment(event.value[0]).locale(this.defaultLocale).format(this.dateFormat);
                this.state.rangeCalendar.setVal([startDay]);                
            } else {
                this.props.onDatesChange({ startDate: moment(event.value[0]), endDate: moment(event.value[1]) });
                this.setState({ isOpen: enableCalendarPricing ? true : false, rtDepartureDate: event.value[0], highlightedInput: enableCalendarPricing ? this.state.highlightedInput : '' }); // if pricing is enabled, pop closed is disabled post date selection
                this.setPrice(event.value[1]);
                this.getBlackoutDates('start');
            }                     
        }
        //Single date selected
        else if (event.value && event.value.filter(x => x).length == 1) {
            //Start date in focus
            if (this.state.activeDateInput == 'start') {
                if (!this.state.rtDepartureDate || (this.state.rtDepartureDate && moment(this.state.rtDepartureDate).format(this.dateFormat) != moment(event.value[0] || event.value[1]).format(this.dateFormat))) {
                    const blockedDates = this.getBlackoutDates('start', false);
                    if(this.isBlockedDates(blockedDates, event.value[0])) {
                        this.state.rangeCalendar.setVal('');
                    } else {
                    this.setState({ rtDepartureDate: event.value[0] || event.value[1], totalRoundTripPrice: '', highlightedInput: 'end' });
                    this.props.onDatesChange({ startDate: moment(event.value[0] || event.value[1]), endDate: null });
                        this.state.rangeCalendar.setActiveDate('end');
                        this.getBlackoutDates('end');                       
                    }
                }
            } else {//End date in focus                
                let selectedDate = moment(event.value.filter(x => x)[0], this.dateFormat);
                if(selectedDate.isBefore(this.state.rtDepartureDate, this.dateFormat)) {
                    const blockedDates = this.getBlackoutDates('end', false);
                    if(this.isBlockedDates(blockedDates, event.value[0])) {
                        this.state.rangeCalendar.setVal('');
                    } else {
                    this.props.onDatesChange({ startDate: moment(event.value[0]), endDate: null });
                    this.setState({ rtDepartureDate: event.value[0], totalRoundTripPrice: '', highlightedInput: 'end' });
                        this.state.rangeCalendar.setActiveDate('end');
                        this.getBlackoutDates('end');                      
                    }
                } else {
                    const blockedDates = this.getBlackoutDates('end', false);
                    if(this.isBlockedDates(blockedDates, event.value[0])) {
                        this.state.rangeCalendar.setVal('');
                    } else {
                        this.props.onDatesChange({ startDate: moment(this.state.rtDepartureDate), endDate: moment(event.value[0]) });
                        this.setState({ isOpen: enableCalendarPricing ? true : false, highlightedInput: enableCalendarPricing ? 'start' : '' });
                        this.setPrice(event.value[0]);
                        this.getBlackoutDates('start');
                        this.state.rangeCalendar.setActiveDate('start');
                    }
                }                
            }
        }
    }

    isBlockedDates = (blockedDateArr, date) => {
        const { blackOut } = this.props.aemdata;
        let isBlockedRange = false;
        if(blackOut && this.getAEMBooleanValue(blackOut.roundTrip.isBlackOutEnabled) && blockedDateArr.length >0){
            const blockDate = blockedDateArr[0];
            isBlockedRange =  moment(date).isBetween(blockDate.start, blockDate.end, undefined, '[]');
        }        
        return isBlockedRange;
    }
        
    dateChangeReturnMobile = (event) => {
        const { startDate, endDate, enableCalendarPricing, isMobile } = this.props;
        if (event.value && event.value.filter(x => x).length == 2 && (moment(event.value[0]).format(this.dateFormat) != moment(startDate).format(this.dateFormat) || moment(event.value[1]).format(this.dateFormat) != moment(endDate).format(this.dateFormat))) {
            const { rtDepartureDate, rtReturnDate } = this.state;
            if (rtDepartureDate && rtReturnDate && (moment(event.value[0]).format(this.dateFormat) != moment(rtDepartureDate).format(this.dateFormat))) {
                this.props.onDatesChange({ startDate: moment(event.value[0]), endDate: null });
                this.setState({ isOpen: enableCalendarPricing ? true : false, rtDepartureDate: event.value[0], rtReturnDate: null, highlightedInput: enableCalendarPricing ? 'end' : '' }); // if pricing is enabled, pop closed is disabled post date selection
                this.getBlackoutDates('end')
                this.state.rangeCalendar.setActiveDate('end')
            } else if(rtDepartureDate && rtReturnDate && (moment(event.value[1]).format(this.dateFormat) != moment(rtReturnDate).format(this.dateFormat))) {
                this.props.onDatesChange({ startDate: moment(event.value[1]), endDate: null });
                this.setState({ isOpen: enableCalendarPricing ? true : false, rtDepartureDate: event.value[1], rtReturnDate: null, highlightedInput: enableCalendarPricing ? 'end' : '' }); // if pricing is enabled, pop closed is disabled post date selection
                this.getBlackoutDates('end')
                this.state.rangeCalendar.setActiveDate('end')
            }
            else {
                this.props.onDatesChange({ startDate: moment(event.value[0]), endDate: moment(event.value[1]) });
                this.setState({ isOpen: enableCalendarPricing ? true : false, rtDepartureDate: event.value[0], rtReturnDate: event.value[1], highlightedInput: enableCalendarPricing ? this.state.highlightedInput : '' }); // if pricing is enabled, pop closed is disabled post date selection
                this.setPrice(event.value[1]);
                this.getBlackoutDates('start')
            }

        }
        else if (event.value && event.value.filter(x => x).length == 1) {
            if (this.state.activeDateInput == 'start') {
                if (!this.state.rtDepartureDate || (this.state.rtDepartureDate && moment(this.state.rtDepartureDate).format(this.dateFormat) != moment(event.value[0] || event.value[1]).format(this.dateFormat))) {
                    this.setState({ rtDepartureDate: event.value[0] || event.value[1], totalRoundTripPrice: '', highlightedInput: 'end', rtReturnDate: null });
                    this.props.onDatesChange({ startDate: moment(event.value[0] || event.value[1]), endDate: null });
                    this.state.rangeCalendar.setActiveDate('end')
                    this.getBlackoutDates('end')
                }

            } else {
                let selectedDate = moment(event.value.filter(x => x)[0], this.dateFormat);
                if (selectedDate.isBefore(this.state.rtDepartureDate, this.dateFormat)) {
                    this.props.onDatesChange({ startDate: moment(event.value[0]), endDate: null });
                    this.setState({ rtDepartureDate: event.value[0], totalRoundTripPrice: '', highlightedInput: 'end', rtReturnDate: null });
                    this.state.rangeCalendar.setActiveDate('end')
                    this.getBlackoutDates('end')
                } else {
                    this.props.onDatesChange({ startDate: moment(this.state.rtDepartureDate), endDate: moment(event.value[0]) });
                    this.setState({ isOpen: enableCalendarPricing ? true : false, highlightedInput: enableCalendarPricing ? 'start' : '' });
                    this.setPrice(event.value[0]);
                    this.getBlackoutDates('start')
                }
            }
        }
    }

    dateChangeReturn = (event) => {
        debugger;
        const { startDate, endDate, enableCalendarPricing } = this.props;
        if (event.value && event.value.filter(x => x).length == 2 && (moment(event.value[0]).format(this.dateFormat) != moment(startDate).format(this.dateFormat) || moment(event.value[1]).format(this.dateFormat) != moment(endDate).format(this.dateFormat))) {
            this.props.onDatesChange({ startDate: moment(event.value[0]), endDate: moment(event.value[1]) });
            this.setState({ isOpen: enableCalendarPricing ? true : false, rtDepartureDate: event.value[0], highlightedInput: enableCalendarPricing ? this.state.highlightedInput : '' }); // if pricing is enabled, pop closed is disabled post date selection
            this.setPrice(event.value[1]);
            this.getBlackoutDates('start')
        }
        else if (event.value && event.value.filter(x => x).length == 1) {
            if (this.state.activeDateInput == 'start') {
                if (!this.state.rtDepartureDate || (this.state.rtDepartureDate && moment(this.state.rtDepartureDate).format(this.dateFormat) != moment(event.value[0] || event.value[1]).format(this.dateFormat))) {
                    this.setState({ rtDepartureDate: event.value[0] || event.value[1], totalRoundTripPrice: '', highlightedInput: 'end' });
                    this.props.onDatesChange({ startDate: moment(event.value[0] || event.value[1]), endDate: null });
                    this.state.rangeCalendar.setActiveDate('end')
                    this.getBlackoutDates('end')
                }

            } else {
                let selectedDate = moment(event.value.filter(x => x)[0], this.dateFormat);
                if(selectedDate.isBefore(this.state.rtDepartureDate, this.dateFormat)) {
                    this.props.onDatesChange({ startDate: moment(event.value[0]), endDate: null });
                    this.setState({ rtDepartureDate: event.value[0], totalRoundTripPrice: '', highlightedInput: 'end' });
                    this.state.rangeCalendar.setActiveDate('end')
                    this.getBlackoutDates('end')
                } else {
                    this.props.onDatesChange({ startDate: moment(this.state.rtDepartureDate), endDate: moment(event.value[0]) });
                    this.setState({ isOpen: enableCalendarPricing ? true : false, highlightedInput: enableCalendarPricing ? 'start' : '' });
                    this.setPrice(event.value[0]);
                    this.getBlackoutDates('start')
                }                
            }
        }
    }

    setPrice = (day) => {
        const { calendarPriceDetails } = this.props;
        if (calendarPriceDetails) {
            const priceObj = calendarPriceDetails.monthWisePriceArr.filter(x => x.monthName === moment(day).format('MMM'));
            const filterCurDatePrice = priceObj.filter(x => (x.day === moment(day).format('DD')) && (x.year === moment(day).format('YYYY')));
            if (filterCurDatePrice && filterCurDatePrice.length == 1) {
                this.setState({ totalRoundTripPrice: filterCurDatePrice[0].price });
                return filterCurDatePrice[0].price;
            } else {
                this.setState({ totalRoundTripPrice: '' });
            }
        }
    }
    
    onPopupClose = () => {
        this.props.showCalendar(false);
    }

    getCommonCalendarProps = () => {
        const { aemdata } = this.props;
        return {
            theme: 'material',
            themeVariant: 'light',
            focusOnClose: false,
            buttons: [],
            locale: this.getLocalisedContent(),
            // labels:this.state.labels,
            controls: ['calendar'],
            touchUi: true,
            display: 'inline',
            pages: (this.props.isMobile) ? parseInt(aemdata.monthsCountMobile) : parseInt(aemdata.monthsCountDesktop),
            calendarScroll: this.props.isMobile ? 'vertical' : 'horizontal',
            rangeHighlight: true,
            showRangeLabels: false,//this.props.isMobile ? true : false,
            dateFormat: this.dateFormat,
            showOnFocus: false,
            showOnClick: false,
            calendarType: "month",
            defaultSelection: this.props.isMobile ? null : moment().format(this.dateFormat),
            rtl: false,//this.isRTL,
            showOuterDays : false
        }
    }

    getBlackoutDates = (focusedInput, setState = true) => {
        const blackOut = this.props.aemdata.blackOut;
       let blockedDates = [];
       let rangedatearray = [];
        if (blackOut && this.getAEMBooleanValue(blackOut.roundTrip.isBlackOutEnabled)) {
                rangedatearray = focusedInput === "start" ?  blackOut.roundTrip.outboundDateRange 
                : blackOut.roundTrip.inboundDateRange;

                rangedatearray.forEach(
                    (item) => {
                        const dateObj = {}
                        dateObj.start = moment(item.startDate, 'DD-MM-YYYY').locale(this.defaultLocale).format('YYYY-MM-DD');
                        dateObj.end = moment(item.endDate, 'DD-MM-YYYY').locale(this.defaultLocale).format('YYYY-MM-DD');
                        blockedDates.push(dateObj);
                    });
        }
        if(setState) this.setState({ blockedDateArr:  blockedDates });
        return blockedDates;
    }

    onPopupOpen = () => {
        const { activeDateInput, rangeCalendar } = this.state;
        const { startDate, endDate } = this.props;
        if (activeDateInput && rangeCalendar) {
            rangeCalendar.setActiveDate(activeDateInput);
        }
        if(endDate && startDate) {
            this.setState({ tripDurationForNavigation: moment(endDate, this.dateFormat).diff(startDate.format(this.dateFormat), 'days')});
        } 
        // this.props.onOpenEvent();
        this.updateLabels();
        this.getBlackoutDates(activeDateInput);
    }

    getCommonPopupProps = (inputId) => {
        return {
            isOpen: this.props.isOpen,
            onClose: this.onPopupClose,
            focusOnClose: false,
            // cssClass="demo-date-filtering-popup"
            responsive: this.getResponsivePopup(inputId),
            // fullScreen: this.props.isMobile ? true : false
        }
    }

    getResponsivePopup = (id) => {
        return {
            custom: {
                breakpoint: 559,
                buttons: [],
                touchUi: true,
                scrollLock: false,
                showArrow: false,
                maxWidth: 1000,
                width: 1000
            }
        };
    }

    updateLabels = () => {
        const { enableCalendarPricing, calendarPriceDetails, startDate, endDate, tripTypes, aemdata } = this.props;
        const labels = [];
        const months = {
            'Jan': 0,
            'Feb': 1,
            'Mar': 2,
            'Apr': 3,
            'May': 4,
            'Jun': 5,
            'Jul': 6,
            'Aug': 7,
            'Sep': 8,
            'Oct': 9,
            'Nov': 10,
            'Dec': 11,
        }

        if (enableCalendarPricing && calendarPriceDetails && calendarPriceDetails.monthWisePriceArr) {
            const monthWisePriceArr = calendarPriceDetails.monthWisePriceArr;
            const maxYear = Math.max(...monthWisePriceArr.map(x=> parseInt(x.year)));
            const maxMonth = Math.max(...monthWisePriceArr.filter(x=> parseInt(x.year) == maxYear).map(x=> months[x.monthName]))
            const maxDay = Math.max(...monthWisePriceArr.filter(x=> parseInt(x.year) == maxYear && maxMonth == months[x.monthName]).map(x=> parseInt(x.day)))
            this.setState({lastPricingDate: moment([maxYear,maxMonth,maxDay]).format(this.dateFormat), firstPricingDate : (startDate && tripTypes.roundTrip) ? moment(startDate).format(this.dateFormat) : moment().format(this.dateFormat) });
            const dateAfterDaysLimit = aemdata.displayMaxDaysOfFlightPricing ? moment().add(parseInt(aemdata.displayMaxDaysOfFlightPricing) - 1, 'days') : moment().add(179, 'days');
            if (startDate && endDate && tripTypes.roundTrip) {
                labels.push({
                    date: endDate,
                    textColor: '',
                    text: startDate.isBefore(dateAfterDaysLimit) ? this.setPrice(endDate) : ''
                });
            } else {
                for (let mprice in monthWisePriceArr) {
                    const { day, highestPriceFlag, lowestPriceFlag, monthName, price, year } = monthWisePriceArr[mprice];
                    labels.push({
                        date: new Date(year, months[monthName], day),
                        textColor: (lowestPriceFlag) ? 'green' : '',
                        text: (startDate == null || startDate.isBefore(dateAfterDaysLimit)) ? price : ''
                    })
                }
            }
            if (tripTypes.oneWay && startDate) {
                this.setPrice(startDate);
            }
            if (JSON.stringify(labels) !== JSON.stringify(this.state.labels)) {
                this.setState({
                    labels: labels
                });
            }

        } else {
            this.setState({
                labels: []
            });
        }
    }

    //  Function to handle reset calendar selected data
    handleCalendarReset = () => {
        const { tripTypes = {} } = this.props;
        this.props.handleCalendarReset();
        if (tripTypes.roundTrip) {
            this.setState({rtDepartureDate: null, activeDateInput: 'start', highlightedInput: 'start', rtReturnDate: null});
            this.state.rangeCalendar.setVal('');
            this.state.rangeCalendar.navigate(new Date());
            this.state.rangeCalendar.setActiveDate('start');
            this.getBlackoutDates('start', true);
        } else {
            document.getElementById('oneWayCalendarDepartDate').value = '';
            setTimeout(() => {
                this.props.onOpenEvent();
            }, 200);            
            this.state.rangeCalendar.navigate(new Date());
        }
    }

    // Function to handle the auto close of the calendar
    handleCalendarClose = (isBackArrowClicked = false) => { this.setState({isOpen: false});  
    // if(!this.props.isEligibleForStopOver){
    //     this.props.handleCalendarClose(isBackArrowClicked); 
    // }
}

    // Function to handle add/subtract end date and round trip duration
    updateRoundTripDuration = (operation, roundTripDuration) => { this.props.updateRoundTripDuration(operation, roundTripDuration); }


    getDocumentWidth = () => {
        const w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = documentElement.clientWidth || body.clientWidth || w.innerWidth;
        return width;
    }

    renderCalendarData = () => {
        const { totalRoundTripPrice, isOneWayChecked = false } = this.state;
        const { aemdata, date, singleDateSelection, startDate, endDate, enableCalendarPricing, calendarPriceDetails, redemptionSearchSlider = false } = this.props;
        const { disclaimerText = '', showDisclaimer = false, calendarPricingEligibleFlows = '' } = aemdata;
        const isFlowEligibleForCalendarPricing = calendarPricingEligibleFlows === 'both' ? true : (calendarPricingEligibleFlows === 'revenue' && !redemptionSearchSlider) ? true : (calendarPricingEligibleFlows === 'redemption' && redemptionSearchSlider) ? true : false;
        const { doneButtonText, fromLabel = '', priceLabel = '', resetButtonLabel = '', displayMaxDaysOfFlightPricing = '', confirmButtonText = '' } = aemdata;
        const priceArray = [];
        let disableDoneBtn = singleDateSelection && date ? false : !singleDateSelection && endDate ? false : true;
        if (isOneWayChecked && startDate) {
            disableDoneBtn = false;
        }
        const dateAfterDaysLimit = displayMaxDaysOfFlightPricing ? moment().add(parseInt(displayMaxDaysOfFlightPricing) - 1, 'days') : moment().add(179, 'days');
        if (enableCalendarPricing && isFlowEligibleForCalendarPricing) {
            return (
                <Fragment>
                    {enableCalendarPricing && isFlowEligibleForCalendarPricing && <div className="constrain padding-left-right price-container" style={this.isRTL ? { direction: 'rtl' } : {}} >
                        <div className="flex-cols inline add-margin-top-8 add-margin-bottom-8">
                            <div className="col col-xs-12 col-sm-8 col-md-8 col-lg-8 no-margin align-left v-center add-margin-bottom-8">
                                {!this.props.singleDateSelection && calendarPriceDetails && Object.keys(calendarPriceDetails).length !== 0 &&
                                    <span className="body-2">
                                        {this.renderDurationBlock()}
                                    </span>
                                }
                            </div>
                            <div className="col col-xs-12 col-sm-4 col-md-4 col-lg-4 no-margin align-right">
                                <div className="flex-cols inline">
                                    <div className="col col-xs-7 col-sm-7 col-md-7 col-lg-7 align-right no-margin v-center">
                                        <div className='add-margin-bottom-4 add-padding-right-8'>
                                            {calendarPriceDetails && Object.keys(calendarPriceDetails).length !== 0 && totalRoundTripPrice && !singleDateSelection && startDate && startDate.isBefore(dateAfterDaysLimit) ?
                                                <Fragment>
                                                    <span className="atomic-heading--h4"> <span className="utility">{fromLabel.replace('{currency}', calendarPriceDetails.currency)}</span> <span className="price">{totalRoundTripPrice}</span></span><br />
                                                    <span className="utility">{priceLabel.replace('{tripType}', calendarPriceDetails.tripType)}</span>
                                                </Fragment>
                                                : calendarPriceDetails && Object.keys(calendarPriceDetails).length !== 0 && totalRoundTripPrice && singleDateSelection && startDate && startDate.isBefore(dateAfterDaysLimit) ?
                                                    <Fragment>
                                                        <span className="atomic-heading--h4"> <span className="utility">{fromLabel.replace('{currency}', calendarPriceDetails.currency)}</span> <span className="price">{totalRoundTripPrice}</span></span><br />
                                                        <span className="utility">{priceLabel.replace('{tripType}', calendarPriceDetails.tripType)}</span>
                                                    </Fragment> : ''}
                                        </div>
                                    </div>
                                    <div className="col col-xs-5 col-sm-5 col-md-5 col-lg-5 align-right no-margin v-center">
                                        <button type="button" disabled={disableDoneBtn} className="button small-button full-width" onClick={() => this.handleCalendarClose(false)}>{confirmButtonText}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-cols inline add-margin-bottom-8">
                            <div className="col col-xs-4 col-sm-4 col-md-4 col-lg-4 align-left no-margin v-center">
                                <a className="link strong" onClick={() => this.handleCalendarReset()}>{resetButtonLabel}</a>
                            </div>
                            {(showDisclaimer && disclaimerText !== '') &&
                                <div className="col col-xs-8 col-sm-8 col-md-8 col-lg-8 align-right no-margin v-center">
                                    <p className='utility unset'>{aemdata.disclaimerText}</p>
                                </div>
                            }
                        </div>
                    </div>
                    }
                </Fragment>
            )
        }
    }

    updateRoundTripDurationNavigation = (count) => {
        const { blackOut } = this.props.aemdata;
        let isBlockedRange = false;
        let newEndDate = moment(this.props.endDate).add(count, 'days');
        const blockDate = this.getBlackoutDates('end', false)[0];
        if(blackOut && this.getAEMBooleanValue(blackOut.roundTrip.isBlackOutEnabled) && this.state.blockedDateArr.length >0 && this.props.tripTypes.roundTrip){
            isBlockedRange =  moment(newEndDate).isBetween(blockDate.start, blockDate.end, undefined, '[]') ;
        }
        if(!isBlockedRange) {
            this.props.onDatesChange({ startDate: this.props.startDate, endDate: newEndDate });
            this.setState({ isOpen: this.props.enableCalendarPricing ? true : false, rtReturnDate: newEndDate, highlightedInput: this.props.enableCalendarPricing ? this.state.highlightedInput : '' }); // if pricing is enabled, pop closed is disabled post date selection
            this.setPrice(newEndDate);
            this.getBlackoutDates('start')
        } else {
            newEndDate = count == -1 ? moment(blockDate.start).add(count, 'days') : moment(blockDate.end).add(count, 'days');
            this.props.onDatesChange({ startDate: this.props.startDate, endDate: newEndDate });
            this.setState({ isOpen: this.props.enableCalendarPricing ? true : false, rtReturnDate: newEndDate, highlightedInput: this.props.enableCalendarPricing ? this.state.highlightedInput : '' }); // if pricing is enabled, pop closed is disabled post date selection
            this.setPrice(newEndDate);
            this.getBlackoutDates('start')
        }   
    }

    renderDurationBlock = () => {
        const { roundTripDuration, ondTripDuration, totalRoundTripPrice, tripDurationForNavigation } = this.state;
        const { startDate, aemdata, endDate, calendarPriceDetails } = this.props;
        const { displayMaxDaysOfFlightPricing = '', roundTripInfoText, roundTripInfoTextAfterDateSelection, passangerLabelInfoText, noOfDaysLabel, noOfDayLabel, roundTripDurationMax, roundTripDurationMin, noPriceAvailableMsg, blackOut } = aemdata;
        const tripInfoText = roundTripInfoText.replace('{currency}', calendarPriceDetails.currency);
        const roundTripDurationText = roundTripDuration === 1 ? noOfDayLabel.replace('{noOfDay}', roundTripDuration) : noOfDaysLabel.replace('{noOfDay}', roundTripDuration)
        const roundTripDurationNavigationText = noOfDaysLabel.replace('{noOfDay}', tripDurationForNavigation);
        const dateAfterDaysLimit = displayMaxDaysOfFlightPricing ? moment().add(parseInt(displayMaxDaysOfFlightPricing) - 1, 'days') : moment().add(179, 'days');
        let disablePrev = parseInt(tripDurationForNavigation) <= 0;
        if(blackOut && this.getAEMBooleanValue(blackOut.roundTrip.isBlackOutEnabled) && this.state.blockedDateArr.length > 0 && this.props.tripTypes.roundTrip){
            const blockedDates = this.getBlackoutDates('end', false);
            const blockedEndDatePlus1 = moment(blockedDates[0].end).add(1, 'days');
            if(this.isBlockedDates(blockedDates, moment(startDate)) && moment(endDate).isSame(blockedEndDatePlus1)) {
                disablePrev = true;
            }            
        }
        if(startDate && endDate) {
            return (
                <Fragment>
                    {tripInfoText} &nbsp;  {roundTripDuration > 0 &&
                        <button
                        className={`calendar-trip-button image-icon_12 image-icon_cursor ${this.isRTL ? 'calendar-next-arrow-icon' : 'calendar-back-arrow-icon'}`}
                            onClick={() => { this.updateRoundTripDurationNavigation(-1) }}
                            style={disablePrev ? { opacity: '0.2', cursor: 'not-allowed' } : {}}
                            disabled={disablePrev}
                        >
                        </button>
                    }
                    &nbsp; &nbsp; {roundTripDurationNavigationText} &nbsp; &nbsp;
                    {roundTripDuration &&
                        <button className={`calendar-trip-button image-icon_12 image-icon_cursor ${this.isRTL ? 'calendar-back-arrow-icon' : 'calendar-next-arrow-icon'}`}
                            onClick={() => { this.updateRoundTripDurationNavigation(1) }}
                            disabled={parseInt(tripDurationForNavigation) < 999 ? false : true}
                            style={parseInt(tripDurationForNavigation) >= 999 ? { opacity: '0.2', cursor: 'not-allowed' } : {}} >
                        </button>
                    }
                    &nbsp; {passangerLabelInfoText}
                </Fragment>
            )
        }
        else 
        if (startDate === null) {
            return (
                <Fragment>
                    {tripInfoText} &nbsp;  {roundTripDuration > 0 &&
                        <button
                        className={`calendar-trip-button image-icon_12 image-icon_cursor ${this.isRTL ? 'calendar-next-arrow-icon' : 'calendar-back-arrow-icon'}`}
                            onClick={() => { this.updateRoundTripDuration('dec', roundTripDuration) }}
                            style={parseInt(roundTripDuration) <= parseInt(roundTripDurationMin) ? { opacity: '0.2', cursor: 'not-allowed' } : {}}
                            disabled={parseInt(roundTripDuration) > parseInt(roundTripDurationMin) ? false : true}
                        >
                        </button>
                    }
                    &nbsp; &nbsp; {roundTripDurationText} &nbsp; &nbsp;
                    {roundTripDuration &&
                        <button className={`calendar-trip-button image-icon_12 image-icon_cursor ${this.isRTL ? 'calendar-back-arrow-icon' : 'calendar-next-arrow-icon'}`}
                            onClick={() => { this.updateRoundTripDuration('inc', roundTripDuration) }}
                            disabled={parseInt(roundTripDuration) < parseInt(roundTripDurationMax) ? false : true}
                            style={parseInt(roundTripDuration) >= parseInt(roundTripDurationMax) ? { opacity: '0.2', cursor: 'not-allowed' } : {}} >
                        </button>
                    }
                    &nbsp; {passangerLabelInfoText}
                </Fragment>
            )
        }
        else if (startDate !== null && dateAfterDaysLimit.isBefore(startDate)) {
            return (<Fragment>
                &nbsp;  &nbsp; <span> {noPriceAvailableMsg ? noPriceAvailableMsg.replace('{date}', startDate.format('DD MMM')) : ''}</span>
            </Fragment>
            )
        }
        else {
            const isDiplay = startDate !== null && endDate !== null && !totalRoundTripPrice ? false : true;
            return (
                isDiplay && <Fragment>
                    <span> {roundTripInfoTextAfterDateSelection.replace('{currency}', calendarPriceDetails.currency).replace('{date}', startDate.format('DD MMM'))}</span>
                </Fragment>
            )
        }

    }

    range = () => {
        const { startDate, endDate, focusedInput, controlId, errorData, aemdata, displayFormat, inlineMode = false, minDate = null, maxDate = null, isMobile } = this.props;
        let startDay = startDate ? moment(startDate).locale(this.defaultLocale).format(this.dateFormat) : null;
        let endDay = endDate ? moment(endDate).locale(this.defaultLocale).format(this.dateFormat) : null;
        let startDayInputVal = startDate ? moment(startDate).locale(this.defaultLocale).format(displayFormat) : null;
        let endDayInputVal = endDate ? moment(endDate).locale(this.defaultLocale).format(this.props.displayFormat) : null;
        const { departDate, returnDate } = errorData || {};
        const { controlId: errorDepart } = departDate || {};
        const { controlId: errorArrive } = returnDate || {};
        let focusedClassDepart = startDay || this.state.startDateFocused ? 'focused' : '', focusedClassArrival = endDay || this.state.endDateFocused ? 'focused' : '';
        let rangeProps = {
            select: "range",
            startInput: this.state.start,
            endInput: this.state.end,
            onChange: isMobile ? (aemdata.blackOut && this.getAEMBooleanValue(aemdata.blackOut.roundTrip.isBlackOutEnabled) ? this.dateChangeReturnMobileBlackout : this.dateChangeReturnMobile) : (aemdata.blackOut && this.getAEMBooleanValue(aemdata.blackOut.roundTrip.isBlackOutEnabled) ? this.dateChangeReturnBlackout : this.dateChangeReturn),
            min: minDate ? minDate.format(this.dateFormat) : moment().format(this.dateFormat),
            max: maxDate ? maxDate.format(this.dateFormat) : moment().add('days', this.props.aemdata.activeDays).format(this.dateFormat),
            // invalid: this.state.blockedDateArr,
            // inRangeInvalid: true
        };
        if (startDay || endDay) {
            rangeProps.value = [startDay, endDay];
        }
        const activeInputStyleOB = {
            border: this.state.highlightedInput == 'start' ? '1px solid #1265B6' : ''
        };
        const activeInputStyleIB = {
            border: this.state.highlightedInput == 'end' ? '1px solid #1265B6' : ''
        };
        return <Fragment>
            
            <Popup
                {...this.getCommonPopupProps(this.isRTL ? 'roundTripCalendarReturnDate' : 'roundTripCalendarDepartDate')}
                onOpen={this.onPopupOpen}
            >
                <div className="nds">
                    <div className="DateRangePicker ar-swap">
                        <div className="DateRangePickerInput">
                            {/* <div className="DateInput DateInput_1"> */}
                            {/* <label className={"depart-label form-item__label floatingLabel " + focusedClassDepart} htmlFor={this.props.id || "date"}>{aemdata.departureLabel}</label> */}
                            <input placeholder={aemdata.departureLabel} style={activeInputStyleOB} label="Outbound" value={startDayInputVal} onFocus={(e) => this.onFocusDate('startDateFocused')} onBlur={(e) => this.onBlurDate('startDateFocused')} ref={this.startRef} className="DateInput_input" type="text" id="roundTripCalendarDepartDate" name="roundTripCalendarDepartDate" />
                        {/* </div>
                            <div className="DateInput"> */}
                                {/* <label className={"depart-label form-item__label floatingLabel " + focusedClassArrival} htmlFor={this.props.id || "date"}>{aemdata.returnLabel}</label> */}
                                <input placeholder={aemdata.returnLabel} style={activeInputStyleIB} label="Return" value={endDayInputVal} onFocus={(e) => this.onFocusDateEnd('endDateFocused')} onBlur={(e) => this.onBlurDate('endDateFocused')} ref={this.endRef} className="DateInput_input" type="text" id="roundTripCalendarReturnDate" name="roundTripCalendarReturnDate" />
                            {/* </div> */}
                        </div>
                    </div>
                </div>
                {/* {!focusedInput && <span id={errorDepart + "-" + controlId || "range-date-selector-depart"} className={`${this.props.errorClass} ${"calendar-error calendar-range-depart"}`} role="alert">
                    {departDate.errorMsg || ""}
                </span>}
                {!focusedInput && <span id={errorArrive + "-" + controlId || "range-date-selector-depart"} className={`${this.props.returnDateError} ${"calendar-error calendar-range-return"}`} role="alert">
                    {returnDate.errorMsg || ""}
                </span>} */}
                <input type='checkbox' id='paymiles' /><label for="paymiles">{aemdata.payWithMilesLabel}</label>
                <Datepicker
                    ref={this.rangeCalendarRef}
                    {...rangeProps}
                    {...this.getCommonCalendarProps()}
                    renderDay={(e) => this.customDayContent(e, this.state.labels)}
                />
                {this.renderCalendarData()}
            </Popup>
        </Fragment>
    }
    oneway = () => {
        const { startDate, focused, errorData, errorClass, controlId, aemdata, displayFormat } = this.props;
        let startDay = startDate ? moment(startDate).format(this.dateFormat) : null;
        let startDayInputVal = startDate ? moment(startDate).format(displayFormat) : null;
        const { controlId: errorId } = errorData || {};
        let focusedClassDepart = startDay || this.state.startDateFocused ? 'focused' : '';
        let owProps = {
            onCellClick: this.dateChangeOnewayCellClick,
            min: moment().format(this.dateFormat),
            max: moment().add('days', this.props.aemdata.activeDays).format(this.dateFormat),
            value: startDay
        };
        const activeInputStyleOB = {
            border: this.state.highlightedInput == 'start' ? '1px solid #1265B6' : ''
        };
        return <Fragment>            
            <Popup
                {...this.getCommonPopupProps('oneWayCalendarDepartDate')}
                onOpen={this.onPopupOpen}
            >
                <div className="nds">
                    {/* <label className={"depart-label form-item__label floatingLabel " + focusedClassDepart} htmlFor={this.props.id || "date"}>{aemdata.departureLabel}</label> */}
                    <div className="DateRangePicker">
                        <div className="DateRangePickerInput"><div className="DateInput DateInput_1">
                            <input placeholder={aemdata.departureLabel} style={activeInputStyleOB} label="Outbound" value={startDayInputVal} onFocus={(e) => this.onFocusDate('startDateFocused')} onBlur={(e) => this.onBlurDate('startDateFocused')} className="DateInput_input" type="text" id="oneWayCalendarDepartDate" name="oneWayCalendarDepartDate" />
                            {/* {!focused && <span id={errorId + "-" + controlId || "multi-city-date-picker"} className={`${errorClass} ${"calendar-error calendar-single-depart"}`} role="alert">
                                {errorData.errorMsg}
                            </span>} */}
                        </div>
                        </div>
                    </div>
                </div>
                <input type='checkbox' id='paymiles' /><label for="paymiles">{aemdata.payWithMilesLabel}</label>
                <Datepicker
                    ref={this.rangeCalendarRef}
                    {...owProps}
                    {...this.getCommonCalendarProps()}
                    renderDay={(e) => this.customDayContent(e, this.state.labels)}
                />
                {this.renderCalendarData()}
            </Popup>
        </Fragment>
    }
    multiCity = () => {
        const { date, focused, errorData, errorClass, controlId, multiCityStartDate, aemdata, id, displayFormat } = this.props;
        let startDay = date ? moment(date).format(this.dateFormat) : null;
        let startDayInputVal = date ? moment(date).format(displayFormat) : null;
        const { controlId: errorId } = errorData || {};
        let focusedClassDepart = startDay || this.state.startDateFocused ? 'focused' : '';
        let mcProps = {
            onCellClick: this.dataChangeMulticityCellClick,
            min: multiCityStartDate || moment().format(this.dateFormat),
            max: moment().add('days', this.props.aemdata.activeDays).format(this.dateFormat),
            value: startDay,
            id
        };
        const activeInputStyleOB = {
            border: this.state.highlightedInput == 'start' ? '1px solid #1265B6' : ''
        };
        return <Fragment>
            
            <Popup
                {...this.getCommonPopupProps(id)}
            >
                <div className="nds">
                    {/* <label className={"depart-label form-item__label floatingLabel " + focusedClassDepart} htmlFor={this.props.id || "date"}>{aemdata.departureLabel}</label> */}
                    <div className="DateRangePicker">
                        <div className="DateRangePickerInput"><div className="DateInput DateInput_1">
                            <input placeholder={aemdata.departureLabel} style={activeInputStyleOB} label="Outbound" value={startDayInputVal} onFocus={(e) => this.onFocusDate('startDateFocused')} onBlur={(e) => this.onBlurDate('startDateFocused')} className="DateInput_input" type="text" id={id} name={id} />
                            {/* {!focused && <span id={errorId + "-" + controlId || "multi-city-date-picker"} className={`${errorClass} ${"calendar-error calendar-single-depart"}`} role="alert">
                                {errorData.errorMsg}
                            </span>} */}
                        </div>
                        </div>
                    </div>
                </div>
                <Datepicker
                    {...mcProps}
                    {...this.getCommonCalendarProps()}
                    renderDay={(e) => this.customDayContent(e, this.state.labels)}
                />
            </Popup>
        </Fragment>
    }
    render() {
        const { tripTypes = {}, isMultiCity } = this.props;
        console.log('this.props',this.props);
        
        return (
            <Fragment>
                {(tripTypes.roundTrip) ? this.range() : (tripTypes.oneWay) ? this.oneway() : (isMultiCity ? this.multiCity() : this.range())}
            </Fragment>
        );
    }
}

export default MobiscrollWrapper;

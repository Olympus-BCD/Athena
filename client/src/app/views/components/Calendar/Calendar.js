import React from 'react';
import moment from 'moment';
 import events from './Events';
import BigCalendar from 'react-big-calendar';
import "./Calendar.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

moment.locale('en-GB');
const localizer = BigCalendar.momentLocalizer(moment);

const allViews = Object
  .keys(BigCalendar.Views)
  .map(k => BigCalendar.Views[k]);
  
const myViews = {
	month: true
};

const styleGetter = (event, start, end, isSelected) => {
    console.log('Event:', event);
//     var backgroundColor = '#' + event.hexColor;

	const Xstart = moment(start).format('X');
	const Xend = moment(start).format('X');
	const multiDay = moment(end).diff(moment(start), 'days') > 1 ? true : false;

    let style = {
        backgroundColor: 'purple',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    
    switch(event.type) {
	    case 'training-completed':
	    
	    	break;
	    case 'training-overdue':
	    
	    	break;
	    case 'training-urgent':
	    
	    	break;
	    case 'training-future':
	    
	    	break;
    }
    
    return {
        style: style,
        className: event.className
    };
};

// eventPropGetter={styleGetter}

const calStyle = {
  width:"550px",
  height: "400px",
  fontColor:"white"
}

const Calendar = props => (
  <div id='calendar'>
    <BigCalendar
      localizer = {localizer}
      events={props.events}
      step={60}
      views={myViews}
      defaultDate={new Date()}
    />
  </div>
);

 
export default Calendar;
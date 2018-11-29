import React from 'react';
import moment from 'moment';
 import events from './Events';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('en-GB');
const localizer = BigCalendar.momentLocalizer(moment);

const allViews = Object
  .keys(BigCalendar.Views)
  .map(k => BigCalendar.Views[k])

const Calendar = () => (
  <div style={{ height: 500, width: 560 }}>
    <BigCalendar
      localizer = {localizer}
      events={events}
      step={60}
      views={allViews}
      defaultDate={new Date("November 5, 2018")}
    />
  </div>
);

 
export default Calendar;
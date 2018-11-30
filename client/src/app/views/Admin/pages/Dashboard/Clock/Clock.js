import React from "react";
import "./Clock.css";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state.date;
  }

  render() {
    const { date } = this.state;

    const monthsArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const dayOfWeek = date
      .toString()
      .slice(0, 3)
      .toUpperCase();
    const day = `0${date.getDate()}`.slice(-2);
    const month = monthsArray[date.getMonth()].toUpperCase();
    const year = date.getFullYear();
    return (
      <div>
        <div className="timeDisplay">{date.toLocaleTimeString()}</div>
        <div className="dateDisplay">
          {dayOfWeek} {day} {month}{" "}
        </div>
      </div>
    );
  }
}

export default Clock;

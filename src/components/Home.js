import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

class Home extends React.Component {
  state = {
    data: {
      postcode: '',
      category: '',
      date: new Date,
      time: new Date
    }
  }

  activityCategories = ['Football', 'Field Hockey', 'Badminton', 'Walking', 'Bootcamp', 'Running', 'Yoga', 'Rugby']

  componentDidMount() {
    // to round the time up to the next 15 minutes of the hour (e.g. 10:15, 10:30)
    const coeff = 1000 * 60 * 15
    const roundedTime = new Date(Math.ceil(new Date() / coeff) * coeff)
    const data = { ...this.state.data, time: roundedTime }
    this.setState({ data })
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleTime = (time) => {
    const data = { ...this.state.data, time }
    this.setState({ data })
  }

  handleDate = (date) => {
    const data = { ...this.state.data, date }
    this.setState({ data })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // make all data the same as in the DB
    const searchData = {
      ...this.state.data,
      postcode: this.state.data.postcode.replace(' ', ''),
      date: this.state.data.date.toISOString(),
      time: this.state.data.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    }
    console.log(searchData)
    // send search to index page, filter on place, data and time

    // console.log(moment(this.state.date).isSame('2020-02-09T23:00:00.000Z', 'day')) // will check year and month and day
    // console.log(this.state.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) === '10:27 AM') // compare times
  }

  render() {
    const { date, time } = this.state.data
    return (
      <>
        <section className="section hero">
          <div className="container">
            <h2 className="section-heading u-full-width">Out and About</h2>
          </div>
        </section>

        <section className="section form">
          <div className="container">
            <div className="row">
              <div className="one-half column">
                <form onSubmit={this.handleSubmit} className="form">
                  <label>Postcode</label>
                  <input
                    type="text"
                    className="input u-full-width"
                    placeholder="Postcode"
                    onChange={this.handleChange}
                    name="postcode"
                    required={true}
                  />
                  <label>Activity</label>
                  <select
                    className="u-full-width"
                    onChange={this.handleChange}
                    name="category"
                    required={true}
                  >
                    <option value="" defaultValue>Choose activity</option>
                    {this.activityCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <label>Date and Time</label>
                  <div className="row">
                    <DatePicker
                      selected={date}
                      onChange={this.handleDate}
                      dateFormat="d MMMM yyyy"
                      name="date"
                    />
                    <DatePicker
                      selected={time}
                      onChange={this.handleTime}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </div>
                  <button className="button u-full-width">Search</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Home
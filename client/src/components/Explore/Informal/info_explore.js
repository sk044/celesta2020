import React, { Component } from "react";
import { info_explore_function } from "./info_explore_function";
import "./info_explore.css";
import "./info_explore_main.css";
import { BackToEvents } from "../../_BackToEvents/BackToEvents";
import { InfoCards } from "./info_cards";
import axios from "axios";

class info_explore extends Component {
  constructor(props){
    super(props);
    this.state = {
      onsite: [],
      dataIsReturned:false
    }
  }
  
  componentDidMount() {
    info_explore_function();
    this.getEvents();
  }

  componentDidUpdate= () => {
		info_explore_function();
	}

  getEvents = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .get("/api/events/bytype/onsite/detailed/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then(async(response) => {
        const data = response.data;
        this.setState({ onsite: data });
        localStorage.setItem('event', JSON.stringify(data));
        console.log(data);
        this.setState({dataIsReturned : true});
        console.log("Data has been received!!");
      })
      .catch((e) => {
        console.log(e.message);
        //alert('Error retrieving data!!!');
      });
  };

  render() {
    return (
      <div>
        <BackToEvents />
        <div className="info_cont s--inactive">
          <div className="info_cont__inner">
          { this.state.dataIsReturned ? <InfoCards /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default info_explore;

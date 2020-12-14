import AppRouter from "./AppRouter";
import React, { Component } from "react";
import { observer } from "mobx-react";
import { appStore } from "./store/appStore";
import api from "./shared/api";
import { apiUrl } from "./shared/constants";
import Progress from "./components/Progress/Progress";

class App extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.init();
  }

  init = async () => {
    const token = window.localStorage.getItem("twitter_helpdesk_token");
    if (token) {
      const user = await api.get(`${apiUrl}/api/twitter/self`);
      appStore.changeLoginState(true, user, token);
    } else appStore.changeLoginState(false, null, "");
    this.setState({ loading: false });
  };

  render() {
    return this.state.loading ? <Progress /> : <AppRouter />;
  }
}

export default observer(App);

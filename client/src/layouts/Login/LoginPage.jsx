import React, { useState, useEffect } from "react";
import { Button, Typography, Paper } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import api from "../../shared/api";
import { apiUrl } from "../../shared/constants";
import { observer } from "mobx-react";
import { appStore } from "../../store/appStore";
import Icon from "@mdi/react";
import { mdiTwitter } from "@mdi/js";

const login = async () => {
  const res = await api.post(`${apiUrl}/api/auth/twitter/reverse`);
  if (res.data && res.data.oauth_token) {
    window.location.href =
      "https://api.twitter.com/oauth/authenticate?oauth_token=" +
      res.data.oauth_token;
  } else {
    window.alert("ERROR : " + res.message);
  }
};

function LoginPage(props) {
  const [isLoading, setLoading] = useState(false);

  const verify = async (query, props) => {
    setLoading(true);
    const res = await api.post(
      `${apiUrl}/api/auth/twitter`,
      JSON.stringify({ ...query })
    );

    if (!res.headers["x-auth-token"]) {
      window.alert("Please try again later");
      appStore.changeLoginState(false, null, "");
      return;
    } else {
      appStore.changeLoginState(true, null, res.headers["x-auth-token"]);
      props.history.push("/dashboard");
    }
  };

  useEffect(() => {
    var search = window.location.search.substring(1);
    if (search) {
      const query = JSON.parse(
        '{"' +
        decodeURI(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
      );
      if (query && Object.keys(query).length > 0) {
        verify(query, props);
      }
    }
  }, [props]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        padding: "25px",
        backgroundColor: "#F7F7F7"
      }}
    >
      <Paper
        style={{
          width: "400px",
          height: "225px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "25px"
        }}
      >
        <Typography variant="h4" gutterBottom>
          Twitter Help Desk
      </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            disabled={isLoading}
            variant="contained"
            size="large"
            color="primary"
            aria-label="add"
            style={{ marginTop: "20px", marginBottom: "20px" }}
            startIcon={<Icon path={mdiTwitter} color="white" size={1} />}
            onClick={() => {
              setLoading(true);
              login();
            }}
          >
            Login with Twitter
        </Button>
          <span style={{ color: "#747880" }}>OR</span>
          <Button
            disabled={isLoading}
            variant="contained"
            size="large"
            color="primary"
            aria-label="add"
            style={{ marginTop: "20px" }}
            onClick={() => {
              setLoading(true);
              login();
            }}
          >
            Connect Twitter Account
        </Button>
        </div>
      </Paper>
    </div>
  );
}

export default observer(withRouter(LoginPage));

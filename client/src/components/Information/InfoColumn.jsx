import React from "react";
import { Paper } from "@material-ui/core";
import InfoCard from "./InfoCard";

export default function InfoColumn(props) {
  const { selectedTweet } = props;

  return (
    <Paper
      style={{
        height: "92vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {selectedTweet && (
        <div style={{ width: "100%" }}>
          <InfoCard selectedTweet={selectedTweet} />
        </div>
      )}
    </Paper>
  );
}

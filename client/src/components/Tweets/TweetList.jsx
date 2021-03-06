import React from "react";
import { Paper, List } from "@material-ui/core";
import { MentionsPlaceHolder } from "../PlaceHolders/PlaceHolders";
import TweetItem from "./TweetItem";

export default function TweetList(props) {
  let { isLoading, tweets, selectedIndex, handleReply, handleSelected } = props;
  return (
    <Paper style={{ height: "92vh", overflow: "scroll", boxShadow: "None" }}>
      <List
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: 0
        }}
      >
        {isLoading ? (
          Array(10)
            .fill(0, 0)
            .map((e, i) => <MentionsPlaceHolder key={i.toString()} />)
        ) : tweets.length > 0 ? (
          tweets.map((o, i) => (
            <TweetItem
              key={i.toString()}
              tweet={o}
              selectedIndex={selectedIndex}
              handleReply={s => handleReply(s)}
              handleSelected={(id_str, o) => handleSelected(id_str, o)}
            ></TweetItem>
          ))
        ) : (
          <span>No tweets found !!!</span>
        )}
      </List>
    </Paper>
  );
}

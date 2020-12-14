import React from "react";
import { ListItem, Avatar } from "@material-ui/core";
import moment from "moment";

export default function TweetItem(props) {
  let { tweet, handleReply, handleSelected } = props;
  return (
    <>
      <ListItem
        key={tweet.id.toString()}
        selected={props.selectedIndex !== tweet.id_str}
        onClick={() => {
          handleReply("@" + tweet.user.screen_name + " ");
          handleSelected(tweet.id_str, tweet);
        }}
        style={{ 
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginTop: "15px",
          background: props.selectedIndex !== tweet.id_str ? "#fff" : "#eee",
          cursor: "pointer"
        }}
      >
        <Avatar
          alt={tweet.user.name}
          src={tweet.user.profile_image_url}
        ></Avatar>
        <div style={{ marginLeft: "10px", maxWidth: "80%" }}>
          <b style={{ fontSize: "1em" }}>
            {tweet.user.name}{" "}
            <span
              style={{
                fontWeight: "normal",
                fontSize: "0.8em"
              }}
            >
              {moment(tweet.created_at).fromNow()}
            </span>
          </b>
          <p>
            <span style={{ fontSize: "0.8em" }}>{tweet.text}</span>
          </p>
        </div>
      </ListItem>
    </>
  );
}

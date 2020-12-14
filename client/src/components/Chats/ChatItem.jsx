import React from "react";
import { observer } from "mobx-react";
import { appStore } from "../../store/appStore";
import { ListItem, Avatar } from "@material-ui/core";
import moment from "moment";

function ChatItem(props) {
  let { item } = props;
  const isUser = appStore.user.screen_name === item.user.screen_name;
  return (
    <div
      style={{
        marginLeft: isUser ? "35%" : "1%",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <Avatar alt={item.user.name} src={item.user.profile_image_url} />
      <ListItem
        style={{
          marginLeft: "1%",
          marginBottom: "2%",
          width: "75%",
        }}
      >
        <span>
          <b className="user-name">{item.user.name}</b> <br />
          <p
            style={{
              fontSize: "1em",
              marginRight: "5px"
            }}
            className="user-tweet"
          >
            {item.text}
          </p>
          <p className="created-at" style={{ fontSize: "0.8em" }}>
            {moment(item.created_at).fromNow()}
          </p>
        </span>
      </ListItem>
    </div>
  );
}

export default observer(ChatItem);

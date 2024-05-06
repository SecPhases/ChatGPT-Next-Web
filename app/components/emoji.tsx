import EmojiPicker, { Theme as EmojiTheme } from "emoji-picker-react";
import { ModelType } from "../store";

import BotIcon from "../icons/bot.svg";
import BlackBotIcon from "../icons/black-bot.svg";

export function getEmojiUrl(unified: string) {
  return `https://gcore.jsdelivr.net/gh/SecPhases/emoji-data/img-apple-64/${unified}.png`;
}

export function AvatarPicker(props: {
  onEmojiClick: (emojiId: string) => void;
}) {
  return (
    <EmojiPicker
      width={"100%"}
      lazyLoadEmojis
      theme={EmojiTheme.AUTO}
      getEmojiUrl={getEmojiUrl}
      onEmojiClick={(e) => {
        props.onEmojiClick(e.unified);
      }}
    />
  );
}

export function Avatar(props: { model?: ModelType; avatar?: string }) {
  if (props.model) {
    return (
      <div className="no-dark">
        {props.model.startsWith("gpt-4") ? (
          <BlackBotIcon className="user-avatar" />
        ) : props.model?.startsWith("CatGirl") ? (
          <EmojiAvatar avatar="catgirl" />
        ) : (
          <BotIcon className="user-avatar" />
        )}
      </div>
    );
  } else if (props.avatar) {
    return (
      <EmojiAvatar avatar={props.avatar} />
    );
  }
}

export function EmojiAvatar(props: { avatar: string; size?: number }) {
  const emojiUrl = getEmojiUrl(props.avatar);
  return (
    <img
      className="user-avatar"
      src={emojiUrl}
      alt="emoji"
      width={props.size ?? 40} 
      height={props.size ?? 40}
    />
  );
}

import EmojiPicker, { EmojiStyle, Theme as EmojiTheme } from "emoji-picker-react";
import { ModelType } from "../store";

import BotIcon from "../icons/bot.svg";
import BlackBotIcon from "../icons/black-bot.svg";
import CatGirlIcon from "../icons/catgirl.svg";

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
        {props.avatar && <EmojiAvatar avatar={props.avatar} />}
      </div>
    );
  }
  return (
    <div className="user-avatar">
      {props.avatar && <EmojiAvatar avatar={props.avatar} />}
    </div>
  );
}

export function EmojiAvatar(props: { avatar: string; size?: number }) {
  const emojiUrl = getEmojiUrl(props.avatar);
  return (
    <img
      src={emojiUrl}
      alt="emoji"
      width={props.size ?? 32} 
      height={props.size ?? 32}
    />
  );
}

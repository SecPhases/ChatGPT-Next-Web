import EmojiPicker, { Theme as EmojiTheme } from "emoji-picker-react";
import {
  ModelType,
  useAppConfig,
} from "../store";

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
  const config = useAppConfig()
  if (props.model) {
    return (
      <div className="no-dark">
        {props.model.startsWith("gpt-4") ? (
          <BlackBotIcon className="user-avatar" width={config.AvatarSize} height={config.AvatarSize} />
        ) : props.model?.startsWith("CatGirl") ? (
          <EmojiAvatar avatar="catgirl" />
        ) : (
          <BotIcon className="user-avatar" width={config.AvatarSize} height={config.AvatarSize} />
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
  const config = useAppConfig()
  const emojiUrl = props.avatar.startsWith("http") ? props.avatar : getEmojiUrl(props.avatar);
  return (
    <img
      className="user-avatar"
      src={emojiUrl}
      alt="avatar"
      width={props.size ?? config.AvatarSize} 
      height={props.size ?? config.AvatarSize}
    />
  );
}

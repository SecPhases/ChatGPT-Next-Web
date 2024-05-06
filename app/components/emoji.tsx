import EmojiPicker, {
  Emoji,
  EmojiStyle,
  Theme as EmojiTheme,
} from "emoji-picker-react";
import {
  ModelType,
  useAppConfig,
} from "../store";

import BotIcon from "../icons/bot.svg";
import BlackBotIcon from "../icons/black-bot.svg";

export function getEmojiUrl(unified: string, style: EmojiStyle) {
  // Whoever owns this Content Delivery Network (CDN), I am using your CDN to serve emojis
  // Old CDN broken, so I had to switch to this one
  // Author: https://github.com/H0llyW00dzZ
  return `https://gcore.jsdelivr.net/npm/emoji-datasource-apple/img/${style}/64/${unified}.png`;
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
  const { AvatarSize } = useAppConfig();
  if (props.model) {
    return (
      <div className="no-dark">
        {props.model.startsWith("gpt-4") ? (
          <BlackBotIcon className="user-avatar" width={AvatarSize} height={AvatarSize} />
        ) : props.model?.startsWith("CatGirl") ? (
          // Replace the URL with your own
          <ImageAvatar avatar="https://gcore.jsdelivr.net/gh/SecPhases/emoji-data/img-apple-64/catgirl.png" />
        ) : (
          <BotIcon className="user-avatar" width={AvatarSize} height={AvatarSize} />
        )}
      </div>
    );
  }
  if (props.avatar) {
    return props.avatar.startsWith("http") ? (
      <ImageAvatar avatar={props.avatar} />
    ) : (
      <EmojiAvatar avatar={props.avatar} />
    );
  }
}

export function ImageAvatar(props: { avatar: string }) {
  const { AvatarSize } = useAppConfig();
  return (
    <img
      className="user-avatar"
      src={props.avatar}
      alt="avatar"
      width={AvatarSize}
      height={AvatarSize}
    />
  );
}

export function EmojiAvatar(props: { avatar: string; size?: number }) {
  const { AvatarSize } = useAppConfig();
  const adjustedSize = props.size ?? AvatarSize;
  return (
    <div className="user-avatar" style={{ minWidth: adjustedSize, minHeight: adjustedSize }}>
      <Emoji
        unified={props.avatar}
        size={adjustedSize * 0.6}
        getEmojiUrl={getEmojiUrl}
      />
    </div>
  );
}

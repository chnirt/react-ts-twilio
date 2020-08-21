import React, {
  ReactElement,
  useState,
  useLayoutEffect,
  Fragment
} from "react";
import { useNavigate } from "react-router-dom";
import { useTwilio } from "../context/useTwilio";
import { ChannelDescriptor } from "twilio-chat/lib/channel";

type ChannelsIndexProps = {};

export function ChannelsIndex(props: ChannelsIndexProps): ReactElement {
  const { getPublicChannelDescriptors } = useTwilio();
  let navigate = useNavigate();

  const [channels, setChannels] = useState<[]>([]);

  useLayoutEffect(() => {
    fetchChannels();
  }, []);

  async function fetchChannels() {
    const paginator = await getPublicChannelDescriptors?.();
    setChannels(paginator?.items);
  }

  function navigateCreate() {
    navigate("/channels/create");
  }

  return (
    <Fragment>
      ChannelsIndex
      <button onClick={navigateCreate}>create Channel</button>
      <br />
      {channels?.map((channel: ChannelDescriptor, i) => (
        <li key={i}>{channel.friendlyName}</li>
      ))}
    </Fragment>
  );
}

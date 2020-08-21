import React, { PropsWithChildren, ReactElement, useState } from "react";
import { useTwilio } from "../context/useTwilio";

type CreateChannelProps = {};

export function CreateChannel(
  props: PropsWithChildren<CreateChannelProps>
): ReactElement {
  const { createChannel } = useTwilio();

  const [uniqueName, setUniqueName] = useState("");
  const [friendlyName, setFriendlyName] = useState("");

  async function handleSave() {
    const newChannel = await createChannel?.(uniqueName, friendlyName);
    console.log(newChannel);
  }

  return (
    <div>
      CreateChannel
      <br />
      <input
        placeholder="uniqueName"
        value={uniqueName}
        onChange={(e) => setUniqueName(e.target.value)}
      />
      <br />
      <input
        placeholder="friendlyName"
        value={friendlyName}
        onChange={(e) => setFriendlyName(e.target.value)}
      />
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

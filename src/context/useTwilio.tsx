import React, {
  useContext,
  createContext,
  PropsWithChildren,
  useEffect,
  useRef
} from "react";
import { Client } from "twilio-chat";
import { useAuth } from "./useAuth";

type ContextProps = {
  getPublicChannelDescriptors: () => void;
  createChannel: (uniqueName: string, friendlyName: string) => void;
};

type ProviderProps = {};

const TwilioContext = createContext<Partial<ContextProps>>({});

export function TwilioProvider({ children }: PropsWithChildren<ProviderProps>) {
  return (
    <TwilioContext.Provider value={TwilioValue()}>
      {children}
    </TwilioContext.Provider>
  );
}

export const useTwilio = () => useContext(TwilioContext);

function TwilioValue(): ContextProps {
  const client = useRef<Client | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("access-token");

    async function fetchClient(validateToken: string) {
      try {
        client.current = await Client.create(validateToken);
      } catch (error) {
        logout?.();
      }
    }

    if (token) {
      fetchClient(token);
    }
  }, []);

  /**
   * Returns the channels.
   *
   * @remarks
   * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
   *
   * @returns The channels
   *
   * @beta
   */
  function getPublicChannelDescriptors() {
    console.log("getPublicChannelDescriptors");
    return new Promise((resolve, reject) => {
      client.current
        ?.getPublicChannelDescriptors()
        .then((paginator) => {
          for (let i = 0; i < paginator.items.length; i++) {
            const channel = paginator.items[i];
            console.log("Channel: " + channel.friendlyName);
          }
          resolve(paginator);
        })
        .catch((error) => console.log(error));
    });
  }

  /**
   * Returns the channel of two numbers.
   *
   * @remarks
   * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
   *
   * @param uniqueName - The first input string
   * @param friendlyName - The second input string
   * @param isPrivate - The third input string
   * @returns The channel mean of `uniqueName` and `friendlyName`
   *
   * @beta
   */
  function createChannel(
    uniqueName = "general",
    friendlyName = "General Chat Channel",
    isPrivate = false
  ): Promise<Channel> {
    return new Promise((resolve, reject) => {
      client.current
        ?.createChannel({
          uniqueName,
          friendlyName,
          isPrivate
        })
        .then(function (channel) {
          console.log("Created general channel:");
          console.log(channel);
          resolve(channel);
        })
        .catch((error) => reject(error));
    });
  }

  return { getPublicChannelDescriptors, createChannel };
}

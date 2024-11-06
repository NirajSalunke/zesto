"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./ui/button";
// import { useRouter } from "next//";
import { useRouter } from "next/navigation";
import { PhoneOffIcon } from "lucide-react";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const localParticipant = useCallStateHooks().useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call?.state.createdBy.id;
  if (!isMeetingOwner) return null;

  return (
    <Button
      className="cursor-pointer rounded-2xl bg-red-500 transition-all px-4 py-2 hover:bg-red-400"
      onClick={async () => {
        await call?.endCall();
        router.push("/");
      }}
    >
      <PhoneOffIcon />
    </Button>
  );
};

export default EndCallButton;

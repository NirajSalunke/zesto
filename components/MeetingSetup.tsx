"use client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setisSetupComplete,
}: {
  setisSetupComplete: (val: boolean) => void;
}) => {
  const [isMicCamToggIn, setisMicCamToggIn] = useState(false);
  const call = useCall();
  if (!call) {
    throw new Error("useCall Component should be used only in StreamCall");
  }
  useEffect(() => {
    if (isMicCamToggIn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggIn, call?.camera, call?.microphone]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl  font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggIn}
            onChange={(e) => {
              setisMicCamToggIn(e.target.checked);
            }}
          />
          Join with Camera and Microphone off
        </label>
        <DeviceSettings />
      </div>
      <Button
        onClick={() => {
          call.join();
          setisSetupComplete(true);
        }}
        className="rounded-md bg-green-500 px-4 py-2.5"
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;

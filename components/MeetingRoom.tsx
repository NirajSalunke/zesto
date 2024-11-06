import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { LayoutDashboardIcon, UsersRound } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";
type CallLayoutType = "grid" | "speaker-left" | "speaker-right";
const MeetingRoom = () => {
  const isPersonal = !!useSearchParams().get("personal");
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const callingState = useCallStateHooks().useCallCallingState();
  if (callingState !== CallingState.JOINED) return <Loader />;
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;

      default:
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4  text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={`h-[calc(100vh-86px)]  ml-2 ${
            !showParticipants ? "hidden" : ""
          } `}
        >
          <CallParticipantsList
            onClose={() => {
              setShowParticipants(false);
            }}
          />
        </div>
      </div>
      <div className="fixed bottom-0 flex  w-full items-center justify-center gap-5 flex-wrap">
        <CallControls />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutDashboardIcon size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white rounded-2xl p-2">
            {["Grid", "Speaker-Right", "Speaker-Left"].map((item, i) => (
              <div key={i}>
                <DropdownMenuItem
                  onClick={() => {
                    setLayout(item.toLowerCase() as CallLayoutType);
                  }}
                  className=" cursor-pointer hover:bg-[#4c535b] rounded-lg"
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button
          onClick={() => {
            setShowParticipants((prev) => !prev);
          }}
        >
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <UsersRound size={20} className="text-white" />
          </div>
        </button>
        {!isPersonal && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;

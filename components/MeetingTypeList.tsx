"use client";
import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
// import { useToast } from "@/hooks/use-toast";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Textarea } from "./ui/textarea";
// import { Router } from "next/router";
import DatePicker from "react-datepicker";
import { Input } from "./ui/input";

const MeetingTypeList = () => {
  const { user } = useUser();
  const [values, setvalues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setcallDetails] = useState<Call>();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({
          variant: "destructive",
          title: "Please Enter Date and Time",
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to generate a Call");
      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });
      setcallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Started ",
        description: "Friday, February 10, 2023 at 5:57 PM",
        action: <ToastAction altText="Goto schedule to undo">OK</ToastAction>,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong, Try again!",
      });
      console.error(error);
    }
  };

  const router = useRouter();
  const [meetingState, setmeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an Instant Meeting"
        handleClick={() => {
          setmeetingState("isInstantMeeting");
        }}
        bg_color="bg-orange-1"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => {
          setmeetingState("isScheduleMeeting");
        }}
        bg_color="bg-blue-1"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Join with link"
        handleClick={() => {
          setmeetingState("isJoiningMeeting");
        }}
        bg_color="bg-yellow-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your Recordings"
        handleClick={() => {
          router.push("/recordings");
        }}
        bg_color="bg-purple-1"
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setmeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base  text-normal leading-[22px] text-sky-2">
              Add Description
            </label>
            <Textarea
              onChange={(e) =>
                setvalues({ ...values, description: e.target.value })
              }
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0 "
            />
          </div>
          <div className="flex flex-col w-full gap-2.5">
            <label className="text-base  text-normal leading-[22px] text-sky-2">
              Select Date and Time
            </label>
            <DatePicker
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
              selected={values.dateTime}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={(date) => setvalues({ ...values, dateTime: date! })}
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setmeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setmeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setmeetingState(undefined)}
        title="Join Scedhuled Meeting "
        className="text-center"
        buttonText="Join using Invite link"
        handleClick={() => {
          router.push(values.link);
        }}
      >
        <Input
          onChange={(e) => setvalues({ ...values, link: e.target.value })}
          className="bg-dark-3 border-none focus-visible:ring-1  focus-visible:ring-offset-0 "
          placeholder="Paste your meeting link here"
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;

import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const useGetCallById = (id: string | string[]) => {
  // return value;
  const [call, setcall] = useState<Call>();
  const [isCallLoading, setisCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;
    const loadCall = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id,
        },
      });
      if (calls.length > 0) {
        setcall(calls[0]);
      }
      setisCallLoading(false);
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};

export default useGetCallById;

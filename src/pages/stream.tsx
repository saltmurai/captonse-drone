import { NextPage } from "next";
import { useEffect, useState } from "react";
import WebRTCPlayer from "~/components/WebRTCPlayer";

const Stream: NextPage = () => {
  const webrtcUrl1 =
    "http://localhost:8083/stream/d69e6af3-08d6-4197-a92a-8717119e5b32/channel/0/webrtc";
  return (
    <div className="h-screen w-screen bg-slate-500">
      <div className="flex gap-3">
        <WebRTCPlayer url={webrtcUrl1} />
      </div>
    </div>
  );
};

export default Stream;

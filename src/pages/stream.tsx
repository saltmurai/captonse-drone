import { NextPage } from "next";
import { useEffect, useState } from "react";
import WebRTCPlayer from "~/components/WebRTCPlayer";

const Stream: NextPage = () => {
  const webrtcUrl1 =
    "http://localhost:8083/stream/55e904fd-0a0f-46d5-a78d-36094cfb65b8/channel/0/webrtc";
  return (
    <div className="h-screen w-screen bg-slate-500">
      <div className="flex gap-3">
        <WebRTCPlayer url={webrtcUrl1} />
      </div>
    </div>
  );
};

export default Stream;

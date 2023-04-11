import { useEffect, useState } from "react";

const WebRTCPlayer = ({ url }: { url: string }) => {
  const [videoRef, setVideoRef] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const startPlay = async () => {
      const webrtc = new RTCPeerConnection({
        iceServers: [
          {
            urls: ["stun:stun.l.google.com:19302"],
          },
        ],
      });

      webrtc.ontrack = (event) => {
        videoRef.srcObject = event.streams[0];
        videoRef.play();
      };

      webrtc.addTransceiver("video", { direction: "sendrecv" });

      webrtc.onnegotiationneeded = async () => {
        const offer = await webrtc.createOffer();
        await webrtc.setLocalDescription(offer);

        fetch(url, {
          method: "POST",
          body: new URLSearchParams({
            data: btoa(webrtc.localDescription.sdp),
          }),
        })
          .then((response) => response.text())
          .then(async (data) => {
            try {
              await webrtc.setRemoteDescription(
                new RTCSessionDescription({ type: "answer", sdp: atob(data) })
              );
            } catch (e) {
              console.warn(e);
            }
          })
          .catch((e) => {
            console.error(e);
            setIsError(true);
          });
      };

      const webrtcSendChannel = webrtc.createDataChannel(
        "rtsptowebSendChannel"
      );
      webrtcSendChannel.onopen = (event) => {
        console.log(`${webrtcSendChannel.label} has opened`);
        webrtcSendChannel.send("ping");
      };

      webrtcSendChannel.onclose = async (_event) => {
        console.log(`${webrtcSendChannel.label} has closed`);
        await startPlay();
      };

      webrtcSendChannel.onmessage = (event) => {
        console.log(event.data);
      };
    };

    if (videoRef) {
      startPlay();
    }
  }, [url, videoRef]);

  return (
    <>
      <div className="h-40 w-52 bg-slate-300">
        {isError ? (
          <div>Error</div>
        ) : (
          <div>
            <video
              id="webrtc-video"
              ref={setVideoRef}
              autoPlay
              muted
              playsInline
              controls
            />
          </div>
        )}
      </div>
    </>
  );
};

export default WebRTCPlayer;

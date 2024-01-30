import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function Videocall() {
  const { roomId, doctorId, name } = useParams();
  const videoRef = useRef(null);

  useEffect(() => {
    const myMeeting = async () => {
      const appId = 154270616;
      const serverSecret = "0d8e200791d81cb339f1c925007d2755";

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId, doctorId, name);
      const zc = ZegoUIKitPrebuilt.create(kitToken);

      zc.joinRoom({
        container: videoRef.current,
        sharedLinks:[
            {
             name:"Copy Link",
             url:`http://localhost:5173/room/${roomId}/${doctorId}/${name}`
            }
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
      });
    };

    myMeeting();

   
  }, [roomId, doctorId, name]);

  return (
    <div>
      <div ref={videoRef} />
    </div>
  );
}

export default Videocall;

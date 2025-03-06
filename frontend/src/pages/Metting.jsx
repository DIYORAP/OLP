// import { useParams } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// export default function VideoCall() {
//     const { sessionId } = useParams();

//     const startMeeting = async (element) => {
//         if (!sessionId) {

//             console.log(sessionId)
//             return;

//         }

//         const appID = 946035114;
//         const serverSecret = "946035114f5921bfcb9139493f5538d775e6dccff";

//         // Generate Kit Token for Authentication
//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//             appID,
//             serverSecret,
//             sessionId,
//             Date.now().toString(),
//             "User"
//         );

//         // Initialize ZEGOCLOUD Meeting with Configurations
//         const zp = ZegoUIKitPrebuilt.create(kitToken);
//         zp.joinRoom({
//             container: element,
//             sharedLinks: [{ name: "Join Session", url: window.location.href }],
//             turnOnMicrophoneWhenJoining: true,
//             turnOnCameraWhenJoining: true,
//             showMyCameraToggleButton: true,
//             showMyMicrophoneToggleButton: true,
//             showAudioVideoSettingsButton: true,
//             showScreenSharingButton: true,
//             showTextChat: true,
//             showUserList: true,
//             maxUsers: 50,
//             layout: "Auto",
//             showLayoutButton: true,
//             scenario: {
//                 mode: ZegoUIKitPrebuilt.GroupCall, 
//                 config: { role: ZegoUIKitPrebuilt.Host }, 
//             },
//         });
//     };

//     return (
//         <div className="flex items-center justify-center h-screen">
//             <div ref={startMeeting} className="w-full h-full"></div>
//         </div>
//     );
// }

import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function VideoCall() {
    const { sessionId } = useParams();

    const startMeeting = async (element) => {
        if (!sessionId || !element) {
            console.error("Invalid session ID or element is not ready.");
            return;
        }

        const appID = 946035114;
        const serverSecret = "f5921bfcb9139493f5538d775e6dccff";
        const userId = "user-" + Math.floor(Math.random() * 100000);
        const userName = `User-${userId}`;

        try {
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                sessionId,
                userId,
                userName
            );

            const zp = ZegoUIKitPrebuilt.create(kitToken);
            zp.joinRoom({
                container: element,
                sharedLinks: [{ name: "Join Session", url: window.location.href }],
                turnOnMicrophoneWhenJoining: true,
                turnOnCameraWhenJoining: true,
                showMyCameraToggleButton: true,
                showMyMicrophoneToggleButton: true,
                showAudioVideoSettingsButton: true,
                showScreenSharingButton: true,
                showTextChat: true,
                showUserList: true,
                maxUsers: 50,
                layout: "Auto",
                showLayoutButton: true,
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                    role: ZegoUIKitPrebuilt.Host,
                },
            });
        } catch (error) {
            console.error("Error initializing ZEGOCLOUD:", error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div ref={startMeeting} className="w-full h-full"></div>
        </div>
    );
}

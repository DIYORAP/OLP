import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function VideoCall() {
    const { sessionId } = useParams();

    const startMeeting = async (element) => {
        if (!sessionId) {

            console.log(sessionId)
            return;

        }

        const appID = 946035114;
        const serverSecret = "946035114f5921bfcb9139493f5538d775e6dccff";

        // Generate Kit Token for Authentication
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            sessionId,
            Date.now().toString(),
            "User"
        );

        // Initialize ZEGOCLOUD Meeting with Configurations
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
                mode: ZegoUIKitPrebuilt.GroupCall, // 🎥 Group Call Mode
                config: { role: ZegoUIKitPrebuilt.Host }, // 🏠 Set as Host
            },
        });
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div ref={startMeeting} className="w-full h-full"></div>
        </div>
    );
}

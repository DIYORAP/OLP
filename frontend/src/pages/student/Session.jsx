import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const StudentSession = () => {
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState(null);
    const userId = useSelector((state) => state.user?.currentUser?._id);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const res = await axios.get("/api/meeting/sessions");
                setSessions(res.data);
            } catch (error) {
                toast.error("Error fetching Sessions")
                setError("Error fetching sessions");
                console.error("Error fetching sessions", error);
            }
        };
        fetchSessions();
    }, []);

    const joinSession = async (sessionId) => {
        try {
            await axios.post("/api/meeting/join-session", { sessionId, userId });
            navigate(`/session/${sessionId}`);
        } catch (error) {
            setError("Error joining session");
            toast.error("Error joining session")
            console.error("Error joining session", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h2 className="text-xl font-bold mt-4">Available Sessions</h2>
            <ul className="w-full max-w-2xl mt-2 flex flex-col">
                {sessions.length === 0 ? (
                    <p>No sessions available.</p>
                ) : (
                    sessions.map((session) => (
                        <li
                            key={session.sessionId}
                            className="border p-4 mb-3 rounded bg-white shadow flex justify-between items-center"
                        >
                            <div>
                                <p className="text-lg font-semibold">{session.title}</p>
                                <p className="text-sm text-gray-600">
                                    <strong>Date:</strong> {session.date}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Time:</strong> {session.time}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Instructor:</strong> {session.instructor?.username || "Unknown"}
                                </p>
                            </div>
                            <button
                                onClick={() => joinSession(session.sessionId)}
                                className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
                            >
                                Join Session
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default StudentSession;

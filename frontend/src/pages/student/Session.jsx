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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
            <h2 className="text-xl font-bold mt-4">Available Sessions</h2>
            <ul className="w-full max-w-md mt-4">
                {sessions.length === 0 ? (
                    <p>No sessions available.</p>
                ) : (
                    sessions.map((session) => (
                        <li key={session.sessionId} className="border p-3 mb-2 rounded bg-white shadow">
                            <p><strong>Title:</strong> {session.title}</p>
                            <p><strong>Date:</strong> {session.date}</p>
                            <p><strong>Time:</strong> {session.time}</p>
                            <p><strong>Instructor:</strong> {session.instructor?.username || "Unknown"}</p>
                            <button
                                onClick={() => joinSession(session.sessionId)}
                                className="mt-2 px-4 py-2 bg-green-600 text-white rounded">
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

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const InstructorSession = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState(null);
    const instructorId = useSelector((state) => state.user?.currentUser?._id);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const res = await axios.get("/api/meeting/sessions");
                setSessions(res.data);
            } catch (error) {
                setError("Error fetching sessions");
                toast.error("Error fetching sessions")
                console.error("Error fetching sessions", error);
            }
        };
        fetchSessions();
    }, []);

    const createSession = async () => {
        if (!title || !date || !time) {
            setError("Please provide session title, date, and time.");
            return;
        }

        try {
            const sessionData = {
                instructorId,
                title,
                date,
                time,
            };
            const res = await axios.post("/api/meeting/create-session", sessionData);
            setSessionId(res.data.sessionId);
            setSessions([...sessions, { ...sessionData, sessionId: res.data.sessionId }]);
        } catch (error) {
            setError("Error creating session");
            toast.error("Error creating Session")
            console.error("Error creating session", error);
        }
    };

    const joinSession = (sessionId) => {
        navigate(`/session/${sessionId}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {/* Create Session Form */}
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-lg font-bold mb-3">Create a New Session</h2>
                <input
                    type="text"
                    placeholder="Enter Session Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded w-full mb-3"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-2 rounded w-full mb-3"
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="border p-2 rounded w-full mb-3"
                />
                <button
                    onClick={createSession}
                    className="px-6 py-2 bg-black text-white rounded w-full transition"
                >
                    Create Session
                </button>
            </div>

            {/* Session Link Message */}
            {sessionId && (
                <p className="mt-4 text-center">
                    Session Created! Share this link:{" "}
                    <a href={`/session/${sessionId}`} className="text-black font-bold">
                        {`/session/${sessionId}`}
                    </a>
                </p>
            )}

            {/* All Sessions List */}
            <h2 className="text-xl font-bold mt-6">All Sessions</h2>
            <ul className="w-full max-w-md mt-4">
                {sessions.map((session) => (
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
                            Join
                        </button>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default InstructorSession;

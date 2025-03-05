import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
                console.error("Error fetching sessions", error);
            }
        };
        fetchSessions();
    }, []);

    // ✅ Create a new session
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
            console.error("Error creating session", error);
        }
    };

    // ✅ Join session (redirect to session page)
    const joinSession = (sessionId) => {
        navigate(`/session/${sessionId}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">Instructor Dashboard</h1>

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
                    className="px-6 py-2 bg-blue-600 text-white rounded w-full">
                    Create Session
                </button>
            </div>

            {/* Show Errors */}
            {error && <p className="text-red-600 mt-2">{error}</p>}

            {/* Show Created Session Link */}
            {sessionId && (
                <p className="mt-4">
                    Session Created! Share this link:{" "}
                    <a href={`/session/${sessionId}`} className="text-blue-600">{`/session/${sessionId}`}</a>
                </p>
            )}

            {/* Show List of Sessions */}
            <h2 className="text-xl font-bold mt-6">All Sessions</h2>
            <ul className="w-full max-w-md mt-4">
                {sessions.map((session) => (
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
                ))}
            </ul>
        </div>
    );
};

export default InstructorSession;

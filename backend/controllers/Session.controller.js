import Session from "../model/Session.model.js";
import User from "../model/User.model.js";

export const createSession = async (req, res) => {
  try {
    const { instructorId, title, date, time } = req.body;

    if (!title || !date || !time) {
      return res.status(400).json({ message: "Title, date, and time are required." });
    }

    const instructor = await User.findById(instructorId);
    if (!instructor || instructor.role !== "Instructor") {
      return res.status(403).json({ message: "Only instructors can create sessions" });
    }

    const sessionId = "session-" + Math.random().toString(36).substr(2, 9);
    
    const newSession = new Session({ 
      sessionId, 
      instructor: instructorId,
      title,
      date,
      time
    });

    await newSession.save();
    res.status(201).json({ success: true, sessionId });
  } catch (error) {
    res.status(500).json({ message: "Error creating session", error: error.message });
  }
};

export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("instructor", "username email");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sessions", error: error.message });
  }
};

export const joinSession = async (req, res) => {
  try {
    const { sessionId, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const session = await Session.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (!session.students.includes(userId)) {
      session.students.push(userId);
      await session.save();
    }

    res.status(200).json({ success: true, message: "Joined session successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error joining session", error: error.message });
  }
};

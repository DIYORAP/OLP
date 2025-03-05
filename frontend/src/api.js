import axios from "axios";


export const joinMeeting = async (userId, callId, role) => {
  try {
    const res = await axios.post('/api/metting/join', { userId, callId, role });
    return res.data;
  } catch (error) {
    console.error("Error joining meeting:", error);
    return null;
  }
};

export const getMeetingDetails = async (callId) => {
  try {
    const res = await axios.get(`/api/meeting/${callId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching meeting:", error);
    return null;
  }
};

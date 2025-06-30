import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the port if necessary

export const createUser = async (userData) => {
    return await axios.post(`${API_URL}/users`, userData);
};

export const getUser = async (userId) => {
    return await axios.get(`${API_URL}/users/${userId}`);
};

export const createSession = async (sessionData) => {
    return await axios.post(`${API_URL}/sessions`, sessionData);
};

export const getSessions = async () => {
    return await axios.get(`${API_URL}/sessions`);
};
export const createGoal = async (goalData) => {
    return await axios.post(`${API_URL}/goals`, goalData);
};
export const getGoals = async () => {
    return await axios.get(`${API_URL}/goals`);
};

export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/users/login`, credentials);
};
export const updateUser = async (userId, userData) => {
    return await axios.put(`${API_URL}/users/${userId}`, userData);
};
export const getUserGoals = async (userId) => {
    return await axios.get(`${API_URL}/users/${userId}/goals`);
};
export const getUserSessions = async (userId) => {
    return await axios.get(`${API_URL}/users/${userId}/sessions`);
};
export const getUserProgress = async (userId) => {
    return await axios.get(`${API_URL}/users/${userId}/progress`);
};
export const getUserAchievements = async (userId) => {
    return await axios.get(`${API_URL}/users/${userId}/achievements`);
};
export const getUserStatistics = async (userId) => {
    return await axios.get(`${API_URL}/users/${userId}/statistics`);
};
export const getUserNotifications = async (userId) => {
    return await axios.get(`${API_URL}/users/${userId}/notifications`);
};
export const getUserSettings = async (userId) => {
    return await axios.get(`${API_URL}/users/${userId}/settings`);
};
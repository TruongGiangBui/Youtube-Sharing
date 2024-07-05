import { io } from 'socket.io-client';
import configData from "./config.json";
const SERVER_URL = configData.SERVER_URL

export const socket = io(SERVER_URL);
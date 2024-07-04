import { io } from 'socket.io-client';
import configData from "./config.json";
const SERVER_URL = configData.SERVER_URL
// "undefined" means the URL will be computed from the `window.location` object
const URL = SERVER_URL;

export const socket = io(URL);
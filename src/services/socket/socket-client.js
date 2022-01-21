import io from 'socket.io-client';

const host = process.env.REACT_APP_SOCKET_HOST;
console.log('============host=========', host);
export const socket = io.connect(host, {
  transports: ['websocket'],
});

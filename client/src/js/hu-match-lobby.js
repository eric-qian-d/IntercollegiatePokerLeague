import React from "react";
import openSocket from 'socket.io-client';

export const makeSocket = (matchId) => {
  return openSocket("http://localhost:8081/" + matchId);// to make adaptable
}

export const joinTeam1 = (socket) => {
  socket.emit("JOIN TEAM 1");
}

export const joinTeam2 = (socket) => {
  socket.emit("JOIN TEAM 2");
}

export const getTeam1 = (socket) => {
  socket.emit("GET TEAM 1");
}

export const getTeam2 = (socket) => {
  socket.emit("GET TEAM 2");
}

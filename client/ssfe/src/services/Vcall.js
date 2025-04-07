import { socket } from "../App";

let localStream;
let remoteStream;
let peer;

export const initCall = async (roomName, localRef, remoteRef) => {
  peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  });

  // Get media
  localStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });

  localRef.srcObject = localStream;

  // Add tracks to peer connection
  localStream.getTracks().forEach((track) => {
    peer.addTrack(track, localStream);
  });

  // On remote stream
  peer.ontrack = (event) => {
    if (!remoteRef.srcObject) {
      remoteStream = new MediaStream();
      remoteRef.srcObject = remoteStream;
    }
    event.streams[0].getTracks().forEach((track) => {
      remoteRef.srcObject.addTrack(track);
    });
  };

  // Send ICE candidates to signaling server
  peer.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("sendIceCandidateToSignalingServer", {
        didIOffer: peer.localDescription?.type === "offer",
        iceCandidate: event.candidate,
        roomName,
      });
    }
  };

  // OFFER CREATION (Caller only)
  if (peer.localDescription?.type !== "answer") {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socket.emit("newOffer", { offer, room: roomName });
  }

  // ANSWER HANDLING (Remote only)
  socket.on("offerCreated", async ({ offer }) => {
    await peer.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    socket.emit("newAnswer", { answer, room: roomName });
  });

  // Setting remote answer (Caller side)
  socket.on("answerResponse", async ({ answer }) => {
    await peer.setRemoteDescription(new RTCSessionDescription(answer));
  });

  // Handling ICE candidate
  socket.on("iceFromServer", async ({ candidate }) => {
    try {
      await peer.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.error("Error adding ICE candidate", err);
    }
  });
};

export const endCall = async () => {
  if (peer) {
    peer.close();
    peer = null;
  }

  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    localStream = null;
  }

  if (remoteStream) {
    remoteStream.getTracks().forEach((track) => track.stop());
    remoteStream = null;
  }
};

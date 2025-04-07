import { socket } from "../App";

let localStream;
let remoteStream;
let peer;

let offerListener;
let answerListener;
let iceListener;

export const initCall = async (roomName, localRef, remoteRef, isCaller) => {
  peer = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      // { urls: "stun:global.stun.twilio.com:3478?transport=udp" },
    ],
  });

  // STEP 1: Get media
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    localRef.srcObject = localStream;
    localStream
      .getTracks()
      .forEach((track) => peer.addTrack(track, localStream));
  } catch (err) {
    console.error("Error accessing media devices", err);
    return;
  }

  // STEP 2: Remote stream handling
  remoteStream = new MediaStream();
  remoteRef.srcObject = remoteStream;
  peer.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  // STEP 3: ICE candidate sending
  peer.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("sendIceCandidateToSignalingServer", {
        iceCandidate: event.candidate,
        roomName,
      });
    }
  };

  // STEP 4: OFFER creation by caller
  if (isCaller) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socket.emit("newOffer", { offer, room: roomName });
  }

  //  STEP 5: Clean previous socket listeners
  if (offerListener) socket.off("offerCreated", offerListener);
  if (answerListener) socket.off("answerResponse", answerListener);
  if (iceListener) socket.off("iceFromServer", iceListener);

  // STEP 6: Set listeners and store refs to remove later
  offerListener = async ({ offer }) => {
    try {
      if (peer.signalingState === "stable") {
        await peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        socket.emit("newAnswer", { answer, room: roomName });
      } else {
        console.warn(
          "Skipped setting offer - invalid signaling state:",
          peer.signalingState
        );
      }
    } catch (err) {
      console.error("Error setting remote offer", err);
    }
  };

  answerListener = async ({ answer }) => {
    try {
      if (peer.signalingState === "have-local-offer") {
        await peer.setRemoteDescription(new RTCSessionDescription(answer));
      } else {
        console.warn(
          "Skipped setting answer - invalid signaling state:",
          peer.signalingState
        );
      }
    } catch (err) {
      console.error("Error setting remote answer", err);
    }
  };

  iceListener = async ({ candidate }) => {
    try {
      await peer.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.error("Error adding ICE candidate", err);
    }
  };

  socket.on("offerCreated", offerListener);
  socket.on("answerResponse", answerListener);
  socket.on("iceFromServer", iceListener);
};

// Call cleanup function
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

  if (offerListener) socket.off("offerCreated", offerListener);
  if (answerListener) socket.off("answerResponse", answerListener);
  if (iceListener) socket.off("iceFromServer", iceListener);
};

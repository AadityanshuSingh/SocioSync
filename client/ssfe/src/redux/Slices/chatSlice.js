import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    sentMessages: [],
    receivedMessages: [],
  },
  reducers: {
    // Reducer for handling sent messages
    addSentMessage: (state, action) => {
      const {user, message, timestamp } = action.payload;
      state.sentMessages.push({user, message, timestamp });
    },

    // Reducer for handling received messages
    addReceivedMessage: (state, action) => {
      const {user, message, timestamp } = action.payload;
      state.receivedMessages.push({user, message, timestamp});
    },

    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { addSentMessage, addReceivedMessage,setLoading } = chatSlice.actions;
export default chatSlice.reducer;

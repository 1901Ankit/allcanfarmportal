import { createSlice } from '@reduxjs/toolkit';

export const modal = createSlice({
    name: 'modal',
    initialState: {
        content: false
    },
    reducers: {
        showModal: (state, actions) => {
            state.content = actions.payload;
        },
        hideModal: (state) => {
            state.content = false;
        }
    }
});

export const { showModal, hideModal } = modal.actions;

export default modal.reducer;

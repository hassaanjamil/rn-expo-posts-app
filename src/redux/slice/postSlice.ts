import { PostState } from "@/types/postState"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define the initial state using that type
const initialState: PostState = {
  selectedId: -1,
}

export const postSlice = createSlice({
  name: 'post',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedId: (state, action: PayloadAction<number>) => {
      state.selectedId = action.payload
    },
  },
})

export const { setSelectedId } = postSlice.actions
export default postSlice.reducer
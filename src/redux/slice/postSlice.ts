import { PostDto } from "@/types/post"
import { PostState } from "@/types/postState"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define the initial state using that type
const initialState: PostState = {
}

export const postSlice = createSlice({
  name: 'post',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<PostDto>) => {
      state.selectedPost = action.payload
    },
  },
})

export const { setSelectedPost } = postSlice.actions
export default postSlice.reducer
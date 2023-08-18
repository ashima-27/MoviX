import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState :{
   url:{},
   genres:{}
  },
  reducers: {
    getApiConfiguration:(state,action)=>{
      console.log("getapiconfigAction",action)
         state.url=action.payload
    },
    getGenres:(state,action)=>{
      console.log("getGenresaction",action.payload)
        state.genres=action.payload
    }
  },
})

export const { getApiConfiguration,getGenres} = homeSlice.actions;

export default homeSlice.reducer;
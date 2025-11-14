import { user } from '@/utils/database'
import type { Registration } from '@/utils/types'
import { createSlice } from '@reduxjs/toolkit'

const defaultState: Registration = {
  personalInfo: {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    gender: user?.gender,
    profileImage: user?.profileImage,
    nin: '',
    driversLicense: {
      file: null,
      name: '',
      selectNewFile: true,
    },
    passport: {
      file: null,
      name: '',
      selectNewFile: true,
    },
  },
  experience: {
    service: undefined,
    certification: undefined,
    certificateFile: {
      file: null,
      name: '',
      selectNewFile: true,
    },
    experienceYears: undefined,
    previousWorkPlaces: '',
    workImage: {
      file: null,
      name: '',
      selectNewFile: true,
    },
  },
  applicationProfile: {
    country: '',
    city: '',
    address: '',
    dateOfBirth: '',
    headline: '',
  },
}

const registrationSlice = createSlice({
  name: 'checkout',
  initialState: defaultState,
  reducers: {
    addPersonalInfo: (state, action) => {
      const { personalInfo } = action.payload
      state.personalInfo = { ...state.personalInfo, ...personalInfo }
    },
    addExperience: (state, action) => {
      const { experience } = action.payload
      state.experience = { ...state.experience, ...experience }
    },
    addApplicationProfile: (state, action) => {
      const { applicationProfile } = action.payload
      state.applicationProfile = {
        ...state.applicationProfile,
        ...applicationProfile,
      }
    },
  },
})

export const { addPersonalInfo, addExperience, addApplicationProfile } =
  registrationSlice.actions

export default registrationSlice.reducer

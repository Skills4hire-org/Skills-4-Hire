import { genderOptions } from '@/assets/data'
import FormImage from '@/components/form-fields/FormImage'
import FormInput from '@/components/form-fields/FormInput'
import FormSelect from '@/components/form-fields/FormSelect'
import { Button } from '@/components/ui/button'
import { user } from '@/utils/database'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import defaultProfileImage from '../../assets/images/profile.jpg'
import type { ProfileFormData } from '@/utils/types'
import Container from '../global/Container'

export default function CustomerProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    gender: user?.gender,
    profileImage: user?.profileImage ?? defaultProfileImage,
  })
  const [activeEdit, setActiveEdit] = useState({
    firstName: true,
    lastName: true,
    phone: true,
    gender: true,
  })
  const handleActiveEdit = (key: string, value: boolean) => {
    setActiveEdit({
      ...activeEdit,
      [key]: value,
    })
  }
  const handleBlur = (prev: string | null, current: string, key: string) => {
    if (prev == current) {
      handleActiveEdit(key, true)
    } else {
      handleActiveEdit(key, false)
    }
  }
  const handleInputChange = (field: string, value: string) => {
    if (field === 'phone') {
      const newValue = value.replace(/[^0-9]/g, '')
      setFormData((prev) => ({ ...prev, [field]: newValue }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const selectedFile = e.target.files
    if (!selectedFile) return
    const isOverSize = selectedFile[0].size > MAX_SIZE_MB
    if (isOverSize) return
    const validImage = URL.createObjectURL(selectedFile[0])
    setFormData({ ...formData, profileImage: validImage })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl mx-auto space-y-6"
      >
        <div className="text-center space-y-2">
          <figure className="rounded-xl w-max mx-auto  relative">
            <img
              src={formData?.profileImage}
              alt={user?.firstName}
              className="aspect-square object-cover w-32 md:w-36 rounded-xl "
              loading="lazy"
            />
            <FormImage
              name="profileImage"
              className="absolute bottom-2 left-2"
              handleImageChange={handleImageChange}
            />
          </figure>
          <div>
            <h2 className="text-base md:text-lg font-medium -mb-0.5 md:mb-0">
              {user?.firstName} {user?.lastName}
            </h2>

            <span className=" font-semibold text-sm md:text-base -mt-0.5 text-primary block">
              24 endorsed
            </span>
            <span className="text-sm md:text-base">{user?.email}</span>
          </div>
        </div>
        <div className="space-y-3 md:space-y-4">
          <div className="relative">
            <FormInput
              name="firstName"
              value={formData.firstName}
              handleInputChange={handleInputChange}
              type="text"
              required
              className="bg-gray-300 capitalize h-11 pr-6 pl-4"
              placeholder="First Name"
              disabled={activeEdit.firstName}
              handleBlur={() =>
                handleBlur(user?.firstName, formData.firstName, 'firstName')
              }
            />
            <button
              className={`absolute top-1/2 -translate-y-1/2 text-xs text-primary right-3 cursor-pointer ${
                activeEdit.firstName || 'hidden'
              } `}
              onClick={() => handleActiveEdit('firstName', false)}
            >
              Edit
            </button>
          </div>
          <div className="relative">
            <FormInput
              name="lastName"
              value={formData.lastName}
              handleInputChange={handleInputChange}
              type="text"
              required
              className="bg-gray-300 capitalize h-11 pr-6 pl-4"
              placeholder="Last Name"
              disabled={activeEdit.lastName}
              handleBlur={() =>
                handleBlur(user?.lastName, formData.lastName, 'lastName')
              }
            />
            <button
              className={`absolute top-1/2 -translate-y-1/2 text-xs text-primary right-3 cursor-pointer ${
                activeEdit.lastName || 'hidden'
              } `}
              onClick={() => handleActiveEdit('lastName', false)}
            >
              Edit
            </button>
          </div>

          <div className="relative">
            <FormInput
              name="email"
              value={formData.email.toLowerCase()}
              handleInputChange={handleInputChange}
              type="email"
              required
              className="bg-gray-300 h-11 pl-4 pr-6 "
              placeholder="Email"
              disabled
            />
          </div>

          <div className="relative">
            <FormInput
              name="phone"
              value={formData.phone}
              handleInputChange={handleInputChange}
              type="text"
              maxLength={11}
              required
              className="bg-gray-300 capitalize h-11 pl-4 pr-6"
              placeholder="Phone Number"
              disabled={activeEdit.phone}
              handleBlur={() =>
                handleBlur(user?.phone, formData.phone, 'phone')
              }
            />
            <button
              className={`absolute top-1/2 -translate-y-1/2 text-xs text-primary right-3 cursor-pointer ${
                activeEdit.phone || 'hidden'
              } `}
              onClick={() => handleActiveEdit('phone', false)}
            >
              Edit
            </button>
          </div>

          <div className="relative">
            <FormSelect
              name="gender"
              value={formData.gender}
              handleInputChange={handleInputChange}
              selectItems={genderOptions}
              className="capitalize bg-gray-300 h-[44px] pr-6 disabled:cursor-auto"
              required
              placeholder="Gender"
              disabled={activeEdit.gender}
              handleBlur={() =>
                handleBlur(user?.gender, formData.gender, 'gender')
              }
            />
            <button
              className={`absolute top-1/2 -translate-y-1/2 text-xs text-primary right-3 cursor-pointer ${
                activeEdit.gender || 'hidden'
              } `}
              onClick={() => handleActiveEdit('gender', false)}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="w-full max-w-sm mx-auto">
          <Button type="submit" className=" py-6 w-full">
            Update Profile
          </Button>
        </div>
      </form>
    </Container>
  )
}

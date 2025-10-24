import { genderOptions } from '@/assets/data'
import FormImage from '@/components/form-fields/FormImage'
import FormInput from '@/components/form-fields/FormInput'
import FormSelect from '@/components/form-fields/FormSelect'
import Container from '@/components/global/Container'
import HeaderWithBackNavigation from '@/components/header/HeaderWithBackNavigation'
import { Button } from '@/components/ui/button'
import { user } from '@/utils/database'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import defaultProfileImage from '../assets/images/profile.jpg'

type ProfileFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  gender: string
  profileImage: string
}

export default function CustomerProfile() {
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
    email: true,
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
    <div className="space-y-2 md:space-y-4">
      <HeaderWithBackNavigation title="Profile" />
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
              <span
                className="absolute top-1/2 -translate-y-1/2 text-xs text-primary right-3"
                onClick={() => handleActiveEdit('firstName', false)}
              >
                Edit
              </span>
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
              <span
                className="absolute top-1/2 -translate-y-1/2 text-xs text-primary right-3"
                onClick={() => handleActiveEdit('lastName', false)}
              >
                Edit
              </span>
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
                disabled={activeEdit.email}
                handleBlur={() =>
                  handleBlur(user?.email, formData.email, 'email')
                }
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 text-xs text-primary right-3"
                onClick={() => handleActiveEdit('email', false)}
              >
                Edit
              </span>
            </div>

            <div className="relative">
              <FormInput
                name="phone"
                value={formData.phone}
                handleInputChange={handleInputChange}
                type="text"
                required
                className="bg-gray-300 capitalize h-11 pl-4 pr-6 "
                placeholder="Phone Number"
                disabled={activeEdit.phone}
                handleBlur={() =>
                  handleBlur(user?.phone, formData.phone, 'phone')
                }
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 text-xs text-primary right-3"
                onClick={() => handleActiveEdit('phone', false)}
              >
                Edit
              </span>
            </div>

            <div className="relative">
              <FormSelect
                name="gender"
                value={formData.gender}
                handleInputChange={handleInputChange}
                selectItems={genderOptions}
                className="capitalize bg-gray-300 h-[44px] pr-6"
                required
                placeholder="Gender"
                disabled={activeEdit.gender}
                handleBlur={() =>
                  handleBlur(user?.gender, formData.gender, 'gender')
                }
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 text-xs text-primary right-3"
                onClick={() => handleActiveEdit('gender', false)}
              >
                Edit
              </span>
            </div>
          </div>
          <div className="w-full max-w-sm mx-auto">
            <Button className=" py-6 w-full">Update Profile</Button>
          </div>
        </form>
      </Container>
    </div>
  )
}

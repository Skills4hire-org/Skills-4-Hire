import { genderOptions } from '@/assets/data'
import FormInput from '@/components/form-fields/FormInput'
import FormSelect from '@/components/form-fields/FormSelect'
import { Button } from '@/components/ui/button'
import { useState, type FormEvent } from 'react'
import Container from '../global/Container'
import { Link } from 'react-router-dom'
import { useMyProfile, useUpdateMyProfile } from '@/hooks/useUsers'
import type { Profile, ProfileFormData } from '@/types/user.types'
import Loading from '../global/Loading'
import Error from '../global/Error'
import ProfileImageDialog from '../profile/ProfileImageDialog'

import { toast } from 'sonner'

export default function CustomerProfileForm() {
  const { data, isLoading, isError, refetch } = useMyProfile()
  const user: Profile | undefined = data
  const { mutate: updateProfile, isPending } = useUpdateMyProfile()

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: undefined,
    lastName: undefined,
    phone: undefined,
    gender: undefined,
    countryCode: '+234',
  })
  const resetForm = () => {
    setFormData({
      firstName: undefined,
      lastName: undefined,
      phone: undefined,
      gender: undefined,
      countryCode: '+234',
    })
  }
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

  const handleBlur = (
    prev: string | null | undefined,
    current: string | undefined,
    key: string,
  ) => {
    if (current == '') {
      setFormData({ ...formData, [key]: undefined })
      handleActiveEdit(key, true)
    }
    if (current == undefined) {
      setFormData({ ...formData, [key]: undefined })
      handleActiveEdit(key, true)
    }
    if (
      current !== '' &&
      current != undefined &&
      prev?.toLowerCase() == current.toLowerCase()
    ) {
      handleActiveEdit(key, true)
    }
    if (
      current !== '' &&
      current != undefined &&
      prev?.toLowerCase() != current.toLowerCase()
    ) {
      handleActiveEdit(key, false)
    }
  }
  const handleInputChange = (field: string, value: string) => {
    if (field === 'phone') {
      const newValue = value.replace(/[^0-9]/g, '')
      setFormData((prev: any) => ({ ...prev, [field]: newValue }))
    } else {
      setFormData((prev: any) => ({ ...prev, [field]: value }))
    }
  }
  const handleProfileFetchingError = () => {
    refetch()
  }

  const gender =
    user?.user?.profile?.gender == ''
      ? undefined
      : user?.user?.profile?.gender.toLowerCase()

  const phoneWithoutCode = user?.user?.phone.replace('+234', '')

  const checkForm =
    (formData.firstName && formData.firstName != user?.user?.first_name) ||
    (formData.lastName && formData.lastName != user?.user?.last_name) ||
    (formData.phone && formData.phone != phoneWithoutCode) ||
    (formData.gender && formData.gender.toLowerCase() != gender)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!gender && !formData.gender) {
      toast.warning('Please select a gender')
      return
    }
    if (formData.phone && formData.phone.length !== 10) {
      toast.warning('Please enter a valid phone number')
      return
    }
    const phoneWithCode = `${formData.countryCode} ${formData.phone}`
    const phone = formData.phone && phoneWithCode

    const data = {
      profile: {
        gender:
          formData.gender?.toUpperCase() ??
          user?.user?.profile?.gender.toUpperCase(),
        user: {
          first_name: formData.firstName ?? user?.user?.first_name,
          last_name: formData.lastName ?? user?.user?.last_name,
          phone: phone ?? user?.user?.phone,
        },
      },
    }

    updateProfile(data, {
      onSuccess: () => {
        resetForm()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }
  return (
    <Container>
      {isLoading ? (
        <div className="h-24">
          <Loading />
        </div>
      ) : (
        <>
          {isError && !data ? (
            <div className="py-6">
              <Error
                text="Failed to load your profile"
                buttonFunc={handleProfileFetchingError}
              />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-xl mx-auto space-y-6"
            >
              <div className="text-center space-y-2">
                <ProfileImageDialog professional={user} />
                <div>
                  <h2 className="text-base md:text-lg font-medium -mb-0.5 md:mb-0">
                    {user?.user?.first_name} {user?.user?.last_name}
                  </h2>

                  <Link
                    to="endorsed"
                    className=" font-semibold text-sm md:text-base -mt-0.5 text-primary block w-max mx-auto capitalize hover:opacity-90"
                  >
                    {user?.endorsement_count} endorsed
                  </Link>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="relative">
                  <FormInput
                    name="firstName"
                    value={formData.firstName ?? user?.user?.first_name}
                    handleInputChange={handleInputChange}
                    type="text"
                    required
                    className="bg-gray-300 capitalize h-11 pr-6 pl-4"
                    placeholder="First Name"
                    disabled={activeEdit.firstName}
                    handleBlur={() =>
                      handleBlur(
                        user?.user?.first_name,
                        formData?.firstName,
                        'firstName',
                      )
                    }
                  />
                  <button
                    type="button"
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
                    value={formData.lastName ?? user?.user?.last_name}
                    handleInputChange={handleInputChange}
                    type="text"
                    required
                    className="bg-gray-300 capitalize h-11 pr-6 pl-4"
                    placeholder="Last Name"
                    disabled={activeEdit.lastName}
                    handleBlur={() =>
                      handleBlur(
                        user?.user?.last_name,
                        formData.lastName,
                        'lastName',
                      )
                    }
                  />
                  <button
                    type="button"
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
                    value={formData?.email?.toLowerCase() ?? user?.user?.email}
                    handleInputChange={handleInputChange}
                    type="email"
                    required
                    className="bg-gray-300 h-11 pl-4 pr-6 "
                    placeholder="Email"
                    disabled
                  />
                </div>

                <div className="relative flex items-center gap-1">
                  <FormInput
                    name="countryCode"
                    value={formData.countryCode}
                    handleInputChange={handleInputChange}
                    type="text"
                    required
                    className="bg-gray-300 capitalize h-11 w-19"
                    disabled
                  />
                  <div className="flex-1">
                    <FormInput
                      name="phone"
                      value={formData.phone ?? phoneWithoutCode}
                      handleInputChange={handleInputChange}
                      type="tel"
                      maxLength={10}
                      required
                      className="bg-gray-300 capitalize h-11 pl-4 pr-6"
                      placeholder="Phone Number"
                      disabled={activeEdit.phone}
                      handleBlur={() =>
                        handleBlur(phoneWithoutCode, formData.phone, 'phone')
                      }
                    />
                  </div>

                  <button
                    type="button"
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
                    value={formData.gender ?? gender}
                    handleInputChange={handleInputChange}
                    selectItems={genderOptions}
                    className="capitalize bg-gray-300 h-[44px] pr-6 disabled:cursor-auto"
                    required
                    placeholder="Gender"
                    disabled={activeEdit.gender}
                    handleBlur={() =>
                      handleBlur(
                        user?.user?.profile?.gender,
                        formData.gender,
                        'gender',
                      )
                    }
                  />
                  <button
                    type="button"
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
                <Button
                  type="submit"
                  className=" py-6 w-full"
                  disabled={isPending || !checkForm}
                >
                  Update Profile
                </Button>
              </div>
            </form>
          )}
        </>
      )}
    </Container>
  )
}

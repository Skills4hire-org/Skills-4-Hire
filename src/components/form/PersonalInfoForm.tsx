import { genderOptions } from '@/assets/data'
import FormImage from '@/components/form-fields/FormImage'
import FormInput from '@/components/form-fields/FormInput'
import FormSelect from '@/components/form-fields/FormSelect'
import { user } from '@/utils/database'
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import type { FileStructure, PersonalInformationFormData } from '@/utils/types'
import FormFile from '../form-fields/FormFile'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useValidateSchema } from '@/hooks/useValidateSchema'
import { personalInfoFormSchema } from '@/utils/schemas'
import { useDispatch, useSelector } from 'react-redux'
import { addPersonalInfo } from '@/features/registration/registrationSlice'
import { toast } from 'sonner'

export default function PersonalInfoForm() {
  const [files, setFiles] = useState({
    driversLicense: null,
    passport: null,
  })
  const { personalInfo }: { personalInfo: PersonalInformationFormData } =
    useSelector((state: any) => state.registrationState)
  const {
    firstName,
    lastName,
    email,
    phone,
    gender,
    profileImage,
    nin,
    driversLicense,
    passport,
  } = personalInfo
  const dispatch = useDispatch()
  const [activeEdit, setActiveEdit] = useState({
    firstName: user?.firstName === firstName,
    lastName: user?.lastName === lastName,
    phone: user?.phone === phone,
    gender: user?.gender === gender,
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
    if (field === 'phone' || field === 'nin') {
      const newValue = value.replace(/[^0-9]/g, '')
      dispatch(
        addPersonalInfo({
          personalInfo: {
            [field]: newValue,
          },
        })
      )
    } else {
      dispatch(
        addPersonalInfo({
          personalInfo: {
            [field]: value,
          },
        })
      )
    }
  }
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const selectedFile = e.target.files
    if (!selectedFile) return
    const isOverSize = selectedFile[0]?.size > MAX_SIZE_MB
    if (isOverSize) return
    const validImage = URL.createObjectURL(selectedFile[0])
    dispatch(
      addPersonalInfo({
        personalInfo: {
          profileImage: validImage,
        },
      })
    )
  }
  const fileRef = useRef<HTMLInputElement>(null)
  const handleFileChange = (
    field: string,
    file: FileList | null,
    prevFile: FileStructure
  ) => {
    const MAX_SIZE_MB = 2 * 1024 * 1024
    const FILE_TYPES = ['image/png', 'image/jpeg']
    if (!file) {
      return
    }
    if (!FILE_TYPES.includes(file[0].type) && fileRef.current) {
      fileRef.current.value = ''
      return toast(
        'File type is not acceptable. Please select JPEG, JPG, or PNG'
      )
    }
    const isOverSize = file[0]?.size > MAX_SIZE_MB
    if (isOverSize && fileRef.current) {
      fileRef.current.value = ''
      return toast.warning('File size exceeds 2MB')
    }
    if (!prevFile.file) {
      setFiles({ ...files, [field]: file })
    } else {
      // delete uploaded image logic
      dispatch(
        addPersonalInfo({
          personalInfo: {
            file: null,
            name: '',
            selectNewFile: false,
          },
        })
      )
      setFiles({ ...files, [field]: file })
    }
  }

  const handleFileUpload = (field: string, file: FileList) => {
    //uploading of image logic here
    const uploadedImage = 'uploaded'
    dispatch(
      addPersonalInfo({
        personalInfo: {
          [field]: {
            file: uploadedImage,
            name: file[0].name,
            selectNewFile: false,
          },
        },
      })
    )
    toast.success('File uploaded successfully!')
  }

  const handleSelectNewFile = (field: string, prevFile: FileStructure) => {
    dispatch(
      addPersonalInfo({
        personalInfo: {
          [field]: {
            ...prevFile,
            selectNewFile: true,
          },
        },
      })
    )
  }

  const navigate = useNavigate()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      (files.driversLicense && !driversLicense.file) ||
      (files.passport && !passport.file)
    ) {
      toast.warning('Please upload the file(s) selected.')
      return
    }
    const validateData = useValidateSchema(personalInfoFormSchema, personalInfo)
    if (!validateData) return

    navigate('/service-provider/registration/experience')
  }
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <figure className="rounded-lg w-max mx-auto  relative">
          <img
            src={profileImage}
            alt={user?.firstName}
            className="aspect-square object-cover w-32 md:w-36 rounded-lg "
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
            value={firstName}
            handleInputChange={handleInputChange}
            type="text"
            required
            className="bg-gray-300 capitalize h-11 pr-6 pl-3"
            placeholder="First Name"
            disabled={activeEdit.firstName}
            handleBlur={() =>
              handleBlur(user?.firstName, firstName, 'firstName')
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
            value={lastName}
            handleInputChange={handleInputChange}
            type="text"
            required
            className="bg-gray-300 capitalize h-11 pr-6 pl-3"
            placeholder="Last Name"
            disabled={activeEdit.lastName}
            handleBlur={() => handleBlur(user?.lastName, lastName, 'lastName')}
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
            value={email.toLowerCase()}
            handleInputChange={handleInputChange}
            type="email"
            required
            className="bg-gray-300 h-11 pl-3 pr-6 "
            disabled
          />
        </div>
        <div className="relative">
          <FormInput
            name="phone"
            value={phone}
            handleInputChange={handleInputChange}
            type="text"
            required
            maxLength={11}
            className={`bg-gray-300 capitalize h-11 pl-3 pr-6 ${
              phone.length > 0 && phone.length !== 11
                ? 'focus-visible:border-destructive focus-visible:ring-destructive border-destructive'
                : 'focus-visible:border-primary focus-visible:ring-primary'
            } `}
            placeholder="Phone Number"
            disabled={activeEdit.phone}
            handleBlur={() => handleBlur(user?.phone, phone, 'phone')}
          />
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
            value={gender}
            handleInputChange={handleInputChange}
            selectItems={genderOptions}
            className="capitalize bg-gray-300 h-[44px] pr-6 disabled:cursor-auto sm:[&>svg]:hidden"
            required
            placeholder="Gender"
            disabled={activeEdit.gender}
            handleBlur={() => handleBlur(user?.gender, gender, 'gender')}
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
        <FormInput
          name="nin"
          value={nin}
          handleInputChange={handleInputChange}
          type="text"
          required
          maxLength={10}
          className={`bg-gray-300 capitalize h-11 pr-6 pl-3 placeholder:text-foreground ${
            nin.length > 0 && nin.length !== 10
              ? 'focus-visible:border-destructive focus-visible:ring-destructive border-destructive'
              : 'focus-visible:border-primary focus-visible:ring-primary'
          }`}
          placeholder="Enter NIN"
        />
        <FormFile
          name="driversLicense"
          label="Upload drivers license (optional)"
          handleFileChange={handleFileChange}
          ref={fileRef}
          handleFileUpload={handleFileUpload}
          file={files.driversLicense}
          fileUploaded={driversLicense}
          handleSelectNewFile={handleSelectNewFile}
        />
        <FormFile
          name="passport"
          label="Upload passport"
          handleFileChange={handleFileChange}
          ref={fileRef}
          handleFileUpload={handleFileUpload}
          file={files.passport}
          fileUploaded={passport}
          handleSelectNewFile={handleSelectNewFile}
        />
      </div>
      <div className=" max-w-xs mx-auto">
        <Button type="submit" className="py-4 w-full">
          Next
        </Button>
      </div>
    </form>
  )
}

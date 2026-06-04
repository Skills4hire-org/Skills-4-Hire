import { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import FormInput from "../form-fields/FormInput";
import { Button } from "../ui/button";
import { uploadToCloudinary } from "@/utils/cloudinary";
import {api} from "@/utils/axiosConfig";
import {
  addApplicationProfile,
  clearForms,
} from "@/features/registration/registrationSlice";
import { useValidateSchema } from "@/hooks/useValidateSchema";
import { applicationProfileFormSchema } from "@/utils/schemas";
import type { Registration, RequiredFormData } from "@/utils/types";

export default function ApplicationProfileForm() {
  const { personalInfo, experience, applicationProfile, role }: Registration =
    useSelector((state: any) => state.registrationState);

  const { country, city, address, dateOfBirth, headline } = applicationProfile;

  const requiredFormData: RequiredFormData = {
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    phone: personalInfo.phone,
    nin: personalInfo.nin,
    service: experience.service,
    country,
    city,
    address,
    dateOfBirth,
    headline,
  };

  const requiredFields: (keyof RequiredFormData)[] = [
    "firstName",
    "lastName",
    "phone",
    "nin",
    "service",
    "country",
    "city",
    "address",
    "dateOfBirth",
    "headline",
  ];

  const calculateCompletionPercentage = () => {
    const filledFields = requiredFields.filter((key) => {
      const value = requiredFormData[key];
      if (key === "nin") return value?.length === 10;
      if (key === "headline") return value && value.length >= 25;
      return value !== undefined && value !== "";
    });
    return 20 + (filledFields.length / requiredFields.length) * 80;
  };

  const percentageCompletion = calculateCompletionPercentage();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    dispatch(
      addApplicationProfile({
        applicationProfile: {
          [field]: value,
        },
      }),
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!role) {
      toast.error("Please select your role first.");
      return;
    }

    const validateData = useValidateSchema(
      applicationProfileFormSchema,
      applicationProfile,
    );
    if (!validateData) return;

    setSubmitting(true);

    try {
      const serviceToPerform =
        role === "professional" ? "SERVICE_PROVIDER" : "CUSTOMER";

      await api.post("/api/v1/onboard/", {
        service_to_perform: serviceToPerform,
      });

      const uploads: {
        drivers_license?: any;
        passport_photo?: any;
        certifications?: any[];
        work_images?: any[];
      } = {};

      const driversLicenseFile = personalInfo.driversLicense.file;
      const passportFile = personalInfo.passport.file;
      const certificationFile = experience.certificateFile.file;
      const workImageFile = experience.workImage.file;

      if (driversLicenseFile instanceof File) {
        uploads.drivers_license = await uploadToCloudinary(driversLicenseFile);
      }

      if (passportFile instanceof File) {
        uploads.passport_photo = await uploadToCloudinary(passportFile);
      }

      if (certificationFile instanceof File) {
        uploads.certifications = [await uploadToCloudinary(certificationFile)];
      }

      if (workImageFile instanceof File) {
        uploads.work_images = [await uploadToCloudinary(workImageFile)];
      }

      const profilePayload = {
        professional_title:
          experience.certification ||
          `${personalInfo.firstName} ${personalInfo.lastName}`,
        headline: applicationProfile.headline,
        overview:
          experience.previousWorkPlaces ||
          experience.certification ||
          applicationProfile.headline ||
          "",
        profile: {
          gender: personalInfo.gender || "MALE",
          display_name: `${personalInfo.firstName} ${personalInfo.lastName}`,
          country: applicationProfile.country,
          city: applicationProfile.city,
          bio: experience.certification || "",
          location: applicationProfile.address,
          address: applicationProfile.address,
        },
        experience_level: "EXPERT",
        availability: "PARTIALLY",
        years_of_experience: Number(experience.experienceYears || 0),
        phone_number: personalInfo.phone,
        nin: personalInfo.nin,
        date_of_birth: applicationProfile.dateOfBirth,
        place_of_work: experience.previousWorkPlaces || "",
        category_interest: experience.service ? [experience.service] : [],
        is_certified: Boolean(experience.certification),
        certifications: uploads.certifications
          ? uploads.certifications.map((item) => ({
              file_url: item.url,
              public_id: item.public_id,
              description: experience.certification || "",
            }))
          : [],
        work_images: uploads.work_images
          ? uploads.work_images.map((item) => ({
              image_url: item.url,
              public_id: item.public_id,
              description: experience.previousWorkPlaces || "",
            }))
          : [],
        drivers_license: uploads.drivers_license
          ? {
              file_url: uploads.drivers_license.url,
              public_id: uploads.drivers_license.public_id,
            }
          : null,
        passport_photo: uploads.passport_photo
          ? {
              file_url: uploads.passport_photo.url,
              public_id: uploads.passport_photo.public_id,
            }
          : null,
      };

      await api.post("/api/v1/profile-onboard/complete/", profilePayload);

      toast.success("Registration successful!");
      dispatch(clearForms());
      navigate("/service-provider/profile");
    } catch (error: any) {
      console.error(
        "Service provider onboarding error:",
        error?.response?.data || error.message,
      );
      toast.error(
        error?.response?.data?.detail || "Registration failed. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
      <FormInput
        name="country"
        label="Country/Region"
        value={country}
        handleInputChange={handleInputChange}
        type="text"
        required
      />
      <FormInput
        name="city"
        label="City"
        value={city}
        handleInputChange={handleInputChange}
        type="text"
        required
      />
      <FormInput
        name="address"
        label="Address"
        value={address}
        handleInputChange={handleInputChange}
        type="text"
        required
      />
      <FormInput
        name="dateOfBirth"
        label="Date of Birth"
        value={dateOfBirth}
        handleInputChange={handleInputChange}
        type="date"
        required
      />
      <FormInput
        name="headline"
        label="Headline"
        value={headline}
        handleInputChange={handleInputChange}
        type="text"
        maxLength={90}
        required
      />

      <div className="max-w-xs mx-auto mt-6">
        <Button
          className="py-4 w-full"
          disabled={percentageCompletion !== 100 || submitting}
        >
          {submitting ? "Registering..." : "Register"}
        </Button>
      </div>
    </form>
  );
}

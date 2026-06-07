import { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import FormInput from "../form-fields/FormInput";
import { Button } from "../ui/button";

import { api } from "@/utils/axiosConfig";
import {
  addApplicationProfile,
  clearForms,
} from "@/features/registration/registrationSlice";

import { useValidateSchema } from "@/hooks/useValidateSchema";
import { applicationProfileFormSchema } from "@/utils/schemas";

import type { Registration } from "@/utils/types";
import { uploadIfFile } from "@/utils/uploadHelpers";

export default function ApplicationProfileForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { personalInfo, experience, applicationProfile, role }: Registration =
    useSelector((state: any) => state.registrationState);

  const { country, city, address, dateOfBirth, headline } = applicationProfile;

  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    dispatch(
      addApplicationProfile({
        applicationProfile: { [field]: value },
      }),
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valid = useValidateSchema(
      applicationProfileFormSchema,
      applicationProfile,
    );

    if (!valid) return;

    setSubmitting(true);

    try {
      const driversLicense = await uploadIfFile(
        personalInfo.driversLicense?.file,
      );

      const passport = await uploadIfFile(personalInfo.passport?.file);

      const cert = await uploadIfFile(experience.certificateFile?.file);

      const workImg = await uploadIfFile(experience.workImage?.file);

      const profilePayload = {
        professional_title: experience.service || "Service Provider",

        headline,

        overview: experience.previousWorkPlaces || headline || "",

        profile: {
          gender: personalInfo.gender || "MALE",

          display_name: `${personalInfo.firstName} ${personalInfo.lastName}`,

          country,
          city,

          bio: experience.previousWorkPlaces || "",

          location: address,
          address,
        },

        experience_level: "EXPERT",

        availability: "PARTIALLY",

        years_of_experience: Number(experience.experienceYears || 0),

        phone_number: personalInfo.phone,

        nin: personalInfo.nin,

        date_of_birth: dateOfBirth,

        place_of_work: experience.previousWorkPlaces || "",

        category_interest: experience.service ? [experience.service] : [],

        is_certified: experience.certification === "yes",

        certifications: cert
          ? [
              {
                file_url: cert.url,
                public_id: cert.public_id,
                description: "Certification document",
              },
            ]
          : [],

        work_images: workImg
          ? [
              {
                image_url: workImg.url,
                public_id: workImg.public_id,
                description: "Work sample",
              },
            ]
          : [],

        drivers_license: driversLicense
          ? {
              file_url: driversLicense.url,
              public_id: driversLicense.public_id,
            }
          : null,

        passport_photo: passport
          ? {
              file_url: passport.url,
              public_id: passport.public_id,
            }
          : null,
      };

      await api.post("/api/v1/profile-onboard/complete/", profilePayload);

      toast.success("Registration successful!");

      dispatch(clearForms());

      navigate(
        role === "service_provider"
          ? "/service-provider/profile"
          : "/customer/home",
      );
    } catch (error: any) {
      console.error(
        "Registration error:",
        error?.response?.data || error.message,
      );

      toast.error(
        error?.response?.data?.detail ||
          "Registration failed. Please try again.",
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
        <Button className="w-full py-4" disabled={submitting}>
          {submitting ? "Registering..." : "Register"}
        </Button>
      </div>
    </form>
  );
}

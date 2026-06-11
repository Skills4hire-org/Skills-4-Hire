import {
  addServices,
  deleteService,
  getMyGallery,
  getMyProfile,
  getMyServices,
  getProviderDetails,
  getProviders,
  getUserGallery,
  getUserServices,
  updateCoverPhoto,
  updateProfileImage,
} from '@/api/profile'
import type { ProviderParams, Service } from '@/types/user.types'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'

export const useAllProviders = ({
  search,
  profession,
  min_charge,
  ratings,
}: ProviderParams) => {
  const queryData = useInfiniteQuery({
    queryKey: ['providers', search, profession, min_charge, ratings],
    queryFn: ({ pageParam }) =>
      getProviders({ pageParam, search, profession, min_charge, ratings }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useMyProfile = () => {
  const getProfile = async () => {
    const profile = await getMyProfile()
    return profile
  }
  const queryData = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })
  return queryData
}

export const useMyServices = () => {
  const queryData = useInfiniteQuery({
    queryKey: ['my-services'],
    queryFn: ({ pageParam }) => getMyServices(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}
export const useUserServices = ({ id }: { id: string | undefined }) => {
  const queryData = useInfiniteQuery({
    queryKey: ['my-services'],
    queryFn: ({ pageParam }) => getUserServices({ pageParam, id }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useAddServices = () => {
  const addServicesAction = async (data: Service) => {
    try {
      await addServices(data)
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const addServicesFunction = useMutation({
    mutationFn: addServicesAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-services'] })
    },
  })

  return addServicesFunction
}
export const useDeleteService = () => {
  const deleteServiceAction = async (id?: string) => {
    try {
      await deleteService(id)
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const deleteServiceFunction = useMutation({
    mutationFn: deleteServiceAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-services'] })
    },
  })
  return deleteServiceFunction
}

export const useMyGallery = () => {
  const queryData = useInfiniteQuery({
    queryKey: ['media'],
    queryFn: ({ pageParam }) => getMyGallery(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}
export const useUserGallery = ({ id }: { id?: string }) => {
  const queryData = useInfiniteQuery({
    queryKey: ['media'],
    queryFn: ({ pageParam }) => getUserGallery({ pageParam, id }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useProfileDetails = ({ id }: { id?: string }) => {
  const getProfile = async () => {
    const profile = await getProviderDetails(id)
    return profile
  }
  const queryData = useQuery({
    queryKey: ['profile', id],
    queryFn: getProfile,
  })
  return queryData
}

export const useUpdateCoverPhoto = () => {
  const updateCoverPhotoAction = async ({
    data,
  }: {
    data: {
      image_url: string
      public_url: string
    }
  }) => {
    try {
      await updateCoverPhoto({
        data,
      })
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const updateCoverPhotoFunction = useMutation({
    mutationFn: updateCoverPhotoAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return updateCoverPhotoFunction
}

export const useUpdateProfileImage = () => {
  const updateProfileImageAction = async ({
    data,
  }: {
    data: {
      avatar: string
      avatar_public_id: string
      description: string
    }
  }) => {
    try {
      await updateProfileImage({
        data,
      })
    } catch (error: any) {
      toast.error(error?.message)
    }
  }
  const queryClient = useQueryClient()
  const updateProfileImageFunction = useMutation({
    mutationFn: updateProfileImageAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })

  return updateProfileImageFunction
}

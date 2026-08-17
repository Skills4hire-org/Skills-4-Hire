import {
  createPost,
  deletePost,
  editPost,
  getCommentReplies,
  getComments,
  getHireRequests,
  getMyComments,
  getMyMedia,
  getMyPosts,
  getOffers,
  getPost,
  getPosts,
  getRepostedBy,
  getUserComments,
  getUserPosts,
  likeComment,
  likePost,
  postComment,
  postImpression,
  postReplies,
  repost,
  unlikeComment,
  unlikePost,
  unrepost,
} from '@/api/posts'
import type {
  CreatePost,
  Post,
  PostComment,
  PostParams,
  SendComment,
} from '@/types/post.types'
import { toast } from 'sonner'
import {
  useQuery,
  useQueryClient,
  useMutation,
  useInfiniteQuery,
} from '@tanstack/react-query'

type PostsPage = {
  results: Post[]
  next?: string | null
}
type CommentsPage = {
  results: PostComment[]
  next?: string | null
}

type PostsInfiniteData = {
  pages: PostsPage[]
  pageParams: unknown[]
}

type CommentsInfiniteData = {
  pages: CommentsPage[]
  pageParams: unknown[]
}

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : String(error)

export const useCreatePost = () => {
  const createPostAction = async (data: CreatePost) => {
    try {
      await createPost(data)
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }
  const queryClient = useQueryClient()
  const createPostFunction = useMutation({
    mutationFn: createPostAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['my-posts'] })
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })

  return createPostFunction
}
export const useEditPost = () => {
  const createPostAction = async ({
    post_id,
    data,
  }: {
    post_id?: string
    data: CreatePost
  }) => {
    try {
      await editPost({
        post_id,
        data,
      })
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }
  const queryClient = useQueryClient()
  const createPostFunction = useMutation({
    mutationFn: createPostAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['my-posts'] })
    },
  })

  return createPostFunction
}
export const useDeletePost = () => {
  const deletePostAction = async ({ post_id }: { post_id?: string }) => {
    try {
      await deletePost({
        post_id,
      })
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }
  const queryClient = useQueryClient()
  const deletePostFunction = useMutation({
    mutationFn: deletePostAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['my-posts'] })
    },
  })

  return deletePostFunction
}

export const usePosts = ({ enabled = true }: { enabled?: boolean } = {}) => {
  const queryData = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage?.next ?? undefined
    },
    retry: 1,
    enabled,
  })
  return queryData
}

export const useOffers = ({
  tags_name,
  city,
  state,
  min_amount,
  max_amount,
  enabled = true,
}: PostParams & { enabled?: boolean } = {}) => {
  const queryData = useInfiniteQuery({
    queryKey: ['posts', tags_name, city, state, min_amount, max_amount],
    queryFn: ({ pageParam }) =>
      getOffers({ tags_name, city, state, min_amount, max_amount, pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage?.next ?? undefined
    },
    retry: 1,
    enabled,
  })
  return queryData
}

export const useHireRequests = ({
  tags_name,
  city,
  state,
  min_amount,
  max_amount,
  enabled = true,
}: PostParams & { enabled?: boolean } = {}) => {
  const queryData = useInfiniteQuery({
    queryKey: ['hire-requests', tags_name, city, state, min_amount, max_amount],
    queryFn: ({ pageParam }) =>
      getHireRequests({
        pageParam,
        tags_name,
        city,
        state,
        min_amount,
        max_amount,
      }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    retry: 1,
    enabled,
  })

  return queryData
}

export const useMyPosts = ({ user_id }: { user_id?: string } = {}) => {
  const queryData = useInfiniteQuery({
    queryKey: ['my-posts', user_id],
    queryFn: ({ pageParam }) => getMyPosts({ pageParam, user_id }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    enabled: !!user_id,
    retry: 1,
  })
  return queryData
}
export const useUserPosts = ({ id }: { id?: string }) => {
  const queryData = useInfiniteQuery({
    queryKey: ['user-posts'],
    queryFn: ({ pageParam }) => getUserPosts({ pageParam, id }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}
export const useMyComments = () => {
  const queryData = useInfiniteQuery({
    queryKey: ['comments'],
    queryFn: ({ pageParam }) => getMyComments(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useUserComments = ({ id }: { id?: string }) => {
  const queryData = useInfiniteQuery({
    queryKey: ['comments'],
    queryFn: ({ pageParam }) => getUserComments({ pageParam, id }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useMyMedia = ({ user_id }: { user_id?: string }) => {
  const queryData = useInfiniteQuery({
    queryKey: ['media'],
    queryFn: ({ pageParam }) => getMyMedia({ pageParam, user_id }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const usePost = ({ post_id }: PostParams) => {
  const getSinglePost = async () => {
    const post = await getPost({
      post_id,
    })
    return post
  }
  const queryData = useQuery({
    queryKey: ['post', post_id],
    queryFn: getSinglePost,
  })

  return queryData
}

export const useLikePost = (queryKey: string[]) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ post_id }: { post_id: string | undefined }) =>
      likePost({ post_id }),

    onMutate: async ({ post_id }) => {
      await queryClient.cancelQueries({ queryKey })

      const previousPosts =
        queryClient.getQueryData<PostsInfiniteData>(queryKey)

      queryClient.setQueryData<PostsInfiniteData>(queryKey, (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            results: page.results.map((post) =>
              post.post_id === post_id
                ? {
                    ...post,
                    likes_count: (post.likes_count ?? 0) + 1,
                    is_liked: true,
                  }
                : post,
            ),
          })),
        }
      })

      return { previousPosts }
    },

    onError: (_, __, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(queryKey, context.previousPosts)
      }
    },
  })
}

export const useUnlikePost = (queryKey: string[]) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ post_id }: { post_id: string | undefined }) =>
      unlikePost(post_id),

    onMutate: async ({ post_id }) => {
      await queryClient.cancelQueries({ queryKey })

      const previousPosts =
        queryClient.getQueryData<PostsInfiniteData>(queryKey)

      queryClient.setQueryData<PostsInfiniteData>(queryKey, (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            results: page.results.map((post) =>
              post.post_id === post_id
                ? {
                    ...post,
                    likes_count: Math.max((post.likes_count ?? 0) - 1, 0),
                    is_liked: false,
                  }
                : post,
            ),
          })),
        }
      })

      return { previousPosts }
    },

    onError: (_, __, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(queryKey, context.previousPosts)
      }
    },
  })
}

export const useRepost = (queryKey: string[]) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ post_id }: { post_id: string | undefined }) =>
      repost({ post_id }),

    onMutate: async ({ post_id }) => {
      await queryClient.cancelQueries({ queryKey })

      const previousPosts =
        queryClient.getQueryData<PostsInfiniteData>(queryKey)

      queryClient.setQueryData<PostsInfiniteData>(queryKey, (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            results: page.results.map((post) =>
              post.post_id === post_id
                ? {
                    ...post,
                    reposts_count: (post.reposts_count ?? 0) + 1,
                    is_reposted: true,
                  }
                : post,
            ),
          })),
        }
      })

      return { previousPosts }
    },

    onError: (_, __, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(queryKey, context.previousPosts)
      }
    },
  })
}

export const useUnrepost = (queryKey: string[]) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ post_id }: { post_id: string | undefined }) =>
      unrepost({ post_id }),

    onMutate: async ({ post_id }) => {
      await queryClient.cancelQueries({ queryKey })

      const previousPosts =
        queryClient.getQueryData<PostsInfiniteData>(queryKey)

      queryClient.setQueryData<PostsInfiniteData>(queryKey, (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            results: page.results.map((post) =>
              post.post_id === post_id
                ? {
                    ...post,
                    reposts_count: Math.max((post.reposts_count ?? 0) - 1, 0),
                    is_reposted: false,
                  }
                : post,
            ),
          })),
        }
      })

      return { previousPosts }
    },

    onError: (_, __, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(queryKey, context.previousPosts)
      }
    },
  })
}

export const useRepostedBy = ({ post_id }: { post_id: string | undefined }) => {
  const queryData = useInfiniteQuery({
    queryKey: ['repost', post_id],
    queryFn: ({ pageParam }) => getRepostedBy({ pageParam, post_id }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}

export const useComments = ({ post_id }: { post_id: string | undefined }) => {
  const queryData = useInfiniteQuery({
    queryKey: ['comments', post_id],
    queryFn: ({ pageParam }) => getComments({ pageParam, post_id }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}
export const useCommentReplies = ({
  post_id,
  comment_id,
}: {
  post_id: string | undefined
  comment_id: string | undefined
}) => {
  const queryData = useInfiniteQuery({
    queryKey: ['replies', comment_id],
    queryFn: ({ pageParam }) =>
      getCommentReplies({ pageParam, post_id, comment_id }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined
    },
    retry: 1,
  })
  return queryData
}
export const usePostComment = ({
  post_id,
}: {
  post_id: string | undefined
}) => {
  const postCommentAction = async ({
    post_id,
    data,
  }: {
    post_id: string | undefined
    data: SendComment
  }) => {
    try {
      await postComment({ post_id, data })
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }
  const queryClient = useQueryClient()
  const postCommentFunction = useMutation({
    mutationFn: postCommentAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', post_id] })
    },
  })

  return postCommentFunction
}

export const usePostReplies = ({
  comment_id,
}: {
  comment_id: string | undefined
}) => {
  const postRepliesAction = async ({
    post_id,
    comment_id,
    data,
  }: {
    post_id: string | undefined
    comment_id: string | undefined
    data: SendComment
  }) => {
    try {
      await postReplies({ post_id, comment_id, data })
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }
  const queryClient = useQueryClient()
  const postRepliesFunction = useMutation({
    mutationFn: postRepliesAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', comment_id] })
    },
  })

  return postRepliesFunction
}

export const useLikeComment = ({
  queryKey,
}: {
  queryKey: ['comments' | 'replies', string | undefined]
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ comment_id }: { comment_id: string }) =>
      likeComment({ comment_id }),

    onMutate: async ({ comment_id }) => {
      await queryClient.cancelQueries({ queryKey })

      const previousData =
        queryClient.getQueryData<CommentsInfiniteData>(queryKey)

      queryClient.setQueryData<CommentsInfiniteData>(queryKey, (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            results: page.results.map((comment) =>
              comment.comment_id === comment_id
                ? {
                    ...comment,
                    total_likes: (comment.total_likes ?? 0) + 1,
                    is_liked: true,
                  }
                : comment,
            ),
          })),
        }
      })

      return { previousData }
    },

    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData)
      }
    },
  })
}

export const useUnlikeComment = ({
  queryKey,
}: {
  queryKey: ['comments' | 'replies', string | undefined]
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ comment_id }: { comment_id: string }) =>
      unlikeComment(comment_id),

    onMutate: async ({ comment_id }) => {
      await queryClient.cancelQueries({ queryKey })

      const previousData =
        queryClient.getQueryData<CommentsInfiniteData>(queryKey)

      queryClient.setQueryData<CommentsInfiniteData>(queryKey, (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            results: page.results.map((comment) =>
              comment.comment_id === comment_id
                ? {
                    ...comment,
                    total_likes: Math.max((comment.total_likes ?? 0) - 1, 0),
                    is_liked: false,
                  }
                : comment,
            ),
          })),
        }
      })

      return { previousData }
    },

    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData)
      }
    },
  })
}

export const usePostImpression = () => {
  return useMutation({
    mutationFn: ({ post_id }: { post_id: string | undefined }) =>
      postImpression({ post_id }),
  })
}

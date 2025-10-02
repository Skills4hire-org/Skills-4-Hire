export const getBasePath = (pathname: string) => {
  return pathname.split('/').slice(0, 3).join('/')
}

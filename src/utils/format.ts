export const getBasePath = (pathname: string) => {
  return pathname.split('/').slice(0, 3).join('/')
}
export const currencyFormatter = (price: number | undefined) => {
  if (price || price == 0) {
    const amount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price)
    return amount
  }
}

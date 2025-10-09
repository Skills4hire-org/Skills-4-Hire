export const getBasePath = (pathname: string) => {
  return pathname.split('/').slice(0, 3).join('/')
}
export const currencyFormatter = (price: number | undefined) => {
  if (price || price == 0) {
    const amount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
      currencyDisplay: 'symbol',
    }).format(price)
    return amount
  }
}
export const dateFormatter = (timestamp: string | undefined | number) => {
  if (timestamp) {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })

    return formattedDate
  }
}
export const timeFormatter = (timestamp: string | undefined | number) => {
  if (timestamp) {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })

    return formattedDate
  }
}

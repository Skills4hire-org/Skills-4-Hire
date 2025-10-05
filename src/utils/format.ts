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

export const dateFormatter = (timestamp: string | undefined | number) => {
  if (timestamp) {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })

    return formattedDate
  }
}

export const timeFormatter = (timestamp: string | undefined | number) => {
  if (timestamp) {
    const date = new Date(timestamp)
    const formattedDate = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    return formattedDate
  }
}

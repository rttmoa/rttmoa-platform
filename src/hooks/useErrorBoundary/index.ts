import React from 'react'

export const ErrorBoundaryContext = React.createContext(() => {})

export const useErrorHanding = () => React.useContext(ErrorBoundaryContext)
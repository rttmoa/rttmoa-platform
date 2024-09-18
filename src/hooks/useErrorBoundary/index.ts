import React from 'react'

export const ErrorBoundaryContext = React.createContext(() => {})

export const useErrorHandleing = () => React.useContext(ErrorBoundaryContext)

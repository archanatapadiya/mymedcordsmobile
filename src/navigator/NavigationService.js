import React from 'react'

export const isReadyRef = React.createRef()

export const navigationRef = React.createRef()

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params)
  }
}

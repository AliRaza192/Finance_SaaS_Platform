"use client"
import { NewAccountSheet } from '@/features/accounts/components/NewAccountSheet'
import React from 'react'
import { useMountedState } from 'react-use'

export const SheetProvider = () => {
    
    const inMounted = useMountedState();

    if (!inMounted) return null

  return (
    <>
      <NewAccountSheet/>  
    </>
  )
}

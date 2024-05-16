"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'

export const WelcomeMsg = () => {
    const {user, isLoaded} = useUser();
  return (
    <div className='space-y-2 mb-2'>
        <h2 className='text-2xl lg:text-4xl text-white font-medium'>
            Welcome Back{isLoaded ? ", " : " "}{user?.firstName} 👋
        </h2>
        <p className='text-sm lg:text-base text-[#89b6fd]'>This is your Financial Overview Report</p>
    </div>
  )
}
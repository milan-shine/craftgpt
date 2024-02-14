import { Skeleton } from '@/components/shadcn/ui/skeleton'
import React from 'react'

export const FormLoader = () => {
  return (
    <div className="flex flex-col gap-3 mt-3">
        {
            Array.from({length: 5}).map((_, index) => (
                <Skeleton key={index} className='h-9'/>
            ))
        }
    </div>
  )
}
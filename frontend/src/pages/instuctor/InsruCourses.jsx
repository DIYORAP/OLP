import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
export default function InsruCourses() {
  return (
    <div>
      <div className='p-6'>
        <Link to="/instructor/createcourse">
          <Button>
            New Course
          </Button>
        </Link>
      </div>
    </div>
  )
}

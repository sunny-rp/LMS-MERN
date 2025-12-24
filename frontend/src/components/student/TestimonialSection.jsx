import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialSection = () => {
  return (
    <div className="pb-20 px-6 md:px-0 max-w-6xl mx-auto text-center">
      
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-gray-800">
        Testimonials
      </h2>

      <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
        Hear from our learners as they share their journey of transformation,
        success, and how our platform had made a difference in their lives.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="text-left border border-gray-200 rounded-xl bg-white shadow-md overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-100">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h3 className="text-base font-semibold text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {testimonial.role}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className="h-4"
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                  />
                ))}
              </div>

              <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                {testimonial.feedback}
              </p>
            </div>
            <a href="#" className='text-blue-500 underline px-5'>Read more</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialSection

import React from 'react'

const AppointmentForm = () => {
  
    return (
        <div className=" py-20 px-24 bg-bgtop">
          
          <form className="w-full max-w-full bg-bgbottom p-10 rounded-lg font-nunito">
            {/* Full Name and Phone Number */}
            <h2 className='text-center text-4xl uppercase font-playfair mb-10' >Book an Appointment</h2>
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  className="block w-full rounded-lg py-3 px-4 leading-tight input !focus:border-none focus:outline-none focus:ring-none "
                  type="text"
                  placeholder="Full Name"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  className="appearance-none block w-full  rounded-lg  py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Phone Number"
                />
              </div>
            </div>
    
            {/* Email Id, Patient Type, and Treatment */}
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <input
                  className="appearance-none block w-full rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="email"
                  placeholder="Email Id"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <input
                  className="appearance-none block w-full rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Patient Type"
                />
              </div>
              <div className="w-full md:w-1/3 px-3">
                <input
                  className="appearance-none block w-full rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Treatment"
                />
              </div>
            </div>
    
            {/* Insurance and Location */}
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <select
                  className="appearance-none block w-full rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>Insurance</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <select
                  className="appearance-none block w-full rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>Location</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            </div>
    
            {/* Big Text Area */}
            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3">
                <textarea
                  className="appearance-none block w-full rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  rows="4"
                  placeholder="Your message"
                ></textarea>
              </div>
            </div>
    
            <div className="flex flex-wrap mb-6 -mx-3">
  <div className="w-full px-3  mb-4">
    <label className="flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 rounded-lg text-gray-600 !focus:outline-none !focus:ring-none"
      />
      <span className="ml-2 text-gray-700">I acknowledge and accept the Terms of Use</span>
    </label>
  </div>
  <div className="w-full px-3">
    <label className="flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 rounded-lg text-gray-600 focus:outline-none focus:ring-none"
      />
      <span className="ml-2 text-gray-700">I want to subscribe for a newsletter</span>
    </label>
  </div>
</div>

<div className="flex justify-center">
          <button className='px-8 py-3 text-xl font-nunito text-[#F7F6F3] bg-primary rounded-lg shadow-xl w-[500px] '>
            REQUEST CALLBACK
          </button>
        </div>

          </form>
        </div>
      );
    
}

export default AppointmentForm
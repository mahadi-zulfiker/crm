'use client';

import React from 'react';

const RequestInfoForm = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white shadow-xl rounded-xl p-10 md:p-12 max-w-4xl mx-auto border border-gray-200">
      <p className="text-md text-gray-600 text-center mb-8 md:mb-10">
        Please fill out the form below to request more information. Our team will get back to you promptly.
      </p>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-800 mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            required
            className="form-input rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-800 mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            required
            className="form-input rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="form-input rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
            Mobile Phone
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="form-input rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="organisation" className="block text-sm font-semibold text-gray-800 mb-2">
            Organisation
          </label>
          <input
            type="text"
            id="organisation"
            className="form-input rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 py-2 px-3"
          />
        </div>
        <div>
          <label htmlFor="position" className="block text-sm font-semibold text-gray-800 mb-2">
            Position / Job Title
          </label>
          <input
            type="text"
            id="position"
            className="form-input rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 py-2 px-3"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="solutions" className="block text-sm font-semibold text-gray-800 mb-2">
            Solutions Interested In
          </label>
          <select
            multiple
            id="solutions"
            className="form-select rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 h-40 overflow-y-auto py-2 px-3"
          >
            <option>Temporary Staffing</option>
            <option>International Recruitment</option>
            <option>Managed Service Programmes</option>
            <option>Clinical Insourcing</option>
            <option>Additional Capacity</option>
            <option>Occupational Health Services</option>
            <option>RPO</option>
            <option>Workforce Consulting</option>
          </select>
          <small className="text-gray-500 block mt-1">Hold Ctrl (Windows) or Command (Mac) to select multiple</small>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="location" className="block text-sm font-semibold text-gray-800 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="form-input rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 py-2 px-3"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="details" className="block text-sm font-semibold text-gray-800 mb-2">
            Brief Details
          </label>
          <textarea
            id="details"
            className="form-textarea rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 h-36 resize-none py-2 px-3"
            placeholder="Please provide some brief details of your requirements"
          ></textarea>
        </div>
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors duration-300"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestInfoForm;

import React, { useContext, useState } from 'react'
import { assets } from '../../../../client/src/assets/assets'
import axios from 'axios'
import { AdminContext } from '../../contex/AdminContex'
import { toast } from 'react-toastify'

const AddDoctor = () => {




  // const { name, email, password, speciality, degree, experience, about, fees, address, date } = req.body;



  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [speciality , setSpeciality] = useState('General physician')
  // const [education , setEducation] = useState('')
  const [experience , setExperience] = useState(1)
  const [fees , setFees] = useState('')
  const [address1 , setAddress1] = useState('')
  const [address2 , setAddress2] = useState('')
  const [about , setAbout] = useState('')
  const [image , setImage] = useState('')
  const [degree , setDegree] = useState('')





  const {     atoken,
    setAtoken,
    backEndUrl} = useContext(AdminContext)


  const handleSubmit =  async(e) => {
    e.preventDefault();
  

    try {


      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('experience', experience)
      formData.append('fees', fees)
      formData.append('address', JSON.stringify({line : address1 , line2 : address2}))
      formData.append('about', about)
      formData.append('image', image)


      if(!image){
        return alert("Please upload an image")
      }

      const {data} =   await axios.post(`${backEndUrl}/api/admin/add_Doctor`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${atoken}`
        }
      })

    if(data.success){
      toast.success(data.message)
      setName('')
      setEmail('')
      setPassword('')
      setSpeciality('')
      setDegree('')
      setExperience('')
      setFees('')
      setAddress1('')
      setAddress2('')
      setAbout('')
      setImage('')

      // navigate('/doctor-list')
    } else {
      toast.error(data.message)
    }

    } catch (error) {
      console.log(error)
      toast.error("Failed to add doctor")

    }
  };

  return (
    <form
      className="m-5 w-full font-semibold"
      onSubmit={handleSubmit}
    >
     

  <div className='bg-white px-8 border rounded w-full max-w-4xl max-h-[80vh] py-10'>


  <div className="flex   mb-6">
        <label  htmlFor='doc-imag' className="mb-2 text-gray-700"> <img src={ image ?  URL.createObjectURL(image)   :   assets.upload_icon} alt="upload icon" className="w-20 h-20 mr-2 bg-gray-100 rounded cursor-pointer" />
             Upload doctor picture</label>
        <input  onChange={(e) => setImage(e.target.files[0])} type="file" className="hidden w-full text-sm text-gray-500 "  id='doc-imag' hidden />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Your name
          </label>
          <input
            type="text"
            name="name"
             value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Your email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Your password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Specialty
          </label>
          <select
            name="specialty"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a specialty</option>
            <option value="General Physician">General Physician</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Gynecologist">Dermatologist</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Gynecologist">Neurologist</option>
            
            
            
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
          Degree
          
          </label>
          <input
            type="text"
            name="education"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Experience
          </label>
         <select onChange={(e) => setExperience(e.target.value)} className='block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'>
            <option value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="4">4 years</option>
            <option value="5">5 years</option>
            <option value="3">6 years</option>
            <option value="4">7 years</option>
            <option value="5">8 years</option>
         </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Your fees
          </label>
          <input
            type="text"
            name="fees"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Address 1
          </label>
          <input
            type="text"
            name="address1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Address 2
          </label>
          <input
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
      
            className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          About
        </label>
        <textarea
          name="bio"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows="4"
          className="block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write about yourself"
        ></textarea>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Add Doctor
      </button>
      </div>
    </form>
  );
}

export default AddDoctor
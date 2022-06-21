import axios from 'axios'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
const initialData = {
  name:'',
    rentPrice:'',
    make:'',
    model:'',
    horsePower:'',
    img_url:'',
    category:'',
    type:'',
    stock:'',
    date:'',
    year:'',
    capacity:'',
}

const CreateForm = () => {

  const [data,setData] = useState(initialData)
  
  const chargeData = (e) => {
    setData({ ...data, [e.target.id]: e.target.value} )
  }

  const create = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/auto',data)
    .then(res => {
      setData(initialData)
      toast.success('Success...',{
        className:'bg-green-400 text-white'
      })
      console.log(res.data)
    }
    )
    .catch(err => {
      console.log(err)
      toast.error('error...')
    }
    )
  }

  return (
  <>
  <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <form onSubmit={create} className="mb-6">
      <div className='grid grid-cols-3 rounded pt-6 pb-2 mb-2'>
      <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Name
      </label>
      <input required onChange={chargeData} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={data.name} placeholder="Name" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Rent Price
      </label>
      <input required onChange={chargeData} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rentPrice" type="text" value={data.rentPrice} placeholder="rent Price" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Make
      </label>
      <input required onChange={chargeData} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="make" type="text" value={data.make} placeholder="Make" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Model
      </label>
      <input required onChange={chargeData} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="model" type="text" value={data.model} placeholder="Model" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Horse Power
      </label>
      <input required onChange={chargeData} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="horsePower" type="text" value={data.horsePower} placeholder="Horse power" />
    </div>
      <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Category
      </label>
          <select required onChange={chargeData} value={data.category} id="category" className="rounded">
            <option value=''>Select an option</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Minivan">Minivan</option>
          </select>
      </div>
      
      <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Type
      </label>
          <select required onChange={chargeData} name="type" id="type" className='rounded'>
            <option value=''>Select an option</option>
            <option value="Mecanic">Mechanic</option>
            <option value="Automatic">Automatic</option>
          </select>
      </div>
      
      <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Stock
      </label>
      <input required onChange={chargeData} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stock" type="text" value={data.stock} placeholder="Stock" />
    </div>
      
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Date
      </label>
      <input required onChange={chargeData} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date" value={data.date} placeholder="date" />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Year
      </label>
      <input required onChange={chargeData} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="year" type="text" value={data.year} placeholder="Year" />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Capacity
      </label>
      <input required onChange={chargeData} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="capacity" type="text" value={data.capacity} placeholder="Capacity" />
    </div>
    </div>
    <div>

    <button className='p-2 bg-blue-500 text-white rounded' type='submit'>Save</button>
    </div>
    </form>
    
    </>
  )
}

export default CreateForm
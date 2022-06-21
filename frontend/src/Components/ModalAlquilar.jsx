import React, {useEffect, useState} from 'react'
import axios from 'axios'

const ModalAlquilar = ({showModal, setShowModal, showId}) => {
    
  const [vehiculo, setVehiculo] = useState({})  

  useEffect(() => {
    // setShowModal(true)
      axios.get('https://alquiler-backend.vercel.app/auto/'+showId)
      // axios.get('https://notas-app2.herokuapp.com/filters'+showId)
      .then(res => setVehiculo(res.data.auto))
      .catch(console.log())

  },[])

  return (
    <>
    
    {showModal ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-10 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-6xl">
          
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              
              {/* <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  {vehiculo.make}
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div> */}
              <div className="relative p-6">
                <div className='text-center'>
                  <img className='mx-auto  pt-5 h-2/4' width={'100%'} src={vehiculo.img_url} alt="" />
                </div>
                <div className='text-left'>

                <h4 className='text-xl font-bold my-4'>{vehiculo.name}</h4>
                
                <div className='grid grid-cols-4 gap-4'>
                  <div>
                    <h4 className='border-b-2 font-bold'>Make</h4>
                    <p>{vehiculo.make}</p>
                  </div>
                  <div>
                    <h4 className='border-b-2 font-bold'>Model</h4>
                    <p>{vehiculo.model}</p>
                  </div>
                  <div>
                    <h4 className='border-b-2 font-bold'>Category</h4>
                    <p>{vehiculo.category}</p>
                  </div>
                  <div>
                    <h4 className='border-b-2 font-bold'>Type</h4>
                    <p>{vehiculo.type}</p>
                  </div>
                  <div>
                    <h4 className='border-b-2 font-bold'>Stock</h4>
                    <p>{vehiculo.stock}</p>
                  </div>
                  <div>
                    <h4 className='border-b-2 font-bold'>Capacity</h4>
                    <p>{vehiculo.capacity}</p>
                  </div>
                </div>
                <form action="" className='my-4 border-2 rounded p-3'>
                <div className='flex justify-around gap-4'>
                  <div>
                    <label className='block'>
                          Nombre
                      </label>
                    
                    <input type="text" className="
                      mt-1
                      block
                      w-96
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                      " placeholder="Nombre completo" />
                  </div>
                  <div>
                    <label className='block'>
                    CI
                      </label>
                    <input type="text" className="
                      mt-1
                      block
                      w-96
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                      " placeholder="Documento Identidad" />
                  </div>
                  </div>
                  <div className='flex justify-around'>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                      From (date)
                    </label>
                    <input required className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date"  placeholder="date" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                      To (date)
                    </label>
                    <input required className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date"  placeholder="date" />
                  </div>
                  </div>
                </form>
                </div>
              </div>
              
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 outline-red-600 hover:shadow-lg rounded mr-2 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null}
  </>
  )
}

export default ModalAlquilar
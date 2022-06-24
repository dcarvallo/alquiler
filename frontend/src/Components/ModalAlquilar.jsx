import {useEffect, useState} from 'react'
import axios from 'axios'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const ModalAlquilar = ({showModal, mensajeReservar,setShowModal, showId}) => {
  
  const [vehiculo, setVehiculo] = useState({})  
  const [reserved, setReserved] = useState([])
  const [name,setName] = useState('')
  const [ci,setCi] = useState('')
  const [dateFrom,setDateFrom] = useState('')
  const [dateTo,setDateTo] = useState('')
  const [errorTo,setErrorTo] = useState('')
  const url = process.env.REACT_APP_API;

  useEffect(() => {
      axios.get(url +"/auto/"+showId)
      .then(res => {
        setVehiculo(res.data.auto)
        setReserved(res.data.reserved)
      } 
      )
      .catch(err => console.log(err))

  },[])

  function reserve(e){
    e.preventDefault()
    axios.post(url + "/reserve", {
      name,ci,dateFrom,dateTo,carId:vehiculo._id
    }).then(res => {
      mensajeReservar()
      
  }
    )
    .catch(err => console.log(err))
    
  }

  function changeDataFrom(e){
    setDateFrom(e.target.value)
    setDateTo(e.target.value)
  }

  function changeDataTo(e){
    if(e.target.value < dateFrom || e.target.value < new Date().toISOString().split("T")[0] ){
      setErrorTo('Fecha invalida')
      console.log('fecha invalida',new Date().toISOString().split("T")[0])
    }
    else{
      setDateTo(e.target.value)
      setErrorTo('')
    }
  }

  return (
    <>
    
    {showModal ? (
      <Modal open={showModal} onClose={setShowModal} showCloseIcon={false} center>
       
              <div className="p-6">
                <h4 className='text-xl font-bold my-4'>{vehiculo.name}</h4>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                <div className='text-center'>
                  <img className='mx-auto h-60' src={vehiculo.img_url} alt="" />
                </div>
                                
                <div className='grid grid-cols-1 sm:grid-cols-3 '>
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
                  <div className='my-6'>
                    <h4 className='border-b-2 font-bold'>Reservas vigentes</h4>
                    <ul className='list-disc list-inside'>
                      {reserved.length && reserved.map(res => (
                        <li key={res._id}>{res.dateFrom.slice(0,10).replaceAll('-','/')} - {res.dateTo.slice(0,10).replaceAll('-','/')}</li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className='text-left'>
                  <h2 className='text-lg font-bold'>Hacer reservacion</h2>
                <form action="" className='my-4 border-2 rounded p-3'>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                  <div>
                    <label className='block'>
                          Nombre
                      </label>
                    
                    <input type="text" className="
                      mt-1
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                      " placeholder="Nombre completo" value={name} required onChange={e => setName(e.target.value)}/>
                  </div>
                  <div>
                    <label className='block'>
                    CI
                      </label>
                    <input type="text" className="
                      mt-1
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                      " placeholder="Documento Identidad" required value={ci} onChange={e => setCi(e.target.value)}/>
                  </div>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2'>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                      From (date)
                    </label>
                    <input min={new Date().toISOString().split("T")[0]} required className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date"  placeholder="date" value={dateFrom}  onChange={changeDataFrom} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                      To (date)
                    </label>
                    <input min={new Date().toISOString().split("T")[0]} required className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date"  placeholder="date" value={dateTo} onChange={changeDataTo}/>
                    {errorTo && <p className='text-red-400'>{errorTo}</p>}
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
                  onClick={reserve}
                >
                  Reservar
                </button>
              </div>
      </Modal>
    ) : null}
  </>
  )
}

export default ModalAlquilar
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
const Contenido = () => {
    const [vehiculos,setVehiculos]=useState([])
    useEffect(() => {
      const cargarVehiculos = ()=>{ 
        axios.get('https://private-anon-c22db172e5-carsapi1.apiary-mock.com/cars')
        .then((res)=>{
            setVehiculos(res.data)
            console.log(res.data)
        })
      }
      cargarVehiculos();
      
    }, [])
    
  return (
    <div className='grid grid-cols-3 gap-4 px-10 pt-14'>
      {vehiculos.map(vehiculo => (

        <div key={vehiculo.id} className="tarjeta pt-2 relative">
          
          <div className='flex absolute '>

            <img className='mx-2 w-3/5 object-cover overflow-hidden rounded-tl-2xl rounded-bl-2xl imagen' src={vehiculo.img_url} alt="" />
            <div className='text-left '>
              <p><strong>Marca:</strong> {vehiculo.make}</p>
              <p><strong>Modelo:</strong> {vehiculo.model}</p>
              <p><strong>Año:</strong> {vehiculo.year}</p>
              <p><strong>Caballo fuerza:</strong> {vehiculo.horsepower}</p>
              <p><strong>Precio: </strong>{vehiculo.price}</p>

            </div>
          </div>
            <div className='absolute bottom-5 right-5'>
              <a className=' bg-slate-500 p-2 rounded text-white' href='#'>Seleccionar</a>
            </div>
        
        </div>
      ))}
    </div>
  )
}

export default Contenido
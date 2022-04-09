import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ModalAlquilar from './ModalAlquilar'
import ReactPaginate from 'react-paginate';
import SideBar from './SideBar';

const Contenido = () => {
    const [vehiculos,setVehiculos]=useState([])
    const [buscar, setBuscar] = useState("");
    const [filtro, setFiltro] = useState({buscar: "", categoria: 'Mediano'});
    const [searchResults, setSearchResults] = useState([]);
    const [totalCount,setTotalCount] = useState(0);
    const [pageNumber,setPageNumber] = useState(1);
    const [pageSize,setPageSize] = useState(9);


    const handleChange = event => {
      setFiltro({...filtro, buscar: event.target.value});
    };
    const pageCount = Math.ceil( totalCount / pageSize);
    
    const changePage = ({selected}) => {
      setPageNumber(selected + 1);
    }

    const metodoBuscar = (event) => { 
      if(event.key === 'Enter'){
        setFiltro({...filtro, buscar: buscar})
      }
    }

    const cargarVehiculos = () => { 
      axios.get('http://localhost:4000/auto',{
        params:{
          filter: { 
            'buscar': filtro.buscar,
            'categoria': filtro.categoria
          },
          page: pageNumber, 
          perPage: pageSize,
          total: totalCount
        }
      })
      .then((res)=>{
        // console.log('sefsefsef',res)
        setTotalCount(res.data.total)

        setVehiculos(res.data.docs)
      })
    }

    useEffect(() => {
      
      cargarVehiculos();
      console.log(filtro)
    }, [filtro,pageNumber])
    
  return (
    <div>
      <div className="flex justify-center pt-5">
        <div className="mb-3 xl:w-96">
          <div className="input-group relative flex items-stretch w-full mb-4">
            <input value={filtro.buscar} onChange={handleChange} onKeyPress={metodoBuscar} type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Buscar marca de vehiculo" aria-label="buscar" aria-describedby="button-addon3"/>
          </div>
        </div>
      </div>
      
      <div className='grid  grid-cols-12 container mx-auto gap-2'>
        <div className="col-span-2 col-start-2 text-center border rounded border-stone-400" >
          <SideBar filtro={filtro} setFiltro={setFiltro} />
        </div>
      
        <div className='col-span-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 '>
        { vehiculos.length>0 ? vehiculos.map(vehiculo => (

            <div key={vehiculo.id} className="tarjeta pt-2 relative shadow-slate-300 shadow-xl rounded-2xl border-t-4 border-t-orange-400">
              
              <div className='flex flex-row space-x-1  absolute'>

                <img className='mx-2 h-44 ml-0 flex-auto sm:w-full basis-3/5 object-cover overflow-hidden rounded-tl-2xl rounded-bl-2xl imagen' src={vehiculo.img_url} alt="" />
                <div className='md:text-left sm:basis-2/5'>
                  <p><strong>Marca:</strong> {vehiculo.make}</p>
                  <p><strong>Modelo:</strong> {vehiculo.model}</p>
                  {/* <p><strong>Año:</strong> {vehiculo.year}</p> */}
                  <p><strong>Caballo fuerza:</strong> {vehiculo.horsepower}</p>
                  <p><strong>Precio: </strong>{vehiculo.price}</p>
                  <p><strong>Capacidad: </strong>{vehiculo.capacity} asientos</p>

                </div>
              </div>
                <div className='absolute bottom-5 right-5'>
                  <ModalAlquilar vehiculo={vehiculo}/>
                </div>
            </div>
          ))
          : <p>No hay coindidencias</p>
        }
        </div>
      </div>
      <hr className='h-8 mt-8'/>
      <div className='w-full mx-auto'>
        {pageCount > 0 ?
        <ReactPaginate
        previousLabel="Atras"
        nextLabel="Siguiente"
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        />
      : null }
      </div>
    </div>
  )
}

export default Contenido
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ModalAlquilar from './ModalAlquilar'
import ReactPaginate from 'react-paginate';
import SideBar from './SideBar';
import {Link} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import ReactImageAppear from 'react-image-appear';

const url = process.env.REACT_APP_API + "/auto"

const Contenido = () => {
    const [vehiculos,setVehiculos]=useState([])
    const [filVehiculos, setFilVehiculos] = useState([])
    const [buscar, setBuscar] = useState("");
    const [filtro, setFiltro] = useState({buscar: "", categoria: 'Medium'});
    const [searchResults, setSearchResults] = useState([]);
    const [totalCount,setTotalCount] = useState(0);
    const [pageNumber,setPageNumber] = useState(1);
    const [pageSize,setPageSize] = useState(9);
    const [showModal, setShowModal] = useState(false);
    const [showId,setShowId] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingImage, setLoadingImage] = useState({id: false })


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

    const showData = (id) => {
      setShowModal(true)
      setShowId(id)
    }

    const cargarVehiculos = () => { 
      setLoading(true)
      axios.get(url,{
        params:{
          filter: { 
            'buscar': filtro.buscar,
            'category': filtro.categoria
          },
          page: pageNumber, 
          perPage: pageSize,
          total: totalCount
        }
      })
      .then((res)=>{
        setTotalCount(res.data.total)
        setFilVehiculos(res.data.docs)
        setVehiculos(res.data.docs)
        setLoading(false)
      })
    }

    useEffect(() => {
      
      cargarVehiculos();
    }, [filtro,pageNumber])

    function mensajeReservar(){
      toast.success('Success...',{
        className:'bg-green-400 text-white'
      })
      setShowModal(false)
    }
    function onLoad(index){
      if (index === vehiculos.length - 1) {
        console.log("loaded");
      }
    }
    
  return (
    <div>
      <Toaster
      position="top-right"
      reverseOrder={false}
    />
      <div className="flex mb-3 justify-center pt-5 items-center">
        <div className=" xl:w-96">
            <input value={filtro.buscar} onChange={handleChange} onKeyPress={metodoBuscar} type="search" className="form-control flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Buscar marca de vehiculo" aria-label="buscar" aria-describedby="button-addon3"/>
        </div>
        <div className='ml-2'>

        <Link to='/createForm'>
          <p className='p-2 bg-blue-500 text-white rounded'>
            Crear auto
            </p> 
            </Link>
        </div>
      </div>
      
      <div className=' grid grid-cols-1 sm:grid-cols-12 justify-center container mx-auto gap-2'>
        <div className="justify-center sm:col-start-1 sm:col-end-3 text-center border rounded border-stone-400 mb-8 pb-6" >
          {/* { loading ? <p>...</p> :  */}
          <SideBar setFilVehiculos={setFilVehiculos} vehiculos={vehiculos} filVehiculos={filVehiculos} filtro={filtro} setFiltro={setFiltro} /> 
          {/* } */}
        </div>
      
        <div className='justify-center sm:col-start-3 sm:col-end-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 '>
        { filVehiculos.length > 0 ? filVehiculos.map(vehiculo => (

            <div key={vehiculo._id} className="tarjeta pt-2 relative shadow-slate-300 shadow-xl rounded-2xl border-t-4 border-t-orange-400">
              
              <div className='grid grid-cols-2 px-1 gap-1'>
                <ReactImageAppear 
                  src={vehiculo.img_url}
                  animation="blurInRight"
                  animationDuration="1.2s"
                  alt="Car image"
                  
              />
                <div className='md:text-left sm:basis-2/5 text-center'>
                  <div className='text-center'>
                    <span className='text-xs text-gray-400 text-center'>Marca</span> 
                    <hr />
                  <p>{vehiculo.make}</p>
                  </div>
                  <div className='text-center'>
                    <span className='text-xs text-gray-400 text-center'>Modelo</span> 
                    <hr />
                  <p>{vehiculo.model}</p>
                  </div>
                  <div className='text-center'>
                    <span className='text-xs text-gray-400 text-center'>Categoria</span> 
                    <hr />
                  <p> {vehiculo.category}</p>
                  </div>
                  <div className='text-center'>
                    <span className='text-xs text-gray-400 text-center'>Rent Price</span> 
                    <hr />
                  <p> {vehiculo.rentPrice}</p>
                  </div>
                
                </div>
              </div>
                <div className='absolute bottom-5 right-5'>
                  <button className='bg-blue-500 text-white p-1 rounded' onClick={() => showData(vehiculo._id)}>Select</button>
                </div>
            </div>
          ))
          : loading ? <p>Cargando...</p> :<p>No hay coincidencias</p>
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
      {showModal && <ModalAlquilar mensajeReservar={mensajeReservar} showId={showId} showModal={showModal} setShowModal={setShowModal} />}
    </div>
  )
}

export default Contenido
import React, {useState} from 'react'


const ModalAlquilar = (props) => {
    const [showModal, setShowModal] = useState(false);
  return (
    <>
    <button
      className="bg-blue-500 text-white active:bg-blue-600 text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none font-bold focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      onClick={() => setShowModal(true)}
    >
      Seleccionar
    </button>
    {showModal ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-6xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  {props.vehiculo.make}
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6">
                <div className='text-center'>
                  <img className='mx-auto' src={props.vehiculo.img_url} alt="" />
                </div>
                <div className='text-left'>

                <h4 className='text-xl'>Descripcion</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore facere ut, doloremque, et ipsum aliquid inventore nostrum alias ipsam ducimus nulla fuga aliquam reiciendis praesentium placeat asperiores perspiciatis nobis quasi!</p>
                <form action="">
                  <div>
                    <label className='block'>
                    {/* <span class="text-gray-700">Nombre completo</span> */}

                    <input type="text" class="
                      mt-1
                      block
                      w-96
                      rounded-md
                      border-gray-300
                      shadow-sm
                      focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                      " placeholder="Nombre completo" />
                    </label>
                  </div>
                </form>
                </div>
              </div>
              {/*footer*/}
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
                  Guardar
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
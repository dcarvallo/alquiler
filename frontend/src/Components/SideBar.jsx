import 'rc-slider/assets/index.css';

import {useState, useEffect} from 'react';
import axios from 'axios';

const SideBar = (props) => {

  const [category,setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const [categorySel, setCategorySel] = useState("Medium")
  
  
  useEffect(()=>{
   
      cargarFiltros();
  }, []);

  const cargarFiltros = () => { 
    setLoading(true)
    const url = process.env.REACT_APP_API + "/filters"
    axios.get(url)
    .then((res)=>{
      console.log(res.data)
      setCategory(res.data.category)
      // setPriceRange(res.data.priceRange)   
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const selcat = (cat) => {
    setCategorySel(cat)
    props.setFiltro({...props.filtro, categoria: cat})
  }
  const sliderFunc = (e)=> {
    // if(props.pages > 1){
      props.setFiltro({...props.filtro, rangePrice: e});
    // }
    // else {
      // const data = props.vehiculos.filter( ve => ve.rangePrice >= e[0] && ve.rangePrice <= e[1]) 
      // props.setFilVehiculos(data)
    // } 
  }
  function percentFormatter(v) {
    return `${v} %`;
  }

  return (
      <>
        <h4 className='underline font-bold my-4'>Filtros </h4>
      <div className='flex flex-col flex-wrap items-center'>
        { loading ? <p>...</p> : category.map((fil)=>(
          <div key={fil} onClick={() => {selcat(fil)} } className={`w-24 bg-white rounded-lg shadow-md p-2 hover:cursor-pointer mb-3 ${categorySel === fil ? 'bg-blue-200' : ''}`}>
            <div className='flex justify-between'>
              <h3 className='text-xs tracking-wide text-blue-900 '>{fil}</h3>
              { categorySel === fil ? 
              
                <svg className="w-4 h-4" width="200px" height="200px" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g id="checkmark-outline" fillRule="nonzero">
                          <path d="M31.1442786,171.840796 C5.2779518,146.858262 -5.09578082,109.862896 4.01023318,75.0738981 C13.1162472,40.2848999 40.2848999,13.1162472 75.0738981,4.01023318 C109.862896,-5.09578082 146.858262,5.2779518 171.840796,31.1442786 C209.549474,70.1869539 209.010186,132.247241 170.628714,170.628714 C132.247241,209.010186 70.1869539,209.549474 31.1442786,171.840796 Z" id="Shape" fill="#97EB00"></path>
                          <polygon id="Path" fill="#00836D" points="66.6666667 89.4527363 89.5522388 112.437811 132.338308 69.6517413 146.268657 83.7810945 89.5522388 140.298507 52.7363184 103.482587 66.6666667 89.3532338"></polygon>
                      </g>
                  </g>
                </svg>
              
              : 
                <svg className="w-4 h-4" width="200px" height="200px" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g id="checkmark-outline" fillRule="nonzero">
                          <path d="M31.1442786,171.840796 C5.2779518,146.858262 -5.09578082,109.862896 4.01023318,75.0738981 C13.1162472,40.2848999 40.2848999,13.1162472 75.0738981,4.01023318 C109.862896,-5.09578082 146.858262,5.2779518 171.840796,31.1442786 C209.549474,70.1869539 209.010186,132.247241 170.628714,170.628714 C132.247241,209.010186 70.1869539,209.549474 31.1442786,171.840796 Z" id="Shape" fill="#ddd"></path>
                          {/* <polygon id="Path" fill="#00836D" points="66.6666667 89.4527363 89.5522388 112.437811 132.338308 69.6517413 146.268657 83.7810945 89.5522388 140.298507 52.7363184 103.482587 66.6666667 89.3532338"></polygon> */}
                      </g>
                  </g>
                </svg>
              }
            </div>
          </div>
          ))
        }
        <hr />
        
        <h4 className='underline font-bold my-4'>Rango Precio</h4>

        <div  className="flex flex-col items-start">
          <div className='flex justify-start'>
          
          <input
            name='price'
            value={1}
            type="radio"
            id='300'
            
            onChange={() => props.setFiltro({...props.filtro, rangePrice: 0})}
            className="h-4 w-4 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500"
            />
          <label
            htmlFor='300'
            className="ml-3 cursor-pointer text-sm text-gray-600"
            >
            Menor que 300
          </label>
            </div >
            <div  className='flex  justify-start'>

          <input
            name='price'
            value={2}
            type="radio"
            id='500'
            defaultChecked
            onChange={() => props.setFiltro({...props.filtro, rangePrice: 1})}
            className="h-4 w-4 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor='500'
            className="ml-3 cursor-pointer text-sm text-gray-600"
            >
            entre 300 y 500
          </label>
          </div>
          <div  className='flex justify-start'>

          <input
            name='price'
            value={3}
            type="radio"
            id='600'
            onChange={() => props.setFiltro({...props.filtro, rangePrice: 2})}
            className="h-4 w-4 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500"
            />
          <label
            htmlFor='600'
            className="ml-3 cursor-pointer text-sm text-gray-600"
            >
            Mayor a 500
          </label>
            </div>
        </div>

        {/* <RangeSlider onChange={sliderFunc} style={{width: '80%'}} range marks={marks} min={priceRange[0]} max={priceRange[1]} step='50' 
        pushable
        draggableTrack  defaultValue={[300,500]} 
        tipFormatter={percentFormatter}
        /> */}
        <div>

        </div>
      </div>
    </>
  )
}

export default SideBar
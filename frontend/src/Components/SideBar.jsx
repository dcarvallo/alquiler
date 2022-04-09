import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SideBar = (props) => {

  const [category,setCategory] = useState([])
  const [priceRange,setPriceRange] = useState([])

  const [categorySel, setCategorySel] = useState("Mediano")
  
  useEffect(()=>{
    const cargarFiltros = () => { 
      axios.get('http://localhost:4000/filters')
      .then((res)=>{
        setCategory(res.data.category)
        setPriceRange(res.data.priceRange)   
        
      })
      .catch((err)=>{
        console.log(err)
      })
      cargarFiltros();
    }}, []);

  const selcat = (cat) => {
    props.setFiltro({...props.filtro, categoria: cat})
    setCategorySel(cat)
    // console.log(props.filtro)
  }
  const handleMin = (e)=> {
    console.log('test', e)
  }

  return (
      <>
        <p className='underline font-bold my-4'>Filtros </p>
      <div className='flex flex-col flex-wrap items-center'>
        { category.map((fil)=>(
          <div key={fil.tamanio} onClick={() => {selcat(fil.tamanio)} } className={`w-24 bg-white rounded-lg shadow-md p-2 hover:cursor-pointer mb-3 ${categorySel === fil.tamanio ? 'bg-blue-200' : ''}`}>
            <div className='flex justify-between mb-2'>
              <h3 className='text-xs tracking-wide text-blue-900 '>{fil.tamanio}</h3>
              { categorySel === fil.tamanio ? 
              
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
        <input
        onChange={handleMin}
          type="range"
          class="
            range-min absolute w-full -top-1 bg-transparent appearance-none pointer-events-none
          "
          min="0"
          max="5"
          step="0.5"
          id="customRange3"
        />
        <div>

        </div>
      </div>
    </>
  )
}

export default SideBar
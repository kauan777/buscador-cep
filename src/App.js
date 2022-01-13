import { FaSearch } from 'react-icons/fa'
import './style.css'
import { motion } from 'framer-motion'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import api from './services/api'

function App() {

  const [text, setText] = useState('')

  const [cep, setCep] = useState({})

  async function handleSearch(){

    if(text === ''){
      toast.error("Campo vazio", {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
      return;
    }

    try{
      const response = await api.get(`${text}/json`);

        if(response.data.erro == true){
          toast.error("CEP inválido", {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          })
          setText("")
          return;
        }

        setCep(response.data)  
        setText("")
      }catch{
      toast.error("Erro ao buscar", {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      })
      setText("")
    }
  }

  const icon = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  }

  return (
    <>
    <div><Toaster/></div>
    <div className="container">
      <motion.h1 className="title"
      variants={icon}
      initial="hidden"
      animate="visible"
      >Buscador de CEP</motion.h1>

      <motion.div className="container-input"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30
      }}>
        <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Digite seu cep..."
        />
        <button 
        className="button-search"
        onClick={() => handleSearch()}
        >
          <FaSearch size={20} color='#fff'/>
        </button>
      </motion.div>

{Object.keys(cep).length > 0 && (<motion.main className='main'
      initial={{scale: 0, opacity: 0}}
      animate={{scale: 1, opacity: 1}}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 30
      }}
      >
          <h2>
            CEP: {cep.cep}
          </h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
      </motion.main>
)}
 </div>
    </>
  );
}

export default App;

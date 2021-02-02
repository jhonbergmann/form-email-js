import React, {useState} from 'react'
import Lottie from 'react-lottie'
import Modal from 'react-modal'
import emailjs from 'emailjs-com'

import jsonLottie from '../src/lottie/contact-json.json'

import './App.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#000',
    borderRadius: 20,
  },
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: jsonLottie,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

export default function App() {
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function sendEmail(e) {
    e.preventDefault()

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID').then(
      (result) => {
        console.log(result.text)

        openModal()
      },
      (error) => {
        console.log(error.text)

        alert('Poxa, tivemos algum problema, tente mais tarde!')
      },
    )
  }

  return (
    <div className="app-container">
      <div className="form-container">
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
          <div className="contact-modal">
            <button className="contact-button" onClick={closeModal}>
              X
            </button>
            <h1>Que legal!</h1>
            <p>Mensagem enviada com sucesso!</p>
          </div>
        </Modal>
        <form className="contact-form" onSubmit={sendEmail}>
          <label>Nome</label>
          <input className="inputs" type="text" name="user_name" placeholder="Entre com seu nome" required />
          <label>Telefone</label>
          <input className="inputs" type="tel" name="contact_number" placeholder="Entre com seu telefone" required />
          <label>Email</label>
          <input className="inputs" type="email" name="user_email" placeholder="Entre com seu email" required />
          <label>Mensagem</label>
          <textarea name="message" required />
          <input className="button" type="submit" value="Enviar" />
        </form>
      </div>
      <div className="lottie-container">
        <Lottie options={defaultOptions} height={'80%'} width={'80%'} />
      </div>
    </div>
  )
}

import { useState } from 'react';
import axios from 'axios';
import './Form.css';

export default function Form() {
    const [responseMessage, setResponseMessage] = useState("");
    const [mail, setMail] = useState('');
    const [succes,setSucces]=useState(false)

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3050/submit", { mail });
            console.log(response.data.data.message)
            if (response.data.message) {
                setResponseMessage(response.data.data.message);
            }
            setSucces(true)
            setTimeout(()=>{
                setSucces(false)
            },1500)
           
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    }

    return (
        <form onSubmit={submit} className="wrapp-formulario flex flex-col w-96 md:w-2/4 lg:w-2/5 items-center justify-center bg-white p-6 py-10 rounded-lg shadow-md">
            <h3 className='mensaje text-center'>Danos tu mail para recibir mas información</h3>
            <label className="w-full mb-4">
                <input
                    placeholder='Introduce tu mail'
                    type="text"
                    name="email"
                    autoComplete="email"
                    value={mail}
                    onChange={e => setMail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </label>
            <button
                type="submit"
                className=" btn-enviar w-full text-white font-bold py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                ¡Entérate primero!
            </button>
             <p className={`succesMessage bg-green-600 rounded p-1 mt-4 text-white font-bold ${succes ? 'succesMessageVisible' :'succesMessageClosed'}`}>Email guardado con éxito</p>
        </form>
    );
}

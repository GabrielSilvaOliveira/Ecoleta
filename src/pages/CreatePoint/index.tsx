import React from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import {Map, TileLayer, Marker} from 'react-leaflet';
const CreatePoint = () => {
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to ="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form action ="">
                <h1>Cadastro do <br/>Ponto de Coleta</h1>    

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                </fieldset>

                <div className="field">
                   <label htmlFor="name">Nome da Entidade</label>
                   <input
                        type = "text"
                        name = "name"
                        id = "name"
                    />
                </div>

                <div className="field-group">
                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type = "email"
                            name = "email"
                            id = "email"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="whatsapp">Whatsapp</label>
                        <input
                            type = "text"
                            name = "whatsapp"
                            id = "whatsapp"
                        />
                    </div>                    
                </div>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                </fieldset>
                
                <Map center={[-20.5073937,-54.5766121]} zoom={15}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position = {[-20.5073937,-54.5766121]}/>
                </Map>

                <div className="field-group">
                    <div className="field">
                        <label htmlFor="uf">Estado (UF)</label>
                        <select name = "uf" id = "uf">
                            <option value ="0">Selecione uma UF</option>
                        </select>    
                    </div>
                    <div className="field">
                       <label htmlFor="city">Cidade</label>
                       <select name="city" id="city">
                            <option value = "0">Seleciona uma cidade</option>
                       </select> 
                    </div>
                </div>
                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className = "items-grid">
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste"/>
                            <span>Óleo de cozinha</span>    
                        </li>
                        <li className = "selected">
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste"/>
                            <span>Óleo de cozinha</span>    
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste"/>
                            <span>Óleo de cozinha</span>    
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste"/>
                            <span>Óleo de cozinha</span>    
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste"/>
                            <span>Óleo de cozinha</span>    
                        </li>
                        <li>
                            <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste"/>
                            <span>Óleo de cozinha</span>    
                        </li>

                    </ul>
                </fieldset>

                <button type= "submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    
    );

};

export default CreatePoint;
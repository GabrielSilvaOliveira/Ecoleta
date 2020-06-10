import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import {Map, TileLayer, Marker} from 'react-leaflet';
import api from '../../service/api';
import Axios from 'axios';
import {LeafletMouseEvent} from 'leaflet';

//sempre que cria um estado para um array ou objeto precisamos manualmente informar o tipo da variavel que será armazenado
interface Item {
    id: number;
    title: string;
    image_url:string;
}

interface IBGEUFResponse{
    sigla: string;
}

interface IBGEUFResponse{
    sigla: string;
}

interface IBGECityResponse{
    nome: string;
}

const CreatePoint = () => {

    const [itens, setItens] = useState<Item[]>([]); //estado de itens
    const [ufs, setUfs] = useState<string[]>([]); //estado de ufs;
    const [selectedUF, setSelectedUF] = useState('0'); //estado de ufs selecionadas
    const [cities, setCities] = useState<string[]>([]); //estado de cidades
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    const [InitialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
    const [FormData, setFormData] = useState({
        name:'',
        email:'',
        whatsapp:'',
    });
    const [selectedItens, setSelectedItens] = useState<number[]>([]);

    //useEffect Itens
    useEffect(() => {
        api.get('itens').then(response =>{
            setItens(response.data);
        });
    }, []); //useEffect é uma função do react que tem dois parâmetros, a função que vou usar e quando vou usar essa função
    
    //useEffect pegar UFs do IBGE
    useEffect(() => {
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
        Axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitial = response.data.map(uf => uf.sigla); 
            setUfs(ufInitial);
        });
    }, []);

    //carregar as cidades sempre que a UF mudar
    useEffect(() => {
        if(selectedUF === '0'){
            return;
        }

        Axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome); 
            setCities(cityNames);
        });

    }, [selectedUF]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
           const{ latitude, longitude } = position.coords;
           setInitialPosition([latitude, longitude]); 
        });
    });
    
    //toda vez que o usuario selecionar um estado através do event.target.value saberemos qual foi o estado selecionado
    function handleSelectUF(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;
        setSelectedUF(uf);
    }
     
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;
        setSelectedCity(city);
    }
 
    function handleMapClick(event: LeafletMouseEvent){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;

        setFormData({...FormData, [name]: value});
    }

    function handleSelectItem(id: number){
        const alreadySelected = selectedItens.findIndex(item => item === id);

        if(alreadySelected >= 0){
            const filteredItems = selectedItens.filter(item => item !== id);
            setSelectedItens(filteredItems);
        }else{
            setSelectedItens([...selectedItens, id]);
        }
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const{name, email, whatsapp} = FormData;
        const uf = selectedUF;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const itens = selectedItens;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            itens
        };

        await api.post('points', data);

        alert('Ponto de Coleta criado!');

    }
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to ="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
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
                        onChange={handleInputChange}
                    />
                </div>

                <div className="field-group">
                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type = "email"
                            name = "email"
                            id = "email"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="whatsapp">Whatsapp</label>
                        <input
                            type = "text"
                            name = "whatsapp"
                            id = "whatsapp"
                            onChange={handleInputChange}
                        />
                    </div>                    
                </div>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                </fieldset>
                
                <Map center={InitialPosition} zoom={15} onClick={handleMapClick}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position = {selectedPosition}/>
                </Map>

                <div className="field-group">
                    <div className="field">
                        <label htmlFor="uf">Estado (UF)</label>
                        <select name = "uf" id = "uf" value={selectedUF} onChange={handleSelectUF}>
                            <option value ="0">Selecione uma UF</option>
                            {ufs.map(uf => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>    
                    </div>
                    <div className="field">
                       <label htmlFor="city">Cidade</label>
                       <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                            <option value = "0">Selecione uma cidade</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                       </select> 
                    </div>
                </div>
                <fieldset>
                    <legend>
                        <h2>Itens de Coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className = "items-grid">
                        {
                        itens.map(item => (
                            <li key={item.id} onClick={() => handleSelectItem(item.id)}>
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>    
                            </li>
                        ))//map() me permite fazer uma varredura num array
                        };
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
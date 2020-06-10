import React from 'react';

//Esse HeaderProps é utilizado para definir os meus parâmetros do meu componente
interface HeaderProps{
    title: string;
}
//Estou usando React.FC que define um genérico e assim é possível gerarmos parâmetros para minha const Header;
const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    );
}

export default Header;
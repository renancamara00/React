import Main from '../templates/Main'

export default function Home() {
    return(
        <Main icon="home" title="Inicio" subtitle="Segundo projeto do capitulo de react">
            <div className='display-4'>Bem Vindo</div>
            <hr />
            <p className="mb-0">Sistema para exemplificar a construção de um cadastro desenvolvido em React</p>
        </Main>
    )
}
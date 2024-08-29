import '../assets/styles/index.css'

function Home() {
  return (
    <>
        <article>
            <ul className="nav-menu">
                <li className="content-menu">
                    <img className="logo" src="/img/logo.jpg" alt=""/>
                    <ul className="supmenu">
                        <li className="content-supmenu">
                            <button className="btn">Registrate</button>
                        </li>
                        <li className="content-supmenu">
                            <button className="btn">Iniciar seción</button>
                        </li>
                    </ul>
                </li>   
            </ul>
        </article>
    </>
  )
}

export default Home
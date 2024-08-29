import '../assets/styles/index.css'

function Nav() {

  return (
    <>
    <ul className="nav-menu">
        <li className="content-menu">
            <ul className="supmenu-nav">
                <li className="content-supmenu-nav">
                    <a href="http://">Home</a>
                </li>
                <li className="content-supmenu-nav">
                    <a href="http://">Sobre mí</a>
                </li>
                <li className="content-supmenu-nav">
                    <a href="http://">contacto</a>
                </li>
            </ul>
        </li>   
        
    </ul>
    </>
  )
}

export default Nav
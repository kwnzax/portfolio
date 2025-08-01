import '../assets/css/components/skills.css'
import BtnDelete from './button/BtnDelete'
import AdminAcces from './AdminAcces'

function Skills({ id, logo, name, level }) {

    let progressColor = "";
    if (level >= 60) progressColor = "green";
    else if (level >= 40) progressColor = "yellow";
    else if (level >= 20) progressColor = "orange";
    else progressColor = "red";

    return (
        <div className="skillsCard">
            <img src={logo} alt={'logo'+ name} className="skillsLogo" />
            <div className='skillsContent'>
                <h3>{name}</h3>
                <p>Niveau de maitrise</p>
                <div className='skillsLvl'>
                    <div className="progressBar">
                        <div className={`progressFill ${progressColor}`} style={{ width: `${level}%` }}></div>
                    </div>
                    <p className="progressLvl">{level}%</p>
                </div>
            </div>
            <AdminAcces>
                <BtnDelete id={id} type="skills" onDelete={() => window.location.reload()}/>
            </AdminAcces>
        </div>
    )
}

export default Skills
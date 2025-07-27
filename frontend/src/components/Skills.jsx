import '../assets/css/components/skills.css'
import BtnUpdate from './button/BtnUpdate'
import BtnDelete from './button/BtnDelete'
import AdminAcces from './AdminAcces'

function Skills({ logo, name, level }) {

    let progressColor = "";
    if (level >= 80) progressColor = "green";
    else if (level >= 60) progressColor = "yellow";
    else if (level >= 40) progressColor = "orange";
    else progressColor = "red";

    return (
        <div className="skillsCard">
            <img src={logo} alt={name} className="skillsLogo" />
            <div className='skillsContent'>
                <h4>{name}</h4>
                <p>Niveau de maitrise</p>
                <div className='skillsLvl'>
                    <div className="progressBar">
                        <div className={`progressFill ${progressColor}`} style={{ width: `${level}%` }}></div>
                    </div>
                    <p className="progressLvl">{level}%</p>
                </div>
            </div>
            <AdminAcces>
                <BtnUpdate />
                <BtnDelete />
            </AdminAcces>
        </div>
    )
}

export default Skills
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import '../assets/css/components/about.css'

function About() {
    return (
        <div className="about" id='about'>
            <div className='aboutText'>
                <h2>À propos de moi</h2>
                <p>Une soif d’apprentissage, une détermination dans l’épreuve et une curiosité audacieuse pour l’inconnu !<br /> Je m’appelle Kenza et je suis développeuse Web junior diplômée de Openclassrooms.</p>
            </div>
            <div className='aboutAnim'>
                <DotLottieReact
                    src="https://lottie.host/4fd68821-8008-45e2-a3ed-3658df09c90d/NW5r38SiHX.lottie"
                    loop
                    autoplay
                />
            </div>
        </div>
    )
}

export default About
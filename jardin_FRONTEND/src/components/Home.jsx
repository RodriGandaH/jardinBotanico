import React from 'react';
import Carrusel from './planta/Carrusel';

function Home() {

    const imgInstalaciones = [
        { id: 1, image: "/instalaciones/IMG_4098.JPG", local: true },
        { id: 2, image: "/instalaciones/IMG_4099.JPG", local: true },
        { id: 3, image: "/instalaciones/IMG_4106.JPG", local: true },
        { id: 4, image: "/instalaciones/IMG_4107.JPG", local: true },
        { id: 5, image: "/instalaciones/IMG_4108.JPG", local: true },
        { id: 6, image: "/instalaciones/IMG_4226.JPG", local: true },
    ];

    const imgSenderos = [
        { id: 7, image: "/senderos/IMG_4092.JPG", local: true },
        { id: 8, image: "/senderos/IMG_4095.JPG", local: true },
        { id: 9, image: "/senderos/IMG_4096.JPG", local: true },
        { id: 10, image: "/senderos/IMG_4101.JPG", local: true },
        { id: 11, image: "/senderos/IMG_4103.JPG", local: true },
        { id: 12, image: "/senderos/IMG_4251.JPG", local: true },
    ];

    const imgJardin = [
        { id: 13, image: "/jardin/IMG_4093.JPG", local: true },
        { id: 14, image: "/jardin/IMG_4102.JPG", local: true },
        { id: 15, image: "/jardin/IMG_4227.JPG", local: true },
        { id: 16, image: "/jardin/IMG_4229.JPG", local: true },
        { id: 17, image: "/jardin/IMG_4254.JPG", local: true },
    ];

    return (
        <>
            <h2>Jardín Botánico Martín Cárdenas</h2>
            <img className='mt-1 rounded' src={"/jardin.jpg"} style={{ maxHeight: "500px", width: "100%" }} />
            <div className='mt-3' style={{ whiteSpace: "pre-wrap" }}>
                <p>El <b>Jardín Botánico Martín Cárdenas</b> se encuentra ubicado en la ciudad de Cochabamba, es miembro de la <i>Asociación de Jardines Botánicos de Latinoamérica y del Caribe</i> (<b>ALCJB</b>), y presenta trabajos para la <b>Agenda Internacional para la Conservación en los Jardines Botánicos</b>, su código de reconocimiento internacional como institución botánica es COCHA.</p>
                <p>El jardín tiene la finalidad de contribuir a la conservación de los recursos vegetales de la región, realizando investigaciones científicas y enseñando a través de sus instalaciones sobre áreas de botánica y medio ambiente.</p>
                <p>El <b>Jardín Botánico Martín Cárdenas</b> posee variadas secciones como el área de Bromelias, Cactus, Amarilis, Arboretum con muchas especies nativas y exóticas. Además de esas secciones también tiene las secciones de Plantas medicinales y Vivero. También existe el <b>Herbario Forestal Nacional «Martín Cárdenas»</b>, creado en 1976 y que cuenta con aproximadamente 40,000 especies de toda Bolivia en las instalaciones de la Universidad Mayor de San Simón, además de una biblioteca especializada en temas de botánica.</p>
                <p>Los senderos del jardín permiten descubrir cómodamente las diferentes especies mostradas, además de contar con zonas de recreación para disfrutar de la naturaleza y un paseo relajante.</p>
            </div>
            <div className="d-flex px-5 justify-content-between border-top border-bottom">
                <div className="me-5">
                    <Carrusel imagenes={imgInstalaciones} height={"350px"} heightCont={"400px"} width={"525px"} />
                    <p className='text-secondary'>Instalaciones/secciones del Jardín Botánico Martín Cárdenas</p>
                </div>
                <div className="ms-5">
                    <Carrusel imagenes={imgSenderos} height={"350px"} heightCont={"400px"} width={"525px"} />
                    <p className='text-secondary'>Senderos del Jardín Botánico Martín Cárdenas</p>
                </div>
            </div>
            <h4 className='mt-2'>Historia</h4>
            <div>
                <p>El <b>Jardín Botánico Martín Cárdenas</b> surgió como un homenaje al más grande de los botánicos bolivianos <b>Martín Cárdenas Hermosa</b>, nacido en Cochabamba, gran investigador de campo, y fundador de la Facultad de Biología de la <b>Universidad Mayor de San Simón</b> y rector de la misma durante dos gestiones.</p>
                <p>Entre los objetivos del jardín botánico se encuentran el de promover la investigación, la enseñanza y el de exhibición de la flora de la provincia de Cochabamba, así como la conservación de la diversidad florística y de sus endemismos. Fue creado en 1962.</p>
            </div>
            <div className="d-flex justify-content-center">
                <img className='mt-1 rounded' src={"/martin_cardenas.png"} style={{ maxHeight: "275px", maxWidth: "100%" }} />
            </div>
            <div className='mt-3 border-top'>
                <h4 className="mt-2">Visión</h4>
                <p>El <b>Jardín Botánico Martín Cárdenas</b> aspira a ser líder en la investigación y divulgación de las propiedades medicinales de las plantas en Bolivia, convirtiéndose en un referente nacional e internacional en el estudio de la Botánica Médica. Busca ser agente de cambio en la percepción de la medicina, fomentando la integración de la Medicina Tradicional Andina con enfoques médicos modernos. A través de sus esfuerzos, se visualiza un futuro donde el conocimiento ancestral y la ciencia coexisten armoniosamente para mejorar la salud y el bienestar de la comunidad.</p>
            </div>
            <div className='mt-3 border-top'>
                <h4 className="mt-2">Misión</h4>
                <p>Promover la investigación y valoración de las plantas medicinales en Bolivia, destacando su importancia histórica y científica. Buscando rescatar y difundir el conocimiento de la Medicina Tradicional Andina, integrándola con la medicina institucionalizada. Al mismo tiempo busca contribuir al bienestar de la sociedad mediante la promoción de prácticas saludables basadas en la rica diversidad de plantas medicinales.</p>
                <p>Para ello el <b>Jardín Botánico Martín Cárdenas</b> tiene como objetivos específicos:</p>
                <div className="px-5">
                    <p>&#x2022; Reunir y mantener una colección viva de plantas medicinales del Valle de Cochabamba.</p>
                    <p>&#x2022; Introducir poblaciones representativas de especies amenazadas o en peligro de extinción.</p>
                    <p>&#x2022; Registrar el conocimiento empírico tradicional que sirve de base para el uso de la flora nacional.</p>
                    <p>&#x2022; Contribuir a la enseñanza objetiva de nuestras especies de valor medicinal y promover la investigación botánica.</p>
                    <p>&#x2022; Proveer material vegetal tanto para la formación de herbarios, como de ejemplares vivos para la ampliación de las Secciones Técnicas de Plantas Medicinales en el Jardín Botánico.</p>
                    <p>&#x2022; Estudiar los caracteres: Morfológico, Anatómico, Taxonómico, Fisiológico y Ecológico de las diferentes especies medicinales.</p>
                    <p>&#x2022; Evaluar a través de ensayos químicos y clínicos la calidad de los principios activos de las especies medicinales recolectadas.</p>
                    <p>&#x2022; Dirigir y asesorar Tesis de Grado y trabajos de investigación científica en el campo de las plantas medicinales.</p>
                    <p>&#x2022; Promover exploraciones botánicas a diferentes regiones del país, a fin de incrementar la colección de especies medicinales.</p>
                    <p>&#x2022; Realizar la publicación de artículos científicos de la flora de plantas medicinales nativas y exóticas.</p>
                    <p>&#x2022; Prestar asesoramiento y cooperación técnica a otras instituciones estatales y privadas en problemas relacionados con el uso de plantas medicinales.</p>
                </div>
            </div>
            <h4 className='mt-2 border-top pt-2'>Galería de fotos</h4>
            <div className="d-flex justify-content-center">
                <div className="ms-5 mt-2">
                    <Carrusel imagenes={imgJardin} height={"450px"} heightCont={"475px"} width={"675px"} />
                    <p className='text-secondary'>Fotos del Jardín Botánico Martín Cárdenas</p>
                </div>
            </div>
            <h4 className='mt-2 pt-2 border-top'>Visítanos</h4>
            <div className="d-flex justify-content-center mt-3">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1903.8598311148169!2d-66.14094356120476!3d-17.377217536084565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e376a7e1e70947%3A0x4e5f923bbc6932c7!2zSmFyZMOtbiBCb3TDoW5pY28gTWFydMOtbiBDw6FyZGVuYXM!5e0!3m2!1ses-419!2sbo!4v1702501628605!5m2!1ses-419!2sbo"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </>
    );
}

export default Home;

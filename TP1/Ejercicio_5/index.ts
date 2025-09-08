import {Moto} from './classMoto.ts';
import {Camioneta} from './classCamioneta.ts';

const motito = new Moto("ADF 234", "Verde", "Gilera", 126000, 600);
motito.avanzar();
motito.consultarKm();
console.log(`El cilindrado de la moto es ${motito.consultarCilindrada()}`);
motito.consultarBateria();

const camionetita = new Camioneta("ASF 123", "Gris", "F100", 660000, true, 4);
camionetita.avanzar();
camionetita.consultarKm();
console.log(`El numero de puertas de la camioneta es ${camionetita.consultarNumeroDePuertas()}`);

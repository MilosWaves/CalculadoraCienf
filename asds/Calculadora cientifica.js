

function CrearCalculadora() {
    let pantalla = '0';
    let memoria = null;
    let operacionPendiente = null;
    let necesitaReset = false;
    let modoAngulo = 'GRADOS';

    const formatearNumero = (num) => {
        const numero = parseFloat(num);
        return numero % 1 === 0 ? numero.toString() : numero.toFixed(8).replace(/\.?0+$/, '');
    };

    
    const actualizarSalida = () => {
        console.log(` Pantalla: ${pantalla}`);
        if (memoria !== null && operacionPendiente) {
            console.log(`   Memoria: ${memoria} ${operacionPendiente}`);
        }
        console.log(`   Modo Ángulo: ${modoAngulo}`);
    };

    const esNumeroValido = (valor) => {
        return !isNaN(parseFloat(valor)) && isFinite(valor);
    };

    const ingresarDigito = (digito) => {
        if (necesitaReset) {
            pantalla = digito.toString();
            necesitaReset = false;
        } else {
            pantalla = pantalla === '0' ? digito.toString() : pantalla + digito;
        }
        actualizarSalida();
    };

    const ingresarPunto = () => {
        if (necesitaReset) {
            pantalla = '0.';
            necesitaReset = false;
            actualizarSalida();
            return;
        }
        
        if (!pantalla.includes('.')) {
            pantalla += '.';
            actualizarSalida();
        }
    };

    const establecerOperacion = (op) => {
        if (operacionPendiente && !necesitaReset) {
            calcularResultado();
        }
        
        if (esNumeroValido(pantalla)) {
            memoria = parseFloat(pantalla);
            operacionPendiente = op;
            necesitaReset = true;
            actualizarSalida();
        } else {
            console.error(' Valor no válido para operación');
        }
    };

    const calcularResultado = () => {
        if (memoria === null || operacionPendiente === null) return;
        
        const valorActual = parseFloat(pantalla);
        
        if (!esNumeroValido(valorActual)) {
            console.error(' No se puede operar con valores no numéricos');
            return;
        }

        let resultado;
        try {
            switch (operacionPendiente) {
                case '+':
                    resultado = memoria + valorActual;
                    break;
                case '-':
                    resultado = memoria - valorActual;
                    break;
                case '×':
                    resultado = memoria * valorActual;
                    break;
                case '÷':
                    if (Math.abs(valorActual) < 1e-10) {
                        throw new Error('División por cero');
                    }
                    resultado = memoria / valorActual;
                    break;
                case '^':
                    resultado = Math.pow(memoria, valorActual);
                    break;
                default:
                    return;
            }
            
            pantalla = formatearNumero(resultado);
            operacionPendiente = null;
            memoria = null;
            necesitaReset = true;
            actualizarSalida();
        } catch (error) {
            console.error(` Error: ${error.message}`);
            limpiarCalculadora();
        }
    };


    const raizCuadrada = () => {
        const num = parseFloat(pantalla);
        if (num < 0) {
            console.error(' No existe raíz de número negativo');
            return;
        }
        pantalla = formatearNumero(Math.sqrt(num));
        necesitaReset = true;
        actualizarSalida();
    };

    const raizCubica = () => {
        pantalla = formatearNumero(Math.cbrt(parseFloat(pantalla)));
        necesitaReset = true;
        actualizarSalida();
    };

    const funcionSeno = () => {
        let angulo = parseFloat(pantalla);
        if (modoAngulo === 'GRADOS') {
            angulo = angulo * Math.PI / 180;
        }
        pantalla = formatearNumero(Math.sin(angulo));
        necesitaReset = true;
        actualizarSalida();
    };

    const funcionCoseno = () => {
        let angulo = parseFloat(pantalla);
        if (modoAngulo === 'GRADOS') {
            angulo = angulo * Math.PI / 180;
        }
        pantalla = formatearNumero(Math.cos(angulo));
        necesitaReset = true;
        actualizarSalida();
    };

    const funcionTangente = () => {
        let angulo = parseFloat(pantalla);
        if (modoAngulo === 'GRADOS') {
            angulo = angulo * Math.PI / 180;
        }
        
        if (Math.abs(Math.cos(angulo)) < 1e-10) {
            console.error(' Tangente no definida para este ángulo');
            return;
        }
        
        pantalla = formatearNumero(Math.tan(angulo));
        necesitaReset = true;
        actualizarSalida();
    };

    const cambiarModoAngulo = () => {
        modoAngulo = modoAngulo === 'GRADOS' ? 'RADIANES' : 'GRADOS';
        console.log(` Modo ángulo cambiado a: ${modoAngulo}`);
    };

    const limpiarCalculadora = () => {
        pantalla = '0';
        memoria = null;
        operacionPendiente = null;
        necesitaReset = false;
        actualizarSalida();
    };

    const mostrarAyuda = () => {
        console.log('\n Cómo usar esta calculadora:');
        console.log('─────────────────────────────');
        console.log('Operaciones básicas:');
        console.log('- ingresarDigito(1-9)  - Ingresa un dígito');
        console.log('- ingresarPunto()      - Agrega punto decimal');
        console.log('- establecerOperacion("+") - Establece operación (+, -, ×, ÷, ^)');
        console.log('- calcularResultado()  - Realiza el cálculo');
        console.log('\nFunciones científicas:');
        console.log('- raizCuadrada()       - Calcula √x');
        console.log('- raizCubica()         - Calcula ∛x');
        console.log('- funcionSeno()        - Calcula sen(x)');
        console.log('- funcionCoseno()      - Calcula cos(x)');
        console.log('- funcionTangente()    - Calcula tan(x)');
        console.log('- cambiarModoAngulo()  - Cambia entre GRADOS/RADIANES');
        console.log('\nOtras funciones:');
        console.log('- limpiarCalculadora() - Reinicia la calculadora');
        console.log('- mostrarAyuda()       - Muestra este mensaje');
        console.log('─────────────────────────────\n');
    };

    console.log(' Calculadora Científica Inicializada');
    mostrarAyuda();
    actualizarSalida();

    return {
        ingresarDigito,
        ingresarPunto,
        establecerOperacion,
        calcularResultado,
        raizCuadrada,
        raizCubica,
        funcionSeno,
        funcionCoseno,
        funcionTangente,
        cambiarModoAngulo,
        limpiarCalculadora,
        mostrarAyuda,
        obtenerPantalla: () => pantalla
    };
}

const miCalculadora = CrearCalculadora();
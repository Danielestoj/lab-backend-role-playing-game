const { Personaje } = require('./src/classes/Personaje');
const Explorador = require('./src/classes/Explorador');

console.log('1) Probando Personaje directamente:');

try {
  const personaje = new Personaje({
    id: 1,
    nombre: 'Prueba',
    especie: 'humano',
    categoria: 'guerrero',
  });

  personaje.habilidadEspecial();
} catch (error) {
  console.log(error.message);
}

console.log('\n2) Probando una clase hija que SI implementa habilidadEspecial:');

const explorador = new Explorador({
  id: 2,
  nombre: 'Lyshara',
  especie: 'elfo',
  categoria: 'explorador',
});

console.log(explorador.habilidadEspecial());

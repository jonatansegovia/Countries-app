//TODO------------------------BASE DE DATOS-------------------------
// País con las siguientes propiedades:
// --Country
//* ID (Código de 3 letras) * BUSCAR BIEN CUAL ES EL CÓDIGO
//* Nombre *
//* Imagen de la bandera *
//* Continente *
//* Capital *
//* Subregión
//* Área
//* Población

//  Actividad Turística con las siguientes propiedades:
// --Activities //! BUSCAR DE DONDE CONSUMO ESTO
// ID
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)

//* Relación entre ambas entidades debe ser de muchos a muchos

//TODO------------------------BACKEND-------------------------
// GET /countries:
//* En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos
//* y luego ya utilizarlos desde allí (Debe almacenar solo los datos necesarios para la ruta principal)
//* Obtener un listado de los paises.

// GET /countries/{idPais}:
//* Obtener el detalle de un país en particular
//* Debe traer solo los datos pedidos en la ruta de detalle de país
//? Incluir los datos de las actividades turísticas correspondientes // hice algo pero no sé si está bien

// GET /countries?name="...":
//* Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
//* Si no existe ningún país mostrar un mensaje adecuado

//POST /activity:
//* Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
//* Crea una actividad turística en la base de datos

//TODO------------------------FRONTEND-------------------------
// Se debe desarrollar una aplicación de React/Redux que contenga las siguientes pantallas/rutas.

// Pagina inicial: deben armar una landing page con

//  Alguna imagen de fondo representativa al proyecto
//  Botón para ingresar al home (Ruta principal)
// Ruta principal: debe contener

//  Input de búsqueda para encontrar países por nombre
//  Área donde se verá el listado de países. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /countries y deberá mostrar su:
// Imagen de la bandera
// Nombre
// Continente
//  Botones/Opciones para filtrar por continente y por tipo de actividad turística
//  Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países por orden alfabético y por cantidad de población
//  Paginado para ir buscando y mostrando los siguientes paises, 10 paises por pagina, mostrando los primeros 9 en la primer pagina.
// Ruta de detalle de país: debe contener

//  Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
//  Código de país de 3 letras (id)
//  Capital
//  Subregión
//  Área (Mostrarla en km2 o millones de km2)
//  Población
//  Actividades turísticas con toda su información asociada
// Ruta de creación de actividad turística: debe contener

//  Un formulario controlado con los siguientes campos
// Nombre
// Dificultad
// Duración
// Temporada
//  Posibilidad de seleccionar/agregar varios países en simultaneo
//  Botón/Opción para crear una nueva actividad turística

//!                       --DOUBTS--
//*en routes todos los países pero solo las rutas, no entiendo
//GET /countries/{idPais}: //es por body?
//no puse id en activities para que tenga un id auto incremental

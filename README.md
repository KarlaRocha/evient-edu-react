# Ejemplo del Juego del Gato usando Websockets

## Bonus example (not part of curriculum)

Esto es un ejemplo simple de como se puede implementar websockets en React usando el juego del gato como base.

Para obtener la funcionalidad completa se tiene que correr el proyecto con el back correspondiente en el branch [websocket-example](https://github.com/KarlaRocha/evient-edu-back/tree/websocket-example)

Las páginas en donde se puede observar el uso de los websockets es en el home page. Se agrega un item cada vez que agrega un nuevo partido. Y también en la partida del juego del gato.

# Antes de correr el proyecto por primera vez instale los paquetes

### `yarn`

# Para correr el proyecto

### `yarn dev`

Se corre la aplicación en modo desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para ver la página.

# Tarea

La app debería complir con los siguientes requerimientos.

## Un juego de GATO.

- La página inicial debería mostrar un tabla con todos los partidos.
- Se debería poder ingresar a un juego ya iniciado.
- Se debería poder inicial un nuevo juego.
- Al iniciar un nuevo juego se selecionan los jugadores primero y después se muestra el tablero del gato.
- El jugador 1 siempre incia el juego.
- El jugador 1 siempre es X.
- En el juego se debe por grabar cada jugada que se hace.
- El juego debe mostrar de quién es el turno.
- El juego debe determinar quien es el ganador. (Con un alerta o texto)
- Al terminar el juego re-direcciona la pantalla a la pantalla de inicio.
- Se debería poder crear un nuevo jugador.

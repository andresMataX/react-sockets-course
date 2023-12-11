import { FC, useEffect } from 'react'
import { useMapbox, useSocket } from '../hooks'
import { Marcador } from '../interfaces'

const puntoInicial = {
  lng: -100.2728,
  lat: 25.7289,
  zoom: 11.27,
}

export const HomePage: FC = () => {
  const { socket } = useSocket()
  const { coords, setRef, nuevoMarcador$, movimientoMarcador$ } =
    useMapbox(puntoInicial)

  useEffect(() => {
    socket.on('marcadores-activos', (marcadores: Marcador[]) => {
      for (const key of Object.keys(marcadores)) {
        console.log(key)
      }
    })
  }, [socket])

  useEffect(() => {
    nuevoMarcador$.subscribe((marcador) => {
      socket.emit('marcador-nuevo', marcador)
    })
  }, [nuevoMarcador$, socket])

  useEffect(() => {
    movimientoMarcador$.subscribe((marcador) => {
      console.log(marcador)
    })
  }, [movimientoMarcador$])

  useEffect(() => {
    socket.on('marcador-nuevo', (marcador: Marcador) => {
      console.log(marcador)
    })
  }, [socket])

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 9999,
          backgroundColor: 'white',
          borderRadius: 5,
          padding: 10,
          fontFamily: 'monospace',
          fontSize: 16,
        }}
      >
        Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom}
      </div>

      <div
        ref={setRef}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      />
    </>
  )
}

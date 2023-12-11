import mapboxgl from 'mapbox-gl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Subject } from 'rxjs'
import { v4 as uuid } from 'uuid'
import { Marcador } from '../interfaces'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string

export const useMapbox = (puntoInicial: {
  lng: number
  lat: number
  zoom: number
}) => {
  const mapRef = useRef<HTMLDivElement>()
  const setRef = useCallback((node: HTMLDivElement) => {
    mapRef.current = node
  }, [])

  const map = useRef<mapboxgl.Map>()
  const [coords, setCoords] = useState(puntoInicial)

  const marcadores = useRef<Record<string, Marcador>>({})
  const movimientoMarcador = useRef<Subject<Marcador>>(new Subject<Marcador>())
  const nuevoMarcador = useRef<Subject<Marcador>>(new Subject<Marcador>())

  const agregarMarcador = useCallback(
    ({ lngLat }: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      const { lng, lat } = lngLat

      const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current as mapboxgl.Map)
        .setDraggable(true)

      const id = uuid()

      marcadores.current[id] = {
        id,
        lng,
        lat,
      }

      nuevoMarcador.current.next({
        id,
        lng,
        lat,
      })

      marker.on('drag', () => {
        const { lng, lat } = marker.getLngLat()

        movimientoMarcador.current.next({
          id,
          lng,
          lat,
        })
      })
    },
    []
  )

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapRef.current as HTMLDivElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    })
  }, [puntoInicial])

  useEffect(() => {
    map.current?.on('move', () => {
      const { lng, lat } = map.current!.getCenter()

      setCoords({
        lng: +lng.toFixed(4),
        lat: +lat.toFixed(4),
        zoom: +map.current!.getZoom().toFixed(2),
      })
    })
  }, [])

  useEffect(() => {
    map.current?.on('click', agregarMarcador)
  }, [agregarMarcador])

  return {
    coords,
    setRef,
    agregarMarcador,
    nuevoMarcador$: nuevoMarcador.current,
    movimientoMarcador$: movimientoMarcador.current,
  }
}

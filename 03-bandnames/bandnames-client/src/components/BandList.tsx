import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useSocket } from '../hooks/useSocket'
import { Band } from '../interfaces'

export const BandList: FC = () => {
  const [bands, setBands] = useState<Band[]>([])
  const { socket } = useSocket()

  useEffect(() => {
    socket.on('current-bands', (bands: Band[]) => {
      setBands(bands)
    })

    return () => {
      socket.off('current-bands')
    }
  }, [socket])

  const handleChangeName = (
    { target }: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newName = target.value

    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName
        }
        return band
      })
    )
  }

  const handleOnBlur = (id: string, name: string) => {
    socket.emit('change-band-name', { id, name })
  }

  const vote = (id: string) => {
    socket.emit('vote-band', id)
  }

  const deleteBand = (id: string) => {
    socket.emit('delete-band', id)
  }

  const crearRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className='btn btn-primary' onClick={() => vote(band.id)}>
            +1
          </button>
        </td>

        <td>
          <input
            type='text'
            className='form-control'
            value={band.name}
            onChange={(e) => handleChangeName(e, band.id)}
            onBlur={() => handleOnBlur(band.id, band.name)}
          />
        </td>

        <td>
          <h3>{band.votes}</h3>
        </td>

        <td>
          <button
            className='btn btn-danger'
            onClick={() => deleteBand(band.id)}
          >
            Borrar
          </button>
        </td>
      </tr>
    ))
  }

  return (
    <>
      <table className='table table-stripped'>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>

        <tbody>{crearRows()}</tbody>
      </table>
    </>
  )
}

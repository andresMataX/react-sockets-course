import { BandAdd, BandList } from './components'
import { useSocket } from './hooks'

export const App = () => {
  const { isOnline } = useSocket()

  return (
    <div className='container'>
      <div className='alert'>
        <p>
          Service status:
          {isOnline ? (
            <span className='text-success'> ONLINE</span>
          ) : (
            <span className='text-danger'> OFFLINE</span>
          )}
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className='row'>
        <div className='col-8'>
          <BandList />
        </div>

        <div className='col-4'>
          <BandAdd />
        </div>
      </div>
    </div>
  )
}

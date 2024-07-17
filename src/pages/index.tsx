import { NextPage } from 'next'

const LandingPage: NextPage = () => {
  return (
    <main>
      <div className='container'>
        <h1 className='my-4'>Create external tiles!</h1>
        <div className='d-flex flex-row gap-3 align-items-center '>
          <h3 className='my-4'>Chose a color</h3>
          <input
            type='color'
            style={{
              cursor: 'pointer',
            }}
          />
        </div>
        <button className='btn btn-primary'>Click Here</button>
      </div>
    </main>
  )
}
export default LandingPage

export default function Home() {
  return (
    <div className='flex w-full h-screen bg-[#fff]'>

      {/* Left Part */}
      <div
        className='
        hidden
        w-[50%] h-full bg-amber-300
        lg:block
        '
      >

      </div>

      {/* Right Part */}
      <div 
        className='
        flex flex-col w-full items-center justify-center
        lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-[50%]
        lg:h-full
        '
      >

        <h1
          className='
         text-[#ff6b6b] italic font-bold text-[10rem]
          md:text-[10rem]
          lg:text-[15rem]
          '
        >
          Ala
        </h1>

        <div
          className='
          flex font-light mt-[-50px] text-2xl
          md:mt-[-50px] md:text-3xl
          lg:mt-[-75px] lg:text-4xl
          '
        >
          <h1>Capture. &nbsp;</h1>
          <h1>Share. &nbsp;</h1>
          <h1>Relive.</h1>
        </div>
        
        



      </div>

    </div>
  )
}
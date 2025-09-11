export default function Home() {
  return (
    <div 
      className='
      flex flex-col w-full h-screen bg-[#fff]
      lg:pt-20
      '
    >

      <div
        className='
        hidden

        lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-full lg:h-full 
        '
      >

        <div 
          className='
          flex flex-col w-full items-center justify-center

          lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-[50%]
          lg:h-full lg:pb-40
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

      {/* Images */}
      <div 
        className='
        flex items-end justify-center w-full gap-4 absolute bottom-[-275px] z-10 p-8
        '
      >
        <div className='flex flex-col gap-4'>
          <div className='w-[250px] h-[350px] border-0 rounded-4xl bg-amber-200'></div>
          <div className='w-[250px] h-[350px] border-0 rounded-4xl bg-amber-200'></div>
        </div>
        

        <div className='mb-50'>
          <div className='w-[250px] h-[350px] border-0 rounded-4xl bg-amber-200'></div>
        </div>
        
        <div className='mb-25'>
          <div className='w-[250px] h-[350px] border-0 rounded-4xl bg-amber-200'></div>
        </div>

        <div className='mb-25'>
          <div className='w-[250px] h-[350px] border-0 rounded-4xl bg-amber-200'></div>
        </div>

        <div className='mb-50'>
          <div className='w-[250px] h-[350px] border-0 rounded-4xl bg-amber-200'></div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='w-[250px] h-[350px] border-0 rounded-4xl bg-amber-200'></div>
          <div className='w-[250px] h-[350px] border-0 rounded-4xl bg-amber-200'></div>
        </div>
      </div>




    </div>
  )
}
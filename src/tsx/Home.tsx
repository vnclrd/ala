export default function Home() {
  return (
    <div 
      className='
      flex flex-col w-full h-screen bg-[#fff]
      lg:pt-20
      '
    >

      {/* Ala – Capture. Share. Relive. */}
      <div
        className='
        flex flex-col items-center justify-center w-full h-full z-30
        lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-full lg:h-full 
        '
      >

        <div 
          className='
          flex flex-col w-full items-center justify-center
          pb-60

          lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-[50%]
          lg:h-full lg:pb-80
          '
        >
          <h1
            className='
          text-[#ff6b6b] italic font-bold text-[10rem]

            md:text-[15rem]
            lg:text-[15rem]
            '
          >
            Ala
          </h1>

          <div
            className='
            flex font-light mt-[-50px] text-2xl

            md:mt-[-75px] md:text-4xl
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
        flex items-end justify-center w-full absolute linear-gradient
        lg:p-8 lg:gap-4 lg:bottom-[-200px]
        '
      >
        <div className='flex flex-col gap-4'>
          <img
            src="1.jpg"
            alt="Image 1"
            className='
            w-[250px] h-[350px] border-0 rounded-4xl opacity-50
            hidden
            lg:block lg:opacity-100
            '
          />
          <img
            src="2.jpg"
            alt="Image 2"
            className='
            w-[250px] h-[350px] border-0 rounded-4xl opacity-50
            hidden
            lg:block lg:opacity-100
            '
          />
        </div>
        

        <div className='mb-50'>
          <img
            src="3.jpg"
            alt="Image 3"
            className='
            w-[250px] h-[350px] border-0 rounded-4xl opacity-50
            hidden
            lg:block lg:opacity-100
            '
          />
        </div>
        






        {/* With Mobile View */}
        <div 
          className='
          flex flex-col mb-25 mr-2 gap-2 
          lg:mr-0
          '
        >
          <img
            src="4.jpg"
            alt="Image 4"
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50
            lg:w-[250px] lg:h-[350px] lg:opacity-100 lg:rounded-4xl
            '
          />
          <img
            src="2.jpg"
            alt=""
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50
            lg:hidden lg:w-[250px] lg:h-[350px] lg:opacity-100
            '
          />
          <img
            src="3.jpg"
            alt=""
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50
            lg:hidden lg:w-[250px] lg:h-[350px] lg:opacity-100
            '
          />
        </div>

        {/* With Mobile View */}
        <div className='flex flex-col mb-25 gap-2'>
          <img
            src="5.jpg"
            alt="Image 5"
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50
            lg:w-[250px] lg:h-[350px] lg:opacity-100 lg:rounded-4xl
            '
          />
          <img
            src="5.jpg"
            alt=""
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50
            lg:hidden lg:w-[250px] lg:h-[350px] lg:opacity-100
            '
          />
          <img
            src="6.jpg"
            alt=""
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50
            lg:hidden lg:w-[250px] lg:h-[350px] lg:opacity-100
            '
          />
        </div>









        <div className='mb-50'>
          <img
            src="6.jpg"
            alt="Image 6"
            className='
            w-[250px] h-[350px] border-0 rounded-4xl opacity-50
            hidden
            lg:block lg:opacity-100
            '
          />
        </div>

        <div className='flex flex-col gap-4'>
          <img
            src="7.jpg"
            alt="Image 7"
            className='
            w-[250px] h-[350px] border-0 rounded-4xl opacity-50
            hidden
            lg:block lg:opacity-100
            '
          />
          <img
            src="8.jpg"
            alt="Image 8"
            className='
            w-[250px] h-[350px] border-0 rounded-4xl opacity-50
            hidden
            lg:block lg:opacity-100
            '
          />
        </div>
      </div>

      {/* Gradient Fade */}
      <div
        className='
          pointer-events-none
          absolute bottom-0 left-0 w-full h-40 
          bg-gradient-to-t from-white to-transparent
          z-10
        '
      ></div>

      {/* Gradient Fade */}
      <div
        className='
          lg:hidden pointer-events-none
          absolute left-0 w-full h-full
          bg-black/25
          z-20
        '
      ></div>




    </div>
  )
}
export default function Home() {
  return (
    <div 
      className='
      flex flex-col w-full h-screen bg-[#fff]

      lg:pt-30
      '
    >
      {/* Ala – Capture. Share. Relive. */}
      <div
        className='
        flex flex-col items-center justify-center w-full h-full z-30

        lg:flex lg:flex-col lg:items-center
        lg:justify-center lg:w-full lg:h-full 
        '
      >

        <div 
          className='
          flex flex-col w-full
          items-center justify-center

          lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-[50%]
          lg:h-full lg:pb-80
          '
        >
          <h1
            className='
            text-[#ff6b6b] italic font-bold text-[10rem] drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]

            md:text-[10rem] md:text-[#ff6b6b]
            lg:text-[10rem] lg:text-[#ff6b6b]
            '
          >
            Ala
          </h1>

          <div
            className='
            flex font-normal text-2xl mt-[-50px] text-[#fff]

            md:mt-[-50px] md:text-2xl md:text-[#fff]
            lg:mt-[-50px] lg:text-2xl lg:text-[#000]
            '
          >
            <h1>Capture. &nbsp;</h1>
            <h1>Share. &nbsp;</h1>
            <h1>Relive.</h1>
          </div>

          <div className='flex gap-2 mt-4'>
            <button 
              className='
              bg-[#ff6b6b] text-[#fff] text-sm
              font-medium p-4 rounded-[20px] cursor-pointer
              '
            >
              Organizer
            </button>

            <button
              className='
              bg-[#e0e0e0] text-[#000] text-sm font-medium p-4
              rounded-[20px] cursor-pointer
              '
            >
              Guest
            </button>
          </div>
          
        </div>
        
      </div>

      {/* Images */}
      <div 
        className='
        flex flex-nowrap items-end justify-center w-full
        p-2 absolute linear-gradient

        sm:p-8 sm:gap-4 sm:bottom-[-225px]
        md:p-8 md:gap-4 md:bottom-[-225px]
        lg:p-8 lg:gap-4 lg:bottom-[-250px]
        '
      >
        {/* Column 1 */}
        <div className='flex flex-col gap-4'>
          {/* Top Image */}
          <img
            src="1.jpg"
            alt="Image 1"
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          />
          {/* Bottom Image */}
          <img
            src="1.jpg"
            alt="Image 2"
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            
            sm:hidden
            md:hidden
            lg:block lg:opacity-100
            '
          />
        </div>
        
        {/* Column 2 */}
        <div 
          className='
          flex flex-col gap-4
          sm:mb-25
          md:mb-25
          lg:mb-50
          '
        >
          {/* Top Image */}
          <img
            src="1.jpg"
            alt="Image 3"
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            
            sm:block sm:opacity-50
            md:block md:opacity-50
            lg:block lg:opacity-100
            '
          />

          {/* sm-md Top Image */}
          <img
            src="1.jpg"
            alt="Image 3"
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            
            sm:block
            md:block
            lg:hidden
            '
          />
          {/* sm-md Bottom Image */}
          <img
            src="1.jpg"
            alt="Image 3"
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            
            sm:block
            md:block
            lg:hidden
            '
          />
        </div>
        
        {/* Column 3 */}
        {/* With Mobile View */}
        <div 
          className='
          flex flex-col mb-25 mr-2 gap-2

          sm:gap-4
          md:gap-4
          lg:mr-0
          '
        >
          <img
            src="1.jpg"
            alt="Image 4"
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50

            sm:w-[250px] sm:h-[350px] sm:rounded-4xl
            md:w-[250px] md:h-[350px] md:rounded-4xl
            lg:w-[250px] lg:h-[350px] lg:opacity-100 lg:rounded-4xl
            '
          />
          <img
            src="1.jpg"
            alt=""
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50

            sm:hidden sm:w-[250px] sm:h-[350px] sm:opacity-100
            md:hidden md:w-[250px] md:h-[350px] md:opacity-100
            lg:hidden lg:w-[250px] lg:h-[350px] lg:opacity-100
            '
          />
          <img
            src="1.jpg"
            alt=""
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50

            sm:hidden sm:w-[250px] sm:h-[350px] sm:opacity-100
            md:hidden md:w-[250px] md:h-[350px] md:opacity-100
            lg:hidden lg:w-[250px] lg:h-[350px] lg:opacity-100
            '
          />
          {/* sm-md Top Image */}
          <img
            src="1.jpg"
            alt="Image 3"
            className='
            
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            
            sm:block
            md:block
            lg:hidden
            '
          />
          {/* sm-md Bottom Image */}
          <img
            src="1.jpg"
            alt="Image 3"
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            
            sm:block
            md:block
            lg:hidden
            '
          />
        </div>
        
        {/* Column 4 */}
        {/* With Mobile View */}
        <div 
          className='
          flex flex-col mb-25 gap-2 

          sm:gap-4
          md:gap-4
          lg:mr-0
          '
        >
          <img
            src="1.jpg"
            alt="Image 5"
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50

            sm:w-[250px] sm:h-[350px] sm:rounded-4xl
            md:w-[250px] md:h-[350px] md:rounded-4xl
            lg:w-[250px] lg:h-[350px] lg:opacity-100 lg:rounded-4xl
            '
          />
          <img
            src="1.jpg"
            alt=""
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50

            sm:hidden sm:w-[250px] sm:h-[350px] sm:opacity-100
            md:hidden md:w-[250px] md:h-[350px] md:opacity-100
            lg:hidden lg:w-[250px] lg:h-[350px] lg:opacity-100
            '
          />
          <img
            src="1.jpg"
            alt=""
            className='
            w-[250px] h-[300px] border-0 rounded-xl opacity-50
            
            sm:hidden sm:w-[250px] sm:h-[350px] sm:opacity-100
            md:hidden md:w-[250px] md:h-[350px] md:opacity-100
            lg:hidden lg:w-[250px] lg:h-[350px] lg:opacity-100
            '
          />
          {/* sm-md Top Image */}
          <img
            src="1.jpg"
            alt="Image 3"
            className='
            
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            
            sm:block
            md:block
            lg:hidden
            '
          />
          {/* sm-md Bottom Image */}
          <img
            src="1.jpg"
            alt="Image 3"
            className='
            hidden w-[250px] h-[350px]
            border-0 rounded-4xl opacity-50
            
            sm:block
            md:block
            lg:hidden
            '
          />
        </div>

        {/* Column 5 */}
        <div className='mb-50'>
          <img
            src="1.jpg"
            alt="Image 6"
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50
            
            lg:block lg:opacity-100
            '
          />
        </div>

        {/* Column 6 */}
        <div className='flex flex-col gap-4'>
          <img
            src="1.jpg"
            alt="Image 7"
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50
            
            lg:block lg:opacity-100
            '
          />
          <img
            src="1.jpg"
            alt="Image 8"
            className='
            hidden w-[250px] h-[350px] border-0 rounded-4xl
            opacity-50
            
            lg:block lg:opacity-100
            '
          />
        </div>
      </div>

      {/* Gradient Fade */}
      <div
        className='
          pointer-events-none absolute bottom-0 left-0 w-full
          h-40 bg-gradient-to-t from-white to-transparent z-10
        '
      ></div>

      {/* Cover for sm/Mobile */}
      <div
        className='
        pointer-events-none absolute left-0 w-full h-full
        bg-black/50 z-20

        lg:hidden
        '
      >
      </div>
    </div>
  )
}
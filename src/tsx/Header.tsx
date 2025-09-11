export default function Header() {
  return (
    <div
      className='
      hidden z-1000
      
      md:block md:absolute md:bg-[#fff] md:shadow-lg
      md:w-full md:h-20

      lg:block lg:absolute lg:bg-[#fff] lg:shadow-lg
      lg:w-full lg:h-20
      '
    >
      {/* Header Content */}
      <div
        className='
        flex items-center
        md:w-full md:h-20
        lg:w-full lg:h-20
        '
      >
        {/* Left Part */}
        <div
          className='
          flex items-center justify-start
          md:w-[50%] md:h-full md:pl-8
          lg:w-[50%] lg:h-full lg:pl-12
          '
        >
          <h1 className='text-4xl font-bold italic text-[#ff6b6b]'>Ala</h1>
        </div>

        {/* Right Part */}
        <div
          className='
          md:flex md:items-center md:justify-end md:w-[50%] md:h-full
          md:gap-2 md:pr-8
          lg:flex lg:items-center lg:justify-end lg:w-[50%] lg:h-full
          lg:gap-2 lg:pr-12
          '
        >
          <button className='bg-[#ff6b6b] text-[#fff] text-sm font-medium p-4 rounded-[20px] cursor-pointer'>
            Organizer
          </button>
          <button className='bg-[#e0e0e0] text-[#000] text-sm font-medium p-4 rounded-[20px] cursor-pointer'>
            Guest
          </button>
        </div>
      </div>
    </div>
  );
}

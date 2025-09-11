export default function Header() {
  return (
    <div
      className='
      hidden z-1000

      lg:block lg:absolute lg:bg-[#fff] lg:shadow-lg
      lg:w-full lg:h-20
      '
    >
      {/* Header Content */}
      <div className='flex items-center w-full h-20'>
        {/* Left Part */}
        <div
          className='
          flex items-center justify-start md:w-[50%] pl-8
          
          md:h-full
          lg:w-[50%] lg:h-full
          '
        >
          <h1 className='text-4xl font-bold italic text-[#ff6b6b]'>
            Ala
          </h1>
        </div>

        {/* Right Part */}
        <div
          className='
          flex items-center justify-end w-[50%] h-full
          pr-8 gap-2
          '
        >
          <button
            className='
            bg-[#ff6b6b] text-[#fff] text-sm font-medium p-4
            rounded-[20px] cursor-pointer
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
  );
}

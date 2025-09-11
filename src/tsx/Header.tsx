export default function Header() {
  return (
    <div
      className='
      flex items-center bg-[#fff] 
      lg:w-full lg:h-20
      md:w-full md:h-20
      sm:w-full sm:h-20
      '
    >

      {/* Left Part */}
      <div className='flex items-center w-[50%] h-full pl-8'>
        <h1 className='text-2xl font-bold italic text-[#ff6b6b]'>Ala</h1>
        <p className='source-sans-text font-semibold'>&nbsp; – &nbsp;Capture. Share. Relive.</p>
      </div>

      {/* Right Part */}
      <div className='flex items-center justify-end w-[50%] h-full gap-2 pr-8'>
        <button className='bg-[#ff6b6b] text-[#fff] text-sm font-medium p-4 rounded-[20px] cursor-pointer'>Organizer</button>
        <button className='bg-[#e0e0e0] text-[#000] text-sm font-medium p-4 rounded-[20px] cursor-pointer'>Guest</button>
      </div>

    </div>
  );
}

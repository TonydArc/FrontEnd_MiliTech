export default function Silder() {
  return (
    <>
        <div className="carousel relative container mx-auto" style={{ maxWidth: '1600px' }}>
                <div className="carousel-inner relative overflow-hidden w-full">
                    {/* Slide 1 */}
                    <input className="carousel-open absolute bottom-4" type="radio" id="carousel-1" name="carousel" aria-hidden="false" />
                    <div className="carousel-item absolute opacity-0" style={{ height: '50vh' }}>
                        <div className=" h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
                            style={{ backgroundImage: "url('https://w0.peakpx.com/wallpaper/118/844/HD-wallpaper-rolex-submariner-black-dial-watch-rolex.jpg')" }}>
                            <div className="container mx-auto">
                                <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                                    {/* <p className="text-white text-2xl my-4">Rolex</p>
                  <a className="text-white inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-white hover:border-white" href="#">view product</a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Controls */}
                    <label htmlFor="carousel-2" className="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
                    <label htmlFor="carousel-2" className="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>

                    {/* Slide 2 */}
                    <input className="carousel-open absolute bottom-4" type="radio" id="carousel-2" name="carousel" aria-hidden="true"  />
                    <div className="carousel-item absolute opacity-0 bg-cover bg-right" style={{ height: '50vh' }}>
                        <div className=" h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
                            style={{ backgroundImage: "url('https://grandseikoboutique.com.au/img/watchPages/SLGA023/SLGA023_pc.jpg')" }}>
                            <div className="container mx-auto">
                                <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                                    {/* <p className="text-white text-2xl my-4">Seiko</p>
                  <a className="text-white inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-white hover:border-white" href="#">view product</a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Controls */}
                    <label htmlFor="carousel-1" className="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
                    <label htmlFor="carousel-1" className="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900  leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>

                </div>
            </div>
    </>
  )
}

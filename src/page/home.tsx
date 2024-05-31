/* eslint-disable @typescript-eslint/no-unused-vars */
import Productlist from '../component/Product/productlist'
// import Silder from '../component/silder'
import Store from '../component/store'


export default function Home() {
  // const [items, setItems] = useLocalStorage('items', []);

  
  return (
    <>
      <div className="w-full bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
        {/* <Silder /> */}
        <Store />
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <Productlist />
        </div>
      </div>
    </>
  )
}

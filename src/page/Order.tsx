import OrderList from '../component/Order/Orderlist'


export default function Order() {  
  return (
    <>
      <div className="w-full bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <OrderList />
        </div>
      </div>
    </>
  )
}

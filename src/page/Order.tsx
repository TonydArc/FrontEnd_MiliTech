import OrderList from '../component/Order/Orderlist'


export default function Order() {
  return (
    <>
      <div className="w-full bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
        <div className="container mx-auto flex items-center justify-center flex-wrap pt-20 pb-28">
          <OrderList />
        </div>
      </div>

    </>
  )
}

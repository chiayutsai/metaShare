import Avator from 'components/Avator/Avator'
import DecorationLine from 'components/DecorationLine/DecorationLine'

// Todo: 個人資訊 use selector
const PersonCard = () => (
  <div className="flex flex-col justify-center items-center px-[30px] py-9 bg-white rounded-lg shadow-card">
    <div className=" w-[120px] h-[120px] mb-2">
      <Avator />
    </div>
    <p className="font-bold text-xl mb-3">Chia Yu</p>
    <DecorationLine />
    <div
      className="flex mt-3
    ">
      <div className="flex flex-col items-center border-r border-gray-600 pr-6">
        <p className="text-gray-1000 text-sm">關注數</p>
        <button type="button" className="text-gray-1300 hover:text-primary-700">
          25
        </button>
      </div>
      <div className="flex flex-col items-center pl-6">
        <p className="text-gray-1000 text-sm">追蹤中</p>
        <button type="button" className="text-gray-1300 hover:text-primary-700">
          25
        </button>
      </div>
    </div>
  </div>
)

export default PersonCard

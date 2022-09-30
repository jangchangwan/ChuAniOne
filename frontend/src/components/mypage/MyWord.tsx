import React, {useState, useEffect} from 'react'
import MyWordItem from './MyWordItem';
import { useDispatch } from 'react-redux'
import { getMyvoca } from '../../store/mypageslice'
import store from '../../store'



function MyWord() {
  const dispatch = useDispatch<typeof store.dispatch>()

  const [myVocaList, setMyVocaList] = useState<any>([])

    // 데이터 불러오기
    async function loadWordData() {
      const MyVoca = await dispatch(getMyvoca())
      setMyVocaList(MyVoca.payload.myVoca)
    }
  
    useEffect(() => {
      loadWordData()
    },[])
  
  return (
    <div>
      {
        myVocaList ?
        (
          myVocaList.map((item, idx) => (
            <MyWordItem key={idx} wordData={item}/>
          ))
        )
        : null
      }
    </div>
  );
}

export default MyWord;

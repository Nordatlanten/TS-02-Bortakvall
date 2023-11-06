import { Button, Card } from 'react-bootstrap';
import { writeTest } from '../../redux/features/testSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '../../redux/store'
import axios from 'axios';
import { useEffect, useState } from 'react';



// const x: Response<Candy> = {
//   status: 'fail',
//   data: [
//     {
//       "lol": [34]
//     }
//   ]
// }


function Test () {
  const dispatch = useDispatch<AppDispatch>()
  const test = useAppSelector((state) => state.testReducer.value.test)
  // const API_HOST = 'https://bortakvall.se/api/v2/'
  // const [candyList, setCandyList] = useState<Candy[]>([])

  // useEffect(() => {

  //   const fetchData = async () => {
  //     const response = await getCandy()
  //     if (response && response.status === 'success') {
  //       setCandyList(response.data)
  //       console.log(response)
  //     }

  //   }
  //   try {
  //     fetchData()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [])

  // const getCandy = async () => {
  //   try {
  //     const response = await axios.get<Response<Candy>>(API_HOST + 
  //       'products')
  //     const data = response.data
  //     console.log(data)
  //     return data
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // const getTags = async () => {
  //   try {
  //     const response = await axios.get<Response<Tag>>(API_HOST + 'tags')
  //     const data = response.data
  //     console.log(data)
  //     return data
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <>
    <p>{test}</p>
    {/* <Button onClick={() => dispatch(writeTest('hej'))} >
      Lol!
    </Button>
    <Button onClick={getTags} variant='warning'>get tags</Button>
    <Button onClick={() => console.log(candyList)}>click me for candylist</Button>
    <div className="container">
      <div className="row">
        {candyList && candyList.map((a, i) => (
          <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={'https://bortakvall.se/' + a.images.thumbnail} />
            <Card.Body>
              <Card.Title>{a.name}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div> */}
    </>
  )
}

export default Test

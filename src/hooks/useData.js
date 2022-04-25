import axios from "axios";
import { useEffect, useState } from "react";

const END_POINT =  'https://randomuser.me/api';

export function useData(noOfResults) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    axios.get(`${END_POINT}/?results=${noOfResults}`)
    .then((res) => {
      const { results } = res.data
      setUsers(results)
    }).catch((err) => {
      console.error(err)
    })

    setLoading(false)
  }, [noOfResults])

  return [loading, users]
}


import React, { useState, useEffect } from 'react'
import axios from 'axios'
import scene2 from '../assets/s2.svg'

const BucketList = ({loggedInUser, setLoggedIn}) => {
  const [newActivity, setNewActivity] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [bucketList, setBucketList] = useState([])
  const [addModal, setAddModal] = useState(false)

  const addBucket = async() => {
    await axios.post('http://localhost:3001/addbucket', {
      userid: loggedInUser._id || localStorage.getItem('thebucketlistloggedinuserid'),
      activity: newActivity,
      description: newDescription
    })

    const userid = loggedInUser._id

    const res = await axios.get(`http://localhost:3001/getbucket/${userid || localStorage.getItem('thebucketlistloggedinuserid')}`)
    setBucketList(res.data)
    setNewActivity('')
    setNewDescription('')
    setAddModal(false)
  }

  const deleteBucket = async (id) => {
    await axios.delete(`http://localhost:3001/deletebucket/${id}`)
  }

  const toggleDone = async(id, isDone) => {
    console.log(isDone)

    await axios.put('http://localhost:3001/toggleDone', {
      id: id,
      isDone: isDone
    })

    const res = await axios.get(`http://localhost:3001/getbucket/${loggedInUser._id || localStorage.getItem('thebucketlistloggedinuserid')}`)
    setBucketList(res.data)
  }

  const logout = () => {
    localStorage.setItem('thebucketlistloggedin', false)
    setLoggedIn(false)
  }

  useEffect(() => {
    const setInitialBucket = async() => {
      console.log(loggedInUser._id)
      const res = await axios.get(`http://localhost:3001/getbucket/${loggedInUser._id || localStorage.getItem('thebucketlistloggedinuserid')}`)
      setBucketList(res.data)
    }

    setInitialBucket()
  }, [])

  return (
    <div className="Bucketlist">
      <div className="Bucketlist__flex-container">
        <h2> The BucketList </h2>
        <button className="Bucketlist__logout" onClick={logout}> Logout </button>
      </div>
      <div className={ `Bucketlist__add-modal ${ addModal ? 'Bucketlist__add-modal--active' : '' }` }>
        <span onClick={() => setAddModal(false)}> close </span>
        <input type="text" placeholder="Thebucketlist Title" value={newActivity} onChange={e => setNewActivity(e.target.value)}/>
        <input type="text" placeholder="Thebucketlist Description" value={newDescription} onChange={e => setNewDescription(e.target.value)}/>
        <button onClick={addBucket}> Enter </button>
      </div>
      <div className={`Bucketlist__add-modal-fade ${ addModal ? 'Bucketlist__add-modal-fade--active' : '' }`}></div>
      <ul className="Bucketlist__list">
        {
          bucketList.length > 0 ?
            bucketList.map(
              b => 
                <li onClick={() => toggleDone(b._id, !b.done)} className={`Bucketlist__item ${ b.done ? 'Bucketlist__item--done' : '' }`} key={b._id}>
                  <div className={`Bucketlist__item-done ${ b.done && 'Bucketlist__item-done--active'}`}> Done </div>
                  <p className="Bucketlist__title"> { b.activity } </p>
                  <p className="Bucketlist__description"> { b.description } </p>
                  <span onClick={() => deleteBucket(b._id)}> ✕ </span>
                </li>
            ) :
          (<div className="Bucketlist__no-item-container"> <embed type="image/svg+xml" src={scene2} className="Bucketlist__svg"/> <p> Enter some activities for your bucket list </p> </div>)
        } 
      </ul>
      <button className="Bucketlist__button" onClick={() => setAddModal(true)}> Add an activity </button>
    </div>
  );
}

export default BucketList

import React, { useState } from 'react'
import { projectFirestore, projectAuth } from '../../firebase/config'
import firebase from 'firebase'
import { Input, Button, ButtonBase, InputBase } from '@material-ui/core'

function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')

    async function sendMessage(e) {
        e.preventDefault()
        const uid = projectAuth.currentUser

        await projectFirestore.collection('messages').add({
            text: msg,
            uid: uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <InputBase style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <ButtonBase style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</ButtonBase>
                </div>
            </form>
        </div>
    )
}

export default SendMessage
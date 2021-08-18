import React,{useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandaler = (e) =>{
        e.preventDefault()
        if(keyword){
            history.push(`/?keyword=${keyword}&page1`)
        }else{
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandaler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                placeholder='Search'
                className='mr-sm-2 ml-sm-5'
                onChange={(e) =>setKeyword(e.target.value)}
            ></Form.Control>

            <Button
            type='submit'
            variant='outline-success'
            className='mx-3 p-2'
            >
               <i className="fas fa-search mx-2" style={{fontSize:'18px'}}></i>
            </Button>
        </Form>
    )
}

export default SearchBox

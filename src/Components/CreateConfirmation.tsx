import React from 'react'
import './CreateConfirmation.css'

type createpropsType = {
    CreateModal: boolean,
    CloseCreate: () => void

}

export default function CreateConfirmation({ CreateModal, CloseCreate }: createpropsType) {

    if (!CreateModal) {
        return null;
    }
    return (

        <div className='create_overlay'>
            <div className='create_content'>
                <div className='create_div'>
                    <p className='create_paragraph'>Record Created Successfully !!</p>
                </div>

                <div className='confirm_button_div'>

                    <button className='button_CreateCancel ' onClick={() => CloseCreate()}>OK</button>
                </div>
            </div>
        </div>
    )
}

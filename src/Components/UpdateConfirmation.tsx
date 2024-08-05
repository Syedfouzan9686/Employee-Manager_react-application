import React from 'react'
import './UpdateConfirmation.css'


type updatepropsType = {
    UpdateModal: boolean;
    CloseModal: () => void,

}

export default function UpdateConfirmation({ UpdateModal, CloseModal }: updatepropsType) {

    if (!UpdateModal) {
        return null;
    }


    return (
        <div>
            <div className='update_overlay'>
                <div className='update_content'>
                    <div className='update_div'>
                        <p className='update_paragraph'>Record has been Updated Successfully !!</p>
                        <p> changes modified for testing</p>
                        <p>changes added</p>
                    </div>

                    <div className='confirm_button_div'>
                        <button className='button_UpdateCancel' onClick={() => CloseModal() }>OK</button>

                    </div>
                </div>


            </div>

        </div>
    )
}

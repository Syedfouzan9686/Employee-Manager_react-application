import React, { useState } from 'react'
import './ConfirmationModal.css'

type propsType = {
    Confirm: boolean,
    Close: () => void,
    DeleteData: (id: string | undefined) => void,
    Deleteid: string | undefined
}

export default function ConfirmationModal({ Confirm, Close, DeleteData, Deleteid }: propsType) {

   
    if (!Confirm) {
        return null;
    }
    return (
        <div>
            <div className='deleteoverlay'>
                <div className='deletecontent'>
                    <div className='deletediv'>
                        <p className='delete_paragraph'>Delete Confirmation</p>
                    </div>
                    <p className='text_paragraph'> Confirm to Delete Record !! </p>
                    <div className='confirm_button_div'>
                        
                        <button className='button_confirm' onClick={() => { DeleteData(Deleteid); Close() }}>Confirm</button>
                        <button className='button_cancel ' onClick={Close}>Cancel</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
